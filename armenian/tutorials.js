/* Hrant Dink Foundation, Western Armenian Programme — public tutorial links, checked 2026-11-25.
   Source: https://hrantdink.org/en/bolis/activities/projects/western-armenian-program/2669-ayppenaraneng
   Each of the 38 traditional letters has one demonstration covering both cases.
   No videos or third-party stroke data are bundled. */
const ARMENIAN_TUTORIALS = {
  "Ա": "XT_e3SWgk8U",
  "Բ": "-rYDNgT93S0",
  "Գ": "31tFk-v7Ydk",
  "Դ": "5OZ8kdloRGU",
  "Ե": "NtgfXK_T49M",
  "Զ": "DSg2SWxrhXQ",
  "Է": "KYUzQtX7Wfo",
  "Ը": "LcK78ROJoEo",
  "Թ": "VcKUubhiQRA",
  "Ժ": "r31eMLZH8cc",
  "Ի": "kpNwxFqquI4",
  "Լ": "TviE1LpOzDQ",
  "Խ": "oQJkL7HGmXU",
  "Ծ": "Xb93hLCwDAY",
  "Կ": "KpffT_rej48",
  "Հ": "aLvQna5frK8",
  "Ձ": "ObgoPThYZsI",
  "Ղ": "7vK8bbNORG8",
  "Ճ": "ejJdMls6upU",
  "Մ": "G1cFhaGF1Yg",
  "Յ": "EYwHp9fA1uE",
  "Ն": "40MI3gC7sPM",
  "Շ": "C_dpAjPW-wo",
  "Ո": "GzJM1S-ErFI",
  "Չ": "4gXt-YDyp8c",
  "Պ": "goQBYcroBMs",
  "Ջ": "xqJitKq12xs",
  "Ռ": "1NTgt2BvrFE",
  "Ս": "IkLRw9O-Rmg",
  "Վ": "4U1DZq-l6ig",
  "Տ": "p6hM63lMhM0",
  "Ր": "IIWBp9YRFbo",
  "Ց": "uWOz2gh5dgY",
  "Ւ": "cFSPMe4tTow",
  "Փ": "kNU1FSGzy5o",
  "Ք": "SOx8VuyFb0w",
  "Օ": "b8zOqHe3bc0",
  "Ֆ": "4ti_xWH8GIQ"
};
function appendWritingTutorials(box,upper) {
  const components = upper==='Ու' ? ['Ո','Ւ'] : upper==='Եւ' ? ['Ե','Ւ'] : [upper];
  for(const letter of components){
    const id=ARMENIAN_TUTORIALS[letter];
    if(!id)continue;
    const link=document.createElement('a');
    link.href='https://www.youtube.com/watch?v='+id;
    link.target='_blank';link.rel='noopener';
    link.textContent=components.length===1?'▶ Writing tutorial':'▶ '+letter+' writing tutorial';
    link.title='Hrant Dink Foundation · Western Armenian';
    const line=document.createElement('small');line.append(link);box.append(line);
  }
}
