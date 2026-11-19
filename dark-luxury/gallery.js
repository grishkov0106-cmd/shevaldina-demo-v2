// gallery.js — АВТОМАТИЧЕСКАЯ галерея «До / После».
// НИЧЕГО здесь заполнять НЕ нужно. Просто кладёшь картинки в папку:
//   dark-luxury/img/before-after/
// по схеме имени:   {id-категории}-{номер}.jpg
// номер 1,2,3,4,5 — БЕЗ пропусков (если положишь 1 и 3, то 3 не засчитается).
// Расширения .jpg / .png / .webp — код сам подберёт существующее.
//
// ЗАГОЛОВОК блока и ПОДПИСЬ под фото берутся из GALLERY_TITLES ниже.
// Если id категории там нет — подставится общее название направления из прайса.
// Чтобы переименовать заголовок или добавить новую процедуру с фото —
// правь ТОЛЬКО словарь GALLERY_TITLES, остальной код не трогай.
//
// Соответствие id категории -> имя файла:
//   smas         -> smas-1.jpg
//   lips         -> lips-1.jpg
//   body         -> body-1.jpg          (липоредукция подбородка / моделирование)
//   injection    -> injection-1.jpg     (липолитик и прочие инъекции)
//   body-device  -> body-device-1.jpg   (липосоникс / LPG / EMS)
//   face-device  -> face-device-1.jpg   (RF / Indiba / карбоновый пилинг)
//   contour      -> contour-1.jpg
//   botox        -> botox-1.jpg
//   care         -> care-1.jpg
//   peeling      -> peeling-1.jpg
//   extra        -> extra-1.jpg
//   elos         -> elos-1.jpg
//   hirudo       -> hirudo-1.jpg
//   edu          -> edu-1.jpg
//
// ВАЖНО: после закидывания фото обнови страницу с Ctrl+F5 (жёсткая перезагрузка),
// иначе браузер может показать кэш и новые файлы не подхватятся.
// НЕ открывай сайт двойным кликом по html (протокол file://) — авто-детект
// работает только когда сайт открыт по http/https (GitHub Pages или Live Server).

window.VK_ALBUM = "https://vk.com/"; // ЗАГЛУШКА: замени на ссылку на альбом сообщества ВК
window.GALLERY_DIR = "before-after";
window.GALLERY_EXTS = ["jpg", "png", "webp"];
window.GALLERY_MAX = 5;

// Заголовки блоков галереи + подписи под кадрами (по словам Ольги).
// Ключ = id категории из services.js. Значение = как назвать в «Результатах».
window.GALLERY_TITLES = {
  "lips":        "Губы",
  "body":        "Липоредукция подбородка",
  "injection":   "Липолитик",
  "body-device": "Липосоникс",
  "smas":        "SMAS-лифтинг"
};

// Какое имя показать для категории: сначала из GALLERY_TITLES,
// иначе общее название направления из CATEGORIES, иначе сам id.
function galleryTitle(id) {
  if (window.GALLERY_TITLES && window.GALLERY_TITLES[id]) return window.GALLERY_TITLES[id];
  const c = (window.CATEGORIES || []).find((x) => x.id === id);
  return c ? c.label : id;
}

// Проверяет по одному, существует ли файл, и собирает найденные.
async function detectCategoryPhotos(catId, baseUrl, label) {
  const out = [];
  for (let n = 1; n <= window.GALLERY_MAX; n++) {
    let found = null;
    for (const ext of window.GALLERY_EXTS) {
      const url = baseUrl + window.GALLERY_DIR + "/" + catId + "-" + n + "." + ext;
      try {
        const r = await fetch(url, { method: "HEAD" });
        if (r.ok) { found = url; break; }
      } catch (e) { /* нет сети / ошибка — считаем, что файла нет */ }
    }
    if (!found) break; // фото в этой категории закончились
    out.push({ src: found, caption: label });
  }
  return out;
}

// Возвращает Promise<объект>: { catId: [ {src, caption}, ... ] }
window.getGalleryData = async function (baseUrl, catIds) {
  const map = {};
  await Promise.all(catIds.map(async (id) => {
    map[id] = await detectCategoryPhotos(id, baseUrl, galleryTitle(id));
  }));
  return map;
};
