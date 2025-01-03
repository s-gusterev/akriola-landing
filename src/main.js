import 'normalize.css';
import './style.css';

const scrollContainer = document.querySelector('.speakers__list');

scrollContainer.addEventListener('wheel', (e) => {
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
  // Если достигли начала или конца, событие пропускается, чтобы прокручивалась страница
});
