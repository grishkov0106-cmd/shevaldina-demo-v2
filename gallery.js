// gallery.js — АВТОМАТИЧЕСКАЯ галерея «До / После».
// НИЧЕГО здесь заполнять НЕ нужно. Просто кладёшь картинки в папку:
//   dark-luxury/img/before-after/
// по схеме имени:   {id-категории}-{номер}.jpg
// номер 1,2,3,4,5 — БЕЗ пропусков (если положишь 1 и 3, то 3 не засчитается).
// Расширения .jpg / .png / .webp — код сам подберёт существующее.
// Подпись под фото = название категории (берётся из services.js автоматически).
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
  const cats = window.CATEGORIES || [];
  await Promise.all(catIds.map(async (id) => {
    const c = cats.find((x) => x.id === id);
    const label = c ? c.label : id;
    map[id] = await detectCategoryPhotos(id, baseUrl, label);
  }));
  return map;
};