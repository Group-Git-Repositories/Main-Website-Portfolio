const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'projects');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const projects = [
  {
    id: 'aura',
    title: 'Shop & Product Catalog',
    tagline: 'Modern online product catalog with direct WhatsApp ordering',
    color: '#0284C7',
    lightBg: '#F0F9FF',
    badge: 'Fast Static Store',
    cards: [
      { name: 'Handmade Leather Bag', price: '2,400 Birr' },
      { name: 'Minimalist Wristwatch', price: '3,800 Birr' },
      { name: 'Canvas Travel Pack', price: '2,900 Birr' }
    ]
  },
  {
    id: 'apex',
    title: 'Business & Office Profile',
    tagline: 'Professional company presence for consultancies & firms',
    color: '#4F46E5',
    lightBg: '#EEF2FF',
    badge: 'Corporate Profile',
    cards: [
      { name: 'Strategic Advisory', price: 'Consulting' },
      { name: 'Corporate Compliance', price: 'Advisory' },
      { name: 'Financial Planning', price: 'Tax & Audit' }
    ]
  },
  {
    id: 'lumina',
    title: 'Café & Restaurant Menu',
    tagline: 'Instant mobile food and drink menu with table reservation',
    color: '#D97706',
    lightBg: '#FFFBEB',
    badge: 'Mobile Food & Drinks',
    cards: [
      { name: 'Signature Coffee Roast', price: '95 Birr' },
      { name: 'Artisan Woodfire Pizza', price: '480 Birr' },
      { name: 'Grilled Herb Chicken', price: '540 Birr' }
    ]
  },
  {
    id: 'haven',
    title: 'Real Estate & Rentals',
    tagline: 'Clean property listings with direct agent WhatsApp inquiry',
    color: '#059669',
    lightBg: '#ECFDF5',
    badge: 'Property Showcase',
    cards: [
      { name: 'Bole Modern Apartment', price: '45,000 Birr/mo' },
      { name: 'CMC Family Villa', price: '14,000,000 Birr' },
      { name: 'Kazanchis Commercial Space', price: '350 Birr/sqm' }
    ]
  },
  {
    id: 'pulse',
    title: 'App & Software Showcase',
    tagline: 'High-converting software landing page with live feature tour',
    color: '#2563EB',
    lightBg: '#EFF6FF',
    badge: 'SaaS Platform',
    cards: [
      { name: 'Real-time Telemetry', price: 'Instant Speed' },
      { name: 'Automated Invoicing', price: 'Finance Sync' },
      { name: 'Multi-User Roles', price: 'Admin Control' }
    ]
  },
  {
    id: 'forma',
    title: 'Creative & Personal Portfolio',
    tagline: 'Minimalist visual showcase that puts your best work first',
    color: '#DB2777',
    lightBg: '#FDF2F8',
    badge: 'Visual Portfolio',
    cards: [
      { name: 'Urban Architecture', price: 'Residential' },
      { name: 'Brand Identity Design', price: 'Branding' },
      { name: 'Interior Spatial Layout', price: 'Hospitality' }
    ]
  }
];

const devices = [
  { type: 'desktop', w: 1200, h: 720 },
  { type: 'tablet', w: 800, h: 600 },
  { type: 'mobile', w: 420, h: 750 }
];

