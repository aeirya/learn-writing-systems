/* Armenian handwriting reference: uppercase, lowercase, roman hint, Eastern IPA, Western IPA, Commons hash prefix. */
const letters = [
  [
    "Ա",
    "ա",
    "a",
    "ɑ",
    "ɑ",
    "e5"
  ],
  [
    "Բ",
    "բ",
    "b",
    "b",
    "pʰ",
    "f7"
  ],
  [
    "Գ",
    "գ",
    "g",
    "ɡ",
    "kʰ",
    "69"
  ],
  [
    "Դ",
    "դ",
    "d",
    "d",
    "tʰ",
    "03"
  ],
  [
    "Ե",
    "ե",
    "e / ye",
    "ɛ / jɛ",
    "ɛ / jɛ",
    "94"
  ],
  [
    "Զ",
    "զ",
    "z",
    "z",
    "z",
    "67"
  ],
  [
    "Է",
    "է",
    "e",
    "ɛ",
    "ɛ",
    "6b"
  ],
  [
    "Ը",
    "ը",
    "uh",
    "ə",
    "ə",
    "d6"
  ],
  [
    "Թ",
    "թ",
    "tʰ",
    "tʰ",
    "tʰ",
    "50"
  ],
  [
    "Ժ",
    "ժ",
    "zh",
    "ʒ",
    "ʒ",
    "84"
  ],
  [
    "Ի",
    "ի",
    "i",
    "i",
    "i",
    "c9"
  ],
  [
    "Լ",
    "լ",
    "l",
    "l",
    "l",
    "3c"
  ],
  [
    "Խ",
    "խ",
    "kh",
    "χ",
    "χ",
    "de"
  ],
  [
    "Ծ",
    "ծ",
    "ts",
    "ts",
    "dz",
    "81"
  ],
  [
    "Կ",
    "կ",
    "k",
    "k",
    "ɡ",
    "f8"
  ],
  [
    "Հ",
    "հ",
    "h",
    "h",
    "h",
    "fb"
  ],
  [
    "Ձ",
    "ձ",
    "dz",
    "dz",
    "tsʰ",
    "d8"
  ],
  [
    "Ղ",
    "ղ",
    "gh",
    "ʁ",
    "ʁ",
    "12"
  ],
  [
    "Ճ",
    "ճ",
    "ch",
    "tʃ",
    "dʒ",
    "2e"
  ],
  [
    "Մ",
    "մ",
    "m",
    "m",
    "m",
    "4b"
  ],
  [
    "Յ",
    "յ",
    "y",
    "j",
    "j / h",
    "78"
  ],
  [
    "Ն",
    "ն",
    "n",
    "n",
    "n",
    "92"
  ],
  [
    "Շ",
    "շ",
    "sh",
    "ʃ",
    "ʃ",
    "37"
  ],
  [
    "Ո",
    "ո",
    "o / vo",
    "ɔ / vo",
    "ɔ / vo",
    "e1"
  ],
  [
    "Չ",
    "չ",
    "chʰ",
    "tʃʰ",
    "tʃʰ",
    "ae"
  ],
  [
    "Պ",
    "պ",
    "p",
    "p",
    "b",
    "8a"
  ],
  [
    "Ջ",
    "ջ",
    "j",
    "dʒ",
    "tʃʰ",
    "7d"
  ],
  [
    "Ռ",
    "ռ",
    "rr",
    "r",
    "ɾ",
    "d7"
  ],
  [
    "Ս",
    "ս",
    "s",
    "s",
    "s",
    "e4"
  ],
  [
    "Վ",
    "վ",
    "v",
    "v",
    "v",
    "51"
  ],
  [
    "Տ",
    "տ",
    "t",
    "t",
    "d",
    "84"
  ],
  [
    "Ր",
    "ր",
    "r",
    "ɾ",
    "ɾ",
    "93"
  ],
  [
    "Ց",
    "ց",
    "tsʰ",
    "tsʰ",
    "tsʰ",
    "70"
  ],
  [
    "Ու",
    "ու",
    "u",
    "u",
    "u",
    "f3"
  ],
  [
    "Փ",
    "փ",
    "pʰ",
    "pʰ",
    "pʰ",
    "87"
  ],
  [
    "Ք",
    "ք",
    "kʰ",
    "kʰ",
    "kʰ",
    "9b"
  ],
  [
    "Օ",
    "օ",
    "o",
    "o",
    "o",
    "a1"
  ],
  [
    "Ֆ",
    "ֆ",
    "f",
    "f",
    "f",
    "e4"
  ],
  [
    "Եւ",
    "և",
    "ev / yev",
    "ɛv / jɛv",
    "ɛv / jɛv",
    "4b"
  ]
];
const byLower = new Map(letters.map(row => [row[1],row]));
function card(row, wanted) {
  const [upper,lower,roman,east,west,hash] = row;
  const filename = upper + '_handwritten.svg';
  const remote = 'https://upload.wikimedia.org/wikipedia/commons/' + hash[0] + '/' + hash + '/' + encodeURIComponent(filename);
  const source = 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(filename);
  const box = document.createElement('article');
  box.className = 'hand-card';
  const a = document.createElement('a');
  a.href = 'images/' + encodeURIComponent(filename); a.target = '_blank'; a.rel = 'noopener';
  const img = document.createElement('img');
  img.alt = 'Handwritten ' + upper + ' (left) and ' + lower + ' (right)';
  img.width=512; img.height=512; img.loading=wanted?'eager':'lazy';
  img.addEventListener('error', () => { if(img.dataset.fallback) return; img.dataset.fallback='1'; img.src=remote; });
  img.src = 'images/' + encodeURIComponent(filename);
  a.append(img); box.append(a);
  const title=document.createElement('strong'); title.lang='hy'; title.textContent=wanted || upper+' '+lower; box.append(title);
  const hint=document.createElement('small'); hint.textContent=roman+' · /'+east+'/ (Eastern)'; box.append(hint);
  if(wanted) {
    const which=document.createElement('small'); which.className='case-label'; which.textContent=(wanted===upper || wanted===wanted.toUpperCase() || wanted==='Ու')?'LEFT · uppercase':'RIGHT · lowercase'; box.append(which);
  } else {
    const w=document.createElement('small'); w.textContent='/'+west+'/ (Western)'; box.append(w);
    const src=document.createElement('a'); src.href=source; src.target='_blank'; src.rel='noopener'; src.textContent='Source'; box.append(src);
  }
  return box;
}
const romanMap = {"ch'":"չ","ts'":"ց","t'":"թ","p'":"փ","k'":"ք","sh":"շ","zh":"ժ","kh":"խ","gh":"ղ","dz":"ձ","ts":"ծ","ch":"ճ","rr":"ռ","uh":"ը","eh":"է","oh":"օ","ew":"և","a":"ա","b":"բ","g":"գ","d":"դ","e":"ե","z":"զ","ë":"ը","ə":"ը","ē":"է","i":"ի","l":"լ","x":"խ","k":"կ","h":"հ","m":"մ","y":"յ","n":"ն","o":"ո","p":"պ","j":"ջ","s":"ս","v":"վ","t":"տ","r":"ր","u":"ու","q":"ք","f":"ֆ","š":"շ","ž":"ժ","č":"ճ","ł":"ղ","ṙ":"ռ","ō":"օ","c":"ծ"};
const presets = [
  {
    "label": "Happy birthday! (informal)",
    "latin": "Shnorhavor tsnundd.",
    "armenian": "Շնորհավոր ծնունդդ։"
  },
  {
    "label": "Happy birthday! (formal)",
    "latin": "Shnorhavor Dzer tsnunduh.",
    "armenian": "Շնորհավոր Ձեր ծնունդը։"
  }
];
function transliterate(input) {
  const keys=Object.keys(romanMap).sort((a,b)=>b.length-a.length);
  const unknown=new Set();
  const output=input.normalize('NFC').replace(/[’ʼ]/g,"'").replace(/[A-Za-zëəēšžčłṙō']+/giu, word=>{
    let result="";
    for(let i=0;i<word.length;){
      const rest=word.slice(i).toLowerCase();
      const key=i===0 && rest.startsWith("ye") ? "ye" : i===0 && rest.startsWith("vo") ? "vo" : keys.find(k=>rest.startsWith(k));
      if(!key){const ch=word[i++];if(ch!=="'")unknown.add(ch);result+=ch;continue;}
      let glyph=key==="ye"?"ե":key==="vo"?"ո":romanMap[key];
      const first=word[i];
      if(first===first.toUpperCase() && first!==first.toLowerCase()){
        glyph=glyph==="ու"?"Ու":glyph==="և"?"Եվ":glyph.toUpperCase();
      }
      result+=glyph;
      i+=key.length;
    }
    return result;
  }).replace(/\./g,"։");
  return {output,unknown:[...unknown]};
}
function splitArmenian(word) {
  return word.match(/(?:[Ոո][Ււ]|[Եե]ւ)|[\s\S]/gu)||[];
}
const sentence = document.getElementById('sentence');
const preview = document.getElementById('sentence-preview');
const guide = document.getElementById('sentence-guide');
const warning = document.getElementById('sentence-warning');
const copyStatus = document.getElementById('copy-status');
const modeInputs = [...document.querySelectorAll('input[name="input-mode"]')];
let inputMode = 'armenian';
function sentenceOutput(input, mode) {
  return mode === 'latin' ? transliterate(input) : {output:input,unknown:[]};
}
function setInputMode(mode) {
  inputMode=mode;
  modeInputs.forEach(input=>{input.checked=input.value===mode;});
  const armenian=mode==='armenian';
  document.getElementById('sentence-label').textContent=armenian?'Sentence in Armenian':'Sentence in Latin letters';
  sentence.lang=armenian?'hy':'en';
  sentence.placeholder=armenian?presets[0].armenian:presets[0].latin;
  document.getElementById('input-help').textContent=armenian
    ?'Exact Armenian spelling is preserved, including punctuation. Type, paste, or use the Armenian keyboard below.'
    :'Latin letters are converted using the transliteration key. This does not check Armenian spelling.';
  document.getElementById('roman-help').hidden=armenian;
  document.getElementById('armenian-keyboard').hidden=!armenian;
}
const byGlyph = new Map();
for (const row of letters) {
  byGlyph.set(row[0],row); byGlyph.set(row[1],row);
}
byGlyph.set('ՈՒ',byLower.get('ու'));
byGlyph.set('Ու',byLower.get('ու'));
byGlyph.set('եւ',byLower.get('և'));
function symbolCard(glyph) {
  const box=document.createElement('article'); box.className='hand-card symbol-card';
  const symbol=document.createElement('strong'); symbol.textContent=glyph;
  const note=document.createElement('small');
  note.textContent=/[\p{P}\p{N}]/u.test(glyph)?'Write as shown':'No handwriting image';
  box.append(symbol,note); return box;
}
function renderSentence() {
  const {output,unknown}=sentenceOutput(sentence.value,inputMode);
  preview.textContent=output;
  copyStatus.textContent='';
  const words=output.match(/\S+/gu)||[];
  const missing=new Set(unknown);
  guide.replaceChildren(...words.map(word=>{
    const group=document.createElement('section'); group.className='guide-word';
    const title=document.createElement('h3'); title.lang='hy'; title.textContent=word;
    const grid=document.createElement('div'); grid.className='hand-grid phrase-grid';
    for(const glyph of splitArmenian(word)){
      const row=byGlyph.get(glyph);
      if(!row && /\p{L}/u.test(glyph))missing.add(glyph);
      grid.append(row?card(row,glyph):symbolCard(glyph));
    }
    group.append(title,grid); return group;
  }));
  warning.hidden=missing.size===0;
  warning.textContent=missing.size?'No handwriting mapping for: '+[...missing].join(', ')+(inputMode==='latin'?'. Check the transliteration key.':'. Enter Armenian letters or switch to Latin transliteration.'):'';
  document.getElementById('copy-sentence').disabled=!output.trim();
  document.querySelectorAll('#presets button').forEach(btn=>btn.setAttribute('aria-pressed',String(inputMode==='armenian' && sentence.value===btn.dataset.sentence)));
}
for(const preset of presets){
  const button=document.createElement('button');
  button.type='button'; button.className='secondary-btn'; button.dataset.sentence=preset.armenian;
  button.textContent=preset.label+' · '+preset.armenian; button.title=preset.armenian;
  button.addEventListener('click',()=>{setInputMode('armenian');sentence.value=preset.armenian;renderSentence();});
  document.getElementById('presets').append(button);
}
const keyEntries=Object.entries(romanMap).filter(([key])=>/^[a-z]+(?:')?$/.test(key));
for(const [latin,glyph] of keyEntries){
  const span=document.createElement('span');span.textContent=latin+' → '+glyph;
  document.getElementById('roman-key').append(span);
}
modeInputs.forEach(input=>input.addEventListener('change',()=>{
  if(!input.checked)return;
  // Convert Latin input once when moving into exact Armenian mode; otherwise retain text.
  if(inputMode==='latin' && input.value==='armenian')sentence.value=transliterate(sentence.value).output;
  setInputMode(input.value);
  renderSentence();
}));
const keyboard=document.getElementById('armenian-keys');
const uppercase=document.getElementById('keyboard-uppercase');
function insertAtCursor(value) {
  const start=sentence.selectionStart, end=sentence.selectionEnd;
  if(sentence.value.length-(end-start)+value.length>sentence.maxLength)return;
  sentence.setRangeText(value,start,end,'end');
  sentence.focus();
  renderSentence();
}
function renderKeyboard() {
  const keys=letters.map(row=>uppercase.checked?row[0]:row[1]);
  keys.push('։','՝','՞','՛',' ');
  keyboard.replaceChildren(...keys.map(glyph=>{
    const button=document.createElement('button');
    button.type='button';button.className='secondary-btn';
    button.textContent=glyph===' '?'Space':glyph;
    if(glyph===' ')button.classList.add('key-wide');
    button.addEventListener('pointerdown',event=>event.preventDefault());
    button.addEventListener('click',()=>insertAtCursor(glyph));
    return button;
  }));
}
uppercase.addEventListener('change',renderKeyboard);
document.getElementById('keyboard-backspace').addEventListener('pointerdown',event=>event.preventDefault());
document.getElementById('keyboard-backspace').addEventListener('click',()=>{
  const start=sentence.selectionStart,end=sentence.selectionEnd;
  sentence.setRangeText('',start===end?Math.max(0,start-1):start,end,'end');
  sentence.focus();renderSentence();
});
renderKeyboard();
sentence.addEventListener('input',renderSentence);
document.getElementById('copy-sentence').addEventListener('click',async()=>{
  try {await navigator.clipboard.writeText(preview.textContent);copyStatus.textContent='Copied.';}
  catch {copyStatus.textContent='Select and copy the Armenian text above.';}
});
setInputMode('armenian');
sentence.value=presets[0].armenian;
renderSentence();
const filter=document.getElementById('filter');
function render() {
 const q=filter.value.toLowerCase().trim().replaceAll('/','');
 const matching=letters.filter(row=>row.slice(0,5).some(v=>v.toLowerCase().includes(q)));
 document.getElementById('alphabet-grid').replaceChildren(...matching.map(row=>card(row)));
 document.getElementById('empty').hidden=matching.length>0;
}
filter.addEventListener('input',render); document.getElementById('print').addEventListener('click',()=>window.print()); render();
