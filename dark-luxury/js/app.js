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

  // --- 3. РЕНДЕР ПРАЙСА С БЕЙДЖАМИ ГОРОДОВ И ПРИМЕЧАНИЯМИ ---
  renderPriceList();

  // --- 4. ФИЛЬТРЫ И ПОИСК ПРАЙСА ---
  setupFiltersAndSearch();

  // --- 5. ЛОГИКА ФОРМЫ ЗАПИСИ (ГОРОДА + УСЛУГИ) ---
  setupBookingForm();
});

/**
 * Рендерит список услуг по категориям.
 */
function renderPriceList() {
  const container = document.getElementById('pricelist');
  if (!container || !window.SERVICES || !window.CATEGORIES) return;

  container.innerHTML = '';

  window.CATEGORIES.forEach(cat => {
    if (cat.id === 'all') return; 

    const servicesInCat = window.SERVICES.filter(s => s.cat === cat.id);
    if (servicesInCat.length === 0) return;

    const groupEl = document.createElement('div');
    groupEl.className = 'pl-group';
    groupEl.dataset.category = cat.id;

    // Заголовок группы + Общий список городов для категории
    const uniqueCitiesForCat = [...new Set(servicesInCat.flatMap(s => s.cities))]
      .map(c => c === "all" ? "Все города" : (window.CITY_NAMES[c] || c))
      .join(", ");

    const titleEl = document.createElement('h3');
    titleEl.className = 'pl-group__title';
    titleEl.innerHTML = `${cat.label} <span class="city-badges">(${uniqueCitiesForCat})</span>`;
    groupEl.appendChild(titleEl);

    // Строки услуг
    servicesInCat.forEach(service => {
      const row = document.createElement('div');
      row.className = 'pl-row';
      
      let priceText = service.price;
      if (service.unit) priceText += ` <u>${service.unit}</u>`;
      
      // Формируем строку городов для конкретной услуги
      let citiesHtml = '';
      if (service.cities && service.cities.length > 0) {
        const cityNames = service.cities.map(c => 
          c === "all" ? "Все города" : (window.CITY_NAMES[c] || c)
        ).join(", ");
        
        citiesHtml = `<small class="service-cities">${cityNames}</small>`;
      }

      // Формируем примечание (note) - здесь выводится инфо про онлайн/медобразование
      let noteHtml = '';
      if (service.note) {
        noteHtml = `<small class="service-note">${service.note}</small>`;
      }

      row.innerHTML = `
        <div class="pl-row__name">
          ${service.name}
          ${citiesHtml}
          ${noteHtml}
        </div>
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
      
      const fullService = window.SERVICES.find(s => s.cat === catId && s.name === serviceName);
      
      if (fullService) {
        document.querySelector('a[href="#contact"]').click();
        
        setTimeout(() => {
          const citySelect = document.getElementById('cCity');
          const serviceSelect = document.getElementById('cService');
          
          if (fullService.cities.includes("all")) {
             citySelect.value = ""; 
          } else if (fullService.cities.length > 0) {
             citySelect.value = fullService.cities[0];
          }
          
          updateServicesByCity(citySelect.value);
          
          Array.from(serviceSelect.options).forEach(opt => {
            if (opt.value.includes(serviceName)) {
              opt.selected = true;
            }
          });
          
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

  citySelect.addEventListener('change', function() {
    updateServicesByCity(this.value);
  });

  updateServicesByCity(citySelect.value);
}

function updateServicesByCity(selectedCity) {
  const serviceSelect = document.getElementById('cService');
  if (!serviceSelect) return;
  
  const currentValue = serviceSelect.value;
  serviceSelect.innerHTML = '<option value="">— Выберите услугу —</option>';
  
  window.SERVICES.forEach(service => {
    let isAvailable = false;
    
    if (selectedCity === "") {
      isAvailable = true; 
    } else if (service.cities.includes("all")) {
      isAvailable = true;
    } else if (service.cities.includes(selectedCity)) {
      isAvailable = true;
    }
    
    if (isAvailable) {
      const option = document.createElement('option');
      option.value = `${service.cat}|${service.name}`;
      
      let text = `${service.name} — ${service.price} ₽`;
      if (service.unit) text += ` (${service.unit})`;
      
      option.textContent = text;
      serviceSelect.appendChild(option);
    }
  });

  if (currentValue && Array.from(serviceSelect.options).some(o => o.value === currentValue)) {
    serviceSelect.value = currentValue;
  }
}
