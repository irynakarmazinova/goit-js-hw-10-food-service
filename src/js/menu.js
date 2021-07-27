import menuCardsTpl from '../templates/menu-cards.hbs';
import cards from '../data/menu.json';

// если просто импорт без названия в индексе, то можно без экспорта
// export const menu = () => {
const ulMenuRef = document.querySelector('.js-menu');
const checkboxRef = document.getElementById('theme-switch-toggle');

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

// цвет темы y body либо который записан в локалстор(ищем по ключу), либо по умолчанию светлый
let themeColor = localStorage.getItem('theme-color') || Theme.LIGHT;
document.body.classList.add(themeColor);

// если тема темная, при перезагрузки стр поставить ползунок вправо(как выбранный)
if (themeColor === Theme.DARK) {
  checkboxRef.checked = true;
}
// localStorage.getItem('theme-color') === Theme.LIGHT
//   ? (checkboxRef.checked = false)
//   : (checkboxRef.checked = true);

// функция создания карточки меню
function createMenuCadrs(cards) {
  return menuCardsTpl(cards);
}
ulMenuRef.insertAdjacentHTML('beforeend', createMenuCadrs(cards));

// функция смены темы на светлая/темная
function toggleTheme() {
  // if (!document.body.getAttribute('class') || document.body.classList.contains(Theme.LIGHT)) {
  // if (document.body.classList.contains(Theme.LIGHT)) {
  //   document.body.classList.add(Theme.DARK);
  //   document.body.classList.remove(Theme.LIGHT);
  // } else {
  //   document.body.classList.add(Theme.LIGHT);
  //   document.body.classList.remove(Theme.DARK);
  // }

  document.body.classList.toggle(Theme.DARK);
  document.body.classList.toggle(Theme.LIGHT);

  savethemeColor();
}
checkboxRef.addEventListener('change', toggleTheme);

// функция для localStorage-сохр при перезагрузки стр в localStorage
function savethemeColor() {
  themeColor = themeColor === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
  localStorage.setItem('theme-color', themeColor);
}

// функция lazyload с поддержкой нативной и библиотеки
function addSrcAttrToLazyImages() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  // ленивая загрузка - проверка загружаемости картинок
  lazyImages.forEach(image => image.addEventListener('load', onImageLoaded, { once: true }));
  function onImageLoaded(e) {
    console.log('Картинка загрузилась');
  }

  lazyImages.forEach(img => {
    img.src = img.dataset.src;
  });
}
function addLazySizesScript() {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  script.integrity =
    'sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==';
  script.crossorigin = 'anonymous';
  script.referrerpolicy = 'no-referrer';

  document.body.appendChild(script);
}

// feature detection js(выявление возможностей браузера)
if ('loading' in HTMLImageElement.prototype) {
  console.log('Браузер поддерживает lazyload');
  addSrcAttrToLazyImages();
} else {
  console.log('Браузер НЕ поддерживает lazyload');
  addLazySizesScript();
}
// };
// -------------------------------------------------------------------
// алгоритм решения задачи
// Первая задача: смена темы при клике на чекбокс.Вешаем слушателя по событию change и создаём функцию, которая меняет классы у боди и записывает сразу это в локал сторедж.

// Вторая задача: восстановить тему после перезагрузки страницы.Создаём функцию, которая вызывается сразу при загрузке страницы, считывает инфу с локал сторедж и ставит соответствующий класс на боди, и ползунок в соответствующее положение.

// Третья задача: создать шаблон разметки и вставить его на страницу.
// -------------------------------------------------------------------
// // второй вариант от Димы ментора
// import createMenu from '../templates/menu-cards.hbs';
// import menu from '../data/menu.json';

// // самовызывающаяся функция
// // (function () {
//  const listRef = document.querySelector('.js-menu');
//  const switchRef = document.querySelector('#theme-switch-toggle');
//  const bodyRef = document.querySelector('body');

//  const { LIGHT, DARK } = {
//    LIGHT: 'light-theme',
//    DARK: 'dark-theme',
//  };

//  //   let state = JSON.parse(localStorage.getItem('theme'));
//  let theme = localStorage.getItem('theme');

//  bodyRef.classList.add(theme ? theme : LIGHT);
//  switchRef.checked = theme === DARK;

//  listRef.insertAdjacentHTML('beforeend', createMenu(menu));

//  const changeTheme = ({ target: { checked } }) =>
//    checked ? toggleTheme(DARK, LIGHT) : toggleTheme(LIGHT, DARK);

//  switchRef.addEventListener('change', changeTheme);

//  function toggleTheme(add, rem) {
//    bodyRef.classList.replace(rem, add);
//    // const state = {
//    //   theme: add,
//    //   checked: add === DARK,
//    // };
//    // localStorage.setItem('theme', JSON.stringify(state));

//    localStorage.setItem('theme', add);
//  }

// // функция lazyload с поддержкой нативной и библиотеки
// function addSrcAttrToLazyImages() {
//   const lazyImages = document.querySelectorAll('img[loading="lazy"]');

//   // ленивая загрузка - проверка загружаемости картинок
//   lazyImages.forEach(image => image.addEventListener('load', onImageLoaded, { once: true }));
//   function onImageLoaded(e) {
//     console.log('Картинка загрузилась');
//   }

//   lazyImages.forEach(img => {
//     img.src = img.dataset.src;
//   });
// }
// function addLazySizesScript() {
//   const script = document.createElement('script');
//   script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
//   script.integrity =
//     'sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==';
//   script.crossorigin = 'anonymous';
//   script.referrerpolicy = 'no-referrer';

//   document.body.appendChild(script);
// }

// // feature detection js(выявление возможностей браузера)
// if ('loading' in HTMLImageElement.prototype) {
//   console.log('Браузер поддерживает lazyload');
//   addSrcAttrToLazyImages();
// } else {
//   console.log('Браузер НЕ поддерживает lazyload');
//   addLazySizesScript();
// }
// })();
