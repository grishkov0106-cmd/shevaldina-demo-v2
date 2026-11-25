// dark-luxury/js/app.js

const API_BASE_URL = window.API_BASE_URL || "http://127.0.0.1:8000";

// 🛡️ АВТОНОМНЫЕ ДАННЫЕ (Fallback, если бэкенд недоступен)
const FALLBACK_CATEGORIES = [
  { id: 'all', label: 'Все услуги' },
  { id: 'smas', label: 'SMAS-лифтинг', details: '#approach' },
  { id: 'injections', label: 'Инъекционная косметология', details: '#approach' },
  { id: 'hardware', label: 'Аппаратная косметология', details: '#approach' },
  { id: 'esthetic', label: 'Эстетическая косметология', details: '#approach' },
  { id: 'education', label: 'Обучение', details: '#education' }
];

const FALLBACK_SERVICES = [
  { cat: 'smas', name: 'SMAS-лифтинг лица и шеи', price: '20 000', unit: 'сеанс', cities: ['korkino', 'chelyabinsk'], note: 'Глубокая подтяжка без операции' },
  { cat: 'smas', name: 'SMAS-лифтинг лица и декольте', price: '25 000', unit: 'сеанс', cities: ['korkino', 'chelyabinsk'], note: '' },
  { cat: 'smas', name: 'SMAS-лифтинг только подбородок', price: '12 000', unit: 'сеанс', cities: ['korkino', 'chelyabinsk', 'tyumen'], note: '' },
  { cat: 'injections', name: 'Биоревитализация лица', price: '8 000', unit: 'процедура', cities: ['korkino', 'chelyabinsk'], note: 'Премиум препараты' },
  { cat: 'injections', name: 'Ботулинотерапия (1 ед.)', price: '350', unit: 'ед.', cities: ['korkino', 'chelyabinsk', 'tyumen', 'samara', 'perm'], note: 'Диспорт / Ботокс' },
  { cat: 'injections', name: 'Контурная пластика губ', price: '14 000', unit: '1 мл', cities: ['korkino', 'chelyabinsk'], note: '' },
  { cat: 'injections', name: 'Мезотерапия лица', price: '4 500', unit: 'процедура', cities: ['korkino', 'chelyabinsk', 'tyumen'], note: '' },
  { cat: 'hardware', name: 'RF-лифтинг лица', price: '3 500', unit: 'сеанс', cities: ['korkino', 'chelyabinsk', 'tyumen'], note: 'Безоперационная подтяжка' },
  { cat: 'hardware', name: 'LPG-массаж тела', price: '2 000', unit: 'сеанс', cities: ['korkino', 'chelyabinsk', 'samara', 'perm'], note: 'Костюм в подарок' },
  { cat: 'hardware', name: 'Микротоковая терапия', price: '2 500', unit: 'сеанс', cities: ['korkino', 'chelyabinsk'], note: '' },
  { cat: 'hardware', name: 'Ультразвуковая чистка', price: '2 000', unit: 'процедура', cities: ['korkino', 'chelyabinsk', 'samara', 'perm'], note: '' },
  { cat: 'esthetic', name: 'Комбинированная чистка лица', price: '4 000', unit: 'процедура', cities: ['korkino', 'chelyabinsk', 'samara', 'perm'], note: 'Механическая + УЗ' },
  { cat: 'esthetic', name: 'Пилинг PRX-T33', price: '5 000', unit: 'процедура', cities: ['korkino', 'chelyabinsk'], note: 'Без шелушения' },
  { cat: 'esthetic', name: 'Альгинатная маска', price: '1 500', unit: 'процедура', cities: ['all'], note: 'Как дополнение к чистке' },
  { cat: 'education', name: 'Курс "Косметик-эстетист"', price: '15 000', unit: 'курс', cities: ['korkino', 'chelyabinsk'], note: 'Выдача сертификата' },
  { cat: 'education', name: 'Повышение квалификации', price: '10 000', unit: 'курс', cities: ['korkino', 'chelyabinsk'], note: 'Для действующих мастеров' },
  { cat: 'education', name: 'Курс "Гирудотерапия"', price: '15 000', unit: 'курс', cities: ['korkino', 'chelyabinsk'], note: 'Онлайн или очно' }
  // 💡 Чтобы добавить все 121 услугу, просто допиши их сюда по аналогии: { cat: '...', name: '...', price: '...', unit: '...', cities: ['...'], note: '...' },
];

