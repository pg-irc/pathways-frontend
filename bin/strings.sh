#!/bin/bash

locales=(ar fr ko pa tl zh_CN zh_TW)
CLIENT_LOCALE_LOCATION=locale/
UI_STRINGS_DIRECTORY="../ui-strings"

checkForSuccess () {
    if [ "$?" != "0" ]
    then
        echo "failed to $1"
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


concat_translation_files() {
    locale=$1
    echo "concat ${locale} files"
    path_to_jsx_strings_files=$UI_STRINGS_DIRECTORY/jsx_strings/$locale/jsx_strings.po
    path_to_questionnaire_files=$UI_STRINGS_DIRECTORY/questionnaire/$locale/questionnaire.po
    path_to_explore_files=$UI_STRINGS_DIRECTORY/explore/$locale/explore.po
   
    msgcat $path_to_jsx_strings_files $path_to_questionnaire_files $path_to_explore_files > $CLIENT_LOCALE_LOCATION/$locale/messages.po
}


concat_en_source_files() {
    msgcat $UI_STRINGS_DIRECTORY/*/jsx_strings.pot $UI_STRINGS_DIRECTORY/*/questionnaire.pot $UI_STRINGS_DIRECTORY/*/explore.pot  > $CLIENT_LOCALE_LOCATION/en/messages.po
}


validate_messages_po_files() {
    echo
    for locale in "${locales[@]}"
    do
        echo "checking if ${locale} messages.po requires editing"
        check_for_fuzzy_attribute $locale
    done
}


check_for_fuzzy_attribute() {
    locale=$1
    messages_po_file=$CLIENT_LOCALE_LOCATION/$locale/messages.po

    #fuzzy is an attribute that in most cases indicates that a PO file needs revision
    grep "fuzzy" $messages_po_file
    prompt_manual_steps_if_po_file_needs_editing $locale
}


prompt_manual_steps_if_po_file_needs_editing() {
    if [ "$?" != "0" ]
    then
        echo
        echo "Warning: the $1 messages.po file requires editing"
        echo 
        echo "Manual steps:"
        echo
        echo "review this file and remove duplicate strings that look like the following:"
        echo "#-#-#-#-#  jsx_strings.po (PACKAGE VERSION)  #-#-#-#-#\n"
        echo "J’ai un permis de conduire de la C.-B.\n"
        echo
        read -p "Press enter to continue"
    fi
}


help() {
    echo "$0 --extract-all        Extract all strings from source code to PO and CSV files, leaving out no longer used strings"
    echo "$0 --build-all          Import all strings from CSV files and build the app"
    echo "$0 --extract-changed    Extract just the changed strings from source code to PO and CSV files"
    echo "$0 --build-changed      Import just the changed strings from CSV files and build the app"
    echo "$0 --normalize          Normalize line breaks in PO files to minimize diffs"
    echo "$0 --clean              Remove temporary files"
    echo "$0 --combine-pos        Combine PO Files to prepare for deployment - Mandatory argument: path to directory which does not already exist to clone ui-strings repository"    
    echo

    for locale in "${locales[@]}"
    do
        echo "Supports locale ${locale}"
    done
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
    combine_po_files
    validate_messages_po_files
    
else
    help

fi