module.exports = {
    "stories": [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/preset-create-react-app",
    ],
    webpackFinal: config => {
        config.module.rules = config.module.rules.map(rule => {
            if (
                String(rule.test) === String(/\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/)
            ) {
                return {
                    ...rule,
                    test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
                }
            }

            return rule
        })
        config.module.rules.push(
            {
                test: /\.(js|jsx)$/,
                loader: require.resolve('babel-loader'),
                options: {
                    cacheDirectory: true,
                    presets: [require.resolve('@emotion/babel-preset-css-prop')],
                },
            },
            {
                test: /\.(svg)(\?.*)?$/,
                use: ["@svgr/webpack"],
            },
        );
        return config;
    }
}