import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleList from './components/ArticleList/ArticleList';
// 2.1 Импортируем HTTP-функцию
import { fetchArticlesWithTopic } from './apiService/articles-api';
import SearchForm from './components/SearchForm/SearchForm';

const App = () => {
  // Чтобы показать результат HTTP-запроса, его необходимо сохранить в состоянии компонента, другого способа нет. Объявим состояние articlesи сохраним в нем результат HTTP-запроса.
  // 3. Объявляем состояние
  const [articles, setArticles] = useState([]);
  //
  // Индикатор загрузки является реактивным значением, поэтому сохраняется в состоянии компонента. У него всего два значения:
  // false – запрос еще не начался или уже завершился.
  // true – запрос выполняется.
  const [loading, setLoading] = useState(false);
  // Далее нужно перед HTTP-запросом установить значение состояния loadingв true, а после запроса вернуться в false. Для этого в асинхронной функции используем try...catch.
  //
  // Обработка ошибок
  // HTTP - запрос не всегда выполняется без ошибок, поэтому пользователю обязательно нужно дать понять, если что - то пошло не так.Во - первых, добавим еще одно состояние errorдля хранения ошибки.
  const [error, setError] = useState(false);
  //

  // Мы будем использовать синтаксис async/await, но есть проблема – колбек-функция, которую мы передаем useEffect, не может быть асинхронной.
  // useEffect(() => {
  //
  // Поскольку теперь пользователь сам вводит строку для поиска полов, нам не нужен эффект. Таким образом, будем писать код внутри функции handleSearch, выполняемой при саммите формы. Делаем ее асинхронным и добавляем внутрь код, связанный с HTTP-запросом.
  // Тут будемо виконувати HTTP-запит
  // 1. Объявляем асинхронную функцию
  // async function fetchArticles() {
  //
  const handleSearch = async topic => {
    console.log(topic);
    try {
      setArticles([]);
      setError(false);
      //   Устанавливаем индикатор в true перед запросом
      setLoading(true);

      // Здесь будем выполнять HTTP-запрос
      // const response = await axios.get(
      //   'https://hn.algolia.com/api/v1/search?query=react')
      // 2.2 Используемая HTTP-функция
      const data = await fetchArticlesWithTopic(topic);
      console.log(data);
      // 4. Записываем данные в стан
      // При изменении состояния компонент обновится, поэтому можно использовать состояние для отображения разметки JSX
      setArticles(data);
    } catch (error) {
      // Здесь будем обрабатывать ошибку
      // Встановлюємо стан error в true
      setError(true);
    } finally {
      // Устанавливаем индикатор в false после запроса
      setLoading(false);
    }

    // 2. Вызываем ее сразу после объявления
    // fetchArticles();
  };

  return (
    <div>
      <h1>Latest articles</h1>
      <SearchForm onSearch={handleSearch} />
      {loading && <p>Loading data, please wait...</p>}
      {error && (
        <p>Whoops, something went wrong! Please try reloading this page!</p>
      )}
      {articles.length > 0 && <ArticleList items={articles} />}
    </div>
  );
};

export default App;

// На примере списка ссылок на статьи мы рассмотрели стандартную технику выполнения HTTP-запроса в React, состоящую из нескольких этапов:
// Выполнить HTTP-запрос, будь то в эффекте или при произошедшем
// В средствах разработки на вкладке Networkубедиться, что запрос успешен, и в ответ мы получаем данные
// Объявить в компоненте состояние для хранения результата запроса
// Сохранить результат HTTP-запроса в состоянии
// Использовать состояние для отображения JSX-разметки
// Индикатор загрузки может быть чем-либо: от простого текста до векторной иконки или превью целого компонента. Вот несколько библиотек, предоставляющих готовые компоненты для индикатора загрузки:

// React Spinners
// React Loader
// React Content Loader
