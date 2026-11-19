// Единый источник данных для сайта Ольги Шевалдиной
// С привязкой к городам

window.SERVICES = [
  // ===== SMAS-ЛИФТИНГ (Коркино, Челябинск) =====
  {cat:"smas", catName:"SMAS-лифтинг", name:"Лицо", price:"20 000", cities:["korkino","chelyabinsk"]},
  {cat:"smas", catName:"SMAS-лифтинг", name:"Лицо + шея", price:"25 000", cities:["korkino","chelyabinsk"]},
  {cat:"smas", catName:"SMAS-лифтинг", name:"Декольте", price:"10 000", cities:["korkino","chelyabinsk"]},
  {cat:"smas", catName:"SMAS-лифтинг", name:"Лицо, подбородок, шея, декольте", price:"30 000", cities:["korkino","chelyabinsk"]},
  {cat:"smas", catName:"SMAS-лифтинг", name:"Глаза", price:"10 000", cities:["korkino","chelyabinsk"]},
  {cat:"smas", catName:"SMAS-лифтинг", name:"Носогубка", price:"10 000", cities:["korkino","chelyabinsk"]},
  {cat:"smas", catName:"SMAS-лифтинг", name:"Брыли и подбородок", price:"14 000", cities:["korkino","chelyabinsk"]},
  {cat:"smas", catName:"SMAS-лифтинг", name:"Живот", price:"23 000", cities:["korkino","chelyabinsk"]},
  {cat:"smas", catName:"SMAS-лифтинг", name:"Живот + бока", price:"26 000", cities:["korkino","chelyabinsk"]},
  {cat:"smas", catName:"SMAS-лифтинг", name:"Валики над коленями", price:"8 000", cities:["korkino","chelyabinsk"]},
  {cat:"smas", catName:"SMAS-лифтинг", name:"Внутренняя часть бедра", price:"10 000", cities:["korkino","chelyabinsk"]},
  {cat:"smas", catName:"SMAS-лифтинг", name:"От ягодицы до подколенной чашечки", price:"15 000", cities:["korkino","chelyabinsk"]},
  {cat:"smas", catName:"SMAS-лифтинг", name:"Ягодицы", price:"10 000", cities:["korkino","chelyabinsk"]},
  {cat:"smas", catName:"SMAS-лифтинг", name:"Руки", price:"12 000", cities:["korkino","chelyabinsk"]},
  {cat:"smas", catName:"SMAS-лифтинг", name:"Кисти рук", price:"9 000", cities:["korkino","chelyabinsk"]},

  // ===== УХОДОВЫЕ (Коркино, Челябинск) =====
  {cat:"care", catName:"Уходовые процедуры", name:"Уходовая программа", price:"2 000", cities:["korkino","chelyabinsk"]},
  {cat:"care", catName:"Уходовые процедуры", name:"Чистка лица ультразвуковая", price:"1 500", cities:["korkino","chelyabinsk"]},
  {cat:"care", catName:"Уходовые процедуры", name:"Чистка комбинированная", price:"2 500", cities:["korkino","chelyabinsk"]},

  // ===== ПИЛИНГИ (Коркино, Челябинск) =====
  {cat:"peeling", catName:"Пилинги", name:"Миндальный (осветляющий / омолаживающий / анти-акне)", price:"2 500 – 3 500", cities:["korkino","chelyabinsk"]},
  {cat:"peeling", catName:"Пилинги", name:"Жёлтый пилинг", price:"3 500", cities:["korkino","chelyabinsk"]},
  {cat:"peeling", catName:"Пилинги", name:"Curenex Snow Peel (снежный пилинг)", price:"3 500", cities:["korkino","chelyabinsk"]},

  // ===== ДОПОЛНИТЕЛЬНЫЕ (Коркино, Челябинск) =====
  {cat:"extra", catName:"Дополнительные", name:"Удаление папиллом", price:"800", unit:"за шт", cities:["korkino","chelyabinsk"]},
  {cat:"extra", catName:"Дополнительные", name:"Мезонити", price:"600", unit:"за шт", cities:["korkino","chelyabinsk"]},

  // ===== ИНЪЕКЦИОННАЯ КОСМЕТОЛОГИЯ (Все города) =====
  {cat:"injection", catName:"Инъекционная косметология", name:"Биоревитализация — Хуарон", price:"3 000", cities:["all"]},
  {cat:"injection", catName:"Инъекционная косметология", name:"Реві Стронг", price:"13 000", cities:["all"]},
  {cat:"injection", catName:"Инъекционная косметология", name:"Реві (глаза)", price:"9 500", cities:["all"]},
  {cat:"injection", catName:"Инъекционная косметология", name:"Коктейль Монако", price:"10 000", cities:["all"]},
  {cat:"injection", catName:"Инъекционная косметология", name:"PROFILO", price:"25 000", cities:["all"]},
  {cat:"injection", catName:"Инъекционная косметология", name:"Атлантис (Россия)", price:"13 000", cities:["all"]},
  {cat:"injection", catName:"Инъекционная косметология", name:"Атлантис (глаза)", price:"12 000", cities:["all"]},
  {cat:"injection", catName:"Инъекционная косметология", name:"Антипигментация / плазмолифтинг / биогель (белый)", price:"5 000", cities:["all"]},
  {cat:"injection", catName:"Инъекционная косметология", name:"The star (по точкам)", price:"8 000", cities:["all"]},
  {cat:"injection", catName:"Инъекционная косметология", name:"Biogel cold, white, green", price:"5 000", cities:["all"]},
  {cat:"injection", catName:"Инъекционная косметология", name:"Белотеро Ревайн", price:"14 000", cities:["all"]},
  {cat:"injection", catName:"Инъекционная косметология", name:"Люси ПДРН", price:"7 500", cities:["all"]},
  {cat:"injection", catName:"Инъекционная косметология", name:"Реджува ПДРН", price:"7 500", cities:["all"]},
  {cat:"injection", catName:"Инъекционная косметология", name:"Киаара", price:"5 000", cities:["all"]},
  {cat:"injection", catName:"Инъекционная косметология", name:"Spider Aqua Eye Booster", price:"6 000", cities:["all"]},
  {cat:"injection", catName:"Инъекционная косметология", name:"BioGel White (область глаз)", price:"2 500", cities:["all"]},
  {cat:"injection", catName:"Инъекционная косметология", name:"Липолитик (флакон)", price:"12 000", cities:["all"]},
  {cat:"injection", catName:"Инъекционная косметология", name:"Сужение носа", price:"3 000", cities:["all"]},
  {cat:"injection", catName:"Инъекционная косметология", name:"Анти-алопеция", price:"13 000", cities:["all"]},
  {cat:"injection", catName:"Инъекционная косметология", name:"Барби токс", price:"8 500", cities:["all"]},
  {cat:"injection", catName:"Инъекционная косметология", name:"Приподнятие бровей", price:"3 000", cities:["all"]},
  {cat:"injection", catName:"Инъекционная косметология", name:"Проработка платизмы", price:"7 000", cities:["all"]},
  {cat:"injection", catName:"Инъекционная косметология", name:"Морщины над губой", price:"2 000", cities:["all"]},
  {cat:"injection", catName:"Инъекционная косметология", name:"Гипергидроз подмышек", price:"13 000", cities:["all"]},
  {cat:"injection", catName:"Инъекционная косметология", name:"Плазмолифтинг (сеанс)", price:"4 500 – 7 000", cities:["all"]},

  // ===== АУГМЕНТАЦИЯ ГУБ (Все города) =====
  {cat:"lips", catName:"Аугментация губ", name:"Аугментация губ (диапазон)", price:"10 000 – 19 000", note:"зависит от препарата", cities:["all"]},
  {cat:"lips", catName:"Аугментация губ", name:"Корея (Elasty)", price:"10 000", cities:["all"]},
  {cat:"lips", catName:"Аугментация губ", name:"Стелаж М", price:"19 000", cities:["all"]},
  {cat:"lips", catName:"Аугментация губ", name:"Белотеро", price:"19 000", cities:["all"]},
  {cat:"lips", catName:"Аугментация губ", name:"Висколайн (Россия)", price:"15 000", cities:["all"]},

  // ===== КОНТУРНАЯ ПЛАСТИКА (Все города) =====
  {cat:"contour", catName:"Контурная пластика", name:"Коррекция подбородка филлером", price:"9 000", cities:["all"]},
  {cat:"contour", catName:"Контурная пластика", name:"Углы Джоли", price:"20 000", cities:["all"]},
  {cat:"contour", catName:"Контурная пластика", name:"Скулы", price:"20 000", cities:["all"]},
  {cat:"contour", catName:"Контурная пластика", name:"Фул фейс комплекс", price:"39 000", cities:["all"]},
  {cat:"contour", catName:"Контурная пластика", name:"Попа как у Ким", price:"15 000", cities:["all"]},
  {cat:"contour", catName:"Контурная пластика", name:"Коллагенотерапия", price:"14 000 – 20 000", cities:["all"]},
  {cat:"contour", catName:"Контурная пластика", name:"Детокс точка", price:"4 000", cities:["all"]},
  {cat:"contour", catName:"Контурная пластика", name:"Точка стройности", price:"5 000", cities:["all"]},

  // ===== БОТУЛИНОТЕРАПИЯ (Все города) =====
  {cat:"botox", catName:"Ботулинотерапия", name:"Ботулинотерапия (за единицу)", price:"от 250 / ед.", note:"REN tox 250 ед. · Релатокс 350 · Лантокс 300 ед.", cities:["all"]},

  // ===== АППАРАТНЫЕ ДЛЯ ЛИЦА (Коркино, Челябинск) =====
  {cat:"face-device", catName:"Аппаратные для лица", name:"Фотоомоложение лица", price:"3 000", unit:"лицо", cities:["korkino","chelyabinsk"]},
  {cat:"face-device", catName:"Аппаратные для лица", name:"Антикупероз", price:"600", unit:"вспышка", cities:["korkino","chelyabinsk"]},
  {cat:"face-device", catName:"Аппаратные для лица", name:"Антиакне", price:"3 000", unit:"лицо", cities:["korkino","chelyabinsk"]},
  {cat:"face-device", catName:"Аппаратные для лица", name:"Карбоновый пилинг", price:"1 500", unit:"сеанс", cities:["korkino","chelyabinsk"]},
  {cat:"face-device", catName:"Аппаратные для лица", name:"Карбоновый пилинг (курс)", price:"5 000", unit:"5 сеансов", cities:["korkino","chelyabinsk"]},
  {cat:"face-device", catName:"Аппаратные для лица", name:"RF-лифтинг", price:"1 000", unit:"лицо", cities:["korkino","chelyabinsk"]},
  {cat:"face-device", catName:"Аппаратные для лица", name:"RF-лифтинг", price:"1 500", unit:"лицо + шея", cities:["korkino","chelyabinsk"]},
  {cat:"face-device", catName:"Аппаратные для лица", name:"Indiba", price:"1 000", unit:"лицо", cities:["korkino","chelyabinsk"]},
  {cat:"face-device", catName:"Аппаратные для лица", name:"Indiba", price:"1 500", unit:"лицо и шея", cities:["korkino","chelyabinsk"]},
  {cat:"face-device", catName:"Аппаратные для лица", name:"Игольчатый RF-лифтинг", price:"10 000", unit:"лицо", cities:["korkino","chelyabinsk"]},
  {cat:"face-device", catName:"Аппаратные для лица", name:"Игольчатый RF-лифтинг", price:"13 000", unit:"лицо, шея, декольте", cities:["korkino","chelyabinsk"]},

  // ===== ЭЛОС-ЭПИЛЯЦИЯ (Только Коркино!) =====
  {cat:"elos", catName:"ЭЛОС-эпиляция", name:"Подмышки", price:"700", cities:["korkino"]},
  {cat:"elos", catName:"ЭЛОС-эпиляция", name:"Голени — бёдра", price:"1 500", cities:["korkino"]},
  {cat:"elos", catName:"ЭЛОС-эпиляция", name:"Бикини", price:"1 200", cities:["korkino"]},
  {cat:"elos", catName:"ЭЛОС-эпиляция", name:"Глубокое бикини", price:"1 600", cities:["korkino"]},
  {cat:"elos", catName:"ЭЛОС-эпиляция", name:"Руки до локтя", price:"1 000", cities:["korkino"]},
  {cat:"elos", catName:"ЭЛОС-эпиляция", name:"Руки полностью", price:"1 400", cities:["korkino"]},
  {cat:"elos", catName:"ЭЛОС-эпиляция", name:"Спина", price:"1 500", cities:["korkino"]},
  {cat:"elos", catName:"ЭЛОС-эпиляция", name:"Живот", price:"1 000", cities:["korkino"]},
  {cat:"elos", catName:"ЭЛОС-эпиляция", name:"Ноги до колена", price:"1 200", cities:["korkino"]},
  {cat:"elos", catName:"ЭЛОС-эпиляция", name:"Ноги полностью", price:"1 500", cities:["korkino"]},
  {cat:"elos", catName:"ЭЛОС-эпиляция", name:"Лицо", price:"1 500", cities:["korkino"]},
  {cat:"elos", catName:"ЭЛОС-эпиляция", name:"Над губой", price:"300", cities:["korkino"]},
  {cat:"elos", catName:"ЭЛОС-эпиляция", name:"Подбородок", price:"500", cities:["korkino"]},
  {cat:"elos", catName:"ЭЛОС-эпиляция", name:"Комплекс: глубокое бикини + подмышки", price:"2 000", note:"комплекс", cities:["korkino"]},
  {cat:"elos", catName:"ЭЛОС-эпиляция", name:"Комплекс: подмышки + бикини + голени", price:"2 700", note:"комплекс", cities:["korkino"]},
  {cat:"elos", catName:"ЭЛОС-эпиляция", name:"Комплекс: подмышки + бикини + ноги полностью", price:"3 600", note:"комплекс", cities:["korkino"]},
  {cat:"elos", catName:"ЭЛОС-эпиляция", name:"Комплекс: подмышки + бикини + руки + ноги полностью", price:"4 100", note:"комплекс", cities:["korkino"]},

  // ===== АППАРАТНЫЕ ДЛЯ ТЕЛА (Коркино, Челябинск) =====
  {cat:"body-device", catName:"Аппаратные для тела", name:"LPG-массаж", price:"1 000", unit:"1 сеанс", cities:["korkino","chelyabinsk"]},
  {cat:"body-device", catName:"Аппаратные для тела", name:"LPG-массаж (курс)", price:"8 500", unit:"10 сеансов", cities:["korkino","chelyabinsk"]},
  {cat:"body-device", catName:"Аппаратные для тела", name:"Костюм для LPG", price:"500", unit:"аренда", cities:["korkino","chelyabinsk"]},
  {cat:"body-device", catName:"Аппаратные для тела", name:"Indiba (жиротоп 2/1)", price:"2 000", unit:"1 сеанс", cities:["korkino","chelyabinsk"]},
  {cat:"body-device", catName:"Аппаратные для тела", name:"Indiba (жиротоп 2/1, курс)", price:"7 500", unit:"5 сеансов", cities:["korkino","chelyabinsk"]},
  {cat:"body-device", catName:"Аппаратные для тела", name:"Вибрационный массаж тела", price:"1 000", unit:"1 сеанс", cities:["korkino","chelyabinsk"]},
  {cat:"body-device", catName:"Аппаратные для тела", name:"Вибрационный массаж (зона)", price:"600", unit:"зона", cities:["korkino","chelyabinsk"]},
  {cat:"body-device", catName:"Аппаратные для тела", name:"Вибрационный массаж (курс)", price:"4 000", unit:"5 сеансов", cities:["korkino","chelyabinsk"]},
  {cat:"body-device", catName:"Аппаратные для тела", name:"Липосоникс", price:"6 000", unit:"раз в месяц", cities:["korkino","chelyabinsk"]},
  {cat:"body-device", catName:"Аппаратные для тела", name:"Липосоникс — живот и бока", price:"10 000", cities:["korkino","chelyabinsk"]},
  {cat:"body-device", catName:"Аппаратные для тела", name:"Липосоникс — руки", price:"5 000", cities:["korkino","chelyabinsk"]},
  {cat:"body-device", catName:"Аппаратные для тела", name:"Липосоникс — валики над коленями", price:"3 000", cities:["korkino","chelyabinsk"]},
  {cat:"body-device", catName:"Аппаратные для тела", name:"Липосоникс — подбородок", price:"2 500", cities:["korkino","chelyabinsk"]},
  {cat:"body-device", catName:"Аппаратные для тела", name:"Игольчатый RF-лифтинг (тело)", price:"10 000", cities:["korkino","chelyabinsk"]},
  {cat:"body-device", catName:"Аппаратные для тела", name:"RF-лифтинг (зона)", price:"1 500", unit:"1 сеанс", cities:["korkino","chelyabinsk"]},
  {cat:"body-device", catName:"Аппаратные для тела", name:"RF-лифтинг (зона, курс)", price:"5 000", unit:"5 сеансов", cities:["korkino","chelyabinsk"]},
  {cat:"body-device", catName:"Аппаратные для тела", name:"EMS-тренировка", price:"1 500", unit:"1 зона", cities:["korkino","chelyabinsk"]},
  {cat:"body-device", catName:"Аппаратные для тела", name:"Абонемент: 5 EMS", price:"7 500", note:"абонемент", cities:["korkino","chelyabinsk"]},
  {cat:"body-device", catName:"Аппаратные для тела", name:"Комплекс: 10 LPG + 10 EMS", price:"17 000", note:"абонемент", cities:["korkino","chelyabinsk"]},
  {cat:"body-device", catName:"Аппаратные для тела", name:"Комплекс: 10 LPG + 5 Indiba 2/1", price:"16 000", note:"абонемент", cities:["korkino","chelyabinsk"]},
  {cat:"body-device", catName:"Аппаратные для тела", name:"Комплекс: 10 LPG + 5 EMS", price:"13 500", note:"абонемент", cities:["korkino","chelyabinsk"]},
  {cat:"body-device", catName:"Аппаратные для тела", name:"Комплекс: 10 вибрационный + 10 Indiba 2/1", price:"23 000", note:"абонемент", cities:["korkino","chelyabinsk"]},
  {cat:"body-device", catName:"Аппаратные для тела", name:"Абонемент только EMS — 10 сессий", price:"9 000", note:"абонемент", cities:["korkino","chelyabinsk"]},
  {cat:"body-device", catName:"Аппаратные для тела", name:"Абонемент только EMS — 20 сессий", price:"17 000", note:"абонемент", cities:["korkino","chelyabinsk"]},

  // ===== ГИРУДОТЕРАПИЯ (Коркино, Челябинск) =====
  {cat:"hirudo", catName:"Гирудотерапия", name:"Оздоровление медицинскими пиявками", price:"2 000", unit:"сеанс", cities:["korkino","chelyabinsk"]},

  // ===== КОРРЕКЦИЯ ТЕЛА (Все города) =====
  {cat:"body", catName:"Коррекция тела", name:"Липоредукция подбородка", price:"30 000", cities:["all"]},
  {cat:"body", catName:"Коррекция тела", name:"Моделирование тела", price:"Индивидуально", note:"Подбирается персонально под ваши цели", cities:["all"]},

  // ===== ОБУЧЕНИЕ (Обновленные права) =====
  {cat:"edu", catName:"Обучение", name:"Курс «Гирудотерапия»", price:"15 000", note:"Выдача свидетельства государственного образца. Очно или Онлайн.", cities:["all"]},
  {cat:"edu", catName:"Обучение", name:"Мастер аппаратной коррекции тела", price:"Индивидуально", note:"Сертификат + практика. Возможно очно (К/Ч) или Онлайн.", cities:["all"]},
  {cat:"edu", catName:"Обучение", name:"Косметик-эстетист (лицо / тело)", price:"Индивидуально", note:"Сертификат + практика. Возможно очно (К/Ч) или Онлайн.", cities:["all"]},
  {cat:"edu", catName:"Обучение", name:"Повышение квалификации", price:"Индивидуально", note:"Для работающих специалистов. Выдача документов без обучения (аттестация). Возможно Онлайн.", cities:["all"]},
];

// Порядок категорий для фильтров
window.CATEGORIES = [
  {id:"all", label:"Все направления"},
  {id:"smas", label:"SMAS-лифтинг"},
  {id:"care", label:"Уходовые"},
  {id:"peeling", label:"Пилинги"},
  {id:"extra", label:"Дополнительные"},
  {id:"injection", label:"Инъекционная"},
  {id:"lips", label:"Губы"},
  {id:"contour", label:"Контурная пластика"},
  {id:"botox", label:"Ботулинотерапия"},
  {id:"face-device", label:"Аппаратные · лицо"},
  {id:"elos", label:"ЭЛОС-эпиляция"},
  {id:"body-device", label:"Аппаратные · тело"},
  {id:"hirudo", label:"Гирудотерапия"},
  {id:"body", label:"Коррекция тела"},
  {id:"edu", label:"Обучение"}
];

// Карта названий городов для отображения
window.CITY_NAMES = {
  "korkino": "Коркино",
  "chelyabinsk": "Челябинск",
  "tyumen": "Тюмень",
  "samara": "Самара",
  "perm": "Пермь"
};
