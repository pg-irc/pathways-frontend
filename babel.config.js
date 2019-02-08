module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            'babel-preset-expo',
            '@lingui/babel-preset-react',
            'module:react-native-dotenv'
        ],
    };
};
