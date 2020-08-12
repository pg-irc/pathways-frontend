#!/bin/bash -e

echo ./*RECOMMENDATIONS.png

for dir in android 'ios 5.5' 'ios 6.5'
do
  rm -f ./"$dir"/*/*_framed.png
  rm -f ./"$dir"/*/*.strings

  rm -f ./"$dir"/*_framed.png
  rm -f ./"$dir"/*.json

  rm -f ./"$dir"/background.png

  rm -rf ./"$dir"/fonts
#   for d in ./"$dir"/* ; do
#     echo "$d"
#     cp ./*RECOMMENDATIONS.png ./"$d"/"RECOMMENDATIONS.png"
#   done
done
