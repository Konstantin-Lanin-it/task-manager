import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Импорт главного компонента приложения
import './index.css'; // Импорт научного файла стилей, если есть
import { BrowserRouter as Router } from 'react-router-dom'; // Импорт Router для маршрутизации

// Рендерим приложение
ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root') // Место, куда будет вставлено приложение
);