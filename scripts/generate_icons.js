const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const iconsDir = path.join(process.cwd(), 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

function getStandardSvg(size) {
  const orange = '#BD3C0D';
  const green = '#062D26';
  const gold = '#FFBD3E';
  
  return `
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#083830" />
        <stop offset="100%" stop-color="${green}" />
      </linearGradient>
      <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#D84315" />
        <stop offset="100%" stop-color="${orange}" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="${size * 0.03}" stdDeviation="${size * 0.04}" flood-color="rgba(0,0,0,0.45)"/>
      </filter>
    </defs>
    
    <!-- Background -->
    <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="url(#bgGrad)"/>
    
    <!-- Inner Orange Badge -->
    <rect x="${size * 0.16}" y="${size * 0.16}" width="${size * 0.68}" height="${size * 0.68}" rx="${size * 0.18}" fill="url(#orangeGrad)" filter="url(#shadow)" stroke="${gold}" stroke-width="${size * 0.015}" stroke-opacity="0.4"/>
    
    <!-- Text '24' -->
    <text x="50%" y="${size * 0.52}" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="${size * 0.35}" font-weight="900" letter-spacing="-0.05em">24</text>
    
    <!-- Text 'FLAVOURS' -->
    <text x="50%" y="${size * 0.72}" text-anchor="middle" fill="${gold}" font-family="system-ui, -apple-system, sans-serif" font-size="${size * 0.075}" font-weight="900" letter-spacing="0.22em">FLAVOURS</text>
  </svg>
  `;
}

function getMaskableSvg(size) {
  const orange = '#BD3C0D';
  const green = '#062D26';
  const gold = '#FFBD3E';
  
  return `
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="maskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#083830" />
        <stop offset="100%" stop-color="${green}" />
      </linearGradient>
      <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#D84315" />
        <stop offset="100%" stop-color="${orange}" />
      </linearGradient>
      <filter id="shadowM" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="${size * 0.02}" stdDeviation="${size * 0.03}" flood-color="rgba(0,0,0,0.4)"/>
      </filter>
    </defs>
    
    <!-- Full bleed background for maskable (no rounded corners) -->
    <rect width="${size}" height="${size}" fill="url(#maskGrad)"/>
    
    <!-- Inner Orange Badge contained inside safe zone (0.22 to 0.78) -->
    <rect x="${size * 0.22}" y="${size * 0.22}" width="${size * 0.56}" height="${size * 0.56}" rx="${size * 0.15}" fill="url(#orangeGrad)" filter="url(#shadowM)" stroke="${gold}" stroke-width="${size * 0.012}" stroke-opacity="0.4"/>
    
    <!-- Text '24' within safe zone -->
    <text x="50%" y="${size * 0.51}" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="${size * 0.29}" font-weight="900" letter-spacing="-0.05em">24</text>
    
    <!-- Text 'FLAVOURS' -->
    <text x="50%" y="${size * 0.68}" text-anchor="middle" fill="${gold}" font-family="system-ui, -apple-system, sans-serif" font-size="${size * 0.065}" font-weight="900" letter-spacing="0.22em">FLAVOURS</text>
  </svg>
  `;
}

async function generate() {
  const sizes = [
    { name: 'icon-192.png', size: 192, maskable: false },
    { name: 'icon-512.png', size: 512, maskable: false },
    { name: 'icon-maskable-192.png', size: 192, maskable: true },
    { name: 'icon-maskable-512.png', size: 512, maskable: true },
    { name: 'apple-touch-icon.png', size: 180, maskable: false },
    { name: 'favicon-32.png', size: 32, maskable: false }
  ];

  for (const item of sizes) {
    const svg = item.maskable ? getMaskableSvg(item.size) : getStandardSvg(item.size);
    const dest = path.join(iconsDir, item.name);
    await sharp(Buffer.from(svg)).png().toFile(dest);
    console.log(`Generated: ${item.name} (${item.size}x${item.size})`);
  }
}

generate().then(() => console.log('All icons generated successfully!'));
