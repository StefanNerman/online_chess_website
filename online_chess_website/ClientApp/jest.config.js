module.exports = {
    transform: {
        '^.+\\.(ts|tsx|js)$': 'babel-jest',
    },
    testEnvironment: 'node',
    testRegex: '/__tests__/.*\\.(test|spec)?\\.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        "\\.(css|scss|jpg|png)$": "identity-obj-proxy",
    },
    transformIgnorePatterns: [
        "/api"
    ],
};