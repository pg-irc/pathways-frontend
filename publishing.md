### React Native (RN)

The `react-native-cli` includes Facebook's "Metro Bundler"; a custom javascript bundler responsible for compiling & bundling your javascript for deployment in a RN application.

When you compile/build an platform binary for _development_ (eg: `react-native start` or `react-native run-[ios|android]`), a couple of things happen (this is not a exhaustive list):

- Metro Bundler is used to compile a javascript bundle (optionally, the bundler can watch the filesystem for changes and re-compile the javascript if there are any changes detected).
- All assets (images, fonts, etc) are collected
- A local server is started. It listens for connections from RN apps and serves the latest javascript bundle and any other assets required.

Once the native binary is deployed and run on a device (or emulator/simulator), it kicks off execution by making a request to the local server for the javascript bundle and assets and then runs your application.

_Production_ builds function in essentially the same way except that the Javascript bundle goes through an extra step where the debug features (source-maps, etc) are removed and the source code is minified/obfuscated. The resulting bundle is then embedded into the production binary and deployed to the device so that when run, it is loaded from the device and not via the development server.


### Expo

Expo follows a very similar process to RN (it wraps `react-native-cli`, Metro Bundler, the local dev server, etc) but adds some more infrastructure and steps to the system.

The Expo Client (aka ExpoKit) does several things (not an exhaustive list):

- Provides a bunch of native components and APIs and exposes them to the RN javascript environment (this is the Expo SDK).
- Replaces/Wraps the RN runtime with the Expo runtime

The Expo runtime functions very similarly to the RN runtime described above except that it is configured to [always*](https://docs.expo.io/versions/latest/guides/offline-support.html#bundle-your-assets-inside-your-standalone-binary) look for the compiled javascript bundle & other assets via a external URL. This URL either points to a local dev server (similar to RN's dev server) for _development_ or to a storage bucket on Amazon Web Services (AWS) or Google Cloud Platform (GCP) for _production_ releases.

_The main benefit of this is that it makes it possible to release (javascript) application updates without having to go through either platform's app store._

Publishing an Expo bundle is done with the `exp publish` command. This will create a production bundle of your javascript (minified/obfuscated, just like RN) and all of your assets and upload it to AWS or GCP. It will then return a url which can be used to load your application into _any device running the Expo application_.

If you want to make your own "standalone build", you can use the `exp build-[android|ios]` command. This will run `exp publish` and push a javascript bundle + assets to AWS/GCP and also create a native binary with the resulting Expo url embedded.

**There is very little difference between running a production bundle of your application via the Expo app vs running it in a standalone build (besides the native "app shell" it's running in).**


### Changes we need to make

With all that said, there's some changes that need to be made to streamline and fix the publishing process described above:
 
- Include `"assetBundlePatterns"` in app.json. By default Expo doesn't include static assets in compiled/standalone binaries. More info here: https://docs.expo.io/versions/latest/guides/offline-support.html#bundle-your-assets-inside-your-standalone-binary
- Take ownership of static assets; move into an "assets" directory.
- Fix error resulting from javascript minification; React Native's "Metro" bundler performs a "minification" step when producing a production build where all/most symbols (variable, class and function/method names) get replaced with single characters. There seems to be a bug where the 'props' component/function parameter doeesn't survive this.
- Fix usage of jsLingui's `<Trans>` component; only string-literals and other components should be passed as children of this component, no variables.

**The steps to determine what assets are missing are:**

1. Disable network connectivity on device (Airplane mode, disable WiFi, etc)
2. Deploying the app to a device
3. Open application while network is disabled.
4. Navigate around and make note of any missing icons, images, etc...

**Here's an example of the command I used to generate a IPA binary for iOS:**
```
exp bi -t archive -team-id <id> --provisioning-profile-path ./publish/PeaceGeeks_Arrival_Advisor.mobileprovision --dist-p12-path ./publish/Certificates.p12 --push-p12-path ./publish/Push_Certificates.p12
```

Note that the two `*.p12` files are created with my personal private keys. However the certificate that is bundled in the `*.mobileprovision` file is an organization certificate. You are also part of the organization so you *should* be able to use your own private keys with the certificate to create a signed release.

In the long run, I think it would be best if we had a set of authorized keys (pub/priv) for the team/project instead of using personal keys.
