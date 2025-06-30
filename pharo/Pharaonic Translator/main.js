let currentLang = "en";
let hieroMap = {};
let inputLocked = true;

const langOptions = {
  ar: { name: "العربية", placeholder: "اكتب اسمك...", title: "حوّل اسمك إلى هيروغليفي", copy: "📋 نسخ", download: "📥 تحميل الصورة", rtl: true, copySuccess: "✅ تم النسخ!", emptyAlert: "❗ يرجى كتابة الاسم أولاً.", signature: " المتحف المصري الكبير " },
  en: { name: "English", placeholder: "Type your name...", title: "Convert Your Name to Hieroglyphs", copy: "📋 Copy", download: "📥 Download Image", rtl: false, copySuccess: "✅ Copied!", emptyAlert: "❗ Please type your name first.", signature: " Grand Egyptian Museum " },
  fr: { name: "Français", placeholder: "Tape ton nom...", title: "Convertis ton nom en hiéroglyphes", copy: "📋 Copier", download: "📥 Télécharger l'image", rtl: false, copySuccess: "✅ Copié !", emptyAlert: "❗ Veuillez écrire votre nom.", signature: " Grand Musée égyptien " },
  es: { name: "Español", placeholder: "Escribe tu nombre...", title: "Convierte tu nombre en jeroglíficos", copy: "📋 Copiar", download: "📥 Descargar imagen", rtl: false, copySuccess: "✅ ¡Copiado!", emptyAlert: "❗ Por favor escribe tu nombre.", signature: " Gran Museo Egipcio " },
  hi: { name: "हिन्दी", placeholder: "अपना नाम लिखें...", title: "अपने नाम को हाइरोग्लिफ़ में बदलें", copy: "📋 कॉपी करें", download: "📥 छवि डाउनलोड करें", rtl: false, copySuccess: "✅ कॉपी किया गया!", emptyAlert: "❗ कृपया पहले नाम लिखें।", signature: " महान मिस्री संग्रहालय " },
  de: { name: "Deutsch", placeholder: "Gib deinen Namen ein...", title: "Wandle deinen Namen in Hieroglyphen um", copy: "📋 Kopieren", download: "📥 Bild herunterladen", rtl: false, copySuccess: "✅ Kopiert!", emptyAlert: "❗ Bitte gib deinen Namen ein.", signature: " Großes Ägyptisches Museum " },
  it: { name: "Italiano", placeholder: "Scrivi il tuo nome...", title: "Converti il tuo nome in geroglifici", copy: "📋 Copia", download: "📥 Scarica immagine", rtl: false, copySuccess: "✅ Copiato!", emptyAlert: "❗ Inserisci prima il nome.", signature: " Grande Museo Egizio " },
  zh: { name: "中文", placeholder: "输入你的名字...", title: "将你的名字转换为象形文字", copy: "📋 复制", download: "📥 下载图片", rtl: false, copySuccess: "✅ 已复制！", emptyAlert: "❗ 请先输入名字。", signature: " 大埃及博物馆 " },
  tr: { name: "Türkçe", placeholder: "Adınızı yazın...", title: "Adınızı Hiyerogliflere dönüştürün", copy: "📋 Kopyala", download: "📥 Resmi indir", rtl: false, copySuccess: "✅ Kopyalandı!", emptyAlert: "❗ Lütfen önce isminizi yazın.", signature: " Büyük Mısır Müzesi " }
};

fetch('Names.json')
  .then(res => res.json())
  .then(data => {
    hieroMap = data;
    applyInitialLanguage();
  });

function applyInitialLanguage() {
  setLanguage('en', true);
}

function toggleLangMenu() {
  const menu = document.getElementById('langMenu');
  menu.classList.toggle('show');
}

document.addEventListener('click', e => {
  const menu = document.getElementById('langMenu');
  const btn = document.querySelector('.lang-btn');
  if (!btn.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.remove('show');
  }
});

