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

Build and start Expo to run the app in a simulator or on an actual Android or Apple device:

```
yarn start [--reset-cache]
```

To clear out cached values from `.env`, use `--reset-cache`.

## Internationalization (i18n)

We are using [jsLingui](https://github.com/lingui/js-lingui) for translation and internationalization (date formats and such) support. Use the following commands to mainpulate strings for translation.

To add a new locale, this generates an empty messages catalog for the new locale:

```
yarn lingui add-locale [locales...]
```

Also, update `bin/strings.sh` with the new locale.

To export strings for translation and importing the strings after translation, use the script `bin/strings.sh`. Files are exported as both po and comma separated values (CSV, i.e. spreadsheets), and imported from CSV only. The scripts supports both bulk translation of all strings, and incremental translation of strings that have no translation currently.

To remove cached strings, this is usually needed when switching between branches:

```
yarn clean-strings
```
## Contributing

If you want to help out, get in touch at dev@peacegeeks.org.

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
* TODO: On the server side, the version is stored in VERSION.txt.
* On the client side, the version is stored in VERSION.txt and several other files, with unit tests making sure that all version strings are the same.
* Client About screen shows the version of the client.

## Big Thanks

Cross-browser Testing Platform and Open Source <3 Provided by [Sauce Labs][SauceLabsURL]

[SauceLabsURL]: https://saucelabs.com
