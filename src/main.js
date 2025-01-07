import 'normalize.css';
import './style.css';
import { gsap } from 'gsap';

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

document.addEventListener('DOMContentLoaded', () => {
  const accordionItems = document.querySelectorAll('.join-us__item');

  // Задаем начальное состояние для всех элементов
  accordionItems.forEach((item) => {
    const content = item.querySelector('.join-us__item-desc');
    const icon = item.querySelector('.join-us__item-image');
    const isActive = item.classList.contains('join-us__item--active');

    if (isActive) {
      // Если элемент активен по умолчанию, раскрываем его
      gsap.set(content, { height: 'auto', opacity: 1 });
      gsap.set(icon, { height: 'auto', opacity: 1 });
    } else {
      // Если элемент не активен, скрываем его
      gsap.set(content, { height: 0, opacity: 0 });
      gsap.set(icon, { height: 0, opacity: 0 });
    }
  });

  // Теперь добавляем обработчики кликов, как и раньше
  accordionItems.forEach((item) => {
    const title = item.querySelector('.join-us__item-title');
    const content = item.querySelector('.join-us__item-desc');
    const icon = item.querySelector('.join-us__item-image');

    title?.addEventListener('click', () => {
      accordionItems.forEach((otherItem) => {
        if (otherItem !== item) {
          const otherTitle = otherItem.querySelector('.join-us__item-title');
          const otherContent = otherItem.querySelector('.join-us__item-desc');
          const otherIcon = otherItem.querySelector('.join-us__item-image');

          otherItem.classList.remove('join-us__item--active');
          otherTitle?.classList.remove('heading--color--secondary');
          otherContent?.classList.remove('text--color--secondary');

          gsap.to(otherContent, { height: 0, opacity: 0, duration: 0.3 });
          gsap.to(otherIcon, {
            height: 0,
            opacity: 0,
            duration: 0.3,
          });
        }
      });

      const isActive = item.classList.toggle('join-us__item--active');
      if (isActive) {
        title.classList.add('heading--color--secondary');
        content.classList.add('text--color--secondary');
        gsap.to(content, { height: 'auto', opacity: 1, duration: 0.3 });
        gsap.to(icon, {
          height: 'auto',
          opacity: 1,
          duration: 0.3,
        });
      } else {
        title.classList.remove('heading--color--secondary');
        content.classList.remove('text--color--secondary');
        gsap.to(content, { height: 0, opacity: 0, duration: 0.3 });
        gsap.to(icon, {
          height: 0,
          opacity: 0,
          duration: 0.3,
        });
      }
    });
  });
});
