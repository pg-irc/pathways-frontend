# Pathways frontend

This repository contains the client for providing access to data about services for refugees and immigrants to BC.

The client is implemented in react-native, using expo, redux, react-router-native, native-base and lingui.

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

Retrieve the `google-services.json` file from Arrival Advisor's Firebase project and add it to the root directory.

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

## Entities

These are the entities of the client side data model:

![Entities](ENTITIES.png)

## Contributing

If you want to help out, get in touch at info@arrivaladvisor.ca.

### Commit messages

All commits are labelled with the issue they are being done under. This ensures that we don't do work that is not tracked, and history of why every change is made is maintained. Most front end and back end work is tracked by issues in their respective repositories, in which case the commit message should start with "Issue #N", e.g. "Issue #13". Occasionally, front end work may be tracked under backend issues, in which case each commits message should start with "Issue pg-irc/pathways-backend#13".

## Versioning

* Client and server are versioned independently.
* Client specifies the minimum server version required for proper client operation.
* We use [semantic versioning](https://semver.org/) of the form X.Y.Z.
* We start with version 1.0.0 for client and server.
* Version strings in server and client are updated on the release branch as part of the release process. When the release is done (QA passed and show stopper bugs fixed in the release branch), the release branch is merged into both develop and master, thereby updating the version strings in those branches.
* For client version string X.Y.Z, X is 1, Y is incremented on each release, and Z is incremented for hot fixes only, which we have not needed to do yet.
* For the server, X is 1 and is updated on API changes that makes old clients incompatible with the new API, Y is updated on API changes that are not incompatible, and Z is updated each release.
* Versions are stored as git tags in each git repo (client and server).
* On the server side, the version is stored in VERSION.txt.
* On the client side, the version is stored in VERSION.txt and several other files, with unit tests making sure that all version strings are the same.
* Client About screen shows the version of the client and server.

## Expo SDK updates

This is a managed Expo application so we should let Expo update its dependencies before we apply non Expo updates. Always reference: https://docs.expo.io/versions/latest/workflow/upgrading-expo-sdk-walkthrough/ prior to performing an update. This is the approach we've been using:

1. Update the Expo CLI: `$ npm install -g expo-cli`

2. Install the newest Expo SDK: `$ expo update {EXPO_SDK_VERSION}`

3. Test and fix any breakage due to Expo updates

## Non Expo package updates

It's suggested you first apply [Expo SDK updates](#expo-sdk-updates) then non Expo updates. Once you feel you're not going to compromise any of Expo's dependencies run:

1. `yarn outdated` and review available upgrades

2. `yarn upgrade {package-name}`to upgrade specific packages

## Changelog

Changes that are made in each release are tracked following [Expo's](https://github.com/expo/expo/blob/master/CHANGELOG.md) procedure.


* changelog is updated with every PR that affects functionality.
* a new heading is added to the changelog as part of every PR that bumps version strings.

## Big Thanks

Cross-browser Testing Platform and Open Source <3 Provided by [Sauce Labs][SauceLabsURL]

[SauceLabsURL]: https://saucelabs.com
