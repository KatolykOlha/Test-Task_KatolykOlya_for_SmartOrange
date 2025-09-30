const CARDS_API = "https://test.smarto.agency/smarto_complexes_list.json";
const cardsContainer = document.querySelector("#cards-container");
const loadMoreBtn = document.querySelector("#load-more-btn");

let cardsData = [];
let cardLoaded = 0;
const CARDS_PER_LOAD = 3;

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

// Функція для рендеру карток
function renderCards() {
  const nextCards = cardsData.slice(cardLoaded, cardLoaded + CARDS_PER_LOAD);
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
  if (cardLoaded >= cardsData.length) {
    loadMoreBtn.style.display = "none";
  }
}

// Завантаження даних з API
fetch(CARDS_API)
  .then((res) => res.json())
  .then((data) => {
    cardsData = data;
    renderCards();
  })
  .catch(() => {
    cardsContainer.innerHTML = "<p>Не вдалося завантажити картки :(</p>";
    loadMoreBtn.style.display = "none";
  });

// Обробник кнопки "Завантажити ще"
loadMoreBtn.addEventListener("click", renderCards);
