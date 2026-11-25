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
  a.href = remote; a.target = '_blank'; a.rel = 'noopener';
  const img = document.createElement('img');
  img.alt = 'Handwritten ' + upper + ' (left) and ' + lower + ' (right)';
  img.width=512; img.height=512; img.loading=wanted?'eager':'lazy';
  img.addEventListener('error', () => { if(img.dataset.fallback) return; img.dataset.fallback='1'; img.src=remote; });
  img.src = 'images/' + encodeURIComponent(filename);
  a.append(img); box.append(a);
  const title=document.createElement('strong'); title.lang='hy'; title.textContent=wanted || upper+' '+lower; box.append(title);
  const hint=document.createElement('small'); hint.textContent=roman+' · /'+east+'/ (Eastern)'; box.append(hint);
  if(wanted) {
    const which=document.createElement('small'); which.className='case-label'; which.textContent=wanted===upper?'LEFT · uppercase':'RIGHT · lowercase'; box.append(which);
  } else {
    const w=document.createElement('small'); w.textContent='/'+west+'/ (Western)'; box.append(w);
    const src=document.createElement('a'); src.href=source; src.target='_blank'; src.rel='noopener'; src.textContent='Source'; box.append(src);
  }
  return box;
}
function phrase(id,parts) {
  document.getElementById(id).replaceChildren(...parts.map(g=>card(byLower.get(g.toLowerCase()),g)));
}
phrase('word-one',['Շ','ն','ո','ր','հ','ա','վ','ո','ր']);
phrase('word-two',['ծ','ն','ու','ն','դ','դ']);
const filter=document.getElementById('filter');
function render() {
 const q=filter.value.toLowerCase().trim().replaceAll('/','');
 const matching=letters.filter(row=>row.slice(0,5).some(v=>v.toLowerCase().includes(q)));
 document.getElementById('alphabet-grid').replaceChildren(...matching.map(row=>card(row)));
 document.getElementById('empty').hidden=matching.length>0;
}
filter.addEventListener('input',render); document.getElementById('print').addEventListener('click',()=>window.print()); render();