document.addEventListener('DOMContentLoaded', async () => {
  let servicesLoaded = false;
  
  // 1. Пытаемся загрузить с бэкенда
  try {
    const response = await fetch(`${API_BASE_URL}/api/services`);
    if (response.ok) {
      // Если бэкенд ответил, используем его данные (приводим к формату фронтенда)
      const backendData = await response.json();
      window.SERVICES = backendData.map(s => ({
        cat: s.category_id === 1 ? 'smas' : s.category_id === 2 ? 'injections' : s.category_id === 3 ? 'hardware' : s.category_id === 4 ? 'education' : 'esthetic',
        name: s.name,
        price: String(s.price),
        unit: s.unit || '',
        cities: typeof s.cities === 'string' ? JSON.parse(s.cities) : (s.cities || ['all']),
        note: s.description || s.note || ''
      }));
      window.CATEGORIES = FALLBACK_CATEGORIES; // Категории пока берем из фолбэка для стабильности
      servicesLoaded = true;
      console.log("✅ Услуги загружены с бэкенда");
    }
  } catch (e) {
    console.warn("⚠️ Бэкенд недоступен, используем автономные данные");
  }

  // 2. Если бэкенд не ответил, подставляем автономные данные
  if (!servicesLoaded) {
    window.SERVICES = FALLBACK_SERVICES;
    window.CATEGORIES = FALLBACK_CATEGORIES;
    console.log("✅ Загружены автономные тестовые данные");
  }

  // 3. Инициализируем интерфейс
  setupBurger();
  setYear();
  renderPriceList();
  setupFiltersAndSearch();
  renderResultsGallery();
  setupBookingForm();
});

function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function cityName(c){return c==='all'?'Все города':(window.CITY_NAMES&&window.CITY_NAMES[c]?window.CITY_NAMES[c]:c);}
function galleryTitle(id){
  if(window.GALLERY_TITLES&&window.GALLERY_TITLES[id])return window.GALLERY_TITLES[id];
  const c=(window.CATEGORIES||[]).find(x=>x.id===id);
  return c?c.label:id;
}

function setupBurger(){
  const burger=document.getElementById('burger');
  const menu=document.getElementById('menu');
  if(burger&&menu){
    burger.addEventListener('click',()=>menu.classList.toggle('open'));
    menu.querySelectorAll('a').forEach(l=>l.addEventListener('click',()=>menu.classList.remove('open')));
  }
}
function setYear(){const y=document.getElementById('yr');if(y)y.textContent=new Date().getFullYear();}

function renderPriceList(){
  const container=document.getElementById('pricelist');
  if(!container||!window.SERVICES||!window.CATEGORIES)return;
  container.innerHTML='';

  window.CATEGORIES.forEach(cat=>{
    if(cat.id==='all')return;
    const items=window.SERVICES.filter(s=>s.cat===cat.id);
    if(!items.length)return;

    const group=document.createElement('div');
    group.className='pl-group';
    group.dataset.category=cat.id;

    const cities=[...new Set(items.flatMap(s=>s.cities))].map(cityName).join(', ');
    const moreLink=cat.details?`<a class="pl-group__more" href="${esc(cat.details)}">Подробнее о процедуре →</a>`:'';

    const title=document.createElement('h3');
    title.className='pl-group__title';
    title.innerHTML=`${esc(cat.label)} <span class="city-badges">(${esc(cities)})</span>${moreLink}`;
    group.appendChild(title);

    items.forEach(service=>{
      const row=document.createElement('div');
      row.className='pl-row';
      let priceText=esc(service.price);
      if(service.unit)priceText+=` <u>${esc(service.unit)}</u>`;
      const citiesHtml=service.cities&&service.cities.length
        ?`<small class="service-cities">${esc(service.cities.map(cityName).join(', '))}</small>`:'';
      const noteHtml=service.note?`<small class="service-note">${esc(service.note)}</small>`:'';
      row.innerHTML=`
        <div class="pl-row__name">${esc(service.name)}${citiesHtml}${noteHtml}</div>
        <div class="pl-row__dots"></div>
        <div class="pl-row__price">${priceText}</div>
        <button type="button" class="pl-row__book" data-service="${esc(service.cat)}|${esc(service.name)}">Записаться</button>`;
      group.appendChild(row);
    });
    container.appendChild(group);
  });

  document.querySelectorAll('.pl-row__book').forEach(btn=>{
    btn.addEventListener('click',function(){
      const [catId,name]=this.getAttribute('data-service').split('|');
      const full=window.SERVICES.find(s=>s.cat===catId&&s.name===name);
      if(!full)return;
      const link=document.querySelector('a[href="#contact"]');
      if(link)link.click();
      setTimeout(()=>{
        const citySel=document.getElementById('cCity');
        const servSel=document.getElementById('cService');
        if(!citySel||!servSel)return;
        citySel.value=full.cities.includes('all')?'':(full.cities[0]||'');
        updateServicesByCity(citySel.value);
        Array.from(servSel.options).forEach(o=>{if(o.value.includes(name))o.selected=true;});
        const nm=document.getElementById('cName');if(nm)nm.focus();
      },300);
    });
  });
}

