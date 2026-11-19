// dark-luxury/lightbox.js
// Универсальный лайтбокс для галереи "до/после".
// Работает за счёт делегирования: ловит клик по ЛЮБОМУ img внутри .res-photo,
// поэтому одинаково работает на главной (app.js) и на страницах процедур (smas.html).
// Ничего настраивать здесь не нужно.

(function () {
  let overlay = null;      // DOM-оверлей (создаётся один раз при первом клике)
  let imgEl = null;
  let capEl = null;
  let list = [];           // массив <img> текущей галереи для листания
  let idx = 0;             // индекс открытого сейчас кадра

  // Собираем "свою" галерею вокруг кликнутого фото: сначала сетка категории,
  // потом блок категории, потом любой контейнер — чтобы стрелки листали
  // только кадры этой процедуры, а не весь сайт.
  function collectScope(img) {
    const scope =
      img.closest(".res-grid") ||
      img.closest(".res-cat") ||
      img.closest(".res-block") ||
      img.closest(".proc-gallery");
    if (!scope) return [img];
    const all = Array.prototype.slice.call(scope.querySelectorAll(".res-photo img"));
    return all.length ? all : [img];
  }

  function build() {
    overlay = document.createElement("div");
    overlay.id = "lb-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.innerHTML =
      '<button id="lb-close" type="button" aria-label="Закрыть">&#10005;</button>' +
      '<button id="lb-prev" type="button" aria-label="Предыдущее">&#10094;</button>' +
      '<img id="lb-img" alt="" />' +
      '<button id="lb-next" type="button" aria-label="Следующее">&#10095;</button>' +
      '<div id="lb-caption"></div>';
    document.body.appendChild(overlay);

    imgEl = overlay.querySelector("#lb-img");
    capEl = overlay.querySelector("#lb-caption");

    // Клик по тёмному фону (не по картинке и не по кнопкам) -> закрыть
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close();
    });
    overlay.querySelector("#lb-close").addEventListener("click", close);
    overlay.querySelector("#lb-prev").addEventListener("click", function () { step(-1); });
    overlay.querySelector("#lb-next").addEventListener("click", function () { step(1); });

    // Клавиатура: Esc закрыть, стрелки листать (только когда окно открыто)
    document.addEventListener("keydown", function (e) {
      if (!overlay.classList.contains("active")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    });
  }

  function show(i) {
    idx = (i + list.length) % list.length;
    const src = list[idx].getAttribute("src");
    // подпись: из figcaption карточки, иначе из alt
    const fig = list[idx].closest(".res-photo");
    const cap = fig ? fig.querySelector("figcaption") : null;
    imgEl.src = src;
    imgEl.alt = list[idx].alt || "";
    capEl.textContent = cap ? cap.textContent : (list[idx].alt || "");
    // лёгкая анимация смены кадра
    imgEl.style.transform = "scale(.97)";
    imgEl.style.opacity = ".4";
    requestAnimationFrame(function () {
      imgEl.style.transform = "scale(1)";
      imgEl.style.opacity = "1";
    });
  }

  function open(img) {
    if (!overlay) build();
    list = collectScope(img);
    idx = list.indexOf(img);
    if (idx < 0) idx = 0;
    show(idx);
    overlay.classList.add("active");
    document.body.style.overflow = "hidden"; // блокируем скролл страницы
  }

  function close() {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function step(dir) {
    if (list.length < 2) return;
    show(idx + dir);
  }

  // Единственный слушатель на весь документ — делегирование
  document.addEventListener("click", function (e) {
    const img = e.target.closest(".res-photo img");
    if (img) open(img);
  });
})();