// import { menu } from './js/menu';
import menuCardsTpl from './templates/menu-cards.hbs';
import cards from './menu.json';
import './sass/main.scss';

// menu();

const refs = {
  ulMenuRef: document.querySelector('.js-menu'),
  checkboxRef: document.getElementById('theme-switch-toggle'),
  // ulIngredientsRef: document.querySelector('.tag-list'),
};

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const settings = {
  theme: Theme.DARK,
  checked: true,
};

// функция создания карточки меню
function createMenuCadrs(cards) {
  return menuCardsTpl(cards);
}
refs.ulMenuRef.insertAdjacentHTML('beforeend', createMenuCadrs(cards));

// функция добавляет лишки
// function createLiIngredients() {
//   return cards.reduce((acc, { ingredients }) => {
//     acc = `${acc} <li class='tag-list__item'>${ingredients[0]}</li>
//           <li class='tag-list__item'>${ingredients[1]}</li>
//           <li class='tag-list__item'>${ingredients[2]}</li>
//           <li class='tag-list__item'>${ingredients[3]}</li>
//           <li class='tag-list__item'>${ingredients[4]}</li>
//           <li class='tag-list__item'>${ingredients[5]}</li>`;
//     return acc;
//   }, '');
// }
// refs.ulIngredientsRef.insertAdjacentHTML('beforeend', createLiIngredients);

// функция смены темы на светлая/темная
function menuTheme() {
  if (!document.body.getAttribute('class') || document.body.classList.contains(Theme.LIGHT)) {
    document.body.classList.add(Theme.DARK);
    document.body.classList.remove(Theme.LIGHT);
  } else {
    document.body.classList.add(Theme.LIGHT);
    document.body.classList.remove(Theme.DARK);
  }

  saveItem();
}
refs.checkboxRef.addEventListener('change', menuTheme);

// функция для localStorage-сохр при перезагрузки стр в localStorage
function saveItem() {
  localStorage.setItem('theme', 'light');
  const savedSettings = JSON.stringify(localStorage.getItem('theme'));
  console.log(savedSettings);
}

// feature detection js(выявление возможностей браузера) about lazyload
if ('loading' in HTMLImageElement.prototype) {
  console.log('Браузер поддерживает lazyload');
  addSrcAttrToLazyImages();
} else {
  console.log('Браузер НЕ поддерживает lazyload');
  addLazySizesScript();
}

// функция lazyload с поддержкой нативной и библиотеки
function addSrcAttrToLazyImages() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  // ленивая загрузка - проверка загружаемости картинок
  lazyImages.forEach(image => image.addEventListener('load', onImageLoaded, { once: true }));

  function onImageLoaded() {
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
// ----------------------------------------------------------------------
// вопросы
// 1.куда деть айди из меню.джейсон??? где его использовать?
// 2. почему не могу достучаться до 1го эл массива ингридиентс
// если {{ingredients[0]}} - ошибка
// 3. почему document.body.classList.add('light-theme');а не - body.classList.add('light-theme');. зачем писать тут документ?
// 5. console.log(JSON.parse(cards));-почему ошибка? почему при стрингафай все ок?
// 6. почему не работает с тернарником смена темы?
//     !document.body.getAttribute('class') || document.body.classList.contains(Theme.LIGHT)
//     ? document.body.classList.toggle(Theme.DARK)
//     : document.body.classList.toggle(Theme.LIGHT);
// 7. если добавляется эл динамически, я его не могу найти, что-то в него добавить?
// ----------------------------------------------------------------------
// сделать
// 1. просмотреть еще раз ленивую загрузку
// 2. разбить джс по файлам, а не все в index.js
