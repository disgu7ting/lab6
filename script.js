/* ========================================================
   Кнопка “Наверх”
======================================================== */
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
scrollTopBtn.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

/* ========================================================
   Аккордеон
======================================================== */
document.querySelectorAll(".accordion-item").forEach(item => {
  item.querySelector(".accordion-title").addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

/* ========================================================
   Фильтрация галереи
======================================================== */
const filterButtons = document.querySelectorAll(".filter");
const galleryImgs = document.querySelectorAll(".gallery img");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    let cat = btn.dataset.category;

    galleryImgs.forEach(img => {
      img.style.display = (cat === "all" || img.dataset.category === cat)
        ? "block"
        : "none";
    });
  });
});

/* ========================================================
   Модальное окно
======================================================== */
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");

galleryImgs.forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;
  });
});

document.querySelector(".close").onclick = () => {
  modal.style.display = "none";
};

/* ========================================================
   Dark / Light theme localStorage
======================================================== */
const themeToggle = document.getElementById("themeToggle");

// Применяем тему из localStorage при загрузке
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
} else {
  document.body.classList.remove("dark");
}

// Переключение темы
themeToggle.onclick = () => {
  document.body.classList.toggle("dark");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
};


/* ========================================================
   ОТЗЫВЫ — стабильный API
   Используем: https://dummyjson.com/quotes/random
======================================================== */
const reviewBox = document.getElementById("reviews");
const newReviewsBtn = document.getElementById("newReviewsBtn");

async function loadReview() {
  reviewBox.innerHTML = "Загрузка...";

  try {
    const res = await fetch("https://dummyjson.com/quotes/random");
    const data = await res.json();

    reviewBox.innerHTML = `
      <p style="font-size:18px;"><i>"${data.quote}"</i></p>
      <p><b>— ${data.author}</b></p>
    `;
  } catch {
    reviewBox.innerHTML = "Ошибка загрузки...";
  }
}

newReviewsBtn.onclick = loadReview;
loadReview();

/* ========================================================
   API галерея (Picsum)
======================================================== */
const imagesDiv = document.getElementById("images");
const loadImagesBtn = document.getElementById("loadImagesBtn");

async function loadImages() {
  imagesDiv.innerHTML = "Загрузка...";

  let html = "";

  for (let i = 0; i < 6; i++) {
    html += `<img src="https://picsum.photos/300?random=${Math.random()}">`;
  }

  imagesDiv.innerHTML = html;
}

loadImagesBtn.onclick = loadImages;
loadImages();