function setLanguage(lang, initial = false) {
  currentLang = lang;
  inputLocked = (lang === 'en' && initial);

  const langData = langOptions[lang];
  const input = document.getElementById('nameInput');
  const copyBtn = document.getElementById('copyBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const html = document.documentElement;

  document.getElementById('langMenu').classList.remove('show');
  input.placeholder = langData.placeholder;
  copyBtn.textContent = langData.copy;
  downloadBtn.textContent = langData.download;
  document.getElementById('pageTitle').textContent = langData.title;

  if (langData.rtl) {
    input.classList.add('rtl');
    html.setAttribute('dir', 'rtl');
    html.setAttribute('lang', 'ar');
  } else {
    input.classList.remove('rtl');
    html.setAttribute('dir', 'ltr');
    html.setAttribute('lang', lang);
  }

  input.value = '';
  document.getElementById('cardsOutput').innerHTML = '';
  input.oninput = convertToHieroglyphs;
  convertToHieroglyphs();
}

function convertToHieroglyphs() {
  const val = document.getElementById('nameInput').value.trim().toLowerCase();
  const out = document.getElementById('cardsOutput');
  out.innerHTML = '';

  if (inputLocked && currentLang === 'en' && !/^[a-z\s]*$/.test(val)) return;
  if (!hieroMap[currentLang]) return;

  const chars = Array.from(val);
  const ordered = langOptions[currentLang].rtl ? chars.reverse() : chars;

  ordered.forEach((char, idx) => {
    const glyph = hieroMap[currentLang][char];
    if (!glyph) return;
    const card = document.createElement('div');
    card.className = 'hiero-card';
    card.style.animationDelay = `${idx * 0.1}s`;
    card.innerHTML = `
      <div class="hiero-char">
        <div class="hiero-symbol">${glyph}</div>
      </div>
    `;
    out.appendChild(card);
  });
}





function copyHieroglyphs() {
  const elems = Array.from(document.querySelectorAll('.hiero-symbol'));
  if (!elems.length) return alert(langOptions[currentLang].emptyAlert);
  navigator.clipboard.writeText(elems.map(e => e.textContent).join(''))
    .then(() => alert(langOptions[currentLang].copySuccess));
}

function downloadHieroglyphs() {
  const name = document.getElementById('nameInput').value.trim();
  const hieros = Array.from(document.querySelectorAll('.hiero-symbol')).map(e => e.textContent).join('');
  if (!name || !hieros) return alert(langOptions[currentLang].emptyAlert);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d' );
  canvas.width = 1378;
  canvas.height = 768;

  const background = new Image();
  background.src = 'print.jpg';
  background.onload = () => {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.direction = langOptions[currentLang].rtl ? 'rtl' : 'ltr';

    // ==== النص ====
    ctx.fillStyle = '#3d1f0f';
    ctx.font = "bold 90px 'Cairo', 'Arial Black', sans-serif";
    ctx.shadowColor = "rgba(0,0,0,0.15)";
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.shadowBlur = 3;

    const maxTextWidth = 1000;
    const words = name.split(" ");
    const lines = [];
    let line = "";

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const width = ctx.measureText(testLine).width;
      if (width > maxTextWidth && i > 0) {
        lines.push(line.trim());
        line = words[i] + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line.trim());

    const lineHeight = 100;
    const nameStartY = 320;
    lines.forEach((line, i) => {
      ctx.fillText(line, canvas.width / 2, nameStartY + i * lineHeight);
    });

    // === الهيروغليفي ===
    ctx.fillStyle = '#d4af37';
    ctx.shadowColor = "rgba(0,0,0,0.08)";
    ctx.shadowBlur = 2;
    ctx.font = "100px 'Noto Sans Egyptian Hieroglyphs', 'Segoe UI Symbol'";
    ctx.textBaseline = 'top';

    const maxGlyphWidth = 1000;
    const glyphLines = [];
    let currentLine = "";

    for (let char of hieros) {
      const testLine = currentLine + char;
      const width = ctx.measureText(testLine).width;
      if (width > maxGlyphWidth) {
        glyphLines.push(currentLine);
        currentLine = char;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) glyphLines.push(currentLine);

    const glyphStartY = nameStartY + lines.length * lineHeight + 30;
    glyphLines.forEach((line, i) => {
      ctx.fillText(line, canvas.width / 2, glyphStartY + i * 110);
    });

    const a = document.createElement('a');
    a.download = `hieroglyph_${name}_${Date.now()}.png`;
    a.href = canvas.toDataURL('image/png');
    a.click();
  };
}

window.onload = () => setLanguage('en', true);




let recognition;
let isListening = false;

function startSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return;

  const micBtn = document.querySelector('.mic-btn');

  if (isListening) return; // منع التكرار
  isListening = true;
  micBtn.classList.add('recording');

  recognition = new SpeechRecognition();
  recognition.lang = getSpeechLangFromCurrentLang();
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = function (event) {
    let transcript = event.results[0][0].transcript;
    transcript = transcript.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?؟!،٫'"”“’]/g, "").trim();
    document.getElementById('nameInput').value = transcript;
    convertToHieroglyphs();
  };

  recognition.onspeechend = () => recognition.stop();

  recognition.onend = () => {
    micBtn.classList.remove('recording');
    isListening = false;
  };

  recognition.onerror = () => {
    micBtn.classList.remove('recording');
    isListening = false;
  };

  recognition.start();
}

function getSpeechLangFromCurrentLang() {
  const langMap = {
    ar: 'ar-EG',
    en: 'en-US',
    fr: 'fr-FR',
    es: 'es-ES',
    hi: 'hi-IN',
    de: 'de-DE',
    it: 'it-IT',
    zh: 'zh-CN',
    tr: 'tr-TR'
  };
  return langMap[currentLang] || 'en-US';
}








