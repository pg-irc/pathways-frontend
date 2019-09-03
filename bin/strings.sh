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

extract() {

    check_for_messages_po_files 

    echo "Building the client ..."
    yarn build
    checkForSuccess "yarn build"

    echo "Generating PO files with clean to exclude questionnaire and explore strings ..."
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

        rm -f locale/$locale/messages.csv
        mv locale/$locale/messages.po locale/$locale/jsx_strings.po
    done

    echo "Please send files locale/*/messages.csv or locale/*/messages.po for translation"
}

check_for_messages_po_files() {
    echo "Checking if messages.po exists for each locale..."
    
    for locale in "${locales[@]}"
    do
        if [ ! -f locale/$locale/messages.po ]
        then 
            echo "messages.po must be present or else existing translations will be deleted"
            exit
        fi 
    done
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

copy_files_to_weblate_repository(){
    echo "Copy locale/en/jsx_strings.pot ---> ../ui-strings/jsx_strings/jsx_strings.pot"
    cp locale/en/jsx_strings.pot ../ui-strings/jsx_strings/jsx_strings.pot

    echo
    for locale in "${locales[@]}"
    do
        echo "Copy locale/$locale/jsx_strings.po ---> ../ui-strings/jsx_strings/$locale/jsx_strings.po"
        cp locale/$locale/jsx_strings.po ../ui-strings/jsx_strings/$locale/jsx_strings.po
    done
}

clean() {
    rm -f locale/*/messages.csv
    rm -f locale/*/new-messages.*
    rm -f locale/*/merged-messages.po
    rm -f locale/*/*.backup
    rm -f locale/*/messages.po
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
    echo "checking if the generated messages.po files contain duplicate strings"
    for locale in "${locales[@]}"
    do
        check_for_duplicate_string_pattern $locale
    done
}


check_for_duplicate_string_pattern() {
    locale=$1
    messages_po_file=$CLIENT_LOCALE_LOCATION/$locale/messages.po

    # '#-#-#-#' is the pattern generated when duplicated strings exist
    if [ "$locale" == "ar" ]; then 
        tail -n +49 $messages_po_file | grep "#-#-#-#"
        if [ "$?" == "0" ]; then 
            prompt_manual_steps $messages_po_file
        fi
    else
        tail -n +46 $messages_po_file | grep "#-#-#-#"
        if [ "$?" == "0" ]; then 
            prompt_manual_steps $messages_po_file
        fi
    fi
}


prompt_manual_steps() {
    echo
    echo "Warning: there are duplicate strings in $1"
    echo 
    echo "Manual steps:"
    echo
    echo " review this file and find the duplicate strings."
    echo "Duplicate strings are flagged using the following pattern:"
    echo "#-#-#-#-#  *.po (PACKAGE VERSION)  #-#-#-#-#\n"
    echo
    echo "After, locate and remove them in the .pot files in the ui-strings repository"
    echo "so that only one copy of the duplicate strings remains."
    read -p "Press enter to continue"
}


help() {
    echo "$0 --extract            Extract all strings from source code to PO and CSV files, leaving out no longer used strings"
    echo "$0 --normalize          Normalize line breaks in PO files to minimize diffs"
    echo "$0 --copy               Copy files to the Weblate repository, assumed to be located at ../ui-strings"
    echo "$0 --clean              Remove temporary files"
    echo "$0 --combine-pos        Combine PO Files to prepare for deployment - Mandatory argument: path to directory which does not already exist to clone ui-strings repository"
    echo

    for locale in "${locales[@]}"
    do
        echo "Supports locale ${locale}"
    done
}


if [ "$1" == "--extract" ]; then
    extract

elif [ "$1" == "--copy" ]; then
    copy_files_to_weblate_repository

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