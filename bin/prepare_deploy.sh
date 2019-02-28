#!/bin/bash

VERSION=$1
POSTGRES_USER=$2
WORKING_DIRECTORY=$3

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
        exit
    fi

    if [ "$WORKING_DIRECTORY" == "" ]
    then
        echo "Error: Must specify working directory, which must not already exist"
        exit
    fi

    if [ "$POSTGRES_USER" == "" ]
    then
        echo "Error: Must specify postgres user, as in pathways-backend/.env"
        exit
    fi
}

createWorkingDirectory() {
    mkdir "$WORKING_DIRECTORY"
}

checkForSuccess () {
    if [ "$?" != "0" ]
    then
        echo "Error: failed to $1"
        exit
    fi
}

checkOutContentByTag() {
    echo "Checking out content tagged with $VERSION"
    (cd "$WORKING_DIRECTORY" && git clone git@github.com:PeaceGeeksSociety/content.git)

    (cd "$WORKING_DIRECTORY/content" && git fetch --tags)
    checkForSuccess "fetch tags for content"

    (cd "$WORKING_DIRECTORY/content" && git checkout "tags/$VERSION" -b "appRelease/$VERSION")
    checkForSuccess "check out tag for content"
}

checkOutClientByTag() {
    echo "Checking out client tagged with $VERSION"
    (cd "$WORKING_DIRECTORY" && git clone git@github.com:pg-irc/pathways-frontend.git)

    (cd "$WORKING_DIRECTORY/pathways-frontend" && git fetch --tags)
    checkForSuccess "fetch tags for client"

    (cd "$WORKING_DIRECTORY/pathways-frontend" && git checkout "tags/$VERSION" -b "appRelease/$VERSION")
    checkForSuccess "check out tag for client"
}

checkOutServer() {
    echo "Checking out master for server"
    (cd "$WORKING_DIRECTORY" && git clone git@github.com:pg-irc/pathways-backend.git)

    (cd "$WORKING_DIRECTORY/pathways-backend" && git checkout master)
    checkForSuccess "check out master for server"
}

validateCheckedOutVersion() {
    FILE_VERSION=$(cat "$WORKING_DIRECTORY/pathways-frontend/VERSION.txt")
    if [ "$FILE_VERSION" != "$VERSION" ]
    then
        echo "Error: client VERSION.txt contains $FILE_VERSION, when $VERSION was expected"
        exit
    fi
}

removeContentInUnsuppotedLanguages() {
    for language in ko tl zh_CN
    do
        echo "Removing Newcomers Guide content in language $language"
        path="$WORKING_DIRECTORY/content/NewcomersGuide/Chapter*/topics/*/$language.*"
        rm -f $path
    done
}

getServerDependencies() {
    (cd "$WORKING_DIRECTORY/pathways-backend" &&\
        python3 -m venv .venv &&\
        source .venv/bin/activate &&\
        pip install -r requirements/local.txt)
}

getClientDependencies() {
    (cd "$WORKING_DIRECTORY/pathways-frontend" && yarn)
}

createServerEnvironment() {
    echo "POSTGRES_USER=$POSTGRES_USER" > "$WORKING_DIRECTORY/pathways-backend/.env"
}

createClientEnvironment() {
    echo "VERSION=$VERSION"                                   > "$WORKING_DIRECTORY/pathways-frontend/.env"
    echo "API_URL=https://pathways-production.herokuapp.com" >> "$WORKING_DIRECTORY/pathways-frontend/.env"
    # TODO make this an argument
    echo "GOOGLE_ANALYTICS_TRACKING_ID='UA-30770107-3'"      >> "$WORKING_DIRECTORY/pathways-frontend/.env"
    echo "DEBUG_GOOGLE_ANALYTICS=false"                      >> "$WORKING_DIRECTORY/pathways-frontend/.env"
}

buildContentFixture() {
    (cd "$WORKING_DIRECTORY/pathways-backend" &&\
        source .venv/bin/activate &&\
        ./manage.py import_newcomers_guide ../content &&\
        mv *.ts ../pathways-frontend/src/fixtures/newcomers_guide/ )
}

buildClientLocally() {
    (cd "$WORKING_DIRECTORY/pathways-frontend" && yarn clean && yarn build)
}

testClient() {
    (cd "$WORKING_DIRECTORY/pathways-frontend" && yarn test )
}

buildClientOnExpo() {
    (cd "$WORKING_DIRECTORY/pathways-frontend" &&\
        yarn run expo bi --release-channel release &&\
        yarn run expo ba --release-channel release)
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
testClient
buildClientOnExpo
