import React, { useState, useEffect, useRef } from "react";

const langOptions = {
  en: {
    name: "English",
    placeholder: "Type your name...",
    title: "Convert Your Name to Hieroglyphs",
    copy: "📋 Copy",
    download: "📥 Download Image",
    rtl: false,
    copySuccess: "✅ Copied!",
    emptyAlert: "❗ Please type your name first.",
    signature: " Grand Egyptian Museum ",
  },
  fr: {
    name: "Français",
    placeholder: "Tape ton nom...",
    title: "Convertis ton nom en hiéroglyphes",
    copy: "📋 Copier",
    download: "📥 Télécharger l'image",
    rtl: false,
    copySuccess: "✅ Copié !",
    emptyAlert: "❗ Veuillez écrire votre nom.",
    signature: " Grand Musée égyptien ",
  },
  es: {
    name: "Español",
    placeholder: "Escribe tu nombre...",
    title: "Convierte tu nombre en jeroglíficos",
    copy: "📋 Copiar",
    download: "📥 Descargar imagen",
    rtl: false,
    copySuccess: "✅ ¡Copiado!",
    emptyAlert: "❗ Por favor escribe tu nombre.",
    signature: " Gran Museo Egipcio ",
  },
  hi: {
    name: "हिन्दी",
    placeholder: "अपना नाम लिखें...",
    title: "अपने नाम को हाइरोग्लिफ़ में बदलें",
    copy: "📋 कॉपी करें",
    download: "📥 छवि डाउनलोड करें",
    rtl: false,
    copySuccess: "✅ कॉपी किया गया!",
    emptyAlert: "❗ कृपया पहले नाम लिखें।",
    signature: " महान मिस्री संग्रहालय ",
  },
  de: {
    name: "Deutsch",
    placeholder: "Gib deinen Namen ein...",
    title: "Wandle deinen Namen in Hieroglyphen um",
    copy: "📋 Kopieren",
    download: "📥 Bild herunterladen",
    rtl: false,
    copySuccess: "✅ Kopiert!",
    emptyAlert: "❗ Bitte gib deinen Namen ein.",
    signature: " Großes Ägyptisches Museum ",
  },
  it: {
    name: "Italiano",
    placeholder: "Scrivi il tuo nome...",
    title: "Converti il tuo nome in geroglifici",
    copy: "📋 Copia",
    download: "📥 Scarica immagine",
    rtl: false,
    copySuccess: "✅ Copiato!",
    emptyAlert: "❗ Inserisci prima il nome.",
    signature: " Grande Museo Egizio ",
  },
  zh: {
    name: "中文",
    placeholder: "输入你的名字...",
    title: "将你的名字转换为象形文字",
    copy: "📋 复制",
    download: "📥 下载图片",
    rtl: false,
    copySuccess: "✅ 已复制！",
    emptyAlert: "❗ 请先输入名字。",
    signature: " 大埃及博物馆 ",
  },
  tr: {
    name: "Türkçe",
    placeholder: "Adınızı yazın...",
    title: "Adınızı Hiyerogliflere dönüştürün",
    copy: "📋 Kopyala",
    download: "📥 Resmi indir",
    rtl: false,
    copySuccess: "✅ Kopyalandı!",
    emptyAlert: "❗ Lütfen önce isminizi yazın.",
    signature: " Büyük Mısır Müzesi ",
  },
};

