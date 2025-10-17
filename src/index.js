/**
 * Главный файл приложения AI Assistant
 */

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Класс для работы с AI Assistant
 */
class AIAssistant {
  /**
   * Создает экземпляр AI Assistant
   * @param {string} name - Имя ассистента
   */
  constructor(name) {
    this.name = name;
    this.isActive = false;
  }

  /**
   * Активирует ассистента
   */
  activate() {
    this.isActive = true;
    console.log(`${this.name} активирован`);
  }

  /**
   * Деактивирует ассистента
   */
  deactivate() {
    this.isActive = false;
    console.log(`${this.name} деактивирован`);
  }

  /**
   * Обрабатывает запрос пользователя
   * @param {string} request - Запрос пользователя
   * @return {string} Ответ ассистента
   */
  processRequest(request) {
    if (!this.isActive) {
      return 'Ассистент не активен';
    }

    // Простая логика обработки запросов
    const response = this.generateResponse(request);
    return response;
  }

  /**
   * Генерирует ответ на основе запроса
   * @param {string} request - Запрос пользователя
   * @return {string} Сгенерированный ответ
   */
  generateResponse(request) {
    const responses = {
      'привет': 'Привет! Как дела?',
      'как дела': 'У меня все отлично! А у вас?',
      'пока': 'До свидания! Было приятно пообщаться!',
    };

    const lowerRequest = request.toLowerCase().trim();
    return responses[lowerRequest] || 'Извините, я не понял ваш запрос';
  }
}

// Создаем экземпляр ассистента
const assistant = new AIAssistant('AI Helper');

// Настраиваем Express сервер
app.use(express.json());

/**
 * Маршрут для получения статуса ассистента
 */
app.get('/status', (req, res) => {
  res.json({
    name: assistant.name,
    isActive: assistant.isActive,
    timestamp: new Date().toISOString(),
  });
});

/**
 * Маршрут для отправки запроса ассистенту
 */
app.post('/chat', (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      error: 'Сообщение не может быть пустым',
    });
  }

  const response = assistant.processRequest(message);

  res.json({
    request: message,
    response: response,
    timestamp: new Date().toISOString(),
  });
});

/**
 * Маршрут для активации/деактивации ассистента
 */
app.post('/toggle', (req, res) => {
  if (assistant.isActive) {
    assistant.deactivate();
  } else {
    assistant.activate();
  }

  res.json({
    isActive: assistant.isActive,
    message: assistant.isActive ? 'Ассистент активирован' : 'Ассистент деактивирован',
  });
});

// Запускаем сервер
app.listen(PORT, () => {
  console.log(`AI Assistant сервер запущен на порту ${PORT}`);
  assistant.activate();
});

module.exports = { AIAssistant, app };
