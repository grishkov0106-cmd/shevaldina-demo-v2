// dark-luxury/js/app.js

document.addEventListener('DOMContentLoaded', () => {
  
  // --- 1. БУРГЕР МЕНЮ ---
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      menu.classList.toggle('open');
    });
    // Закрываем меню при клике на любую ссылку внутри него
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => menu.classList.remove('open'));
    });
  }

  // --- 2. ГОД В ФУТЕРЕ ---
  const yrSpan = document.getElementById('yr');
  if (yrSpan) yrSpan.textContent = new Date().getFullYear();

  // --- 3. РЕНДЕР ПРАЙСА С БЕЙДЖАМИ ГОРОДОВ ---
  renderPriceList();

  // --- 4. ФИЛЬТРЫ И ПОИСК ПРАЙСА ---
  setupFiltersAndSearch();

  // --- 5. ЛОГИКА ФОРМЫ ЗАПИСИ (ГОРОДА + УСЛУГИ) ---
  setupBookingForm();
});

/**
 * Рендерит список услуг по категориям, добавляя бейджи доступных городов.
 */
function renderPriceList() {
  const container = document.getElementById('pricelist');
  if (!container || !window.SERVICES || !window.CATEGORIES) return;

  container.innerHTML = '';

  window.CATEGORIES.forEach(cat => {
    if (cat.id === 'all') return; // Пропускаем "Все направления" для группировки

    const servicesInCat = window.SERVICES.filter(s => s.cat === cat.id);
    if (servicesInCat.length === 0) return;

    // Группируем услуги этой категории
    const groupEl = document.createElement('div');
    groupEl.className = 'pl-group';
    groupEl.dataset.category = cat.id;

    // Заголовок группы + Бейдж городов
    const uniqueCities = [...new Set(servicesInCat.flatMap(s => s.cities))]
      .map(c => c === "all" ? "Все города" : (window.CITY_NAMES[c] || c))
      .join(", ");

    const titleEl = document.createElement('h3');
    titleEl.className = 'pl-group__title';
    titleEl.innerHTML = `${cat.label} <span class="city-badges">(${uniqueCities})</span>`;
    groupEl.appendChild(titleEl);

    // Строки услуг
    servicesInCat.forEach(service => {
      const row = document.createElement('div');
      row.className = 'pl-row';
      
      let priceText = service.price;
      if (service.unit) priceText += ` <u>${service.unit}</u>`;
      
      let noteHtml = '';
      if (service.note) {
        noteHtml = `<small>${service.note}</small>`;
      }

      row.innerHTML = `
        <div class="pl-row__name">${service.name}${noteHtml}</div>
        <div class="pl-row__dots"></div>
        <div class="pl-row__price">${priceText}</div>
        <button type="button" class="pl-row__book" data-service="${service.cat}|${service.name}" data-price="${service.price}">Записаться</button>
      `;
      groupEl.appendChild(row);
    });

    container.appendChild(groupEl);
  });

  // Обработчики кнопок "Записаться" из прайса
  document.querySelectorAll('.pl-row__book').forEach(btn => {
    btn.addEventListener('click', function() {
      const serviceData = this.getAttribute('data-service');
      const [catId, serviceName] = serviceData.split('|');
      
      // Находим полный объект услуги
      const fullService = window.SERVICES.find(s => s.cat === catId && s.name === serviceName);
      
      if (fullService) {
        // Переключаемся на вкладку записи
        document.querySelector('a[href="#contact"]').click();
        
        // Заполняем форму
        setTimeout(() => {
          const citySelect = document.getElementById('cCity');
          const serviceSelect = document.getElementById('cService');
          
          // Если услуга доступна не везде, подсказываем город
          if (fullService.cities.includes("all")) {
             // Можно оставить выбор за пользователем или выбрать первый попавшийся локальный
             citySelect.value = ""; 
          } else if (fullService.cities.length > 0) {
             citySelect.value = fullService.cities[0];
          }
          
          // Обновляем список услуг для выбранного города
          updateServicesByCity(citySelect.value);
          
          // Выбираем нужную услугу в селекте
          Array.from(serviceSelect.options).forEach(opt => {
            if (opt.value.includes(serviceName)) {
              opt.selected = true;
            }
          });
          
          // Скроллим к полю имени
          document.getElementById('cName').focus();
        }, 300);
      }
    });
  });
}

