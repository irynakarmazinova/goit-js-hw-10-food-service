// import { menu } from './js/menu';
import menuCardsTpl from './templates/menu-cards.hbs';
import cards from './menu.json';
import './sass/main.scss';

// menu();
const refs = {
  ulMenuRef: document.querySelector('.js-menu'),
  checkboxRef: document.getElementById('theme-switch-toggle'),
};

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const settings = {
  theme: Theme.DARK,
  checked: true,
};

// функция создает карточки меню
function createMenuCadrs(cards) {
  return menuCardsTpl(cards);
}
refs.ulMenuRef.insertAdjacentHTML('beforeend', createMenuCadrs(cards));

// функция тогла светлая/темная тема
function menuTheme() {
  document.body.classList.toggle(Theme.DARK);

  if (document.body === document.body.classList.contains(Theme.DARK)) {
    // должно сохраняться при перезагрузки стр в localStorage
    localStorage.setItem('settings', JSON.stringify(settings));
    const savedSettings = localStorage.getItem('settings');
    const parsedSettings = JSON.parse(savedSettings);
    console.log(parsedSettings);
  }

  localStorage.setItem('settings', JSON.stringify(settings));
  const savedSettings = localStorage.getItem('settings');
  const parsedSettings = JSON.parse(savedSettings);
  console.log(parsedSettings);

  //   document.body.classList.toggle(Theme.LIGHT);
}
refs.checkboxRef.addEventListener('change', menuTheme);

// console.log(document.body);

// вопросы
// 1.куда деть айди из меню.джейсон??? где его использовать?
// 2. почему не могу достучаться до 1го эл массива ингридиентс
// const a = cards.forEach(({ ingredients }, idx) => console.log(ingredients[1]));
// 3. почему document.body.classList.add('light-theme');а не - body.classList.add('light-theme');. зачем писать тут документ?
// 4. как сделать проверку что бы тоглило светлую тему?

// сделать
// 1. поставить ленивую загрузку
// 2. разбить джс по файлам, а не все в индексхтмл
