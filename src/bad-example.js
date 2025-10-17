// Этот файл содержит намеренные ошибки для демонстрации работы ESLint

// Пример правильного объявления переменных
const goodVariable = 'правильный стиль';
const usedVariable = 'используемая переменная';

function badFunction( param1, param2 ) { // неправильные пробелы
  console.log('неправильный отступ');
  return param1+param2; // отсутствуют пробелы вокруг оператора
}

const badObject = { key1: 'value1', key2: 'value2' }; // неправильные пробелы

if (true) { // неправильные пробелы
  console.log('еще один неправильный отступ');
}

// Длинная строка которая превышает лимит в 100 символов и должна вызвать ошибку линтера
const veryLongString = 'Это очень длинная строка которая определенно превышает установленный лимит в 100 символов и должна вызвать ошибку ESLint';

// Используем переменные чтобы избежать ошибок no-unused-vars
console.log(goodVariable, usedVariable, veryLongString);

module.exports = { badFunction, badObject };
