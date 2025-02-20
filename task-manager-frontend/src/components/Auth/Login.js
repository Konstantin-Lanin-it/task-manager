import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Импортируйте useHistory для редиректа
import { loginUser } from '../api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Состояние для ошибок
  const history = useHistory(); // Хук для управления историей и редиректами

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Сбрасываем ошибку перед новой попыткой входа
    try {
      const response = await loginUser({ username, password });
      localStorage.setItem('token', response.data.token);
      // Редирект на главную страницу
      history.push('/'); // Замените '/' на нужный путь главной страницы
    } catch (error) {
      // Обработка ошибок
      setError('Неверное имя пользователя или пароль.'); // Устанавливаем сообщение об ошибке
      console.error('Ошибка при входе:', error); // Логируем ошибку в консоль
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Отображаем сообщение об ошибке */}
    </div>
  );
};

export default Login;