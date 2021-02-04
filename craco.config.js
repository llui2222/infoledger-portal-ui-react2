module.exports = {
    jest: {
        configure: {
            reporters: ["jest-sonar-reporter"]
        }
    },
    eslint: {
        "extends": ["plugin:testing-library/react", "plugin:jest-dom/recommended"],
        "plugins": ["testing-library", "jest-dom"],
    },
};