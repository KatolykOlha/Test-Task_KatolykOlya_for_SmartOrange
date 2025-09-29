// copy-images.js
const fs = require("fs");

fs.copyFileSync(
  "src/img/hero-slider_bg_1.png",
  "dist/img/hero-slider_bg_1.png"
);
fs.copyFileSync(
  "src/img/hero-slider_bg_2.png",
  "dist/img/hero-slider_bg_2.png"
);
fs.copyFileSync(
  "src/img/footer-group-pictures.png",
  "dist/img/footer-group-pictures.png"
);

// Запуск такого файлу: node copy-images.js

// // Якщо файлів багато, можна використати цикл:
// // copy-images.js
// const fs = require('fs');

// const files = [
//   'hero-slider_bg_1.png',
//   'hero-slider_bg_2.png',
//   'Icon_instagram.svg'
// ];

// files.forEach(file => {
//   fs.copyFileSync(`src/img/${file}`, `dist/img/${file}`);
// });
