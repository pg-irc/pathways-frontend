module.exports = function (api) {
    api.cache(true);
    return {
        plugins: ["macros"],
        presets: [
            'babel-preset-expo',
            '@lingui/babel-preset-react',
            'module:react-native-dotenv'
        ],
    };
};
