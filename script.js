'use strict';
(() => {
  const { categories, items } = window.COFFELLA_MENU;
  const translations = {
    ru: { menu:'Меню Coffella', intro:'COFFELLA · АСТАНА', heroTitle:'Кофе. Завтраки.\nВаше время.', viewMenu:'Смотреть меню', menuHeading:'Меню', menuEyebrow:'ВЫБИРАЙТЕ ПО ВКУСУ', about:'О кофейне', welcome:'Любимый кофе, завтраки и десерты — выбирайте то, что хочется сегодня.', city:'Астана', skip:'Перейти к меню', preview:'Превью: блюда и фото временные, актуальное меню скоро.', search:'Поиск по меню', categories:'Категории меню', languages:'Язык', results:'Результаты поиска', empty:'Ничего не нашлось', emptyHint:'Попробуйте другое название или категорию.', reset:'Сбросить поиск', allergy:'Если у вас есть аллергия, сообщите об этом бариста.', address:'Астана, ул. Шамши Калдаякова, 8', directions:'На карте', hours:'Перед визитом уточните часы работы.', close:'Закрыть', dishNote:'Пример блюда. Состав, порция и цена будут уточнены.', soon:'Цена скоро', details:'Подробнее', photo:'иллюстративное фото', count:'Позиций', description:'Цифровое меню Coffella в Астане: кофе, завтраки, сэндвичи и десерты. Демонстрационная версия.' },
    kk: { menu:'Coffella мәзірі', intro:'COFFELLA · АСТАНА', heroTitle:'Кофе. Таңғы ас.\nӨзіңізге уақыт.', viewMenu:'Мәзірді көру', menuHeading:'Мәзір', menuEyebrow:'ТАЛҒАМЫҢЫЗҒА САЙ', about:'Кофехана туралы', welcome:'Сүйікті кофе, таңғы ас пен десерттер — бүгін көңіліңіз қалағанын таңдаңыз.', city:'Астана', skip:'Мәзірге өту', preview:'Алдын ала нұсқа: тағамдар мен фотолар уақытша. Жаңа мәзір жақында.', search:'Мәзірден іздеу', categories:'Мәзір санаттары', languages:'Тіл', results:'Іздеу нәтижелері', empty:'Ештеңе табылмады', emptyHint:'Басқа атауды немесе санатты қолданып көріңіз.', reset:'Іздеуді тазалау', allergy:'Аллергияңыз болса, баристаға хабарлаңыз.', address:'Астана, Шәмші Қалдаяқов көшесі, 8', directions:'Картадан көру', hours:'Келмес бұрын жұмыс уақытын нақтылап алыңыз.', close:'Жабу', dishNote:'Тағам үлгісі. Құрамы, порциясы мен бағасы нақтыланады.', soon:'Бағасы жақында', details:'Толығырақ', photo:'көрнекі фото', count:'Тағам саны', description:'Астанадағы Coffella кофеханасының электронды мәзірі: кофе, таңғы ас, сэндвичтер мен десерттер. Алдын ала нұсқа.' },
    en: { menu:'Coffella menu', intro:'COFFELLA · ASTANA', heroTitle:'Coffee. Breakfast.\nTime for you.', viewMenu:'Explore the menu', menuHeading:'Menu', menuEyebrow:'FIND YOUR FAVOURITE', about:'About the café', welcome:'Your favourite coffee, breakfast and desserts. Pick whatever you feel like today.', city:'Astana', skip:'Skip to menu', preview:'Preview: sample dishes and photos. Updated menu coming soon.', search:'Search the menu', categories:'Menu categories', languages:'Language', results:'Search results', empty:'No items found', emptyHint:'Try a different name or category.', reset:'Reset search', allergy:'Please let your barista know if you have any allergies.', address:'8 Shamshi Kaldayakov St, Astana', directions:'View map', hours:'Please confirm opening hours before visiting.', close:'Close', dishNote:'Sample dish. Ingredients, serving size and price will be confirmed.', soon:'Price coming soon', details:'View details', photo:'illustrative photo', count:'Items', description:'Coffella digital menu in Astana: coffee, breakfast, sandwiches and desserts. Preview version.' }
  };
  const grid = document.querySelector('#menu-grid');
  const search = document.querySelector('#search');
  const nav = document.querySelector('#categories');
  const dialog = document.querySelector('#dish-dialog');
  let language = 'ru';
  try { const saved = localStorage.getItem('coffella-language'); if (Object.hasOwn(translations, saved)) language = saved; } catch {}
  let activeCategory = 'all';
  let currentDish = null;
  const t = key => translations[language][key];
  const localize = value => typeof value === 'string' ? value : value[language] || value.ru;
  const categoryName = id => localize(categories.find(category => category.id === id).name);
  const formatPrice = price => price == null ? t('soon') : new Intl.NumberFormat({ru:'ru-RU',kk:'kk-KZ',en:'en-GB'}[language]).format(price) + ' ₸';
  const normalize = value => value.toLocaleLowerCase().replaceAll('ё', 'е').trim();
  function element(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  }
  categories.forEach(category => {
    const button = element('button', 'category');
    button.type = 'button';
    button.dataset.category = category.id;
    button.addEventListener('click', () => { activeCategory = category.id; render(); });
    nav.append(button);
  });
  function updateDish(item) {
    document.querySelector('#dish-title').textContent = localize(item.name);
    document.querySelector('#dish-category').textContent = categoryName(item.category);
    document.querySelector('#dish-description').textContent = localize(item.description);
    document.querySelector('#dish-size').textContent = localize(item.size);
    document.querySelector('#dish-price').textContent = formatPrice(item.price);
    const image = document.querySelector('#dish-image');
    image.src = item.image;
    image.alt = `${localize(item.name)} — ${t('photo')}`;
  }
  function openDish(item) {
    currentDish = item;
    updateDish(item);
    dialog.showModal();
    document.body.classList.add('dialog-open');
  }
  function render() {
    const query = normalize(search.value);
    // Search all three translations so an existing query stays useful after switching language.
    const visible = items.filter(item => {
      const category = categories.find(c => c.id === item.category);
      const searchable = [...Object.values(item.name), ...Object.values(item.description), ...Object.values(category.name)].join(' ');
      return (activeCategory === 'all' || item.category === activeCategory) && normalize(searchable).includes(query);
    });
    nav.querySelectorAll('button').forEach(button => {
      button.textContent = categoryName(button.dataset.category);
      button.setAttribute('aria-pressed', String(button.dataset.category === activeCategory));
    });
    document.querySelector('#category-title').textContent = query ? t('results') : categoryName(activeCategory);
    document.querySelector('#result-count').textContent = `${t('count')}: ${visible.length}`;
    document.querySelector('#empty-state').hidden = visible.length !== 0;
    grid.replaceChildren();
    visible.forEach(item => {
      const card = element('button', 'dish-card');
      card.type = 'button';
      card.setAttribute('aria-label', `${t('details')}: ${localize(item.name)}`);
      const photo = element('div', 'card-photo');
      const image = element('img');
      image.src = item.image;
      image.alt = `${localize(item.name)} — ${t('photo')}`;
      image.loading = 'lazy'; image.width = 700; image.height = 560;
      const arrow = element('span', 'card-arrow');
      arrow.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
      arrow.setAttribute('aria-hidden', 'true');
      photo.append(image, arrow);
      const info = element('div', 'card-info');
      const bottom = element('div', 'card-bottom');
      bottom.append(element('span', 'card-size', localize(item.size)), element('span', 'card-price', formatPrice(item.price)));
      info.append(element('h3', 'card-title', localize(item.name)), bottom);
      card.append(photo, info);
      card.addEventListener('click', () => openDish(item));
      grid.append(card);
    });
  }
  function setLanguage(next) {
    language = next;
    document.documentElement.lang = language;
    document.title = t('menu');
    document.querySelector('meta[name="description"]').content = t('description');
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-lang]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === language)));
    document.querySelector('#languages').setAttribute('aria-label', t('languages'));
    nav.setAttribute('aria-label', t('categories'));
    search.placeholder = t('search');
    search.setAttribute('aria-label', t('search'));
    document.querySelector('.dialog-close').setAttribute('aria-label', t('close'));
    document.querySelector('.intro-photo').alt = `${categoryName('coffee')} — ${t('photo')}`;
    try { localStorage.setItem('coffella-language', language); } catch {}
    render();
    if (currentDish) updateDish(currentDish);
  }
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
  search.addEventListener('input', render);
  document.querySelector('#reset-search').addEventListener('click', () => { search.value = ''; activeCategory = 'all'; render(); search.focus(); });
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
  setLanguage(language);

  // A fresh phone visit starts at the menu; the introduction remains above it.
  // Explicit anchors and browser back/forward restoration take precedence.
  const phoneViewport = matchMedia('(max-width: 767px), (max-width: 1024px) and (pointer: coarse)');
  let interacted = false;
  const markInteraction = () => { interacted = true; };
  const interactionEvents = ['pointerdown', 'touchstart', 'wheel', 'keydown'];
  interactionEvents.forEach(type => window.addEventListener(type, markInteraction, { once: true, passive: true }));
  window.addEventListener('pageshow', event => {
    const navigation = performance.getEntriesByType('navigation')[0];
    if (!event.persisted && navigation?.type !== 'back_forward' && !location.hash && phoneViewport.matches && !interacted) {
      const target = document.querySelector('#menu');
      const headerHeight = document.querySelector('.header').getBoundingClientRect().height;
      window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top - headerHeight, behavior: 'instant' });
    }
    interactionEvents.forEach(type => window.removeEventListener(type, markInteraction));
  }, { once: true });
})();
