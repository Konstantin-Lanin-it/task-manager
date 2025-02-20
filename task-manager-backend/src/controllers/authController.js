const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Регистрация пользователя
exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Проверка на наличие обязательных полей
        if (!username || !password) {
            return res.status(400).json({ message: 'Имя пользователя и пароль обязательны.' });
        }

        // Проверка, существует ли уже пользователь с таким именем
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Пользователь с таким именем уже существует.' });
        }

        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создаем нового пользователя
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Пользователь успешно зарегистрирован.' });
    } catch (error) {
        console.error('Ошибка при регистрации пользователя:', error);
        res.status(500).json({ message: 'Ошибка сервера. Попробуйте позже.' });
    }
};

// Аутентификация пользователя
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Проверка на наличие обязательных полей
        if (!username || !password) {
            return res.status(400).json({ message: 'Имя пользователя и пароль обязательны.' });
        }

        // Находим пользователя по имени
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Неверное имя пользователя или пароль.' });
        }

        // Сравниваем пароли
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Неверное имя пользователя или пароль.' });
        }

        // Генерация JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Ошибка при входе пользователя:', error);
        res.status(500).json({ message: 'Ошибка сервера. Попробуйте позже.' });
    }
};