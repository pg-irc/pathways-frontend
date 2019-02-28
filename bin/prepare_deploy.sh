#!/bin/bash

VERSION=$1
ANDROID_VERSION_CODE=$2
POSTGRES_USER=$3
WORKING_DIRECTORY=$4
SERVER_DIRECTORY="$WORKING_DIRECTORY/pathways-backend"
CLIENT_DIRECTORY="$WORKING_DIRECTORY/pathways-frontend"
CONTENT_DIRECTORY="$WORKING_DIRECTORY/content"

usage() {
    echo
    echo "Usage:"
    echo
    echo "    prepare_deploy.sh versionString androidVersionCode postgresUserId workingDirectory"
    echo
    echo "workingDirectory should not already exist, it will be used to clone three git repositories and build the client"
}

validateExpoUser() {
    if expo whoami 2> /dev/null | grep -q 'Logged in as peacegeeks'; then
        echo "Expo account is OK"
    else
        echo "Error: Must be logged into expo as peacegeeks"
        exit
    fi
}

validateCommandLine () {
    if [ "$VERSION" == "" ]
    then
        echo "Error: Must specify version string"
        usage
        exit
    fi

    if [ "$ANDROID_VERSION_CODE" == "" ]
    then
        echo "Error: Must specify android version code"
        usage
        exit
    fi

    if [ "$WORKING_DIRECTORY" == "" ]
    then
        echo "Error: Must specify working directory, which must not already exist"
        usage
        exit
    fi

    if [ "$POSTGRES_USER" == "" ]
    then
        echo "Error: Must specify postgres user, as in pathways-backend/.env"
        usage
        exit
    fi
}

checkForSuccess () {
    if [ "$?" != "0" ]
    then
        echo "Error: failed to $1"
        exit
    fi
}

createWorkingDirectory() {
    mkdir "$WORKING_DIRECTORY"
    checkForSuccess "create working directory"
}

checkOutContentByTag() {
    echo "Checking out content tagged with $VERSION"
    (cd "$WORKING_DIRECTORY" && git clone git@github.com:PeaceGeeksSociety/content.git)
    checkForSuccess "clone content repo"

    (cd "$CONTENT_DIRECTORY" && git fetch --tags)
    checkForSuccess "fetch tags for content"

    (cd "$CONTENT_DIRECTORY" && git checkout "tags/$VERSION" -b "appRelease/$VERSION")
    checkForSuccess "check out tag for content"
}

checkOutClientByTag() {
    echo "Checking out client tagged with $VERSION"
    (cd "$WORKING_DIRECTORY" && git clone git@github.com:pg-irc/pathways-frontend.git)
    checkForSuccess "clone client repo"

    (cd "$CLIENT_DIRECTORY" && git fetch --tags)
    checkForSuccess "fetch tags for client"

    (cd "$CLIENT_DIRECTORY" && git checkout "tags/$VERSION" -b "appRelease/$VERSION")
    checkForSuccess "check out tag for client"
}

checkOutServer() {
    echo "Checking out master for server"
    (cd "$WORKING_DIRECTORY" && git clone git@github.com:pg-irc/pathways-backend.git)
    checkForSuccess "clone server repo"

    (cd "$SERVER_DIRECTORY" && git checkout master)
    checkForSuccess "check out master for server"
}

validateCheckedOutVersion() {
    FILE_VERSION=$(cat "$CLIENT_DIRECTORY/VERSION.txt")
    if [ "$FILE_VERSION" != "$VERSION" ]
    then
        echo "Error: client VERSION.txt contains $FILE_VERSION, when $VERSION was expected"
        exit
    fi

    FILE_CODE=$(grep versionCode "$CLIENT_DIRECTORY/app.json")
    if [ "$FILE_CODE" != "      \"versionCode\": $ANDROID_VERSION_CODE," ]
    then
        echo "Error: client app.json contains $FILE_CODE when $ANDROID_VERSION_CODE was expected"
        exit
    fi
}

removeContentInUnsuppotedLanguages() {
    for language in ko tl zh_CN
    do
        echo "Removing Newcomers Guide content in language $language"
        path="$CONTENT_DIRECTORY/NewcomersGuide/Chapter*/topics/*/$language.*"
        rm -f $path
        checkForSuccess "remove files $path"
    done
}

getServerDependencies() {
    (cd "$SERVER_DIRECTORY" &&\
        python3 -m venv .venv &&\
        source .venv/bin/activate &&\
        pip install -r requirements/local.txt)
    checkForSuccess "install requirements for the server"
}

getClientDependencies() {
    (cd "$CLIENT_DIRECTORY" && yarn)
    checkForSuccess "install requirements for the client"
}

createServerEnvironment() {
    echo "POSTGRES_USER=$POSTGRES_USER" > "$SERVER_DIRECTORY/.env"
    checkForSuccess "create server environment"
}

createClientEnvironment() {
    echo "VERSION=$VERSION"                                   > "$CLIENT_DIRECTORY/.env"
    echo "API_URL=https://pathways-production.herokuapp.com" >> "$CLIENT_DIRECTORY/.env"
    echo "GOOGLE_ANALYTICS_TRACKING_ID='UA-30770107-3'"      >> "$CLIENT_DIRECTORY/.env"
    echo "DEBUG_GOOGLE_ANALYTICS=false"                      >> "$CLIENT_DIRECTORY/.env"
    checkForSuccess "create client environment"
}

setSentryAuthToken() {
    echo
    echo "Manual step:"
    echo
    echo " edit $CLIENT_DIRECTORY/app.json"
    echo
    echo "and set the Sentry auth token. Log into our accont on https://sentry.io to retrieve an auth token."
    echo
    read -p "Press enter to continue"
}

buildContentFixture() {
    (cd "$SERVER_DIRECTORY" &&\
        source .venv/bin/activate &&\
        ./manage.py import_newcomers_guide ../content &&\
        mv *.ts ../pathways-frontend/src/fixtures/newcomers_guide/ )
    checkForSuccess "build content fixture"
}

buildClientLocally() {
    (cd "$CLIENT_DIRECTORY" && yarn clean && yarn build)
    checkForSuccess "build client"
}

testClient() {
    (cd "$CLIENT_DIRECTORY" && yarn test )
    checkForSuccess "test client"
}

buildClientForIOs() {
    (cd "$CLIENT_DIRECTORY" && yarn run expo bi --release-channel release)
}

buildClientForAndroid() {
    (cd "$CLIENT_DIRECTORY" && yarn run expo ba --release-channel release)
}

validateCommandLine
validateExpoUser
createWorkingDirectory

checkOutServer
checkOutClientByTag
checkOutContentByTag

validateCheckedOutVersion
removeContentInUnsuppotedLanguages

getServerDependencies
createServerEnvironment
buildContentFixture

getClientDependencies
createClientEnvironment
buildClientLocally
setSentryAuthToken
testClient

buildClientForIOs
buildClientForAndroid
