# Getting started


## Initial setup and build

With a fresh repository, this will get the application compiled and running on Expo:

    // Install dependencies
    npm install
    // Compile TypeScript
    npm run tsc
    // Run tests
    npm run jest
    // Build & start Expo
    npm start
    // Follow instructions to open app in Expo


## Developing

In seperate processes you will want to run the following:

    // Watch filesystem and recompile TypeScript on changes
    npm run tsc -- --watch

    // Watch filesystem and rerun tests on changes
    npm run jest -- --watch

    // Watch filesystem and rebuild app / reload Expo on changes
    npm start
