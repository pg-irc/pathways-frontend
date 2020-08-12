# frame_screens.js

*frame_screens.js* is a simple script that is designed to generate preview images for Arrival Advisor. Use the command `node frame_screens.js` to run the program.

## Prerequisite

Please make sure that `fastlane` is installed on your machine before running the script. Refer to this doc for the installation instruction: [https://docs.fastlane.tools/](https://docs.fastlane.tools/)

## Configuration

The script reads a `config.json`  that contains information on how the preview images will be generated. The json file is defined with the following attributes:

|key| description |
|--|--|
| background | The background that should be used for the framed screenshot. Specify the (relative) path to the image file (e.g. `*.jpg`). This parameter is mandatory.  |
| color | The font color for the text. Specify a hex/html color code.  |
| font_size | The font size for the text specified in points. If not specified or `0`, font will be scaled automatically to fit the available space. _frameit_ still shrinks the text, if it would not fit.  |
| padding | The content of the framed screenshot will be resized to match the specified `padding` around all edges. The vertical padding is also applied between the text and the top or bottom (depending on `title_below_image`) of the device frame. There are 3 different options of specifying the padding: <br><br> 1. Default: An integer value that defines both horizontal and vertical padding in pixels. <br><br>  2. A string that defines (different) padding values in pixels for horizontal and vertical padding. The syntax is  `"<horizontal>x<vertical>"`, e.g.  `"30x60"`. <br><br> 3. A string that defines (different) padding values in percentage for horizontal and vertical padding. The syntax is  `"<horizontal>%x<vertical>%"`, e.g.  `"5%x10%"`.  <br><br> **Note:**  The percentage is calculated from the smallest image dimension (height or width). A combination of option 2 and 3 is possible, e.g.  `"5%x40"`. |
| fonts | An object that specifies the fonts to be used for each language. Each entry is keyed by the `language` and the value is a string that represents the file name of the font. The font specified should be inside the `fonts` folder. e.g. <br><br> `{ 'en': 'Segoe-UI.ttf', 'ar': 'Amiri-Regular.ttf' }`  |
|frame|An object that specifies the device frames that will be used for each platform. The keys for this object are: `android`, `ios 5.5`, `ios 6.5`. Possible values for each platform: <br><br> `android`: Huawei P8, Motorola Moto E, Motorola Moto G, Nexus 4, Nexus 5X, Nexus 6P, Nexus 9, Samsung Galaxy Grand Prime, Samsung Galaxy Note 5, Samsung Galaxy S Duos, Samsung Galaxy S3, Samsung Galaxy S5,  Samsung Galaxy S7, Samsung Galaxy S8, Samsung Galaxy S9, Google Pixel 3, Google Pixel 3 XL, HTC One A9, HTC One M8 <br><br> `ios`: iPhone 5s, iPhone 5c, iPhone SE, iPhone 6s, iPhone 6s Plus, iPhone 7, iPhone 7 Plus, iPhone 8, iPhone 8 Plus, iPhone X, iPhone XS, iPhone XR, iPhone XS Max
|screenshots|An array of objects that contains the information on how an image will be used for the previews. See below table that describes the properties of a screenshot entry.|

## **Screenshot entry definition**

| key |description  |
|--|--|
| key | A mandatory entry to link the individual configuration to the screenshot, based on part of the file name. <br>Example:<br>If a screenshot is named `iPhone 8-Brainstorming.png`, you can use value `Brainstorming` for `key`. If there are more than one `key` matching an entry, they will all be applied in order (which means that the last one has the highest precedence). All other keys from that array element will only be applied on this specific screenshot.|
|show_complete_frame|Specifies whether _frameit_ should shrink the device frame so that it is completely shown in the framed screenshot. If it is false, clipping of the device frame might occur at the bottom (when `title_below_image` is `false`) or top (when `title_below_image` is `true`) of the framed screenshot.|
|has_title|An optional entry that indicates if the preview should be generated with a title.|
|title_below_image|Specifies whether _frameit_ should place the title below the device frame. If it is false, it will be placed above the device frame. Default value is `false`.|

## Folder Structure

The tree structure below is an example directory to successfully generate the screenshots. The string files should reside in the same directory with `frame_screens.js` and `config.json` .

The `fonts` folder contains the font files that will be used for the preview images.

As you can tell, the different images for each platform are defined by the `android`, `ios 5.5` and `ios 6.5` folders. Inside each platform directory are the different language directories (e.g. `en`, `ar` )  to differentiate the language specific screenshots. The script will not generate a preview image for the language directory if no matching `strings` file is found in the root directory.
```
.
+-- frame_screens.js
+-- config.json
+-- background.png
+-- en.strings
+-- ar.strings
+-- android
|   +-- en
|   |   +-- Android - English - Welcome.png
|   |   +-- Android - English - Recommendation.png
|   +-- ar
|   |   +-- Android - Arabic - Welcome.png
|   |   +-- Android - Arabic - Recommendation.png
+-- ios 5.5
|   +-- en
|   |   +-- Ios 5.5 - English - Welcome.png
|   |   +-- Ios 5.5 - English - Recommendation.png
|   +-- ar
|   |   +-- Ios 5.5 - Arabic - Welcome.png
|   |   +-- Ios 5.5 - Arabic - Recommendation.png
+-- ios 6.5
|   +-- en
|   |   +-- Ios 6.5 - English - Welcome.png
|   |   +-- Ios 6.5 - English - Recommendation.png
|   +-- ar
|   |   +-- Ios 6.5 - Arabic - Welcome.png
|   |   +-- Ios 6.5 - Arabic - Recommendation.png
+-- fonts
|   +--Segoe-Ui.ttf
|   +--Amiri-Regular.ttf
```

## Title
The `strings` files are where the localized titles are defined. The filename of a  `strings` file should match the language directory name. For example, the `android/ko/` folder will use the `ko.strings` for the titles.

The script will not generate preview images for a language directory if there are no matching `strings` file found.

## Notes
 - Generating `strings` file is a bit challenging so we may just want to consider using an app like: [https://poeditor.com/projects/](https://poeditor.com/projects/)
 - *frameit* does not automatically apply line breaks on titles. To apply multi-line titles, a newline character `\n` is needed for each title entry inside the `strings.file`.  `frameit` will squeeze the title into one line if no newline character is found. It will also possibly shrink the text depending on the padding.

 For example:
```
"RECOMMENDATIONS" = "Get recommendations\n based on your situation";
"OPTIONAL" = "Optional questions to find\nyour most relevant information";
"FIND" = "Find helpful\n services nearby";
"KEEP" = "Keep track of what\n you need to do next";
```
