// Borrowed type definition from https://github.com/expo/sentry-expo/issues/24.
declare module "sentry-expo" {
    import Sentry from "react-native-sentry";
    class SentryExpo extends Sentry {
        static enableInExpoDevelopment: boolean;
    }
    export default SentryExpo;
}