projects.forEach(p => {
  devices.forEach(d => {
    const filename = `${p.id}_${d.type}.svg`;
    let body = '';

    if (d.type === 'desktop') {
      body = `
  <!-- Top Browser Frame -->
  <rect width="1200" height="44" fill="#F1F5F9" stroke="#E2E8F0" stroke-width="1"/>
  <circle cx="24" cy="22" r="5.5" fill="#EF4444"/>
  <circle cx="42" cy="22" r="5.5" fill="#F59E0B"/>
  <circle cx="60" cy="22" r="5.5" fill="#10B981"/>
  <rect x="90" y="9" width="460" height="26" rx="6" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
  <text x="110" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#64748B">https://hopeteams.com/showroom/${p.id}</text>
  
  <!-- Website Header -->
  <rect x="0" y="44" width="1200" height="56" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
  <circle cx="50" cy="72" r="12" fill="${p.color}"/>
  <text x="70" y="77" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="15" fill="#0F172A">${p.title}</text>
  <text x="780" y="76" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="#64748B">Home   •   About   •   Catalog   •   Contact</text>
  <rect x="1060" y="58" width="100" height="28" rx="6" fill="${p.color}"/>
  <text x="1084" y="76" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="12" fill="#FFFFFF">Inquire</text>

  <!-- Website Hero Area -->
  <rect x="0" y="100" width="1200" height="260" fill="${p.lightBg}"/>
  <rect x="50" y="130" width="140" height="24" rx="12" fill="#FFFFFF" stroke="${p.color}" stroke-opacity="0.4"/>
  <text x="65" y="146" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="11" fill="${p.color}">// ${p.badge}</text>
  <text x="50" y="195" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="34" fill="#0F172A">${p.title}</text>
  <text x="50" y="230" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" fill="#475569">${p.tagline}</text>

  <rect x="50" y="260" width="140" height="38" rx="8" fill="${p.color}"/>
  <text x="80" y="284" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="13" fill="#FFFFFF">Explore Catalog</text>
  <rect x="205" y="260" width="130" height="38" rx="8" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5"/>
  <text x="238" y="284" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="13" fill="#334155">Contact Us</text>

  <!-- 3 Feature / Product Cards Grid -->
  <rect x="0" y="360" width="1200" height="360" fill="#FFFFFF"/>
  <text x="50" y="405" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="20" fill="#0F172A">Featured Highlights</text>

  <!-- Card 1 -->
  <rect x="50" y="430" width="345" height="240" rx="12" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5"/>
  <rect x="50" y="430" width="345" height="130" rx="12" fill="${p.lightBg}"/>
  <circle cx="222" cy="495" r="28" fill="${p.color}" opacity="0.2"/>
  <circle cx="222" cy="495" r="14" fill="${p.color}"/>
  <text x="70" y="590" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="15" fill="#0F172A">${p.cards[0].name}</text>
  <text x="70" y="615" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="13" fill="${p.color}">${p.cards[0].price}</text>
  <rect x="290" y="585" width="85" height="28" rx="6" fill="${p.color}"/>
  <text x="312" y="603" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="11" fill="#FFFFFF">Order</text>

  <!-- Card 2 -->
  <rect x="425" y="430" width="345" height="240" rx="12" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5"/>
  <rect x="425" y="430" width="345" height="130" rx="12" fill="${p.lightBg}"/>
  <circle cx="597" cy="495" r="28" fill="${p.color}" opacity="0.2"/>
  <circle cx="597" cy="495" r="14" fill="${p.color}"/>
  <text x="445" y="590" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="15" fill="#0F172A">${p.cards[1].name}</text>
  <text x="445" y="615" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="13" fill="${p.color}">${p.cards[1].price}</text>
  <rect x="665" y="585" width="85" height="28" rx="6" fill="${p.color}"/>
  <text x="687" y="603" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="11" fill="#FFFFFF">Order</text>

  <!-- Card 3 -->
  <rect x="800" y="430" width="350" height="240" rx="12" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5"/>
  <rect x="800" y="430" width="350" height="130" rx="12" fill="${p.lightBg}"/>
  <circle cx="975" cy="495" r="28" fill="${p.color}" opacity="0.2"/>
  <circle cx="975" cy="495" r="14" fill="${p.color}"/>
  <text x="820" y="590" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="15" fill="#0F172A">${p.cards[2].name}</text>
  <text x="820" y="615" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="13" fill="${p.color}">${p.cards[2].price}</text>
  <rect x="1045" y="585" width="85" height="28" rx="6" fill="${p.color}"/>
  <text x="1067" y="603" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="11" fill="#FFFFFF">Order</text>
`;
    } else if (d.type === 'tablet') {
      body = `
  <!-- Tablet Frame -->
  <rect width="800" height="40" fill="#F1F5F9" stroke="#E2E8F0" stroke-width="1"/>
  <circle cx="20" cy="20" r="5" fill="#EF4444"/>
  <circle cx="36" cy="20" r="5" fill="#F59E0B"/>
  <circle cx="52" cy="20" r="5" fill="#10B981"/>
  <rect x="80" y="8" width="400" height="24" rx="6" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
  <text x="96" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" fill="#64748B">https://hopeteams.com/showroom/${p.id}</text>
  
  <rect x="0" y="40" width="800" height="50" fill="#FFFFFF" stroke="#E2E8F0"/>
  <circle cx="35" cy="65" r="10" fill="${p.color}"/>
  <text x="55" y="70" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="14" fill="#0F172A">${p.title}</text>
  
  <rect x="0" y="90" width="800" height="210" fill="${p.lightBg}"/>
  <rect x="35" y="115" width="130" height="22" rx="11" fill="#FFFFFF" stroke="${p.color}" stroke-opacity="0.4"/>
  <text x="48" y="130" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="10" fill="${p.color}">// ${p.badge}</text>
  <text x="35" y="170" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="26" fill="#0F172A">${p.title}</text>
  <text x="35" y="198" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="#475569">${p.tagline}</text>
  
  <rect x="35" y="225" width="120" height="34" rx="6" fill="${p.color}"/>
  <text x="55" y="246" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="11" fill="#FFFFFF">View Details</text>

  <!-- 2 Tablet Cards -->
  <rect x="0" y="300" width="800" height="300" fill="#FFFFFF"/>
  <rect x="35" y="330" width="350" height="220" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5"/>
  <rect x="35" y="330" width="350" height="120" rx="10" fill="${p.lightBg}"/>
  <circle cx="210" cy="390" r="20" fill="${p.color}"/>
  <text x="50" y="480" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="14" fill="#0F172A">${p.cards[0].name}</text>
  <text x="50" y="505" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="12" fill="${p.color}">${p.cards[0].price}</text>

  <rect x="415" y="330" width="350" height="220" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5"/>
  <rect x="415" y="330" width="350" height="120" rx="10" fill="${p.lightBg}"/>
  <circle cx="590" cy="390" r="20" fill="${p.color}"/>
  <text x="430" y="480" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="14" fill="#0F172A">${p.cards[1].name}</text>
  <text x="430" y="505" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="12" fill="${p.color}">${p.cards[1].price}</text>
`;
    } else {
      body = `
  <!-- Mobile Frame -->
  <rect width="420" height="36" fill="#F1F5F9" stroke="#E2E8F0"/>
  <circle cx="20" cy="18" r="4" fill="#EF4444"/>
  <circle cx="32" cy="18" r="4" fill="#F59E0B"/>
  <circle cx="44" cy="18" r="4" fill="#10B981"/>
  <rect x="65" y="7" width="280" height="22" rx="5" fill="#FFFFFF" stroke="#CBD5E1"/>
  <text x="80" y="21" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" fill="#64748B">hopeteams.com/${p.id}</text>
  
  <rect x="0" y="36" width="420" height="46" fill="#FFFFFF" stroke="#E2E8F0"/>
  <circle cx="25" cy="59" r="8" fill="${p.color}"/>
  <text x="40" y="63" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="13" fill="#0F172A">${p.title}</text>
  
  <rect x="0" y="82" width="420" height="240" fill="${p.lightBg}"/>
  <rect x="25" y="105" width="120" height="20" rx="10" fill="#FFFFFF" stroke="${p.color}" stroke-opacity="0.4"/>
  <text x="35" y="119" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="9" fill="${p.color}">// ${p.badge}</text>
  <text x="25" y="155" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="22" fill="#0F172A">${p.title}</text>
  <text x="25" y="180" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#475569">${p.tagline}</text>
  <rect x="25" y="215" width="120" height="34" rx="6" fill="${p.color}"/>
  <text x="48" y="236" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="11" fill="#FFFFFF">Order Now</text>

  <!-- Mobile Card -->
  <rect x="0" y="322" width="420" height="428" fill="#FFFFFF"/>
  <rect x="25" y="345" width="370" height="170" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5"/>
  <rect x="25" y="345" width="370" height="90" rx="10" fill="${p.lightBg}"/>
  <circle cx="210" cy="390" r="16" fill="${p.color}"/>
  <text x="40" y="465" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="13" fill="#0F172A">${p.cards[0].name}</text>
  <text x="40" y="490" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="11" fill="${p.color}">${p.cards[0].price}</text>

  <rect x="25" y="530" width="370" height="170" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5"/>
  <rect x="25" y="530" width="370" height="90" rx="10" fill="${p.lightBg}"/>
  <circle cx="210" cy="575" r="16" fill="${p.color}"/>
  <text x="40" y="650" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="13" fill="#0F172A">${p.cards[1].name}</text>
  <text x="40" y="675" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="11" fill="${p.color}">${p.cards[1].price}</text>
`;
    }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${d.w} ${d.h}" width="${d.w}" height="${d.h}">
  <rect width="${d.w}" height="${d.h}" fill="#FFFFFF"/>
  ${body}
</svg>`;

    fs.writeFileSync(path.join(dir, filename), svg, 'utf-8');
  });
});

console.log('Successfully regenerated all 18 bright, modern website mockups in public/projects');
