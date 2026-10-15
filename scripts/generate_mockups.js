const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'projects');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const projects = [
  { id: 'aura', title: 'Aura Luxury Retail', color: '#00F2FE', cat: 'e-Commerce' },
  { id: 'apex', title: 'Apex Capital Advisory', color: '#7F00FF', cat: 'Corporate & B2B' },
  { id: 'lumina', title: 'Lumina Bistro & Wine', color: '#F59E0B', cat: 'Hospitality' },
  { id: 'haven', title: 'Haven Estates', color: '#10B981', cat: 'Real Estate' },
  { id: 'pulse', title: 'PulseMetrics Suite', color: '#3B82F6', cat: 'SaaS Platform' },
  { id: 'forma', title: 'Studio Forma Architecture', color: '#EC4899', cat: 'Creative Studio' }
];

const devices = [
  { type: 'desktop', w: 1200, h: 675, label: '1920x1080 Viewport' },
  { type: 'tablet', w: 800, h: 600, label: '768px Tablet Frame' },
  { type: 'mobile', w: 420, h: 750, label: '375px Mobile View' }
];

projects.forEach(p => {
  devices.forEach(d => {
    const filename = `${p.id}_${d.type}.svg`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${d.w} ${d.h}" width="${d.w}" height="${d.h}">
  <defs>
    <linearGradient id="grad_${p.id}_${d.type}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B0F19"/>
      <stop offset="100%" stop-color="#141E34"/>
    </linearGradient>
  </defs>
  <rect width="${d.w}" height="${d.h}" fill="url(#grad_${p.id}_${d.type})"/>
  <rect x="0" y="0" width="${d.w}" height="40" fill="#070B16"/>
  <circle cx="20" cy="20" r="5" fill="#EF4444"/>
  <circle cx="36" cy="20" r="5" fill="#F59E0B"/>
  <circle cx="52" cy="20" r="5" fill="#10B981"/>
  <rect x="80" y="10" width="${Math.max(160, d.w - 180)}" height="20" rx="10" fill="#1A2338"/>
  <text x="95" y="24" font-family="monospace" font-size="10" fill="#94A3B8">https://hopeteams.com/showroom/${p.id}</text>
  
  <rect x="30" y="65" width="${d.w - 60}" height="140" rx="12" fill="#0F172A" stroke="${p.color}" stroke-opacity="0.3" stroke-width="1.5"/>
  <text x="55" y="110" font-family="sans-serif" font-weight="800" font-size="26" fill="#FFFFFF">${p.title}</text>
  <text x="55" y="140" font-family="monospace" font-size="14" fill="${p.color}">// ${p.cat} Showcase • ${d.label}</text>
  <text x="55" y="170" font-family="sans-serif" font-size="13" fill="#94A3B8">Precision engineered interactive showroom sample for HOPE Web Development</text>
  
  <rect x="30" y="225" width="${(d.w - 80) / 2}" height="120" rx="8" fill="#111C30" stroke="#1E293B"/>
  <rect x="50" y="245" width="60" height="12" rx="4" fill="${p.color}" opacity="0.8"/>
  <rect x="50" y="270" width="${(d.w - 160) / 2}" height="8" rx="4" fill="#334155"/>
  <rect x="50" y="290" width="${(d.w - 200) / 2}" height="8" rx="4" fill="#334155"/>

  <rect x="${40 + (d.w - 80) / 2}" y="225" width="${(d.w - 80) / 2}" height="120" rx="8" fill="#111C30" stroke="#1E293B"/>
  <rect x="${60 + (d.w - 80) / 2}" y="245" width="60" height="12" rx="4" fill="#7F00FF" opacity="0.8"/>
  <rect x="${60 + (d.w - 80) / 2}" y="270" width="${(d.w - 160) / 2}" height="8" rx="4" fill="#334155"/>
  <rect x="${60 + (d.w - 80) / 2}" y="290" width="${(d.w - 200) / 2}" height="8" rx="4" fill="#334155"/>
</svg>`;
    fs.writeFileSync(path.join(dir, filename), svg, 'utf-8');
  });
});

console.log('Successfully generated all 18 mockups in public/projects');
