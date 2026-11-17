/* ===== SOFT EDITORIAL · логика ===== */
(function(){
  "use strict";
  const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
  const LS={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},set(k,v){localStorage.setItem(k,JSON.stringify(v))}};
  const PRE="se_";
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const norm=s=>s.toLowerCase().replace(/ё/g,"е");
  const TIMES=["10:00","11:30","13:00","14:30","16:00","17:30","19:00"];

  /* меню */
  const links=$("#links"),hb=$("#hb");
  hb.addEventListener("click",()=>links.classList.toggle("open"));
  $$("#links a").forEach(a=>a.addEventListener("click",()=>links.classList.remove("open")));

  /* табы */
  let cat="all",q="";
  const tabsEl=$("#tabs");
  window.CATEGORIES.forEach(c=>{
    const b=document.createElement("button");b.className="tab"+(c.id===cat?" on":"");b.textContent=c.label;b.dataset.id=c.id;
    b.addEventListener("click",()=>{cat=c.id;$$(".tab").forEach(x=>x.classList.toggle("on",x.dataset.id===cat));draw();});
    tabsEl.appendChild(b);
  });
  $("#srch").addEventListener("input",e=>{q=e.target.value;draw();});

  /* прайс-меню карточками */
  const menuEl=$("#menu"),noneEl=$("#none");
  function draw(){
    const qq=norm(q.trim());
    const items=window.SERVICES.filter(s=>{
      const okCat=cat==="all"||s.cat===cat;
      const okQ=!qq||norm(s.name).includes(qq)||norm(s.catName).includes(qq)||norm(s.note||"").includes(qq)||norm(s.unit||"").includes(qq);
      return okCat&&okQ;
    });
    menuEl.innerHTML="";noneEl.hidden=items.length>0;
    const order=window.CATEGORIES.filter(c=>c.id!=="all").map(c=>c.id);
    const groups={};
    items.forEach(s=>{(groups[s.catName]=groups[s.catName]||[]).push(s);});
    const keys=Object.keys(groups).sort((a,b)=>{
      const ia=order.indexOf(window.SERVICES.find(s=>s.catName===a).cat);
      const ib=order.indexOf(window.SERVICES.find(s=>s.catName===b).cat);
      return ia-ib;
    });
    keys.forEach(name=>{
      const card=document.createElement("div");card.className="mcard";
      card.innerHTML=`<div class="mcard__t">${esc(name)}</div>`;
      groups[name].forEach(s=>{
        const label=`${s.name} — ${s.price} ₽${s.unit?" ("+s.unit+")":""}`;
        const row=document.createElement("div");row.className="mrow";
        row.innerHTML=`
          <div class="mrow__n">${esc(s.name)}${s.note?`<small>${esc(s.note)}</small>`:""}</div>
          <div class="mrow__dots"></div>
          <div class="mrow__p">${esc(s.price)} ₽${s.unit?`<u>${esc(s.unit)}</u>`:""}</div>
          <button class="mrow__b" data-b="${esc(label)}">Записаться</button>`;
        card.appendChild(row);
      });
      menuEl.appendChild(card);
    });
    $$("[data-b]",menuEl).forEach(b=>b.addEventListener("click",()=>bookRow(b.dataset.b)));
  }

  /* select в форме */
  const sel=$("#bService");
  (function(){
    sel.innerHTML='<option value="">— выберите процедуру —</option>';
    const g={};window.SERVICES.forEach(s=>{(g[s.catName]=g[s.catName]||[]).push(s);});
    Object.keys(g).forEach(c=>{const og=document.createElement("optgroup");og.label=c;g[c].forEach(s=>{const o=document.createElement("option");o.value=`${s.name} — ${s.price} ₽${s.unit?" ("+s.unit+")":""}`;o.textContent=`${s.name} · ${s.price} ₽`;og.appendChild(o);});sel.appendChild(og);});
  })();
  function minDate(inp){const t=new Date();t.setDate(t.getDate()+1);inp.min=t.toISOString().split("T")[0];if(!inp.value)inp.value=inp.min;}
  minDate($("#bDate"));

  function bookRow(label){
    sel.value=label;
    const p=LS.get(PRE+"prof",null);
    if(p&&!$("#bName").value){$("#bName").value=p.name||"";$("#bPhone").value=p.phone||"";}
    document.getElementById("book").scrollIntoView({behavior:"smooth"});
    setTimeout(()=>$("#bName").focus(),500);
  }

  /* слоты: день -> чипы времени */
  const dayRow=$("#dayRow"),timeRow=$("#timeRow"),slotHint=$("#slotHint");
  const WD=["Вс","Пн","Вт","Ср","Чт","Пт","Сб"];
  let selDay=null,selTime=null;
  function busy(iso,t){let h=0;const s=iso+t;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return h%5===0;}
  function buildDays(){
    dayRow.innerHTML="";
    const base=new Date();base.setDate(base.getDate()+1);
    for(let i=0;i<7;i++){
      const d=new Date(base);d.setDate(base.getDate()+i);
      const iso=d.toISOString().split("T")[0];
      const b=document.createElement("button");b.className="day";b.type="button";b.dataset.d=iso;
      b.innerHTML=`<span>${WD[d.getDay()]}</span><b>${d.getDate()}</b>`;
      b.addEventListener("click",()=>{
        $$(".day",dayRow).forEach(x=>x.classList.remove("on"));b.classList.add("on");
        selDay=iso;selTime=null;$("#bDate").value=iso;$("#bTime").value="";buildTimes(iso);
      });
      dayRow.appendChild(b);
    }
    const first=dayRow.querySelector(".day");if(first)first.click();
  }
  function buildTimes(iso){
    timeRow.innerHTML="";
    TIMES.forEach(t=>{
      const c=document.createElement("button");c.type="button";c.className="time";c.textContent=t;
      if(busy(iso,t)){c.classList.add("busy");c.disabled=true;}
      else{c.addEventListener("click",()=>{
        $$(".time",timeRow).forEach(x=>x.classList.remove("sel"));c.classList.add("sel");
        selTime=t;$("#bTime").value=t;
        const dd=new Date(iso);
        slotHint.innerHTML=`Выбрано: <b>${dd.toLocaleDateString("ru-RU",{day:"numeric",month:"long"})}, ${t}</b>`;
      });}
      timeRow.appendChild(c);
    });
  }
  buildDays();

  /* отправка */
  function submit(data){
    if(!data.name||data.name.trim().length<2)return toast("Укажите имя");
    if(data.phone.replace(/\D/g,"").length<10)return toast("Проверьте номер телефона");
    if(!data.service)return toast("Выберите процедуру");
    if(!data.date||!data.time)return toast("Выберите дату и время");
    if(!data.ag)return toast("Нужно согласие на обработку данных");
    const list=LS.get(PRE+"book",[]);
    list.unshift({...data,id:Date.now()+"_"+Math.floor(Math.random()*1e3),status:"new",created:new Date().toISOString()});
    LS.set(PRE+"book",list);LS.set(PRE+"prof",{name:data.name,phone:data.phone});
    updatePip();toast("✓ Заявка принята. Ожидает подтверждения.");
    return true;
  }
  $("#bf").addEventListener("submit",e=>{
    e.preventDefault();
    const ok=submit({name:$("#bName").value,phone:$("#bPhone").value,service:$("#bService").value,date:$("#bDate").value,time:$("#bTime").value,note:$("#bNote").value,ag:$("#bAg").checked});
    if(ok){e.target.reset();selTime=null;$$(".time.sel",timeRow).forEach(x=>x.classList.remove("sel"));slotHint.textContent="Слот не выбран";}
  });

  /* VK (имитация) + кабинет */
  function refreshVk(){
    const on=LS.get(PRE+"vk",false),p=LS.get(PRE+"prof",null);
    const ava=$("#cabBtn"),lbl=$("#vkLbl");
    if(on){ava.hidden=false;lbl.textContent="Вы вошли";$("#avaInit").textContent=(p&&p.name?p.name.trim()[0]:"Я").toUpperCase();}
    else{ava.hidden=true;lbl.textContent="Войти через VK";}
  }
  function vkFlow(){ if(LS.get(PRE+"vk",false)){renderCab();open("cabMo");return;} open("vkMo"); }
  $("#vkBtn").addEventListener("click",vkFlow);
  $("#vkOk").addEventListener("click",()=>{LS.set(PRE+"vk",true);close($("#vkMo"));refreshVk();toast("✓ Вход через VK выполнен (демо).");renderCab();open("cabMo");});

  const cabB=$("#cabB");
  function renderCab(){
    const list=LS.get(PRE+"book",[]),on=LS.get(PRE+"vk",false);
    cabB.innerHTML="";
    const top=document.createElement("div");top.className="cab-top";
    top.innerHTML=on
      ?`<span>Профиль: <b>вы вошли через VK (демо)</b></span><button class="gh" id="out">Выйти</button>`
      :`<span>Вы не авторизованы. Заявки ниже сохранены в этом браузере.</span><button class="pri" id="fromCab" style="padding:.5rem 1rem">Войти через VK</button>`;
    cabB.appendChild(top);
    if(!list.length){const p=document.createElement("p");p.className="cab-empty";p.textContent="Пока нет заявок. Выберите процедуру в прайсе или слот в расписании.";cabB.appendChild(p);}
    else list.forEach(b=>{
      const cn=b.status==="cancelled";
      const d=document.createElement("div");d.className="ci";
      const dd=new Date(b.date).toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"});
      d.innerHTML=`<div class="ci__t"><div><div class="ci__n">${esc(b.service)}</div><div class="ci__m">${esc(b.name)} · ${esc(b.phone)}</div><div class="ci__m">📅 ${dd}, ${esc(b.time)}</div>${b.note?`<div class="ci__m">💬 ${esc(b.note)}</div>`:""}</div><span class="st ${cn?"st--cn":"st--new"}">${cn?"Отменена":"Ожидает"}</span></div>
        <div class="ci__a">${cn?"":`<button data-cn="${b.id}">Отменить</button>`}<button data-del="${b.id}">Удалить</button></div>`;
      cabB.appendChild(d);
    });
    $$("[data-cn]",cabB).forEach(x=>x.addEventListener("click",()=>setStatus(x.dataset.cn,"cancelled")));
    $$("[data-del]",cabB).forEach(x=>x.addEventListener("click",()=>del(x.dataset.del)));
    const out=$("#out");if(out)out.addEventListener("click",()=>{LS.set(PRE+"vk",false);refreshVk();renderCab();toast("Вы вышли (демо).");});
    const fc=$("#fromCab");if(fc)fc.addEventListener("click",()=>{close($("#cabMo"));open("vkMo");});
  }
  function setStatus(id,st){const l=LS.get(PRE+"book",[]);const b=l.find(x=>x.id===id);if(b){b.status=st;LS.set(PRE+"book",l);renderCab();updatePip();}}
  function del(id){let l=LS.get(PRE+"book",[]);l=l.filter(x=>x.id!==id);LS.set(PRE+"book",l);renderCab();updatePip();}
  function updatePip(){const n=LS.get(PRE+"book",[]).filter(b=>b.status!=="cancelled").length;const p=$("#pip");p.textContent=n;p.hidden=n===0;}
  $("#cabBtn").addEventListener("click",()=>{renderCab();open("cabMo");});
  $("#cabLink").addEventListener("click",e=>{e.preventDefault();renderCab();open("cabMo");});

  /* модалки */
  function open(id){const m=$("#"+id);m.hidden=false;document.body.style.overflow="hidden";}
  function close(m){m.hidden=true;document.body.style.overflow="";}
  $$(".mo").forEach(m=>m.addEventListener("click",e=>{if(e.target===m||e.target.hasAttribute("data-x"))close(m);}));
  document.addEventListener("keydown",e=>{if(e.key==="Escape")$$(".mo:not([hidden])").forEach(close);});

  /* тост */
  let tt;function toast(m){const t=$("#toast");t.textContent=m;t.hidden=false;t.classList.add("show");clearTimeout(tt);tt=setTimeout(()=>{t.classList.remove("show");setTimeout(()=>t.hidden=true,350);},3400);}

  $("#yr").textContent=new Date().getFullYear();
  draw();refreshVk();updatePip();
})();