const HieroglyphConverter = () => {
  const [currentLang, setCurrentLang] = useState("en");
  const [hieroMap, setHieroMap] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const menuRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    import("./Names.json")
      .then((module) => setHieroMap(module.default))
      .catch((error) => console.error("Failed to load Names.json:", error));

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleLangMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLanguageChange = (lang) => {
    setCurrentLang(lang);
    setInputValue("");
    setIsMenuOpen(false);
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.setAttribute("lang", lang);
  };

  const convertToHieroglyphs = (value) => {
    if (!hieroMap[currentLang]) return [];
    const chars = Array.from(value.trim().toLowerCase());
    return chars
      .map((char, idx) =>
        hieroMap[currentLang][char]
          ? { glyph: hieroMap[currentLang][char], idx }
          : null
      )
      .filter(Boolean);
  };

  const copyHieroglyphs = () => {
    const glyphs = convertToHieroglyphs(inputValue);
    if (!glyphs.length) {
      alert(langOptions[currentLang].emptyAlert);
      return;
    }
    navigator.clipboard
      .writeText(glyphs.map((g) => g.glyph).join(""))
      .then(() => alert(langOptions[currentLang].copySuccess));
  };

  const downloadHieroglyphs = () => {
    const name = inputValue.trim();
    const hieros = convertToHieroglyphs(inputValue)
      .map((g) => g.glyph)
      .join("");
    if (!name || !hieros) {
      alert(langOptions[currentLang].emptyAlert);
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 1378;
    canvas.height = 768;

    // Set a solid background color instead of loading an image
    ctx.fillStyle = "#f5e6c7"; // Papyrus-like background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.direction = "ltr";

    // Draw the name text
    ctx.fillStyle = "#3d1f0f";
    ctx.font = "bold 90px 'Cairo', 'Arial Black', sans-serif";
    ctx.shadowColor = "rgba(0,0,0,0.15)";
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.shadowBlur = 3;

    const maxTextWidth = 1000;
    const words = name.split(" ");
    const lines = [];
    let line = "";
    for (let word of words) {
      const testLine = line + word + " ";
      if (ctx.measureText(testLine).width > maxTextWidth && line) {
        lines.push(line.trim());
        line = word + " ";
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

    // Draw the hieroglyphs
    ctx.fillStyle = "#d4af37";
    ctx.shadowColor = "rgba(0,0,0,0.08)";
    ctx.shadowBlur = 2;
    ctx.font = "100px 'Noto Sans Egyptian Hieroglyphs', 'Segoe UI Symbol'";
    const maxGlyphWidth = 1000;
    const glyphLines = [];
    let currentLine = "";
    for (let char of hieros) {
      const testLine = currentLine + char;
      if (ctx.measureText(testLine).width > maxGlyphWidth && currentLine) {
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

    // Add signature text
    ctx.fillStyle = "#3d1f0f";
    ctx.font = "40px 'Cairo', 'Arial', sans-serif";
    ctx.fillText(
      langOptions[currentLang].signature,
      canvas.width / 2,
      glyphStartY + glyphLines.length * 110 + 50
    );

    const a = document.createElement("a");
    a.download = `hieroglyph_${name}_${Date.now()}.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();
  };

  const startSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition || isListening) return;

    setIsListening(true);
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang =
      {
        en: "en-US",
        fr: "fr-FR",
        es: "es-ES",
        hi: "hi-IN",
        de: "de-DE",
        it: "it-IT",
        zh: "zh-CN",
        tr: "tr-TR",
      }[currentLang] || "en-US";
    recognitionRef.current.interimResults = false;
    recognitionRef.current.maxAlternatives = 1;

    recognitionRef.current.onresult = (event) => {
      let transcript = event.results[0][0].transcript
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?؟!،٫'"”“’]/g, "")
        .trim();
      setInputValue(transcript);
    };

    recognitionRef.current.onspeechend = () => recognitionRef.current.stop();
    recognitionRef.current.onend = () => setIsListening(false);
    recognitionRef.current.onerror = () => setIsListening(false);
    recognitionRef.current.start();
  };

  return (
    <main className="w-[90%] max-w-[700px] mx-auto mt-[180px] mb-[60px] bg-white/5 rounded-3xl p-9 border border-white/20 shadow-lg backdrop-blur-lg">
      <h2 className="text-center mb-6 text-3xl text-yellow-400 font-bold tracking-wide">
        {langOptions[currentLang].title}
      </h2>
      <div className="flex items-center gap-3">
        <button
          onClick={startSpeechRecognition}
          className={`bg-yellow-400 text-xl w-11 h-11 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-md ${
            isListening ? "bg-red-600 animate-pulse text-white" : ""
          }`}
        >
          🎙️
        </button>
        <input
          id="nameInput"
          className="flex-1 p-3 text-lg border-2 border-yellow-400 rounded-xl bg-black/50 text-yellow-100 outline-none transition-colors"
          placeholder={langOptions[currentLang].placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="relative" ref={menuRef}>
          <button
            onClick={toggleLangMenu}
            className="bg-yellow-400 text-xl w-11 h-11 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-md"
          >
            🌐
          </button>
          {isMenuOpen && (
            <div className="absolute top-12 right-0 bg-[#2e2415] border border-yellow-400 rounded-xl p-1 shadow-lg w-48 max-h-60 overflow-y-auto">
              {Object.keys(langOptions).map((lang) => (
                <div
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className="p-2 text-yellow-100 cursor-pointer hover:bg-yellow-400/10"
                >
                  {langOptions[lang].name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        {convertToHieroglyphs(inputValue).map(({ glyph, idx }) => (
          <div
            key={idx}
            className="bg-black/40 border border-yellow-400 rounded-xl p-4 w-[90px] h-[110px] flex justify-center items-center hover:scale-105 transition-transform shadow-md"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="text-5xl text-yellow-400 font-['Noto_Sans_Egyptian_Hieroglyphs']">
              {glyph}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-5 flex-wrap">
        <button
          id="copyBtn"
          onClick={copyHieroglyphs}
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 py-3 px-6 rounded-xl font-bold hover:scale-105 transition-transform shadow-md"
        >
          {langOptions[currentLang].copy}
        </button>
        <button
          id="downloadBtn"
          onClick={downloadHieroglyphs}
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 py-3 px-6 rounded-xl font-bold hover:scale-105 transition-transform shadow-md"
        >
          {langOptions[currentLang].download}
        </button>
      </div>
    </main>
  );
};

export default HieroglyphConverter;
