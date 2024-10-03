// src/api.js
import axios from 'axios';

// Настройка базового URL для всех запросов
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/',  // Базовый URL для всех API-запросов
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token 3b785a728ea69e688b32f76abbd8d49e693d5706'  // Твой токен
  }
});

// Функция для создания тренера
export function createTrainer(trainerData) {
  return apiClient.post('user/register/', {
    fullname: trainerData.name,
    username: trainerData.login,
    password: trainerData.password,
    role: trainerData.role  // Роль тренера передается отсюда
  });
}
