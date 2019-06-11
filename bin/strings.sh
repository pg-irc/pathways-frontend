#!/bin/bash

locales=(ar fr ko pa tl zh_CN zh_TW)
CLIENT_LOCALE_LOCATION=$2
UI_STRINGS_DIRECTORY=$3
VERSION=$4

checkForSuccess () {
    if [ "$?" != "0" ]
    then
        echo "failed to $1"
        exit
    fi
}

validate_command_line () {
    if [ "$CLIENT_LOCALE_LOCATION" == "" ]
    then
        echo "Error: Must provide the path of the locale directory on the client"
        help
        exit
    fi

    if [ "$UI_STRINGS_DIRECTORY" == "" ]
    then
        echo "Error: Must specify a directory to place the ui-strings, which must not already exist"
        help
        exit
    fi
}


extract_all() {
    echo "Building the client ..."
    yarn build
    checkForSuccess "yarn build"

    echo "Generating PO files ..."
    yarn extract-strings-clean
    checkForSuccess "yarn extract-strings-clean"

    for locale in "${locales[@]}"
    do
        echo "Converting PO files to CSV for ${locale}..."
        po2csv --progress none locale/$locale/messages.po > locale/$locale/messages.csv
        checkForSuccess "convert po files to csv"

        echo "Fixing line breaks in PO file for ${locale}..."
        csv2po --progress none locale/$locale/messages.csv > locale/$locale/messages.po
        checkForSuccess "convert csv files back to po to normalize line breaks"
    done

    echo "Please send files locale/*/messages.csv or locale/*/messages.po for translation"
}


build_all() {
    for locale in "${locales[@]}"
    do
        echo "Converting CSV to PO files for ${locale} ..."
        csv2po --progress none locale/$locale/messages.csv locale/$locale/messages.po
        checkForSuccess "convert csv files to po"
    done

    echo "Converting PO files to Javascript ..."
    yarn build-strings
    checkForSuccess "yarn build-strings"

    echo "Building the app ..."
    yarn cbt
    checkForSuccess "yarn cbt"
}


extract_changed() {
    echo "Building the client ..."
    yarn build
    checkForSuccess "yarn build"

    echo "Generating PO files ..."
    yarn extract-strings
    checkForSuccess "yarn extract-strings"

    for locale in "${locales[@]}"
    do
        # Use msggrep to get the strings needing translation
        #   -v invert the result
        #   -T match msgstr entries, i.e. the translated strings
        #   -e match using regular expression
        #   "." match strings with at least one character (inverted with -v to mean match empty strings)
        echo "Filtering strings needing translation for ${locale} ..."
        msggrep -v -T -e "." locale/$locale/messages.po > locale/$locale/new-messages.po
        checkForSuccess "filter strings needing translation"

        echo "Converting PO files to CSV for ${locale} ..."
        po2csv --progress none locale/$locale/new-messages.po > locale/$locale/new-messages.csv
        checkForSuccess "convert po files to csv"

        echo "Fixing line breaks in PO file for ${locale}..."
        csv2po --progress none locale/$locale/new-messages.csv > locale/$locale/new-messages.po
        checkForSuccess "convert csv files back to po to normalize line breaks"
    done

    echo "Please send files locale/*/new-messages.csv or locale/*/new-messages.po for translation"
}


build_changed() {
    for locale in "${locales[@]}"
    do
        echo "Converting CSV to PO files for ${locale} ..."
        csv2po --progress none locale/$locale/new-messages.csv locale/$locale/new-messages.po
        checkForSuccess "convert csv files to po"

        echo "Merging new translations into existing message file for ${locale} ..."
        msgcat locale/$locale/messages.po locale/$locale/new-messages.po > locale/$locale/merged-messages.po
        checkForSuccess "merging new translations into po files"

        cp locale/$locale/messages.po locale/$locale/messages.po.backup
        cp locale/$locale/merged-messages.po locale/$locale/messages.po
    done

    echo "Converting PO files to Javascript ..."
    yarn build-strings
    checkForSuccess "yarn build-strings"

    echo "Building the app ..."
    yarn cbt
    checkForSuccess "yarn cbt"
}


