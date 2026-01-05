import sharp from 'sharp';
import { readFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// Read SVG file
const svgBuffer = readFileSync(join(publicDir, 'favicon.svg'));

// Generate PWA icons
async function generateIcons() {
  console.log('Generating PWA icons...');

  // icon-192.png
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(join(publicDir, 'icon-192.png'));
  console.log('Created icon-192.png');

  // icon-512.png
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(join(publicDir, 'icon-512.png'));
  console.log('Created icon-512.png');

  // OGP image (1200x630) with white background
  const ogpWidth = 1200;
  const ogpHeight = 630;
  const iconSize = 300;

  // Create white background with centered icon
  const ogpBackground = await sharp({
    create: {
      width: ogpWidth,
      height: ogpHeight,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  }).png().toBuffer();

  // Resize SVG icon
  const iconBuffer = await sharp(svgBuffer)
    .resize(iconSize, iconSize)
    .png()
    .toBuffer();

  // Composite icon onto background
  await sharp(ogpBackground)
    .composite([
      {
        input: iconBuffer,
        left: Math.floor((ogpWidth - iconSize) / 2),
        top: Math.floor((ogpHeight - iconSize) / 2 - 50)
      },
      {
        input: Buffer.from(
          `<svg width="${ogpWidth}" height="${ogpHeight}">
            <text
              x="${ogpWidth / 2}"
              y="${ogpHeight / 2 + 130}"
              font-family="Arial, sans-serif"
              font-size="64"
              font-weight="bold"
              fill="#4CAF50"
              text-anchor="middle">
              TableConv
            </text>
            <text
              x="${ogpWidth / 2}"
              y="${ogpHeight / 2 + 190}"
              font-family="Arial, sans-serif"
              font-size="28"
              fill="#666666"
              text-anchor="middle">
              CSV / JSON / Markdown / HTML / TeX
            </text>
          </svg>`
        ),
        left: 0,
        top: 0
      }
    ])
    .png()
    .toFile(join(publicDir, 'ogp-image.png'));
  console.log('Created ogp-image.png');

  console.log('All icons generated successfully!');
}

generateIcons().catch(console.error);