/**
 * Настраивает фильтры категорий и поиск по прайсу.
 */
function setupFiltersAndSearch() {
  const filtersContainer = document.getElementById('filters');
  const searchInput = document.getElementById('find');
  const noneMsg = document.getElementById('none');

  if (!filtersContainer) return;

  // Создаем кнопки фильтров
  window.CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'filt' + (cat.id === 'all' ? ' on' : '');
    btn.textContent = cat.label;
    btn.dataset.filter = cat.id;
    
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filt').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      applyFilter(cat.id, searchInput?.value || '');
    });
    
    filtersContainer.appendChild(btn);
  });

  // Поиск
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activeFilter = document.querySelector('.filt.on')?.dataset.filter || 'all';
      applyFilter(activeFilter, e.target.value);
    });
  }
}

function applyFilter(categoryId, searchTerm) {
  const groups = document.querySelectorAll('.pl-group');
  const rows = document.querySelectorAll('.pl-row');
  const noneMsg = document.getElementById('none');
  let hasResults = false;

  const term = searchTerm.toLowerCase().trim();

  groups.forEach(group => {
    const catId = group.dataset.category;
    const shouldShowGroup = categoryId === 'all' || catId === categoryId;
    
    let groupHasVisibleRows = false;

    group.querySelectorAll('.pl-row').forEach(row => {
      const nameEl = row.querySelector('.pl-row__name');
      const textContent = nameEl ? nameEl.textContent.toLowerCase() : '';
      
      const matchesSearch = !term || textContent.includes(term);
      const isVisible = shouldShowGroup && matchesSearch;

      row.style.display = isVisible ? '' : 'none';
      if (isVisible) {
        groupHasVisibleRows = true;
        hasResults = true;
      }
    });

    group.style.display = groupHasVisibleRows ? '' : 'none';
  });

  if (noneMsg) {
    noneMsg.hidden = hasResults;
  }
}

/**
 * Логика формы записи: зависимость списка услуг от выбранного города.
 */
function setupBookingForm() {
  const citySelect = document.getElementById('cCity');
  const serviceSelect = document.getElementById('cService');
  
  if (!citySelect || !serviceSelect) return;

  // Слушатель изменения города
  citySelect.addEventListener('change', function() {
    updateServicesByCity(this.value);
  });

  // Инициализация (если город уже выбран или пуст)
  updateServicesByCity(citySelect.value);
}

function updateServicesByCity(selectedCity) {
  const serviceSelect = document.getElementById('cService');
  if (!serviceSelect) return;
  
  // Сохраняем текущее значение, если оно еще существует в новом списке
  const currentValue = serviceSelect.value;
  
  // Очищаем текущий список
  serviceSelect.innerHTML = '<option value="">— Выберите услугу —</option>';
  
  // Фильтруем услуги из глобального массива SERVICES
  window.SERVICES.forEach(service => {
    let isAvailable = false;
    
    // Проверяем доступность по городу
    if (selectedCity === "") {
      // Если город не выбран, показываем все активные услуги
      isAvailable = true; 
    } else if (service.cities.includes("all")) {
      // Услуга доступна во всех городах
      isAvailable = true;
    } else if (service.cities.includes(selectedCity)) {
      // Услуга доступна конкретно в этом городе
      isAvailable = true;
    }
    
    if (isAvailable) {
      const option = document.createElement('option');
      option.value = `${service.cat}|${service.name}`;
      
      // Формируем текст опции: Название услуги (Цена)
      let text = `${service.name} — ${service.price} ₽`;
      if (service.unit) text += ` (${service.unit})`;
      
      option.textContent = text;
      serviceSelect.appendChild(option);
    }
  });

  // Пытаемся восстановить выбор, если он был валиден для нового города
  if (currentValue && Array.from(serviceSelect.options).some(o => o.value === currentValue)) {
    serviceSelect.value = currentValue;
  }
}
