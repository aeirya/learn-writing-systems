/* Script Atlas: plain JavaScript, no build tools or account required. */
(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const KEY = "script-atlas-v1";
  const SCRIPT_ORDER = ["cyrillic", "urdu", "sorani", "kurmanji", "czech", "hebrew"];
  const SOUNDS = {
    b: ["Б", "ب", "ب", "B", "B", "ב"],
    p: ["П", "پ", "پ", "P", "P", "פ"],
    t: ["Т", "ت", "ت", "T", "T", "ת"],
    d: ["Д", "د", "د", "D", "D", "ד"],
    k: ["К", "ک", "ک", "K", "K", "ק"],
    g: ["Г", "گ", "گ", "G", "G", "ג"],
    m: ["М", "م", "م", "M", "M", "מ"],
    n: ["Н", "ن", "ن", "N", "N", "נ"],
    r: ["Р", "ر", "ر", "R", "R", "ר"],
    s: ["С", "س", "س", "S", "S", "ס"],
    sh: ["Ш", "ش", "ش", "Ş", "Š", "ש"],
    ch: ["Ч", "چ", "چ", "Ç", "Č", ""],
    zh: ["Ж", "ژ", "ژ", "J", "Ž", ""],
    f: ["Ф", "ف", "ف", "F", "F", "פ"],
    v: ["В", "و", "ڤ", "V", "V", "ו"],
    l: ["Л", "ل", "ل", "L", "L", "ל"],
    h: ["", "ہ", "ه", "H", "H", "ה"],
    kh: ["Х", "خ", "خ", "X", "Ch", "ח"],
    q: ["", "ق", "ق", "Q", "", ""],
    a: ["А", "آ", "ا", "A", "A", ""],
    e: ["Э", "ے", "ە", "E", "E", "בֶ"],
    i: ["И", "ی", "ی", "Î", "Í", "בִ"],
    o: ["О", "و", "ۆ", "O", "O", "בֹ"],
    u: ["У", "و", "وو", "Û", "Ú", "בֻ"],
    y: ["Й", "ی", "ی", "Y", "J", "י"],
    ts: ["Ц", "", "", "", "C", "צ"],
    rr: ["Р", "ڑ", "ڕ", "R", "Ř", "ר"]
  };
  const LANG = {cyrillic:"ru",urdu:"ur",sorani:"ckb",kurmanji:"ku",czech:"cs",hebrew:"he"};
  const stored = (() => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (_) { return {}; } })();
  const prefs = {
    view: stored.view === "table" ? "table" : "cards",
    persian: stored.persian !== false,
    hints: stored.hints === true,
    savedOnly: false,
    extras: stored.extras === true,
    theme: stored.theme === "dark" ? "dark" : "light",
    saved: new Set(Array.isArray(stored.saved) ? stored.saved : [])
  };
  const state = {script:"cyrillic", kind:"all", search:"", sound:"sh", practice:null, revealed:false};
  const safe = text => String(text == null ? "" : text).replace(/[&<>"']/g, ch => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  })[ch]);
  const data = {};
  for (const [id, info] of Object.entries(window.SCRIPT_DATA)) {
    const rows = info.raw.split(/\r?\n/).filter(Boolean).map((line, i) => {
      const [g,r,name,sound,fa,kind,ex,gloss,note,extra] = line.split("|").map(x=>x.trim());
      return {g,r,name,sound,fa,kind,ex,gloss,note,extra:extra==="1",i};
    });
    data[id] = {...info,rows};
  }
  const savePrefs = () => {
    try { localStorage.setItem(KEY, JSON.stringify({
      view:prefs.view,persian:prefs.persian,hints:prefs.hints,
      extras:prefs.extras,theme:prefs.theme,saved:[...prefs.saved]
    })); } catch (_) { /* Browser storage may be blocked. */ }
  };
  const getScript = () => data[state.script];
  const keyFor = row => state.script + ":" + row.g;
  const isSaved = row => prefs.saved.has(keyFor(row));
  const native = (str,cls="") => '<span class="' + safe(cls) + '" dir="auto">' + safe(str) + '</span>';
  const langClass = () => getScript().font || "";
  const matchesSearch = (row, query) => {
    if (!query) return true;
    const searchable = [row.g,row.r,row.name,row.sound,row.fa,row.ex,row.gloss,row.note].join(" ").toLocaleLowerCase();
    return searchable.includes(query.toLocaleLowerCase());
  };
  function filteredRows() {
    if (!data[state.script]) return [];
    return getScript().rows.filter(row => {
      if (state.script==="cyrillic" && row.extra && !prefs.extras) return false;
      if (state.kind==="vowel" && row.kind!=="vowel") return false;
      if (state.kind==="consonant" && row.kind!=="consonant") return false;
      if (state.kind==="special" && row.kind!=="special" && !row.note && !row.extra) return false;
      if (prefs.savedOnly && !isSaved(row)) return false;
      return matchesSearch(row,state.search.trim());
    });
  }
  let toastTimeout;
  function toast(message) {
    const node = $("toast");
    node.textContent = message;
    node.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(()=>node.classList.remove("show"),2200);
  }
  function renderHeader() {
    const s=getScript();
    $("scriptEyebrow").textContent=s.eyebrow;
    $("scriptTitle").textContent=s.title;
    $("scriptDesc").textContent=s.description;
    $("letterCount").textContent=s.core;
    $("scriptInsights").innerHTML = s.insights.map(([icon,title,desc]) =>
      '<article class="insight"><span class="insight-icon">' + safe(icon) +
      '</span><h3>' + safe(title) + '</h3><p>' + safe(desc) + '</p></article>'
    ).join("");
    $("readingNote").textContent=s.note;
    $("extrasSetting").hidden=state.script!=="cyrillic";
  }
  function card(row) {
    const hidden = prefs.hints ? "study-hidden" : "";
    const cls=langClass();
    const n=row.i+1;
    const star=isSaved(row);
    const hint = '<div class="hint-content"><div class="card-name">' + safe(row.name) +
      '</div><div class="card-sound">' + safe(row.r) + ' · ' + safe(row.sound) + '</div></div>';
    const example = row.ex ? '<div class="card-example">' +
      native(row.ex,"native-example "+cls) +
      '<span>' + safe(row.gloss||"") + '</span></div>' : '';
    const p = prefs.persian ? '<div class="card-persian">Persian cue: ' +
      native(row.fa||"—","persian-script") + '</div>' : '';
    const note = row.note ? '<p class="card-note">' + safe(row.note) + '</p>' : '';
    const reveal = prefs.hints ? '<button type="button" class="reveal-hint" data-action="reveal" data-index="'+n+'">Reveal hint</button>' : '';
    return '<article class="letter-card" data-idx="' + n + '">' +
      '<div class="card-top"><span class="card-index">' + String(n).padStart(2,"0") +
      (row.extra ? " +" : "") + '</span><div class="card-actions">' +
      '<button type="button" data-action="speak" data-index="'+n+'" title="Speak example if a matching browser voice is installed" aria-label="Speak example">♫</button>' +
      '<button type="button" class="copy-btn" data-action="copy" data-index="'+n+'" title="Copy character" aria-label="Copy character">⧉</button>' +
      '<button type="button" class="'+(star?"is-saved":"")+'" data-action="save" data-index="'+n+'" title="'+(star?"Remove from saved":"Save for practice")+'" aria-label="'+(star?"Unsave letter":"Save letter")+'" aria-pressed="'+star+'">'+(star?"★":"☆")+'</button>' +
      '</div></div><div class="card-letter ' + safe(cls) + '" dir="auto">' + safe(row.g) +
      '</div><div class="'+hidden+'">' + hint + '</div>'+reveal+
      '<div class="kind-tag">' + safe(row.kind.toUpperCase()) + '</div>' +
      example+p+note+'</article>';
  }
  function table(rows) {
    const cls=langClass();
    const persian=prefs.persian;
    const head='<table class="alphabet-table"><thead><tr><th>#</th><th>Letter</th><th>Name / value</th><th>Sound guide</th>' +
      (persian?'<th>Persian cue</th>':'') + '<th>Example</th><th>Save</th></tr></thead><tbody>';
    const body=rows.map(row => '<tr><td>'+String(row.i+1).padStart(2,'0')+'</td>' +
      '<td class="table-glyph '+safe(cls)+'" dir="auto">'+safe(row.g)+'</td>' +
      '<td><strong>'+safe(row.name)+'</strong><br><span class="card-sound">'+safe(row.r)+'</span></td>' +
      '<td>'+safe(row.sound)+(row.note?'<br><small class="card-note">'+safe(row.note)+'</small>':'')+'</td>' +
      (persian?'<td>'+native(row.fa||"—","persian-script")+'</td>':'') +
      '<td>'+native(row.ex||"—","table-native "+cls)+(row.gloss?' <small>· '+safe(row.gloss)+'</small>':'')+'</td>' +
      '<td><button type="button" class="save-btn '+(isSaved(row)?"is-saved":"")+'" data-action="save" data-index="'+(row.i+1)+'" aria-label="Toggle saved" aria-pressed="'+isSaved(row)+'">'+(isSaved(row)?"★":"☆")+'</button></td></tr>'
    ).join('');
    return head+body+'</tbody></table>';
  }
  function renderRows() {
    const rows=filteredRows();
    const count=prefs.saved.size;
    $("visibleCount").textContent=rows.length;
    $("savedCount").textContent=count ? "· "+count+" saved total" : "";
    $("emptyState").hidden=rows.length>0;
    $("cardsArea").hidden=prefs.view!=="cards" || rows.length===0;
    $("tableArea").hidden=prefs.view!=="table" || rows.length===0;
    $("cardsBtn").setAttribute("aria-pressed",String(prefs.view==="cards"));
    $("tableBtn").setAttribute("aria-pressed",String(prefs.view==="table"));
    if(prefs.view==="cards") $("cardsArea").innerHTML=rows.map(card).join('');
    else $("tableArea").innerHTML=table(rows);
    if (!state.practice || !rows.some(row=>row.i===state.practice.i)) {
      state.practice=rows.length ? rows[Math.floor(Math.random()*rows.length)] : null;
      state.revealed=false;
    }
    renderPractice();
  }
  function renderPractice(){
    const row=state.practice;
    $("practiceChar").className="practice-char "+langClass();
    $("practiceChar").textContent=row ? row.g : "—";
    $("practiceAnswer").textContent=!row ? "No letters match this selection." :
      state.revealed ? row.name+" · "+row.r+" — "+row.sound : "Guess its sound or name.";
    $("revealBtn").disabled=!row;
    $("nextBtn").disabled=!row;
    $("revealBtn").textContent=state.revealed?"Answer shown":"Reveal answer";
    $("practiceStatus").textContent="Random card from "+filteredRows().length+" visible characters.";
  }
  function render(){
    renderHeader();
    renderRows();
  }
  function selectScript(id, updateHash=true){
    if (!data[id] && id!=="compare") return;
    if (id==="compare") {
      $("singleView").hidden=true;$("compareView").hidden=false;
      renderCompare();
    } else {
      $("singleView").hidden=false;$("compareView").hidden=true;
      state.script=id;state.search="";state.kind="all";state.practice=null;state.revealed=false;
      prefs.savedOnly=false;
      $("searchInput").value="";
      $("savedToggle").checked=false;
      document.querySelector('input[name="kind"][value="all"]').checked=true;
      render();
    }
    document.querySelectorAll(".script-tab").forEach(button=>{
      const active=button.dataset.script===id;
      button.classList.toggle("active",active);
      button.setAttribute("aria-current",active?"page":"false");
    });
    if(updateHash) history.replaceState(null,"","#"+id);
  }
  function findByInitialGlyph(id, glyph){
    return data[id].rows.find(row=>row.g.split(" ")[0]===glyph) || null;
  }
  function renderCompare(){
    $("soundPills").innerHTML=Object.keys(SOUNDS).map(sound=>
      '<button type="button" data-sound="'+safe(sound)+'" class="'+(sound===state.sound?"active":"")+'" aria-pressed="'+(sound===state.sound)+'">'+safe(sound)+'</button>'
    ).join('');
    $("compareGrid").innerHTML=SCRIPT_ORDER.map((id,i)=>{
      const s=data[id], glyph=SOUNDS[state.sound][i];
      const row=glyph?findByInitialGlyph(id,glyph):null;
      return '<article class="compare-card"><small>'+safe(s.name)+'</small>'+
        '<div class="compare-glyph '+safe(s.font||"")+'" dir="auto">'+safe(row?row.g:"—")+'</div>'+
        '<div class="compare-gloss">'+(row?safe(row.name)+' · '+safe(row.r):'No simple chart equivalent')+'</div></article>';
    }).join('');
  }
  function toggleSave(row){
    const id=keyFor(row);
    if(prefs.saved.has(id)) prefs.saved.delete(id);
    else prefs.saved.add(id);
    savePrefs();renderRows();
  }
  async function copyLetter(row){
    try{
      await navigator.clipboard.writeText(row.g);
      toast("Copied "+row.g);
    } catch(_) { toast("Copy unavailable in this browser context."); }
  }
  function speak(row){
    if(!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)){
      toast("Speech synthesis is unavailable in this browser.");return;
    }
    const lang=LANG[state.script];
    const voices=window.speechSynthesis.getVoices();
    const voice=voices.find(v=>v.lang.toLowerCase().startsWith(lang));
    if(!voice){toast("No "+getScript().name+" voice installed. Read the sound guide instead.");return;}
    window.speechSynthesis.cancel();
    const utterance=new SpeechSynthesisUtterance(row.ex||row.g);
    utterance.lang=voice.lang;utterance.voice=voice;utterance.rate=.8;
    window.speechSynthesis.speak(utterance);
  }
  function handleLetterAction(event){
    const button=event.target.closest("button[data-action]");
    if(!button) return;
    const row=getScript().rows[Number(button.dataset.index)-1];
    if(!row) return;
    switch(button.dataset.action){
      case "save":toggleSave(row);break;
      case "copy":copyLetter(row);break;
      case "speak":speak(row);break;
      case "reveal":{
        const container=button.closest(".letter-card");
        container?.querySelector(".study-hidden")?.classList.add("revealed");
        button.remove();
        break;
      }
    }
  }
  const bind = (id,event,fn) => $(id).addEventListener(event,fn);
  document.querySelectorAll(".script-tab").forEach(el=>el.addEventListener("click",()=>selectScript(el.dataset.script)));
  bind("searchInput","input",event=>{state.search=event.target.value;state.practice=null;renderRows();});
  document.querySelectorAll('input[name="kind"]').forEach(el=>el.addEventListener("change",()=>{
    state.kind=document.querySelector('input[name="kind"]:checked').value;
    state.practice=null;renderRows();
  }));
  bind("resetBtn","click",()=>{
    state.kind="all";state.search="";state.practice=null;
    prefs.savedOnly=false;prefs.hints=false;prefs.persian=true;prefs.extras=false;
    $("searchInput").value="";$("savedToggle").checked=false;
    $("hintsToggle").checked=false;$("persianToggle").checked=true;$("extrasToggle").checked=false;
    document.querySelector('input[name="kind"][value="all"]').checked=true;
    savePrefs();render();toast("Filters reset");
  });
  [["persianToggle","persian"],["hintsToggle","hints"],["savedToggle","savedOnly"],["extrasToggle","extras"]].forEach(([id,key])=>{
    $(id).checked=prefs[key];
    bind(id,"change",e=>{prefs[key]=e.target.checked;state.practice=null;savePrefs();renderRows();});
  });
  bind("cardsBtn","click",()=>{prefs.view="cards";savePrefs();renderRows();});
  bind("tableBtn","click",()=>{prefs.view="table";savePrefs();renderRows();});
  bind("cardsArea","click",handleLetterAction);
  bind("tableArea","click",handleLetterAction);
  bind("nextBtn","click",()=>{
    const rows=filteredRows();
    if(!rows.length)return;
    let choices=rows.filter(row=>!state.practice||row.i!==state.practice.i);
    if(!choices.length) choices=rows;
    state.practice=choices[Math.floor(Math.random()*choices.length)];
    state.revealed=false;renderPractice();
  });
  bind("revealBtn","click",()=>{state.revealed=true;renderPractice();});
  bind("soundPills","click",event=>{
    const btn=event.target.closest("button[data-sound]");
    if(!btn)return;
    state.sound=btn.dataset.sound;renderCompare();
  });
  const applyTheme=()=>{
    document.body.classList.toggle("dark",prefs.theme==="dark");
    $("themeToggle").setAttribute("aria-label",prefs.theme==="dark"?"Switch to light mode":"Switch to dark mode");
    $("themeToggle").textContent=prefs.theme==="dark"?"☀":"◐";
  };
  bind("themeToggle","click",()=>{prefs.theme=prefs.theme==="dark"?"light":"dark";savePrefs();applyTheme();});
  window.addEventListener("hashchange",()=>selectScript(decodeURIComponent(location.hash.slice(1))||"cyrillic",false));
  applyTheme();
  selectScript(decodeURIComponent(location.hash.slice(1))||"cyrillic",false);
})();