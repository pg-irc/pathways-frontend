#!/bin/bash

# This script completes the steps needed to publish the client to the App Store (Apple) and Play Store (Android)

VERSION=$1
SERVER_VERSION=$2
ANDROID_VERSION_CODE=$3
# The command "./manage.py import_newcomers_guide" requires database access in order to retrieve
# related tasks from the database. The related tasks must already have been computed, see the
# server side prepare deploy script
POSTGRES_USER=$4
WORKING_DIRECTORY=$5
SERVER_DIRECTORY="$WORKING_DIRECTORY/pathways-backend"
CLIENT_DIRECTORY="$WORKING_DIRECTORY/pathways-frontend"
CONTENT_DIRECTORY="$WORKING_DIRECTORY/content"

usage() {
    echo
    echo "Usage:"
    echo
    echo "    prepare_deploy.sh clientVersion serverVersion androidVersionCode postgresUserId workingDirectory"
    echo
    echo "workingDirectory should not already exist, it will be used to clone three git repositories and build the client"
    echo
    echo "Before running this script, both the client and content repos need to have the appropriate"
    echo "commits tagged with the client version that is about to be released, and the server repository "
    echo "must be tagged with the server version to use. The script will verify that the version matches "
    echo "the content of VERSION.txt."
    echo
    echo "This script will remove Newcomers' Guide content in unsupported languages. When the set of languages"
    echo "changes, this script needs to be updated to reflect that, see removeContentInUnsuppotedLanguages()"
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
    echo
    echo "Checking out content tagged with $VERSION"
    echo
    (cd "$WORKING_DIRECTORY" && git clone git@github.com:PeaceGeeksSociety/content.git)
    checkForSuccess "clone content repo"

    (cd "$CONTENT_DIRECTORY" && git fetch --tags)
    checkForSuccess "fetch tags for content"

    (cd "$CONTENT_DIRECTORY" && git checkout "tags/$VERSION" -b "appRelease/$VERSION")
    checkForSuccess "check out tag for content"
}

checkOutClientByTag() {
    echo
    echo "Checking out client tagged with $VERSION"
    echo
    (cd "$WORKING_DIRECTORY" && git clone git@github.com:pg-irc/pathways-frontend.git)
    checkForSuccess "clone client repo"

    (cd "$CLIENT_DIRECTORY" && git fetch --tags)
    checkForSuccess "fetch tags for client"

    (cd "$CLIENT_DIRECTORY" && git checkout "tags/$VERSION" -b "appRelease/$VERSION")
    checkForSuccess "check out tag for client"
}

checkOutServerByTag() {
    echo
    echo "Checking out server tagged with $SERVER_VERSION"
    echo
    (cd "$WORKING_DIRECTORY" && git clone git@github.com:pg-irc/pathways-backend.git)
    checkForSuccess "clone server repo"

    (cd "$SERVER_DIRECTORY" && git fetch --tags)
    checkForSuccess "fetch tags for server"

    (cd "$SERVER_DIRECTORY" && git checkout "tags/$SERVER_VERSION" -b "appRelease/$SERVER_VERSION")
    checkForSuccess "check out tag for server"
}

validateClientVersion() {
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

validateServerVersion() {
    FILE_VERSION=$(cat "$SERVER_DIRECTORY/VERSION.txt")
    if [ "$FILE_VERSION" != "$SERVER_VERSION" ]
    then
        echo "Error: server VERSION.txt contains $FILE_VERSION, when $SERVER_VERSION was expected"
        exit
    fi
}

removeContentInUnsuppotedLanguages() {
    for language in ko tl zh_CN po tl zh_TW po tl zh_TW
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

completeManualConfiguration() {
    echo
    echo "Manual steps:"
    echo
    echo " edit $CLIENT_DIRECTORY/app.json"
    echo
    echo "and set the Sentry auth token, it's located in hooks/postPublish/config/authToken."
    echo "Log into our account on https://sentry.io to retrieve the auth token"
    echo "from https://sentry.io/settings/account/api/auth-tokens/"
    echo
    echo "Make any other configuration changes now, such as e.g. pointing the URL in .env to staging."
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

validateContentFixture() {
    # with related tasks, the file will contain "relatedTasks": [task_id],
    # without related tasks it contains just "relatedTasks": []
    if grep -q "\"relatedTasks\": \[\]" "$CLIENT_DIRECTORY/src/fixtures/newcomers_guide/tasks.ts"
    then
        echo "Error: tasks.ts does not contain related tasks"
        echo "Run the server side prepare_deploy script to populate the db with related task scores"
        exit
    fi
}

buildClientLocally() {
    (cd "$CLIENT_DIRECTORY" && yarn clean && yarn build)
    checkForSuccess "build client"
}

testClient() {
    (cd "$CLIENT_DIRECTORY" && yarn test )
    checkForSuccess "test client"
}

giveExpoCommandsForPublishing() {
    echo "To publish the client for both platforms, ensure that the "
    echo "build cache is cleared, then run these commands: "
    echo
    echo "(cd $CLIENT_DIRECTORY && yarn run expo bi --release-channel release)"
    echo "(cd $CLIENT_DIRECTORY && yarn run expo ba --release-channel release)"
    echo
    echo "Checklist for publishing to App Store (iOS):"
    echo "Checklist for publishing to Play Store (Android):"
}

runClientForFinalQA() {
    echo "Confirm that the build is ready for release:"

    (cd "$CLIENT_DIRECTORY" && yarn start -c)
}

validateCommandLine
validateExpoUser
createWorkingDirectory

checkOutServerByTag
checkOutClientByTag
checkOutContentByTag

validateClientVersion
validateServerVersion

removeContentInUnsuppotedLanguages

getServerDependencies
createServerEnvironment
buildContentFixture
validateContentFixture

getClientDependencies
createClientEnvironment
completeManualConfiguration
# TODO validate client environment: No trailing / on the URL, use https, debug analytics is false
buildClientLocally
testClient

giveExpoCommandsForPublishing

runClientForFinalQA
