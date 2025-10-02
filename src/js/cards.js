const CARDS_API = "https://test.smarto.agency/smarto_complexes_list.json";
const cardsContainer = document.querySelector("#cards-container");
const loadMoreBtn = document.querySelector("#load-more-btn");
const filterItems = document.querySelectorAll(".filter-item");

let cardsData = [];
let filteredData = [];
let cardLoaded = 0;
const CARDS_PER_LOAD = 3;

// Для діагностики: подивимось, які типи карток приходять з API
function logTypesSample() {
  const types = Array.from(
    new Set(cardsData.map((c) => (c.type || "").toString().trim()))
  );
  console.log("Available card types (sample):", types);
}

// Функція для створення HTML-картки
function createCard(card) {
  return `
        <div class="card-wrapper">
            <div class="card">
                <div class="card-head">
                    <p class="card-year">${card.year + " р." || ""}</p>
                    <div class="card-type-wrapper">
                        <p class="card-type">${card.type || ""}</p>
                    </div>                
                </div>
                <div class="card-images">
                    <img src='${card.img || "#"}' alt='${
    card.name || ""
  }' class="card-img" />
                </div>
                <div class="card-name">${card.name || ""}</div>
                <div class="card-address">${card.adress || ""}</div>
                <div class="card-tags">
                    Види робіт:
                    <p class="tag">${(card.tags || []).join(`, `)}</p>
                </div>        
            </div>
            <div class="card-decoration-bottom">
                <img src="../img/Down.svg" alt='' class="decoration-bottom" />
            </div>
        </div>
    `;
}

function applyFilter(type) {
  if (type === "Усі") {
    filteredData = cardsData;
  } else {
    filteredData = cardsData.filter((card) => card.type === type);
  }
  cardLoaded = 0;
  cardsContainer.innerHTML = ""; // очистити попередні картки
  renderCards();
}

// Функція для рендеру карток
function renderCards() {
  const nextCards = filteredData.slice(cardLoaded, cardLoaded + CARDS_PER_LOAD);
  //   nextCards.forEach((card) => {
  //     cardsContainer.insertAdjacentHTML("beforeend", createCard(card));
  //   });
  nextCards.forEach((card) => {
    const temp = document.createElement("div");
    temp.innerHTML = createCard(card);
    const cardEl = temp.firstElementChild;
    cardsContainer.appendChild(cardEl);

    // таймаут, щоб браузер встиг намалювати елемент
    requestAnimationFrame(() => {
      cardEl.classList.add("show");
    });
  });
  cardLoaded += nextCards.length;
  if (cardLoaded >= filteredData.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }
}

filterItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Підсвітити активний фільтр
    filterItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");

    const label = item.textContent.trim();
    console.log("Filter clicked:", label);
    applyFilter(label);
  });
});

// Завантаження даних з API
fetch(CARDS_API)
  .then((res) => res.json())
  .then((data) => {
    cardsData = data;
    filteredData = cardsData;
    renderCards();
  })
  .catch(() => {
    cardsContainer.innerHTML = "<p>Не вдалося завантажити картки :(</p>";
    loadMoreBtn.style.display = "none";
  });

// Обробник кнопки "Завантажити ще"
loadMoreBtn.addEventListener("click", renderCards);
