// Единая точка настройки адреса API.
// Локально (Live Server / localhost) — локальный uvicorn.
// На боевом сайте (GitHub Pages) — Alwaysdata.
window.API_BASE_URL = (function () {
  var isLocal = ["localhost", "127.0.0.1", "0.0.0.0", ""].indexOf(location.hostname) !== -1;
  var PROD_URL = "https://sheva1d1na.alwaysdata.net";
  return isLocal ? "http://127.0.0.1:8000" : PROD_URL;
})();
