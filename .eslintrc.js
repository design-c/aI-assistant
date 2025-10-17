module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'google',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // Дополнительные правила для более строгой проверки
    'require-jsdoc': 'off', // Отключаем требование JSDoc для всех функций
    'valid-jsdoc': 'off', // Отключаем валидацию JSDoc
    'linebreak-style': 'off', // Отключаем проверку окончаний строк для Windows
    'max-len': ['error', {
      code: 100, // Увеличиваем лимит длины строки до 100 символов
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    'indent': ['error', 2], // Используем 2 пробела для отступов
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'comma-dangle': ['error', 'always-multiline'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
  },
};
