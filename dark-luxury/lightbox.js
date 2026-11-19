// dark-luxury/lightbox.js
// Универсальный лайтбокс для галереи "до/после" + полная поддержка тач-устройств.
// Делегирование: ловит клик по ЛЮБОМУ img внутри .res-photo (главная и страницы процедур).
// На телефоне: свайп влево/вправо = листать, свайп вниз = закрыть, тап по тёмному фону = закрыть.
// Ничего настраивать здесь не нужно.

(function () {
  let overlay = null, imgEl = null, capEl = null;
  let list = [], idx = 0;
  let scrollY = 0;            // запоминаем позицию скролла (фикс прыжка на iOS)
  let swiped = false;         // флаг: был свайп -> не считаем это кликом по фону

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

    // Тап/клик по тёмному фону -> закрыть (но не после свайпа)
    overlay.addEventListener("click", function (e) {
      if (swiped) { swiped = false; return; }
      if (e.target === overlay) close();
    });
    overlay.querySelector("#lb-close").addEventListener("click", close);
    overlay.querySelector("#lb-prev").addEventListener("click", function () { step(-1); });
    overlay.querySelector("#lb-next").addEventListener("click", function () { step(1); });

    // Клавиатура (десктоп)
    document.addEventListener("keydown", function (e) {
      if (!overlay.classList.contains("active")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    });

    // --- ТАЧ: свайпы ---
    let sx = 0, sy = 0, st = 0, tracking = false;
    const H = 50, V = 80; // пороги px

    overlay.addEventListener("touchstart", function (e) {
      if (e.touches.length !== 1) return;
      tracking = true; swiped = false;
      sx = e.touches[0].clientX; sy = e.touches[0].clientY; st = Date.now();
    }, { passive: true });

    overlay.addEventListener("touchmove", function (e) {
      if (!tracking) return;
      // гасим системный скролл/bounce во время свайпа по оверлею
      if (e.cancelable) e.preventDefault();
    }, { passive: false });

    overlay.addEventListener("touchend", function (e) {
      if (!tracking) return;
      tracking = false;
      const t = e.changedTouches[0];
      const dx = t.clientX - sx, dy = t.clientY - sy, dt = Date.now() - st;
      if (dt > 600 && Math.abs(dx) < H && Math.abs(dy) < V) return; // долгое зажатие = не свайп
      if (Math.abs(dx) > Math.abs(dy)) {
        if (Math.abs(dx) >= H) { swiped = true; step(dx < 0 ? 1 : -1); }
      } else {
        if (dy >= V) { swiped = true; close(); } // свайп вниз = закрыть
      }
    }, { passive: true });
  }

  function show(i) {
    idx = (i + list.length) % list.length;
    imgEl.src = list[idx].getAttribute("src");
    imgEl.alt = list[idx].alt || "";
    const fig = list[idx].closest(".res-photo");
    const cap = fig ? fig.querySelector("figcaption") : null;
    capEl.textContent = cap ? cap.textContent : (list[idx].alt || "");
    imgEl.style.transform = "scale(.97)";
    imgEl.style.opacity = ".4";
    requestAnimationFrame(function () {
      imgEl.style.transform = "scale(1)";
      imgEl.style.opacity = "1";
    });
  }

  function lockScroll() {
    scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    document.body.style.position = "fixed";
    document.body.style.top = -scrollY + "px";
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
  }
  function unlockScroll() {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    window.scrollTo(0, scrollY); // возвращаем позицию -> нет прыжка на iOS
  }

  function open(img) {
    if (!overlay) build();
    list = collectScope(img);
    idx = list.indexOf(img); if (idx < 0) idx = 0;
    show(idx);
    overlay.classList.add("active");
    lockScroll();
  }
  function close() {
    overlay.classList.remove("active");
    unlockScroll();
  }
  function step(dir) { if (list.length < 2) return; show(idx + dir); }

  // Единственный слушатель клика на весь документ (для открытия с карточек)
  document.addEventListener("click", function (e) {
    const img = e.target.closest(".res-photo img");
    if (img) open(img);
  });
})();
