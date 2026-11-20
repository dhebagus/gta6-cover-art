// Wires the page: pick a photo, type a caption, export the square cover as a PNG.
import { drawCover } from './cover.js';

const canvas = document.getElementById('cover');
const caption = document.getElementById('caption');
const status = document.getElementById('status');
const photos = [null, null, null];

function redraw() {
  drawCover(canvas, photos, caption.value);
}

/** Loads an image from a URL, resolving to the image once it can be drawn. */
export function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

[1, 2, 3].forEach((i) => {
  document.getElementById(`photo${i}`).addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    photos[i - 1] = await loadImage(URL.createObjectURL(file));
    redraw();
  });
});

caption.addEventListener('input', redraw);
document.getElementById('export').addEventListener('click', () => {
  canvas.toBlob((blob) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'gta6-cover.png';
    a.click();
    status.textContent = 'Saved gta6-cover.png';
  }, 'image/png');
});

redraw();