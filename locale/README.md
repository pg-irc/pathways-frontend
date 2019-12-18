## Internationalization (i18n)

We are using [jsLingui](https://github.com/lingui/js-lingui) and [Weblate](https://weblate.org) for translation and internationalization. We translate strings through our own Weblate application here: [translate.peacegeeks.org](https://translate.peacegeeks.org). The source strings for Arrival Advisor, as well as information on how we integrate Weblate into our workflow can be found here: [https://github.com/pg-irc/ui-strings](https://github.com/pg-irc/ui-strings). 

## Weblate Usage:

Our Weblate instance needs to be manually started before usage. To do this, individuals with access to PeaceGeeks' Amazon Web Services must navigate to our EC2 instance on 
the Canada Central server titled `translate.peacegeeks.org` to change the instance state from Stopped to Start. 

## Extracting app strings into .po files:

All app strings that are found within `<Trans>` tags will be extracted into a `messages.po` file for each locale by running: 

`yarn extract-strings-clean` 

This command will extract app strings as well as remove strings that are no longer is use in the app from the `messages.po` file.
It will also show you the total number of strings that are in the app as well as the total number of strings that need translation. 

## Translation Process

Translating strings and then importing them for use in the app is a multi-step process which entails: 

- extracting app strings and creating a file named `jsx_strings.pot` created from the English messages.po file 
- add `jsx_strings.pot` file to ui-strings repository 
- start weblate instance 
- translate using weblate
- push to ui-strings repository 
- release process 

### 1. Create jsx_strings.pot:

A .pot file is the source file where strings are translated from. 
Make a copy of the file `locale/en/messages.po` titled `jsx_strings.pot`. 

### 2. Move to ui-strings repository: 

The ui-strings repository is integrated into our Weblate instance which uses the `translate` branch. 
With the `jsx_strings.pot` file, create a branch from the `translate` branch and add the file to the directory `jsx_strings`. 

### 3. Start Weblate:

If you have access, start the Weblate EC2 instance on AWS or ask someone who does. 

### 4. Pull changes into Weblate:

Upon logging in, navigate to the UI-strings project on Weblate. Within this page navigate to `Manage > Repository Maintenance` and click on `Pull`. 
This will pull strings from the `jsx_strings.pot` file that needs to be translated. 

### 5. Translate:

In the UI-strings project, you should be able to navigate through each locale and begin translation. 

### 6. Push changes to ui-strings repository:

Once translation have been made, navigate back to `Manage > Repository Maintenance` and click on `Commit` and `Push`.

These actions will push the changes to the `translate` branch on the ui-strings repository. 

### 7. Merge into master branch:

During the import of the translated strings to our app, we use the ui-string's repositories `master` branch. 
Using the `master` branch allows us to do another round of review before we pull in changes into the app. 

On the ui-strings repository, change the branch from `translate` to `master`. Open up a new PR from `translate` and merge the changes. The `translate` branch does not automatically create a PR for you on `master`

### 8. Import localized strings into the app:

Localized strings are imported into our app as part of the release process. By running `./bin/prepare_deploy` the translated app strings from the `master` branch of the ui-strings repository will be imported into the app. 

### Optional:  

To update the in app translations without the release process: 

1. `git clone git@github.com:pg-irc/ui-strings.git` to retrieve the translated strings. This is the source of truth for all strings translated using Weblate.  

2. `cd pathways-frontend` and run `./bin/strings --combine-pos`. This command expects the `../ui-strings` directory from step 1 to exist and will not work without it. Once this command is run, a messages.po file will be generated for each locale. Each of these files contain pairs of English source strings and their translated versions. 

3. `yarn build-strings` to generate compiled versions of the messages.po files.