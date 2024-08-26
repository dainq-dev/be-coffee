module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
    },
    plugins: ["@typescript-eslint/eslint-plugin"],
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: [".eslintrc.js"],
    rules: {
        indent: "off",
        "no-multi-spaces": "off",
        "space-in-parens": "off",
        "space-before-function-paren": "off",
        "@typescript-eslint/indent": ["error", 4],
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/member-delimiter-style": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "prettier/prettier": [
            "error",
            { endOfLine: "auto", useTabs: false, tabWidth: 4, parser: "flow" },
        ],
        "@typescript-eslint/naming-convention": [
            "error",
            { selector: "interface", format: ["PascalCase"], prefix: ["I"] },
        ],
        "@typescript-eslint/explicit-function-return-type": [
            "error",
            {
                allowExpressions: true,
                allowTypedFunctionExpressions: true,
                allowHigherOrderFunctions: true,
            },
        ],
    },
}
