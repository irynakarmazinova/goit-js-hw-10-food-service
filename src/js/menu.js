import menuCardsTpl from '../templates/menu-cards.hbs';
import cards from '../menu.json';

export const menu = () => {
  const ulMenuRef = document.querySelector('.js-menu');
  const checkboxRef = document.getElementById('theme-switch-toggle');

  const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
  };

  // функция создания карточки меню
  function createMenuCadrs(cards) {
    return menuCardsTpl(cards);
  }
  ulMenuRef.insertAdjacentHTML('beforeend', createMenuCadrs(cards));

  // установить у боди светлую тему по умолчанию
  // или можно было в шаблоне добавить <body class="light-theme"> - не работает, почему?
  let theme = localStorage.getItem('theme') || Theme.LIGHT;
  document.body.classList.add(theme);

  // если тема темная, при перезагрузки стр поставить ползунок вправо как выбранный
  if (theme === Theme.DARK) {
    checkboxRef.checked = true;
  }

  // функция смены темы на светлая/темная
  function toggleTheme() {
    // if (!document.body.getAttribute('class') || document.body.classList.contains(Theme.LIGHT)) {
    //   document.body.classList.add(Theme.DARK);
    //   document.body.classList.remove(Theme.LIGHT);
    // } else {
    //   document.body.classList.add(Theme.LIGHT);
    //   document.body.classList.remove(Theme.DARK);
    // }

    document.body.classList.toggle(Theme.DARK);
    document.body.classList.toggle(Theme.LIGHT);

    saveItem();
  }
  checkboxRef.addEventListener('change', toggleTheme);

  // функция для localStorage-сохр при перезагрузки стр в localStorage
  function saveItem() {
    theme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    localStorage.setItem('theme', theme);
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
};
