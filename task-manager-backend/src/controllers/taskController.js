const Task = require('../models/Task');

// Получение всех задач
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find(); // Получаем все задачи из базы данных
        res.status(200).json(tasks); // Возвращаем задачи с кодом 200
    } catch (error) {
        console.error('Ошибка при получении задач:', error);
        res.status(500).json({ message: 'Ошибка сервера. Попробуйте позже.' });
    }
};

// Создание новой задачи
exports.createTask = async (req, res) => {
    const { title, description } = req.body;

    try {
        // Валидация введенных данных
        if (!title) {
            return res.status(400).json({ message: 'Заголовок задачи обязателен.' });
        }

        // Создаем новую задачу
        const newTask = new Task({ title, description });
        await newTask.save(); // Сохраняем задачу в базе данных

        res.status(201).json(newTask); // Возвращаем созданную задачу с кодом 201
    } catch (error) {
        console.error('Ошибка при создании задачи:', error);
        res.status(500).json({ message: 'Ошибка сервера. Попробуйте позже.' });
    }
};

// Обновление существующей задачи
exports.updateTask = async (req, res) => {
    const { taskId } = req.params; // Получаем ID задачи из параметров
    const { title, description, status } = req.body; // Получаем новые данные из тела запроса

    try {
        // Находим задачу по ID и обновляем её
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { title, description, status },
            { new: true, runValidators: true } // Возвращаем обновленную задачу и выполняем валидацию
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Задача не найдена.' });
        }

        res.status(200).json(updatedTask); // Возвращаем обновленную задачу с кодом 200
    } catch (error) {
        console.error('Ошибка при обновлении задачи:', error);
        res.status(500).json({ message: 'Ошибка сервера. Попробуйте позже.' });
    }
};

// Удаление задачи
exports.deleteTask = async (req, res) => {
    const { taskId } = req.params; // Получаем ID задачи из параметров

    try {
        const deletedTask = await Task.findByIdAndDelete(taskId); // Удаляем задачу по ID

        if (!deletedTask) {
            return res.status(404).json({ message: 'Задача не найдена.' });
        }

        res.status(200).json({ message: 'Задача успешно удалена.' }); // Возвращаем сообщение об успешном удалении
    } catch (error) {
        console.error('Ошибка при удалении задачи:', error);
        res.status(500).json({ message: 'Ошибка сервера. Попробуйте позже.' });
    }
};