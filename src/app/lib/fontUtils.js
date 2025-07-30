// Language detection and font mapping utility
export const detectLanguage = (text) => {
  // Bengali/Bangla characters
  const bengaliRegex = /[\u0980-\u09FF]/;

  if (bengaliRegex.test(text)) return "bengali";
  return "english";
};

export const getFontClass = (language) => {
  const fontClasses = {
    bengali: "font-abu-akkas", // Your custom Bengali font
    english: "", // Use default Poppins from layout
  };

  return fontClasses[language] || "";
};

export const getFontStyle = (text) => {
  const language = detectLanguage(text);
  return getFontClass(language);
};
