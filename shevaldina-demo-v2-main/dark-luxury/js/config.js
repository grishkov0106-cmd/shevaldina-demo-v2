window.API_BASE_URL = (function () {
  var isLocal = ["localhost", "127.0.0.1", "0.0.0.0", ""].indexOf(location.hostname) !== -1;
  // Если мы в интернете, не стучимся в локальный адрес, чтобы не было ошибок.
  // Сайт просто возьмет данные из services.js, как это было раньше.
  return isLocal ? "http://127.0.0.1:8000" : "NO_BACKEND";
})();