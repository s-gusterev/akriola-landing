import 'normalize.css';
import './style.css';

const scrollContainer = document.querySelector('.speakers__list');

// Функция для проверки устройства
function isMobile() {
  return window.innerWidth <= 768; // Условие для мобильных устройств
}

// Функция для добавления обработчика
function addScrollListener() {
  scrollContainer.addEventListener('wheel', scrollHandler);
}

// Функция для удаления обработчика
function removeScrollListener() {
  scrollContainer.removeEventListener('wheel', scrollHandler);
}

// Обработчик события прокрутки
function scrollHandler(e) {
  const delta = e.deltaY; // Направление прокрутки (вниз/вверх)

  // Определяем, можно ли ещё прокручивать горизонтально
  const atStart = scrollContainer.scrollLeft === 0;
  const atEnd =
    Math.ceil(scrollContainer.scrollLeft + scrollContainer.offsetWidth) >=
    scrollContainer.scrollWidth;

  // Если горизонтальная прокрутка возможна, блокируем вертикальную
  if ((delta > 0 && !atEnd) || (delta < 0 && !atStart)) {
    e.preventDefault();
    scrollContainer.scrollBy({ left: delta, behavior: 'smooth' });
  }
}

// Отслеживание изменения размера окна
function handleResize() {
  if (isMobile()) {
    // Если мобильное устройство, добавляем обработчик
    addScrollListener();
  } else {
    // Если не мобильное устройство, удаляем обработчик
    removeScrollListener();
  }
}

// Инициализация
handleResize(); // Проверяем начальное состояние
window.addEventListener('resize', handleResize); // Отслеживаем изменение размера окна
