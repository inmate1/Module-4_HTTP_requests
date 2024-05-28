export const SearchForm = ({ onSearch }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const topic = form.elements.topic.value;
    // Если текстовое поле пусто, выводим сообщения
    // и прекращаем выполнение функции.
    if (form.elements.topic.value.trim() === '') {
      alert('Please enter search term!');
      return;
      }
      // В противном случае вызываем пропс  // и передаем ему значение поля
      onSearch(topic);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' name='topic' placeholder='Поиск статей...' />
      <button>Поиск</button>
    </form>
  );
};

export default SearchForm;
