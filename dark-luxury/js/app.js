/* ===== DARK LUXURY · логика ===== */
(function(){
  "use strict";
  const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
  const LS={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},set(k,v){localStorage.setItem(k,JSON.stringify(v))}};
  const PRE="dl_"; // изолируем заявки этого сайта
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const norm=s=>s.toLowerCase().replace(/ё/g,"е");

  /* мобильное меню */
  const menu=$("#menu"),burger=$("#burger");
  burger.addEventListener("click",()=>menu.classList.toggle("open"));
  $$("#menu a").forEach(a=>a.addEventListener("click",()=>menu.classList.remove("open")));

  /* фильтры категорий */
  let cat="all",q="";
  const fEl=$("#filters");
  window.CATEGORIES.forEach(c=>{
    const b=document.createElement("button");
    b.className="filt"+(c.id===cat?" on":"");b.textContent=c.label;b.dataset.id=c.id;
    b.addEventListener("click",()=>{cat=c.id;$$(".filt").forEach(x=>x.classList.toggle("on",x.dataset.id===cat));draw();});
    fEl.appendChild(b);
  });
  $("#find").addEventListener("input",e=>{q=e.target.value;draw();});

  /* прайс-меню: группируем по catName, строки с лидерами */
  const plEl=$("#pricelist"),noneEl=$("#none");
  function draw(){
    const qq=norm(q.trim());
    const items=window.SERVICES.filter(s=>{
      const okCat=cat==="all"||s.cat===cat;
      const okQ=!qq||norm(s.name).includes(qq)||norm(s.catName).includes(qq)||norm(s.note||"").includes(qq);
      return okCat&&okQ;
    });
    plEl.innerHTML="";noneEl.hidden=items.length>0;
    const order=window.CATEGORIES.filter(c=>c.id!=="all").map(c=>c.id);
    const groups={};
    items.forEach(s=>{(groups[s.catName]=groups[s.catName]||[]).push(s);});
    const keys=Object.keys(groups).sort((a,b)=>{
      const ca=order.find(id=>window.SERVICES.find(s=>s.catName===a&&s.cat===id))||99;
      const cb=order.find(id=>window.SERVICES.find(s=>s.catName===b&&s.cat===id))||99;
      return order.indexOf(ca)-order.indexOf(cb);
    });
    keys.forEach(name=>{
      const g=document.createElement("div");g.className="pl-group";
      g.innerHTML=`<div class="pl-group__title">${esc(name)}</div>`;
      groups[name].forEach(s=>{
        const row=document.createElement("div");row.className="pl-row";
        const label=`${s.name} — ${s.price}${s.unit?" ("+s.unit+")":""}`;
        row.innerHTML=`
          <div class="pl-row__name">${esc(s.name)}${s.note?`<small>${esc(s.note)}</small>`:""}</div>
          <div class="pl-row__dots"></div>
          <div class="pl-row__price">${esc(s.price)} ₽${s.unit?`<u>${esc(s.unit)}</u>`:""}</div>
          <button class="pl-row__book" data-b="${esc(label)}">Записаться</button>`;
        g.appendChild(row);
      });
      plEl.appendChild(g);
    });
    $$("[data-b]",plEl).forEach(b=>b.addEventListener("click",()=>book(b.dataset.b)));
  }

  /* select услуги в форме */
  const sel=$("#cService");
  (function fillSel(){
    sel.innerHTML='<option value="">— выберите процедуру —</option>';
    const groups={};window.SERVICES.forEach(s=>{(groups[s.catName]=groups[s.catName]||[]).push(s);});
    Object.keys(groups).forEach(c=>{
      const og=document.createElement("optgroup");og.label=c;
      groups[c].forEach(s=>{const o=document.createElement("option");o.value=`${s.name} — ${s.price} ₽${s.unit?" ("+s.unit+")":""}`;o.textContent=`${s.name} · ${s.price} ₽`;og.appendChild(o);});
      sel.appendChild(og);
    });
  })();

  /* минимальная дата = завтра */
  function minDate(inp){const t=new Date();t.setDate(t.getDate()+1);inp.min=t.toISOString().split("T")[0];if(!inp.value)inp.value=inp.min;}
  minDate($("#cDate"));

  /* быстрая запись с строки прайса → скролл к форме + подстановка */
  function book(label){
    sel.value=label;
    if(!$("#cName").value){const p=LS.get(PRE+"prof",null);if(p){$("#cName").value=p.name||"";$("#cPhone").value=p.phone||"";}}
    document.getElementById("contact").scrollIntoView({behavior:"smooth"});
    setTimeout(()=>$("#cName").focus(),500);
  }

  /* отправка */
  function submit(data){
    if(!data.name||data.name.trim().length<2)return toast("Укажите имя");
    if(data.phone.replace(/\D/g,"").length<10)return toast("Проверьте номер телефона");
    if(!data.service)return toast("Выберите процедуру");
    if(!data.date||!data.time)return toast("Выберите дату и время");
    if(!data.agree)return toast("Нужно согласие на обработку данных");
    const list=LS.get(PRE+"book",[]);
    list.unshift({...data,id:Date.now()+"_"+Math.floor(Math.random()*1e3),status:"new",created:new Date().toISOString()});
    LS.set(PRE+"book",list);LS.set(PRE+"prof",{name:data.name,phone:data.phone});
    toast("✓ Заявка принята. Свяжусь с вами для подтверждения.");
    return true;
  }
  $("#cform").addEventListener("submit",e=>{
    e.preventDefault();
    const ok=submit({name:$("#cName").value,phone:$("#cPhone").value,service:$("#cService").value,date:$("#cDate").value,time:$("#cTime").value,note:$("#cNote").value,agree:$("#cAgree").checked});
    if(ok)e.target.reset();
  });

  /* тост */
  let tt;
  function toast(m){const t=$("#toast");t.textContent=m;t.hidden=false;t.classList.add("show");clearTimeout(tt);tt=setTimeout(()=>{t.classList.remove("show");setTimeout(()=>t.hidden=true,400);},3400);}

  $("#yr").textContent=new Date().getFullYear();
  draw();
})();