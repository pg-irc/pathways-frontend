#!/bin/bash

fail() {
    exit -1
}

while (( "$#" )); do
    if [ "$1" == "--clientVersion" ]
    then
        VERSION=$2
        shift 2
    elif [ "$1" == "--serverVersion" ]
    then
        SERVER_VERSION=$2
        shift 2
    elif [ "$1" == "--androidVersionCode" ]
    then
        ANDROID_VERSION_CODE=$2
        shift 2
    elif [ "$1" == "--postgresUser" ]
    then
        POSTGRES_USER=$2
        shift 2
    elif [ "$1" == "--workingDirectory" ]
    then
        WORKING_DIRECTORY=$2
        shift 2
    elif [ "$1" == "--bc211path" ]
    then
        BC211PATH=$2
        shift 2
    elif [ "$1" == "--staging" ]
    then
        BUILD="staging"
        echo "Preparing build for $BUILD"
        shift 1
    elif [ "$1" == "--production" ]
    then
        BUILD="production"
        echo "Preparing build for $BUILD"
        shift 1
    else
        echo "$1: Invalid command argument"
        fail
    fi
done

SERVER_DIRECTORY="$WORKING_DIRECTORY/pathways-backend"
CLIENT_DIRECTORY="$WORKING_DIRECTORY/pathways-frontend"
CONTENT_DIRECTORY="$WORKING_DIRECTORY/content"
UI_STRINGS_DIRECTORY="$CLIENT_DIRECTORY/locale/ui-strings"

usage() {
    echo
    echo "Usage:"
    echo
    echo "    $0 [arguments]"
    echo
    echo "Mandatory arguments:"
    echo
    echo "    --clientVersion"
    echo "                The client version string, must match tags on the client and content repositories."
    echo
    echo "    --serverVersion"
    echo "                The server version string, must match tag on the server repository."
    echo
    echo "    --androidVersionCode"
    echo "                The version code for the android build, should match the client version string as"
    echo "                verified by the client unit tests."
    echo
    echo "    --postgresUser"
    echo "                The command './manage.py import_newcomers_guide' requires database access"
    echo "                in order to retrieve related tasks from the database. The related tasks must"
    echo "                already have been computed, see the server side prepare deploy script."
    echo
    echo "    --bc211path"
    echo "                Path to the XML file containing the BC211 data dump."
    echo
    echo "    --workingDirectory"
    echo "                Path to a directory to be created by the script. WorkingDirectory should not already"
    echo "                exist, it will be used to clone three git repositories and build the client."
    echo
    echo "    --staging or --production"
    echo "                Pass one of these flags depending on the build. This affects the URL, icon and app name to be set."
    echo
    echo
    echo "Before running this script, both the client and content repos need to have the appropriate"
    echo "commits tagged with the client version that is about to be released, and the server repository "
    echo "must be tagged with the server version to use. The script will verify that the version matches "
    echo "the content of VERSION.txt."
}

validateExpoUser() {
    if expo whoami 2> /dev/null | grep -q 'Logged in as peacegeeks'; then
        echo "Expo account is OK"
    else
        echo "Error: Must be logged into expo as peacegeeks"
        fail
    fi
}

validateCommandLine () {
    if [ "$VERSION" == "" ]
    then
        echo "Error: Must specify version string"
        usage
        fail
    fi

    if [ "$SERVER_VERSION" == "" ]
    then
        echo "Error: Must specify server version string"
        usage
        fail
    fi 

    if [ "$ANDROID_VERSION_CODE" == "" ]
    then
        echo "Error: Must specify android version code"
        usage
        fail
    fi

    if [ "$WORKING_DIRECTORY" == "" ]
    then
        echo "Error: Must specify working directory, which must not already exist"
        usage
        fail
    fi

    if [ "$POSTGRES_USER" == "" ]
    then
        echo "Error: Must specify postgres user, as in pathways-backend/.env"
        usage
        fail
    fi

    if [ "$BC211PATH" == "" ]
    then
        echo "Error: Must specify path to BC211 data dump file"
        usage
        fail
    fi

    if [ "$BUILD" != "staging" ] && [ "$BUILD" != "production" ]
    then
        echo "Error: Must specify if the build is for production or staging"
        usage
        fail
    fi
}

