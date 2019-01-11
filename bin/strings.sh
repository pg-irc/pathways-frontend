#!/bin/bash

locales=(ar fr)


extract_all() {
    echo "Building the client ..."
    yarn build

    echo "Generating PO files..."
    yarn extract-strings

    for locale in "${locales[@]}"
    do
        echo "Converting PO files to CVS for ${locale}..."
        po2csv locale/$locale/messages.po > locale/$locale/messages.csv
    done

    echo "Please send files locale/*/messages.csv or locale/*/messages.po for translation"
}


build_all() {
    for locale in "${locales[@]}"
    do
        echo "Converting CVS to PO files for ${locale}..."
        csv2po locale/$locale/messages.csv locale/$locale/messages.po
    done

    echo "Converting PO files to Javascript..."
    yarn build-strings

    echo "Building the app..."
    yarn cbt
}


extract_changed() {
    echo "Building the client ..."
    yarn build

    echo "Generating PO files..."
    yarn extract-strings

    # TODO Fix string wrapping

    for locale in "${locales[@]}"
    do
        echo "Filtering PO files for strings needing translation ${locale}..."
        # Use msggrep to get the strings needing translation
        #   -v invert the result
        #   -T match msgstr entries, i.e. the translated strings
        #   -e match using regular expression
        #   "." match strings with at least one character (inverted with -v to mean match empty strings)
        # TODO remove the -i
        msggrep -v -T -i -e "." locale/$locale/messages.po > locale/$locale/new-messages.po

        echo "Converting PO files to CVS for ${locale}..."
        po2csv locale/$locale/new-messages.po > locale/$locale/new-messages.csv
    done

    echo "Please send files locale/*/new-messages.csv or locale/*/new-messages.po for translation"
}

build_changed() {
    for locale in "${locales[@]}"
    do
        echo "Converting CVS to PO files for ${locale}..."
        csv2po locale/$locale/new-messages.csv locale/$locale/new-messages.po

        echo "Merging new translations into existing message file for ${locale}..."
        msgcat locale/$locale/messages.po locale/$locale/new-messages.po > locale/$locale/merged-messages.po
        cp locale/$locale/messages.po locale/$locale/messages.po.backup
        cp locale/$locale/merged-messages.po locale/$locale/messages.po
    done

    echo "Converting PO files to Javascript..."
    yarn build-strings

    echo "Building the app..."
    yarn cbt
}

# translate

#strings.sh --build-changed

# Convert CVS files back to po files with "csv2po locale/fr/messages.csv locale/fr/messages.po"
# Combine old and new translations with "msgcat locale/ar/messages.po locale/ar/new-messages.po > locale/ar/joined-messages.po"
# Rename new files to replace the old po files
# Clean up temp files

clean() {
    rm locale/*/new-messages.* locale/*/merged-messages.po locale/*/*.
}

help() {
    echo "Help"
}

if [ "$1" == "--extract-all" ]; then
    extract_all

elif [ "$1" == "--build-all" ]; then
    build_all

elif [ "$1" == "--extract-changed" ]; then
    extract_changed

elif [ "$1" == "--build-changed" ]; then
    build_changed

else
    help
fi
