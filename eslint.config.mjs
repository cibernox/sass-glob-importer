import babelParser from "@babel/eslint-parser";

export default [{
    languageOptions: {
        parser: babelParser,
        ecmaVersion: 2022,
        sourceType: "module",

        parserOptions: {
            requireConfigFile: false,
        },
    },
}];