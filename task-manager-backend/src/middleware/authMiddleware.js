const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Получаем токен из заголовков Authorization
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Проверяем наличие токена
    if (!token) {
        return res.status(401).json({ message: 'Нет токена, доступ запрещен.' });
    }

    try {
        // Верифицируем токен и извлекаем информацию о пользователе
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Сохраняем информацию о пользователе в объекте запроса
        next(); // Передаем управление следующему middleware или маршруту
    } catch (error) {
        console.error('Ошибка при аутентификации токена:', error);
        res.status(401).json({ message: 'Неверный токен, доступ запрещен.' });
    }
};

module.exports = authMiddleware;