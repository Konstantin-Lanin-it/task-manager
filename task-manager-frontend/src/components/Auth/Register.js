import React, { useState } from 'react';
import { registerUser } from '../api'; // Импорт функции API для регистрации

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        setError(null); // Сбрасываем ошибку перед отправкой
        setSuccess(false); // Сбрасываем статус успеха

        try {
            const response = await registerUser({ username, password });
            if (response.status === 201) {
                setSuccess(true);
                // Можно выполнить дополнительные действия, например, редирект на страницу логина
            }
        } catch (err) {
            // Обработка ошибок от API
            setError(err.response?.data?.message || 'Ошибка регистрации');
        }
    };

    return (
        <div>
            <h2>Регистрация</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor="username">Имя пользователя:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                </div>
                <button type="submit">Зарегистрироваться</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Отображение ошибки */}
            {success && <p style={{ color: 'green' }}>Регистрация успешна! Теперь вы можете войти.</p>} {/* Успешное сообщение */}
        </div>
    );
};

export default Register;