normalize_line_breaks(){
    for locale in "${locales[@]}"
    do
        echo "Converting PO files to CSV for ${locale}..."
        po2csv --progress none locale/$locale/messages.po > /tmp/messages-$locale.csv
        checkForSuccess "convert po files to csv"

        echo "Fixing line breaks in PO file for ${locale}..."
        csv2po --progress none /tmp/messages-$locale.csv > locale/$locale/messages.po
        checkForSuccess "convert csv files back to po to normalize line breaks"
    done
}


clean() {
    rm -f locale/*/messages.csv
    rm -f locale/*/new-messages.*
    rm -f locale/*/merged-messages.po
    rm -f locale/*/*.backup
    rm -f locale/*/*.po
    rm -f locale/*/*.pot
}


create_ui_strings_directory() {
    echo "Creating ui-strings directory"
    mkdir "$UI_STRINGS_DIRECTORY"
    checkForSuccess "create tmp ui-strings directory for ui-strings PO files"

    echo "cloning ui-strings repository"
    (cd "$UI_STRINGS_DIRECTORY" && git clone git@github.com:tomy-pg/ui-strings.git)
    checkForSuccess "clone ui-strings repository"
}


check_out_ui_strings_by_tag() {
    if [ "$VERSION" ]; then
        echo
        echo "Checking out ui-strings with tag ${VERSION}"
        echo
        (cd "$UI_STRINGS_DIRECTORY/ui-strings" && git fetch --tags)
        checkForSuccess "fetch tags for ui-strings"

        (cd "$UI_STRINGS_DIRECTORY/ui-strings" && git checkout "tags/$VERSION" -b "appRelease/$VERSION")
        checkForSuccess "check out tag for ui-strings"
    else
        echo "Using newest version of translation strings"
        echo
    fi
}
   

combine_po_files() {
    echo 
    for locale in "${locales[@]}"
    do
        echo "combine files for ${locale}"
        concat_translation_files $locale
    done
    
    echo "combine en files"
    concat_en_source_files
}

help() {
    echo "$0 --extract-all        Extract all strings from source code to PO and CSV files, leaving out no longer used strings"
    echo "$0 --build-all          Import all strings from CSV files and build the app"
    echo "$0 --extract-changed    Extract just the changed strings from source code to PO and CSV files"
    echo "$0 --build-changed      Import just the changed strings from CSV files and build the app"
    echo "$0 --normalize          Normalize line breaks in PO files to minimize diffs"
    echo "$0 --clean              Remove temporary files"
    echo "$0 --combine-pos        Combine PO Files - Mandatory arguments: path to location of client locale directory and path to directory to clone ui-strings repository"  
    echo

    for locale in "${locales[@]}"
    do
        echo "Supports locale ${locale}"
    done
}

concat_translation_files() {
    locale=$1
    msgcat $UI_STRINGS_DIRECTORY/ui-strings/*/$locale/*.po > $CLIENT_LOCALE_LOCATION/$locale/messages.po
}
concat_en_source_files() {
    msgcat $UI_STRINGS_DIRECTORY/ui-strings/*/*.pot > $CLIENT_LOCALE_LOCATION/en/messages.po
}


if [ "$1" == "--extract-all" ]; then
    extract_all

elif [ "$1" == "--build-all" ]; then
    build_all

elif [ "$1" == "--extract-changed" ]; then
    extract_changed

elif [ "$1" == "--build-changed" ]; then
    build_changed

elif [ "$1" == "--normalize" ]; then
    normalize_line_breaks

elif [ "$1" == "--clean" ]; then
    clean

elif [ "$1" == "--combine-pos" ]; then 
    validate_command_line
    create_ui_strings_directory
    check_out_ui_strings_by_tag
    combine_po_files 

else
    help
fi

