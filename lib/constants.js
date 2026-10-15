export const INDUSTRY_CATEGORIES = [
  'All Projects',
  'e-Commerce',
  'Corporate & B2B',
  'Restaurant & Hospitality',
  'Real Estate & Property',
  'SaaS & Web Apps',
  'Creative & Portfolio',
];

export const ESTIMATOR_MODULES = [
  { id: 'cms', label: 'Custom Content Admin Gateway', price: 150, days: 2 },
  { id: 'payments', label: 'Payment Gateway (Stripe/Local)', price: 300, days: 3 },
  { id: 'booking', label: 'Live Booking / Appointment System', price: 200, days: 2 },
  { id: 'multilingual', label: 'Multilingual / Multi-currency', price: 250, days: 2 },
  { id: 'blog', label: 'SEO Blog & Article Architecture', price: 150, days: 1 },
  { id: 'animations', label: 'High-End Fluid Micro-interactions', price: 200, days: 2 },
  { id: 'auth', label: 'Client Member Portal & Auth', price: 350, days: 3 },
];

export const BASE_INDUSTRY_PRICING = {
  'e-Commerce': { basePrice: 1100, baseDays: 7 },
  'Corporate & B2B': { basePrice: 800, baseDays: 5 },
  'Restaurant & Hospitality': { basePrice: 650, baseDays: 4 },
  'Real Estate & Property': { basePrice: 950, baseDays: 6 },
  'SaaS & Web Apps': { basePrice: 1300, baseDays: 8 },
  'Creative & Portfolio': { basePrice: 700, baseDays: 4 },
};
