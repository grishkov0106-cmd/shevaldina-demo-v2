// Единая точка настройки адреса API.
// Локально (localhost) стучимся в локальный uvicorn,
// на боевом сайте (GitHub Pages) — в Render.
window.API_BASE_URL = (function () {
  var isLocal = ["localhost", "127.0.0.1", "0.0.0.0", ""].indexOf(location.hostname) !== -1;
  var PROD_URL = "https://shevaldina-api.onrender.com"; // ← сюда позже впишем URL твоего сервиса Render
  return isLocal ? "http://127.0.0.1:8000" : PROD_URL;
})();