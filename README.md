# Pathways frontend

This repository contains the client for providing access to data about services for refugees and immigrants to BC.

The client is implemented in react-native, using create-react-native-app, redux, redux-first-router, native-base and lingui.

# Getting started

## Initial setup and build

With a fresh repository, this will get the application compiled and running on Expo:

Install dependencies

```
yarn install
```

Copy example configuration file and modify accordingly (set your own API host, Sentry auth token etc).
```
cp .env.example .env
```

Compile TypeScript, optionally watch source files for changes and build them automatically

```
yarn build [--watch]
```

Run tests, optionally watch source files for changes and run the tests automatically

```
yarn test [--watch]
```

Build and start Expo to run the app in a simulator or on an actual Android or Apple device, optionally clear cache

```
yarn start [-c]
```

To clear out cached values from `.env`, use `--reset-cache`.

## Internationalization (i18n)

We are using [jsLingui](https://github.com/lingui/js-lingui) and [Weblate](https://weblate.org) for translation and internationalization. The source strings for Arrival Advisor can be found here: [https://github.com/tomy-pg/ui-strings](https://github.com/tomy-pg/ui-strings) and we translate these strings here: [translate.peacegeeks.org](https://translate.peacegeeks.org).

Use the following commands to add the most recent translations locally. 

Ensure that the [ui-strings](https://github.com/tomy-pg/ui-strings) repository is cloned as this the where the translations are retrieved. 

```
git clone git@github.com:tomy-pg/ui-strings.git
```

This command generates a messages.po file for each locale from the ui-strings repository. 

```
./bin/strings --combine-pos 
```

To generate the compiled source catalogs Lingui uses for internationalization. 

```
yarn build-strings
```

## Contributing

If you want to help out, get in touch at info@arrivaladvisor.ca.

### Commit messages

All commits are labelled with the issue they are being done under. This ensures that we don't do work that is not tracked, and history of why every change is made is maintained. Most front end and back end work is tracked by issues in their respective repositories, in which case the commit message should start with "Issue #N", e.g. "Issue #13". Occasionally, front end work may be tracked under backend issues, in which case each commits message should start with "Issue pg-irc/pathways-backend#13".

## Versioning

* Client and server are versioned independently.
* Client specifies the minimum server version required for proper client operation.
* We use [semantic versioning](https://semver.org/) of the form X.Y.Z.
* We start with version 1.0.0 for client and server.
* The version string of the client or server is done in the same pull request that contains the changes that require the version to change.
* We bump the Z each sprint, except for sprints where no changes went in. We also bump Z for any hotfixes that may go in independenty of the sprint cadence.
* We bump the Y when we add features that are backwards compatible as per semantic versioning.
* We bump the X when we add features that are backwards incompatible, i.e. when the client would fail to operate correctly with an older server version, as per [semantic versioning](https://semver.org/).
* Versions are stored as git tags in each git repo (client and server).
* On the server side, the version is stored in VERSION.txt.
* On the client side, the version is stored in VERSION.txt and several other files, with unit tests making sure that all version strings are the same.
* Client About screen shows the version of the client.

## Changelog

Changes that are made in each release are tracked following [Expo's](https://github.com/expo/expo/blob/master/CHANGELOG.md) procedure. 


* changelog is updated with every PR that affects functionality.
* a new heading is added to the changelog as part of every PR that bumps version strings.

## Big Thanks

Cross-browser Testing Platform and Open Source <3 Provided by [Sauce Labs][SauceLabsURL]

[SauceLabsURL]: https://saucelabs.com