checkForSuccess () {
    if [ "$?" != "0" ]
    then
        echo "Error: failed to $1"
        fail
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
    (cd "$WORKING_DIRECTORY" && git clone --recursive git@github.com:pg-irc/pathways-frontend.git)
    checkForSuccess "clone client repo"

    (cd "$CLIENT_DIRECTORY" && git fetch --tags)
    checkForSuccess "fetch tags for client"

    (cd "$CLIENT_DIRECTORY" && git checkout "tags/$VERSION" -b "appRelease/$VERSION")
    checkForSuccess "check out tag for client"

    (cd "$CLIENT_DIRECTORY" && git submodule update)
    checkForSuccess "check out client submodules"
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
        fail
    fi

    FILE_CODE=$(grep versionCode "$CLIENT_DIRECTORY/app.json")
    if [ "$FILE_CODE" != "      \"versionCode\": $ANDROID_VERSION_CODE," ]
    then
        echo "Error: client app.json contains $FILE_CODE when $ANDROID_VERSION_CODE was expected"
        fail
    fi
}

validateServerVersion() {
    FILE_VERSION=$(cat "$SERVER_DIRECTORY/VERSION.txt")
    if [ "$FILE_VERSION" != "$SERVER_VERSION" ]
    then
        echo "Error: server VERSION.txt contains $FILE_VERSION, when $SERVER_VERSION was expected"
        fail
    fi
}

getServerDependencies() {
    echo
    echo "Getting server dependencies"
    echo
    (cd "$SERVER_DIRECTORY" &&\
        python3 -m venv .venv &&\
        source .venv/bin/activate &&\
        pip install -r requirements/local.txt &&\
        python -m spacy download en)
    checkForSuccess "install requirements for the server"
}

getClientDependencies() {
    echo
    echo "Getting client dependencies"
    echo
    (cd "$CLIENT_DIRECTORY" && yarn)
    checkForSuccess "install requirements for the client"
}

createServerEnvironment() {
    echo
    echo "Creating server environment"
    echo
    echo "POSTGRES_USER=$POSTGRES_USER" > "$SERVER_DIRECTORY/.env"
    checkForSuccess "create server environment"
}

setStagingValuesInAppJson() {
    ( cd "$CLIENT_DIRECTORY" && \
        cat app.json | \
        sed s/phone_icon_android.png/phone_icon_android_staging.png/ | \
        sed s/phone_icon_ios.png/phone_icon_ios_staging.png/ | \
        sed s/org.peacegeeks.ArrivalAdvisor/org.peacegeeks.ArrivalAdvisorStaging/ > temp.json && \
        mv temp.json app.json
    )
    checkForSuccess "set staging parameters is app.json"
}

