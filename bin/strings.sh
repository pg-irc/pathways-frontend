#!/bin/bash

# Full translate sweep
################################################

#strings.sh --extract

# Generate PO files from source code: yarn extract-strings
# Convert po files to csv:  po2csv locale/fr/messages.po > locale/fr/messages.csv

# locales[0] = "ar"
# locales[1] = "fr"

locales=(ar fr)

extract_all() {
    yarn build
    yarn extract-strings

    for locale in "${locales[@]}"
    do
        echo "Converting to CVS for ${locale}"
        po2csv locale/$locale/messages.po > locale/$locale/messages.csv
    done
}

# translate

#strings.sh --build

# Convert CSV back to po files: csv2po locale/fr/messages.csv locale/fr/messages.po
# Build strings files from po files with "yarn build-strings"

build() {
    for locale in "${locales[@]}"
    do
        echo "Converting from CVS for ${locale}"
        csv2po locale/$locale/messages.csv locale/$locale/messages.po
    done

    yarn build-strings
}

# Update existing translation
################################################

#strings.sh --extract-changed

# Extract strings again, using "yarn extract-strings". 
# > Now would be a good time for a no-op gettext transform to fix line wrap issues
# Extract changed strings with "msggrep -v -T -i -e "." locale/fr/messages.po > locale/fr/new-messages.po"
# Convert new strings to CSV with "po2csv locale/fr/messages.po > locale/fr/messages.csv"

# translate

#strings.sh --build-changed

# Convert CVS files back to po files with "csv2po locale/fr/messages.csv locale/fr/messages.po"
# Combine old and new translations with "msgcat locale/ar/messages.po locale/ar/new-messages.po > locale/ar/joined-messages.po"
# Rename new files to replace the old po files
# Clean up temp files

if [ "$1" == "--extract" ]; then
    extract_all
elif [ "$1" == "--build" ]; then
    build
fi
