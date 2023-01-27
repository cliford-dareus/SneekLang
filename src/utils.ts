const languagecode: { [index: string]: string } = {
  fr: "fr-fr",
  en: "en-us",
  de: "de-de",
  es: "es-es",
};

export function getTargetLang(lang: string): string {
  let language = "";
  for (let key in languagecode) {
    if (key === lang) {
      language = languagecode[key];
    }
  }
  return language;
};

export function getRandomType() {
  const random = Math.round(Math.random());
  if (random == 0) {
    return "verb";
  }
  return "noun";
};

export function sliceText(text: string): string {
  if (!text) return "Sorry translation is not available for this word yet!";
  const textArray = text.split(".");
  if (textArray[0] == "1") {
    return textArray[1];
  }
  return textArray[0];
};

export function reset(view: any, hero: HTMLDivElement) {
  view.innerHTML = "";
  hero?.classList.remove("hero__squiz");
};
