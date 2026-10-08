const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/menuData.ts');
let content = fs.readFileSync(filePath, 'utf8');

// The new items to insert
const newItems = 
  {
    id: 'puff-puff',
    name: 'Puff Puff',
    category: 'snacks',
    price: 2000,
    description: 'Golden, soft and fluffy deep-fried dough balls. A classic Nigerian sweet treat perfect for snacking.',
    image: '/images/puff-puff.png',
    badge: 'CLASSIC',
    popular: true,
    prepTime: '5-10 mins',
    calories: '420 kcal',
    available: true,
  },
  {
    id: 'ultimate-shawarma',
    name: 'The Ultimate Shawarma',
    category: 'snacks',
    price: 4000,
    description: 'Loaded with juicy grilled chicken, seasoned beef sausages, rich garlic mayo, and fresh crunchy vegetables wrapped in soft lavash bread.',
    image: '/images/ultimate-shawarma.jpg',
    badge: 'BESTSELLER',
    popular: true,
    prepTime: '10-15 mins',
    calories: '650 kcal',
    available: true,
  },
  {
    id: 'yogurt-parfait',
    name: 'Yogurt Parfait',
    category: 'desserts',
    price: 3500,
    description: 'Layers of creamy Greek yogurt, crunchy granola, and fresh mixed berries topped with a drizzle of pure honey.',
    image: '/images/yogurt-parfait.jpg',
    popular: true,
    prepTime: '5 mins',
    calories: '320 kcal',
    available: true,
  },
  {
    id: 'fruit-smoothies-waffles',
    name: 'Fruit Smoothies & Waffles',
    category: 'desserts',
    price: 5000,
    description: 'Freshly baked golden Belgian waffles served with a chilled, nutrient-rich tropical fruit smoothie.',
    image: '/images/smoothies-waffles.jpg',
    popular: true,
    prepTime: '15 mins',
    calories: '580 kcal',
    available: true,
  },
  {
    id: 'chin-chin-plantain-chips',
    name: 'Chin Chin & Plantain Chips',
    category: 'snacks',
    price: 2500,
    description: 'A crunchy combo of sweet, nutmeg-spiced chin chin bites and savory, thinly sliced ripe plantain chips.',
    image: '/images/chin-chin.jpg',
    popular: true,
    prepTime: 'Ready',
    calories: '480 kcal',
    available: true,
  },
  {
    id: 'fried-chicken-bucket',
    name: 'Fried Chicken bucket',
    category: 'chicken',
    price: 8500,
    description: 'A massive bucket of crispy, golden-brown fried chicken pieces, marinated in our secret blend of spices. Perfect for sharing.',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=80',
    badge: 'PARTY SIZE',
    popular: true,
    prepTime: '20-25 mins',
    calories: '1250 kcal',
    available: true,
  },
;

// Replace 'popular: true,' with 'popular: false,'
content = content.replace(/popular:\s*true,/g, 'popular: false,');

// Insert new items at the top of MENU_ITEMS
content = content.replace('export const MENU_ITEMS: MenuItem[] = [', 'export const MENU_ITEMS: MenuItem[] = [' + newItems);

fs.writeFileSync(filePath, content, 'utf8');
