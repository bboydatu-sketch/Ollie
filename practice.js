(() => {
  'use strict';
  const copy = {
    en: { open:'🌱 Practice', title:'Talk & Play', intro:'Follow your child’s interest. Keep it playful and brief. A sound, gesture, look, AAC card, or word can all be a turn.', close:'Close practice', back:'Activities', prompt:'Listen together', note:'There are no right answers, scores, or required words. Pause and give your child time to respond.', activities:[
      ['🪇','My turn, your turn','Make a fun sound or action with a toy. Pause, look expectantly, and welcome any response. Copy your child’s sound or movement, then take another turn.','My turn! Your turn!'],
      ['🫧','Choose together','Offer two favorite things where your child can see them. Name each one, wait, and respond to a look, point, reach, AAC card, sound, or word.','Which one would you like?'],
      ['🐥','Sound safari','Explore animal or everyday sounds together. You model a sound, then pause. Join your child’s sounds without asking them to repeat.','What sound does it make?'],
      ['🎵','Song pause','Sing a familiar short song with a gesture. Pause at a fun, predictable moment and give your child time to join in with a movement, sound, AAC, or word.','Let’s sing together!']
    ]},
    ms: { open:'🌱 Latihan', title:'Bermain & Berbual', intro:'Ikut minat anak. Jadikan aktiviti ringkas dan menyeronokkan. Bunyi, gerak isyarat, pandangan, kad AAC atau perkataan semuanya dikira sebagai giliran.', close:'Tutup latihan', back:'Aktiviti', prompt:'Dengar bersama', note:'Tiada jawapan betul atau salah, markah, atau perkataan wajib. Berhenti seketika dan beri anak masa untuk membalas.', activities:[
      ['🪇','Giliran saya, giliran kamu','Buat bunyi atau gerakan yang menyeronokkan dengan mainan. Berhenti seketika dan tunggu. Sambut apa-apa respons, kemudian tiru bunyi atau gerakan anak.','Giliran saya! Giliran kamu!'],
      ['🫧','Pilih bersama','Tunjukkan dua benda kegemaran. Namakan setiap satu, tunggu, dan sambut pandangan, tunjuk, capaian, kad AAC, bunyi atau perkataan anak.','Kamu mahu yang mana?'],
      ['🐥','Jelajah bunyi','Terokai bunyi haiwan atau bunyi harian bersama. Contoh bunyi dan berhenti seketika. Sertai bunyi anak tanpa memintanya mengulang.','Bunyi apa itu?'],
      ['🎵','Jeda lagu','Nyanyikan lagu pendek yang biasa bersama gerakan. Berhenti pada bahagian yang menyeronokkan dan beri anak masa untuk menyertai dengan gerakan, bunyi, AAC atau perkataan.','Mari menyanyi bersama!']
    ]},
    tl: { open:'🌱 Magsanay', title:'Laro at Usap', intro:'Sundin ang interes ng bata. Panatilihing masaya at maikli. Maaaring maging salitan ang tunog, kilos, tingin, AAC card, o salita.', close:'Isara ang pagsasanay', back:'Mga gawain', prompt:'Makinig nang magkasama', note:'Walang maling sagot, puntos, o kailangang sabihin. Huminto sandali at bigyan ng oras ang bata para tumugon.', activities:[
      ['🪇','Akin naman, iyo naman','Gumawa ng masayang tunog o kilos gamit ang laruan. Huminto sandali at maghintay. Tanggapin ang anumang tugon, gayahin ito, at magpalitan ulit.','Akin naman! Iyo naman!'],
      ['🫧','Pumili tayo','Ipakita ang dalawang paboritong bagay. Banggitin ang bawat isa, maghintay, at tumugon sa tingin, turo, abot, AAC card, tunog, o salita ng bata.','Alin ang gusto mo?'],
      ['🐥','Hanap-tunog','Pakinggan ang tunog ng hayop o mga bagay sa paligid. Ipakita ang isang tunog at huminto. Salihan ang anumang tunog ng bata nang hindi pinapauulit.','Anong tunog ito?'],
      ['🎵','Sandali sa kanta','Kumanta ng maikling pamilyar na kanta na may kilos. Huminto sa masayang bahagi at bigyan ng oras ang bata na sumali sa kilos, tunog, AAC, o salita.','Kantahan natin!']
    ]}
  };
  const $ = id => document.getElementById(id);
  const trigger = $('practiceOpen'), overlay = $('practiceOverlay');
  if (!trigger || !overlay) return;
  const list=$('practiceList'), detail=$('practiceDetail'), detailTitle=$('practiceDetailTitle'), detailText=$('practiceDetailText'), promptButton=$('practicePrompt'), back=$('practiceBack');
  let lang='en', t=copy.en;
  function readLanguage(){try{const s=JSON.parse(localStorage.getItem('mywords-aac-v01')||'{}');return ['en','ms','tl'].includes(s.lang)?s.lang:'en'}catch{return 'en'}}
  function showList(){detail.hidden=true;list.hidden=false;back.hidden=true}
  function render(){
    lang=readLanguage();t=copy[lang];trigger.textContent=t.open;trigger.setAttribute('aria-label',t.open.replace(/^🌱\s*/,''));
    $('practiceTitle').textContent=t.title;$('practiceIntro').textContent=t.intro;$('practiceNote').textContent=t.note;
    $('practiceClose').setAttribute('aria-label',t.close);back.textContent='← '+t.back;list.replaceChildren();
    t.activities.forEach(a=>{const b=document.createElement('button');b.type='button';b.className='practice-choice';b.innerHTML=`<span class="practice-emoji" aria-hidden="true">${a[0]}</span><span>${a[1]}</span><span aria-hidden="true">›</span>`;b.addEventListener('click',()=>{detailTitle.textContent=`${a[0]} ${a[1]}`;detailText.textContent=a[2];promptButton.textContent='🔊 '+t.prompt+': “'+a[3]+'”';promptButton.onclick=()=>speak(a[3]);list.hidden=true;detail.hidden=false;back.hidden=false;detailTitle.focus()});list.append(b)});
    showList();
  }
  function speak(text){if(!window.speechSynthesis||!window.SpeechSynthesisUtterance)return;const u=new SpeechSynthesisUtterance(text);u.lang=lang==='ms'?'ms-MY':lang==='tl'?'fil-PH':'en-US';u.rate=.88;window.speechSynthesis.cancel();window.speechSynthesis.speak(u)}
  trigger.addEventListener('click',()=>{render();overlay.classList.add('open');$('practiceClose').focus()});
  function close(){overlay.classList.remove('open');if(window.speechSynthesis)window.speechSynthesis.cancel();trigger.focus()}
  $('practiceClose').addEventListener('click',close);overlay.addEventListener('click',e=>{if(e.target===overlay)close()});back.addEventListener('click',showList);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('open'))close()});
  $('language').addEventListener('change',()=>{if(overlay.classList.contains('open'))render();else{lang=readLanguage();t=copy[lang];trigger.textContent=t.open}});
  render();
})();
