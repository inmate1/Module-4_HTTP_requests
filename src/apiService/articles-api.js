// src/apiService/articles-api.js
import axios from 'axios';

axios.defaults.baseURL = 'https://hn.algolia.com/api/v1';

export const fetchArticlesWithTopic = async topic => {
  try {
    const response = await axios.get(`/search?query=${topic}`);
    console.log(response.data.hits);
    return response.data.hits;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};




//   const response = axios.get(`/search?query=${topic}`);
//   console.log(response.data.hits);
//   return response.data.hits;

// Объявляем асинхронную функцию ( async/await) получения списка статей по заголовку.
// Функция выполняет HTTP-запрос и возвращает его результат – промес с данными.
// Обработка ошибки запроса не входит в тело функции, это выполняется в месте ее использования, то есть в компоненте.
// Импортируем функцию fetchArticlesWithTopicиз файла api.jsв компонент и используем ее в эффекте.
