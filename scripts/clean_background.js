const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processImage() {
  const inputPath = 'C:/Users/abasi/.gemini/antigravity/brain/42bc1247-917e-41cd-b1cc-0accbd6eff51/.user_uploaded/media_1791394489272.jpg';
  const outputPath = 'c:/Users/abasi/OneDrive/Desktop/TheInevitable/public/images/hero-promo.png';

  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels; // 4 (RGBA)

  console.log(`Image size: ${width}x${height}`);

  // Flood fill or boundary transparency detection starting from corners (0,0), (width-1, 0), etc.
  const visited = new Uint8Array(width * height);
  const queue = [];

  function isBackgroundPixel(r, g, b) {
    // Checkerboard colors: white and light grey (high brightness, low saturation/neutral)
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;

    // Check if it's near-white or near-neutral grey in the range (180..255)
    if (r > 170 && g > 170 && b > 170 && diff < 30) {
      return true;
    }
    return false;
  }

  // Push outer border pixels to queue
  for (let x = 0; x < width; x++) {
    queue.push(x, 0);
    queue.push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    queue.push(0, y);
    queue.push(width - 1, y);
  }

  let head = 0;
  while (head < queue.length) {
    const x = queue[head++];
    const y = queue[head++];

    if (x < 0 || x >= width || y < 0 || y >= height) continue;
    const idx = y * width + x;
    if (visited[idx]) continue;
    visited[idx] = 1;

    const pixelIdx = idx * 4;
    const r = data[pixelIdx];
    const g = data[pixelIdx + 1];
    const b = data[pixelIdx + 2];

    if (isBackgroundPixel(r, g, b)) {
      // Make transparent
      data[pixelIdx + 3] = 0;

      // Add 4-neighbors
      if (x > 0) { queue.push(x - 1, y); }
      if (x < width - 1) { queue.push(x + 1, y); }
      if (y > 0) { queue.push(x, y - 1); }
      if (y < height - 1) { queue.push(x, y + 1); }
    }
  }

  await sharp(data, {
    raw: {
      width,
      height,
      channels: 4
    }
  })
  .png()
  .toFile(outputPath);

  console.log(`Saved transparent PNG to ${outputPath}`);
}

processImage().catch(console.error);
