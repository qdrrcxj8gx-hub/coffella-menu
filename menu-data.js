// Временные позиции. Поля name, description и size переводятся на ru / kk / en.
// price: число в тенге либо null, пока цена не подтверждена.
window.COFFELLA_MENU = {
  categories: [
    { id: 'all', name: { ru: 'Всё меню', kk: 'Барлық мәзір', en: 'All items' } },
    { id: 'coffee', name: { ru: 'Кофе', kk: 'Кофе', en: 'Coffee' } },
    { id: 'breakfast', name: { ru: 'Завтраки', kk: 'Таңғы ас', en: 'Breakfast' } },
    { id: 'sandwiches', name: { ru: 'Сэндвичи', kk: 'Сэндвичтер', en: 'Sandwiches' } },
    { id: 'desserts', name: { ru: 'Десерты', kk: 'Десерттер', en: 'Desserts' } },
    { id: 'drinks', name: { ru: 'Чай и напитки', kk: 'Шай мен сусындар', en: 'Tea & drinks' } }
  ],
  items: [
    { id: 'cappuccino', category: 'coffee', name: { ru: 'Капучино', kk: 'Капучино', en: 'Cappuccino' }, description: { ru: 'Эспрессо, молоко и молочная пена.', kk: 'Эспрессо, сүт және сүт көбігі.', en: 'Espresso, milk and milk foam.' }, size: { ru: '250 мл', kk: '250 мл', en: '250 ml' }, price: null, image: 'assets/coffee.jpg' },
    { id: 'breakfast', category: 'breakfast', name: { ru: 'Тост с яйцом', kk: 'Жұмыртқа қосылған тост', en: 'Egg on toast' }, description: { ru: 'Хрустящий тост, яйцо и свежая зелень.', kk: 'Қытырлақ тост, жұмыртқа және балғын көк шөп.', en: 'Crispy toast, egg and fresh herbs.' }, size: { ru: '1 порция', kk: '1 порция', en: '1 serving' }, price: null, image: 'assets/breakfast.jpg' },
    { id: 'croissant', category: 'desserts', name: { ru: 'Масляный круассан', kk: 'Сары майлы круассан', en: 'Butter croissant' }, description: { ru: 'Классический слоёный круассан на сливочном масле.', kk: 'Сары май қосылған классикалық қатпарлы круассан.', en: 'Classic flaky croissant made with butter.' }, size: { ru: '1 шт.', kk: '1 дана', en: '1 piece' }, price: null, image: 'assets/croissant.jpg' },
    { id: 'sandwich', category: 'sandwiches', name: { ru: 'Горячий сэндвич', kk: 'Ыстық сэндвич', en: 'Toasted sandwich' }, description: { ru: 'Поджаренный хлеб с сырной начинкой.', kk: 'Ірімшік салынған қуырылған нан.', en: 'Toasted bread with a cheese filling.' }, size: { ru: '1 порция', kk: '1 порция', en: '1 serving' }, price: null, image: 'assets/sandwich.jpg' },
    { id: 'dessert', category: 'desserts', name: { ru: 'Ягодный десерт', kk: 'Жидекті десерт', en: 'Berry dessert' }, description: { ru: 'Нежный сливочный крем со свежими ягодами.', kk: 'Балғын жидектер қосылған нәзік кілегейлі крем.', en: 'Smooth cream topped with fresh berries.' }, size: { ru: '1 порция', kk: '1 порция', en: '1 serving' }, price: null, image: 'assets/dessert.jpg' },
    { id: 'tea', category: 'drinks', name: { ru: 'Чай с молоком', kk: 'Сүт қосылған шай', en: 'Tea with milk' }, description: { ru: 'Чёрный чай с молоком.', kk: 'Сүт қосылған қара шай.', en: 'Black tea served with milk.' }, size: { ru: '250 мл', kk: '250 мл', en: '250 ml' }, price: null, image: 'assets/tea.jpg' }
  ]
};
