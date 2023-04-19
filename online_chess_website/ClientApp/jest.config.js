module.exports = {
    transform: {
        '^.+\\.(ts|tsx|js)$': 'babel-jest',
    },
    testEnvironment: 'jsdom',
    testRegex: '/__tests__/.*\\.(test|spec)?\\.(ts|tsx|js)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        "\\.(css|scss|jpg|png)$": "<rootDir>/src/empty_file.js",
        "http_calls.ts": "<rootDir>/src/empty_file.js"
    },
    transformIgnorePatterns: [
        "<rootDir>/api/http_calls.ts"
    ],
};