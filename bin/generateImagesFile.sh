#!/bin/sh

echo "export const images: any = {"
for f in $@; do
    filename=$(basename $f .png)
    echo "\t'$filename' : require('$f'),"
done
echo "};"
