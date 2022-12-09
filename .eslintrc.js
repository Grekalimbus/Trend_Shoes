module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ["plugin:react/recommended", "standard"],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        indent: [0, 4], // Отступ количество пробелов
        semi: [2, "always"], // Точка с запятой в конце строки
        // Ошибка при наличии пробела при обозночении функции, уберём её
        "space-before-function-paren": [
            "error",
            { anonymous: "always", named: "never" }
        ],
        // Использование двойных кавычек
        quotes: ["error", "double", { allowTemplateLiterals: true }],
        "multiline-ternary": "off",
        "no-useless-return": "off",
        "no-unused-vars": "off"
    }
};
