import { MenuItem, PromoCode } from '@/types';

export const MENU_ITEMS: MenuItem[] = [
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
  {
    id: 'uyo-smash-burger',
    name: 'Uyo Double Smash Burger',
    category: 'burgers',
    price: 5500,
    description: 'Double beef smash patties, aged cheddar cheese, caramelized onions, house Suya aioli on toasted brioche.',
    image: '/images/uyo-burger.png',
    badge: 'MUST TRY',
    popular: false,
    prepTime: '15-20 mins',
    calories: '780 kcal',
    available: true,
    allowedAddons: [
      { id: 'extra-cheese', name: 'Extra Cheddar Cheese', price: 800 },
      { id: 'bacon', name: 'Crispy Beef Bacon', price: 1200 },
      { id: 'extra-patty', name: 'Extra Smash Patty', price: 2000 },
      { id: 'suya-dip', name: 'Extra Suya Dip', price: 500 }
    ]
  },
  {
    id: 'suya-chicken-burger',
    name: 'Suya Spiced Chicken Burger',
    category: 'burgers',
    price: 5000,
    description: 'Fried buttermilk chicken thigh tossed in Yaji spice, crunchy cabbage slaw, pickled cucumbers & honey mustard.',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80',
    badge: 'SPICY',
    spicy: true,
    popular: false,
    prepTime: '15-20 mins',
    calories: '690 kcal',
    available: true,
    allowedAddons: [
      { id: 'extra-cheese', name: 'Extra Cheddar Cheese', price: 800 },
      { id: 'jalapeno', name: 'Extra Jalapenos', price: 600 }
    ]
  },
  {
    id: 'golden-meat-pie',
    name: 'Golden Beef Meat Pie (2 Pcs)',
    category: 'snacks',
    price: 2500,
    description: 'Freshly baked buttery shortcrust pastry stuffed with savory seasoned minced beef, diced potatoes and carrots.',
    image: '/images/meat-pie-featured.jpg',
    badge: 'UYO CLASSIC',
    popular: false,
    prepTime: '10 mins',
    calories: '420 kcal',
    available: true,
  },
  {
    id: 'tropical-mango-smoothie',
    name: 'Tropical Mango & Berry Smoothie',
    category: 'drinks',
    price: 2500,
    description: 'Chilled rich blend of fresh mango nectar, wild strawberries, ripe banana, and ice-cold Greek yogurt.',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80',
    badge: 'ICE COLD',
    popular: false,
    prepTime: '5 mins',
    calories: '220 kcal',
    available: true,
  },
  {
    id: 'afang-soup-special',
    name: 'Afang Soup Supreme & Pounded Yam',
    category: 'mains',
    price: 7500,
    description: 'Traditional Akwa Ibom Afang soup cooked with stockfish, dry fish, goat meat, periwinkles and served with fresh pounded yam.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    badge: 'UYO ORIGINAL',
    popular: false,
    prepTime: '20-25 mins',
    calories: '850 kcal',
    available: true,
    allowedAddons: [
      { id: 'extra-goat', name: 'Extra Goat Meat (2 pcs)', price: 2500 },
      { id: 'extra-fish', name: 'Extra Stockfish Portion', price: 2000 },
      { id: 'extra-swallow', name: 'Extra Pounded Yam', price: 1000 }
    ]
  },
  {
    id: 'smoky-jollof-supreme',
    name: 'Smoky Party Jollof & Plantain',
    category: 'mains',
    price: 5500,
    description: 'Fire-roasted smoked Jollof rice served with sweet fried dodo plantain, coleslaw, and grilled quarter chicken.',
    image: '/images/jollof-rice.png',
    badge: 'BESTSELLER',
    popular: false,
    prepTime: '15-20 mins',
    calories: '720 kcal',
    available: true,
    allowedAddons: [
      { id: 'extra-plantain', name: 'Extra Fried Plantain', price: 800 },
      { id: 'extra-turkey', name: 'Upgrade to Grilled Turkey', price: 1500 }
    ]
  },
  {
    id: 'asun-fried-rice',
    name: 'Asun Fried Rice & Peppered Beef',
    category: 'mains',
    price: 6500,
    description: 'Wok-tossed spicy rice infused with smoked goat meat chunks (Asun), Scotch bonnet peppers & crispy veggies.',
    image: '/images/asun-rice.jpg',
    spicy: true,
    prepTime: '20 mins',
    calories: '810 kcal',
    available: true,
    allowedAddons: [
      { id: 'peppered-beef', name: 'Extra Peppered Beef Portion', price: 2500 }
    ]
  },
  {
    id: 'crispy-yam-fries',
    name: 'Crispy Yam Fries & Spicy Suya Dip',
    category: 'snacks',
    price: 3000,
    description: 'Golden fried white yam batons dusted with sea salt and served with signature peppered Suya cream sauce.',
    image: '/images/crispy-yam-fries.png',
    popular: false,
    prepTime: '10-15 mins',
    calories: '450 kcal',
    available: true,
    allowedAddons: [
      { id: 'suya-dip', name: 'Extra Suya Dip', price: 500 },
      { id: 'garlic-mayo', name: 'Garlic Mayo Dip', price: 500 }
    ]
  },
  {
    id: 'loaded-french-fries',
    name: 'Loaded Suya Spice French Fries',
    category: 'snacks',
    price: 3500,
    description: 'Crispy double-cooked potato fries dusted in Yaji pepper, melted cheddar, scallions and shredded beef.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
    badge: 'SNACK POPULAR',
    popular: false,
    prepTime: '10-12 mins',
    calories: '560 kcal',
    available: true,
    allowedAddons: [
      { id: 'cheese-sauce', name: 'Extra Warm Cheese Sauce', price: 800 }
    ]
  },
  {
    id: 'suya-chicken-wings',
    name: 'Spicy Suya Wings (8 Pcs)',
    category: 'chicken',
    price: 4500,
    description: 'Char-grilled jumbo chicken wings tossed in Northern Yaji rub, fresh red onions & tomatoes.',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80',
    spicy: true,
    popular: true,
    prepTime: '15-18 mins',
    calories: '620 kcal',
    available: true,
    allowedAddons: [
      { id: 'ranch', name: 'Cooling Ranch Dip', price: 600 }
    ]
  },
  {
    id: 'pepperoni-suya-pizza',
    name: 'Suya Beef Pepperoni Pizza',
    category: 'pizza',
    price: 8500,
    description: 'Hand-tossed crust, spicy tomato sauce, mozzarella, sliced beef pepperoni, onion rings & Suya seasoning.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    prepTime: '20-25 mins',
    calories: '1100 kcal',
    available: true,
    allowedAddons: [
      { id: 'stuffed-crust', name: 'Cheese Stuffed Crust', price: 1500 }
    ]
  },
  {
    id: 'zobo-hibiscus-sparkler',
    name: 'Zobo Hibiscus Fizz (Craft Soda)',
    category: 'drinks',
    price: 2000,
    description: 'House-brewed Nigerian Zobo (organic hibiscus leaves, ginger, pineapple skin, cloves) topped with sparkling water & lime.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    badge: 'REFRESHING',
    popular: true,
    prepTime: '5 mins',
    calories: '120 kcal',
    available: true,
  },
  {
    id: 'palm-wine-mocktail',
    name: 'Uyo Palm Wine & Mango Cooler',
    category: 'drinks',
    price: 3000,
    description: 'Fresh sweet palm wine extract blended with local mango nectar, crushed ice and mint leaves.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    prepTime: '5 mins',
    calories: '180 kcal',
    available: true,
  },
  {
    id: 'puff-puff-delight',
    name: 'Nutella Puff-Puff Platter (10 Pcs)',
    category: 'desserts',
    price: 2500,
    description: 'Warm fluffy Nigerian puff-puff balls drizzled with rich hazelnut Nutella chocolate and crushed peanuts.',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
    badge: 'SWEET TREAT',
    popular: true,
    prepTime: '10 mins',
    calories: '480 kcal',
    available: true,
  }
];

export const PROMO_CODES: PromoCode[] = [
  {
    code: 'UYO10',
    discountType: 'percentage',
    discountValue: 10,
    minOrder: 3000,
    description: '10% off your entire order (Min. ₦3,000)'
  },
  {
    code: 'FLAVOUR24',
    discountType: 'fixed',
    discountValue: 1500,
    minOrder: 8000,
    description: '₦1,500 off orders above ₦8,000'
  },
  {
    code: 'FREEDELIVERY',
    discountType: 'fixed',
    discountValue: 1000,
    minOrder: 5000,
    description: '₦1,000 delivery fee discount'
  }
];

export const RESTAURANT_INFO = {
  name: '24/7 Flavours',
  tagline: 'Premium Fast-Casual Urban Kitchen & Bar',
  address: '23 Ikpa Road, Uyo, Akwa Ibom State',
  phone: '+234 812 345 6789',
  email: 'orders@247flavours.ng',
  openingHours: 'Open 24 Hours • 7 Days a Week',
  socialX: 'https://x.com/dfwconstantine',
  deliveryBaseFee: 1000,
  freeDeliveryThreshold: 15000,
};
