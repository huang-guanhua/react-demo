module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        //"plugin:react/recommended"
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
        //"react"
    ],
    "rules": {
        "no-irregular-whitespace": 2,
        "no-multi-spaces": 2,
        "no-trailing-spaces": 2,
        "key-spacing": [2, { "beforeColon": false, "afterColon": true }]
    }
};
