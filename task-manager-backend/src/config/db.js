const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Загружаем переменные окружения из файла .env
dotenv.config();

// Функция для подключения к базе данных
const connectDB = async () => {
    try {
        // Подключаемся к MongoDB с использованием строки подключения из переменных окружения
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB подключен');
    } catch (error) {
        console.error('Ошибка подключения к MongoDB:', error.message);
        process.exit(1); // Завершаем процесс с кодом 1 при ошибке подключения
    }
};

// Экспортируем функцию подключения
module.exports = connectDB;