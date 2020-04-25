module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "parser": "babel-eslint",
    //"extends": "airbnb",
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        //"plugin:react-redux/recommended",
        //"airbnb"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        //"react-redux"
    ],
    "rules": {
        "no-unused-vars": 2,
        //"react-redux/connect-prefer-named-arguments": 2,
        "no-irregular-whitespace": 2,
        "no-multi-spaces": 2,
        "no-trailing-spaces": 2,
        "key-spacing": [2, { "beforeColon": false, "afterColon": true }]
    }
};