function setupFiltersAndSearch(){
  const box=document.getElementById('filters');
  const search=document.getElementById('find');
  if(!box)return;
  window.CATEGORIES.forEach(cat=>{
    const b=document.createElement('button');
    b.type='button';
    b.className='filt'+(cat.id==='all'?' on':'');
    b.textContent=cat.label;
    b.dataset.filter=cat.id;
    b.addEventListener('click',()=>{
      document.querySelectorAll('.filt').forEach(x=>x.classList.remove('on'));
      b.classList.add('on');
      applyFilter(cat.id,search?search.value:'');
    });
    box.appendChild(b);
  });
  if(search)search.addEventListener('input',e=>{
    const active=document.querySelector('.filt.on');
    applyFilter(active?active.dataset.filter:'all',e.target.value);
  });
}

function applyFilter(catId,term){
  const t=term.toLowerCase().trim();
  let any=false;
  document.querySelectorAll('.pl-group').forEach(g=>{
    const show=g.dataset.category===catId||catId==='all';
    let vis=false;
    g.querySelectorAll('.pl-row').forEach(r=>{
      const nm=r.querySelector('.pl-row__name');
      const ok=!t||(nm?nm.textContent.toLowerCase():'').includes(t);
      const on=show&&ok;
      r.style.display=on?'':'none';
      if(on){vis=true;any=true;}
    });
    g.style.display=vis?'':'none';
  });
  const none=document.getElementById('none');
  if(none)none.hidden=any;
}

async function renderResultsGallery(){
  const wrap=document.getElementById('resultsGrid');
  if(!wrap||!window.CATEGORIES||!window.getGalleryData)return;
  const cats=window.CATEGORIES.filter(c=>c.id!=='all');
  const ids=cats.map(c=>c.id);
  let data={};
  try{ data=await window.getGalleryData('img/', ids); }catch(e){ data={}; }
  wrap.innerHTML='';
  let rendered=0;
  cats.forEach(c=>{
    const photos=(data[c.id]||[]).slice(0,5);
    if(!photos.length)return;
    rendered++;
    const title=galleryTitle(c.id);
    const block=document.createElement('div');
    block.className='res-cat';
    const grid=photos.map(p=>`<figure class="res-photo"><img src="${esc(p.src)}" alt="${esc(title)} — до и после" loading="lazy"/><figcaption>${esc(p.caption)}</figcaption></figure>`).join('');
    block.innerHTML=`<h4 class="res-cat__title">${esc(title)}</h4><div class="res-grid">${grid}</div><a class="res-vk" href="${esc(window.VK_ALBUM||'#')}" target="_blank" rel="noopener">Смотреть все работы в ВК →</a>`;
    wrap.appendChild(block);
  });
  if(!rendered){
    wrap.innerHTML=`<p class="res-empty">Фото результатов готовятся. Все работы можно посмотреть в сообществе ВКонтакте.</p><a class="res-vk" href="${esc(window.VK_ALBUM||'#')}" target="_blank" rel="noopener">Перейти в ВК →</a>`;
  }
}

function setupBookingForm(){
  const city=document.getElementById('cCity');
  const serv=document.getElementById('cService');
  if(!city||!serv)return;
  city.addEventListener('change',function(){updateServicesByCity(this.value);});
  updateServicesByCity(city.value);
}

function updateServicesByCity(selected){
  const sel=document.getElementById('cService');
  if(!sel)return;
  const cur=sel.value;
  sel.innerHTML='<option value="">— Выберите услугу —</option>';
  window.SERVICES.forEach(s=>{
    let ok=false;
    if(selected==='')ok=true;
    else if(s.cities.includes('all'))ok=true;
    else if(s.cities.includes(selected))ok=true;
    if(!ok)return;
    const o=document.createElement('option');
    o.value=`${s.cat}|${s.name}`;
    let txt=`${s.name} — ${s.price} ₽`;
    if(s.unit)txt+=` (${s.unit})`;
    o.textContent=txt;
    sel.appendChild(o);
  });
  if(cur&&Array.from(sel.options).some(o=>o.value===cur))sel.value=cur;
}
