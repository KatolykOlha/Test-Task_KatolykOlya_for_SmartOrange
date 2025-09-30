// Слайдер у хедері
const heroImages = [
  "img/hero-slider_bg_1.png",
  "img/hero-slider_bg_2.png",
  "img/25_Alex_Lion_cover3.jpg",
];

let currentIndex = 0;

const heroImg = document.querySelector(".hero__img");
const leftArrow = document.querySelector(".hero-slider_arrow-left");
const rightArrow = document.querySelector(".hero-slider_arrow-right");

function showImage(index) {
  heroImg.src = heroImages[index];
}

leftArrow.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + heroImages.length) % heroImages.length;
  showImage(currentIndex);
});

rightArrow.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % heroImages.length;
  showImage(currentIndex);
});

// Автоматична зміна картинки кожні 4 секунди (4000 мс)
setInterval(() => {
  currentIndex = (currentIndex + 1) % heroImages.length;
  showImage(currentIndex);
}, 4000);

// Початковий показ
showImage(currentIndex);
