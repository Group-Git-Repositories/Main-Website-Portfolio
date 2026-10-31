export const INDUSTRY_CATEGORIES = [
  'All Restaurants',
  'Habesha & Traditional Dining',
  'Café, Bakery & Breakfast',
  'Fast Food, Burger & Pizza',
  'Lounge, Bar & Grill',
  'Digital QR Menu Express',
  'Fine Dining & Hotel Restaurant',
];

export const ESTIMATOR_MODULES = [
  { id: 'qr_menu', label: 'QR Code Instant Digital Menu (ለስልክ ፈጣን ዲጂታል ሜኑ)', price: 2500, days: 1 },
  { id: 'fasting_toggle', label: 'Fasting & Non-Fasting (የጾም / የፍስክ) Filter Switch', price: 2000, days: 1 },
  { id: 'whatsapp_orders', label: 'WhatsApp & Telegram Direct Order Button (ቀጥታ ማዘዣ)', price: 2000, days: 1 },
  { id: 'table_booking', label: 'Table Reservation & Party Booking Form (ጠረጴዛ ማስያዣ)', price: 2500, days: 1 },
  { id: 'photo_gallery', label: 'Food & Drink Photo Showcase with Prices (የምግብ ፎቶ ማሳያ)', price: 2000, days: 1 },
  { id: 'bilingual', label: 'Amharic & English Bilingual Menu (በአማርኛ እና በእንግሊዝኛ)', price: 3500, days: 2 },
  { id: 'admin_cms', label: 'Phone Admin: Edit Food Prices Anytime (የዋጋ መቀየሪያ ገጽ)', price: 3000, days: 1 },
  { id: 'maps_delivery', label: 'Google Maps Location & Delivery Guide (አድራሻ እና ዴሊቨሪ)', price: 1500, days: 1 },
];

export const BASE_INDUSTRY_PRICING = {
  'Habesha & Traditional Restaurant': { basePrice: 14000, baseDays: 4, desc: 'ባህላዊ ምግብ ቤት - Cultural coffee ceremony, fasting specials & table reservations' },
  'Café, Bakery & Breakfast': { basePrice: 9500, baseDays: 3, desc: 'ካፌ እና ኬክ ቤት - Coffee blends, morning pastries & quick digital menu' },
  'Fast Food, Burger & Pizza': { basePrice: 11000, baseDays: 3, desc: 'በርገር እና ፈጣን ምግብ - Quick takeaway ordering, combo deals & delivery' },
  'Lounge, Bar & Grill': { basePrice: 16500, baseDays: 5, desc: 'ላውንጅ እና ባር - VIP cabanas, cocktail bar & weekly night event lineup' },
  'Fine Dining & Hotel Restaurant': { basePrice: 22000, baseDays: 6, desc: 'ዘመናዊ ሆቴል ሬስቶራንት - Multi-course menu, wine pairings & luxury dining' },
  'Catering & Event Food Service': { basePrice: 13500, baseDays: 4, desc: 'የኬተሪንግ አገልግሎት - Buffet packages, wedding catering & custom quote requests' },
};