createClientEnvironment() {
    echo
    echo "Creating client environment"
    echo
    PRODUCTION_URL="https://pathways-production.herokuapp.com"
    STAGING_URL="https://fierce-ravine-89308.herokuapp.com"

    echo "VERSION=$VERSION"                                >  "$CLIENT_DIRECTORY/.env"
    echo "DEBUG_GOOGLE_ANALYTICS=false"                    >> "$CLIENT_DIRECTORY/.env"
    echo "ALGOLIA_SERVICES_INDEX='dev_phones'"             >> "$CLIENT_DIRECTORY/.env"
    echo "SENTRY_DEBUG=false"                              >> "$CLIENT_DIRECTORY/.env"
    echo "SENTRY_ENABLE_IN_DEV=false"                      >> "$CLIENT_DIRECTORY/.env"
    echo                                                   >> "$CLIENT_DIRECTORY/.env"
    echo "SENTRY_AUTH_TOKEN='token...'"                    >> "$CLIENT_DIRECTORY/.env"
    echo "SENTRY_DSN=https://...sentry.io/..."             >> "$CLIENT_DIRECTORY/.env"
    echo "ALGOLIA_SEARCH_API_KEY='key...'"                 >> "$CLIENT_DIRECTORY/.env"
    echo "DISABLE_ANALYTICS_STRING='foobar'"               >> "$CLIENT_DIRECTORY/.env"
    echo "ENABLE_ANALYTICS_STRING='barfoo'"                >> "$CLIENT_DIRECTORY/.env"

    if [ "$BUILD" == "staging" ]
    then
        echo "GOOGLE_ANALYTICS_TRACKING_ID='UA-30770107-5'" >> "$CLIENT_DIRECTORY/.env"
        echo "API_URL=$STAGING_URL"                         >> "$CLIENT_DIRECTORY/.env"

        setStagingValuesInAppJson

    elif [ "$BUILD" == "production" ]
    then
        echo "GOOGLE_ANALYTICS_TRACKING_ID='UA-30770107-3'" >> "$CLIENT_DIRECTORY/.env"
        echo "API_URL=$PRODUCTION_URL"                      >> "$CLIENT_DIRECTORY/.env"
    else
        echo "Error: You must specify the build type"
        fail
    fi

    checkForSuccess "create client environment"
}

completeManualConfiguration() {
    echo
    echo "Manual steps:"
    echo
    echo " edit $CLIENT_DIRECTORY/.env"
    echo
    echo "and set the Sentry auth token and dsn. Log into our account on "
    echo "https://sentry.io to retrieve the auth token from "
    echo "https://sentry.io/settings/account/api/auth-tokens/ and dsn from"
    echo "https://sentry.io/settings/peacegeeks/projects/pathways/keys/"
    echo
    echo "Also set the ALGOLIA_SEARCH_API_KEY available from"
    echo "https://www.algolia.com/apps/MMYH1Z0D3O/api-keys/all"
    echo
    echo "Make any other client side configuration changes now."
    echo
    read -p "Press enter to continue"
}

buildServer() {
    echo
    echo "Building server"
    echo

    cp $BC211PATH $SERVER_DIRECTORY/bc211.xml
    (cd "$SERVER_DIRECTORY" &&\
        source .venv/bin/activate &&\
        ./utility/prepare_deploy.sh \
            --bc211Path                 ./bc211.xml                  \
            --cityLatLongs              ../content/city_latlong.csv  \
            --newComersGuidePath        ../content/NewcomersGuide/   \
            --recommendationsToAddPath  ../content/taxonomy/         \
            --outputDir                 ../                          \
    )
    checkForSuccess "build server"
}

buildContentFixture() {
    echo
    echo "Building content fixture"
    echo

    (cd "$SERVER_DIRECTORY" &&\
        source .venv/bin/activate &&\
        ./manage.py generate_client_fixtures ../content &&\
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
        fail
    fi
}

buildMessagesPOFiles() {
    echo
    echo "Building message PO files"
    echo
    (cd "$CLIENT_DIRECTORY" && ./bin/strings.sh --combine-pos)
    checkForSuccess "build messages.po files"
}

buildLinguiCatalogs() {
    echo
    echo "Compiling message PO files"
    echo
    (cd "$CLIENT_DIRECTORY" && yarn build-strings)
    checkForSuccess "build messages.js for lingui catalogs"
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
    echo "(cd $CLIENT_DIRECTORY && yarn run expo bi)"
    echo "(cd $CLIENT_DIRECTORY && yarn run expo ba)"
    echo
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

getServerDependencies
createServerEnvironment
buildServer
buildContentFixture
validateContentFixture

getClientDependencies
createClientEnvironment
completeManualConfiguration
buildMessagesPOFiles
buildLinguiCatalogs
buildClientLocally
testClient

giveExpoCommandsForPublishing

runClientForFinalQA
