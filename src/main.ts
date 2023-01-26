import "./style.css";
import globe from "/globe.png";
import { getDefinitions, getRandomWord, readText, translateText } from "./api";
import "remixicon/fonts/remixicon.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="App">
    
    <header class="header">
        <a href="" class="logo">SNEEK<span class="accent">Lang</span></a>
        <div class="nav__menu">
          <h2>Dictionary</h2>
          <div class="dictionary"></div>
          <div class="dictionary__btn">
            <i class="ri-close-fill"></i>
          </div>
        </div>
        <div class="nav__shuffle flex">
          <i class="ri-shuffle-line"></i>
        </div>
        <div class="nav__toggle flex">
          <i class="ri-menu-5-line"></i>
        </div>
    </header>

    <main class="">
        <section class="section hero__section">
          <div class="lang__selector lang__to">
            <label class="">To</label>
            <select id="to" class="select__style">
              <option value="en" selected>English</option>
              <option value="fr">French</option>
              <option value="ht">Creole</option>
              <option value="de">Germain</option>
              <option value="es">Spanish</option>
            </select>
          </div>

          <img src=${globe} alt="" class="globle"/>
          
          <div class="lang__selector lang__from">
            <label class="">To</label>
            <select class="select__style">
              <option>Spanish</option>
            </select>
          </div>
        </section>
        
        <div class="result" id="data"></div>

        <section class="section entry__section flex">
          <div class="input__container"><div class="blob"></div></div>
          <div class="form__container flex">
            <h3 class="form__title">Enter text to Translate</h3>
            <form id="form" class="form flex">
              <div class="flex lang__input">
                <input name="text" id="text" type="text" autocomplete="true" placeholder="Text here"/>
              </div>
              <button class="form__btn">Translate</button>
            </form>
          </div>
        </section>
    </main>

    <footer class="footer">

    </footer>
  </div>
`;

// let translateFrom = "";
let translateTo = "";
let textToTranslate = "";

const languagecode: { [index: string]: string } = {
  fr: "fr-fr",
  en: "en-us",
  de: "de-de",
  es: "es-es"
};

const hero = document.querySelector<HTMLDivElement>(".hero__section");
const dictionaryBtn = document.querySelector<HTMLButtonElement>(".dictionary__btn");
// const from = document.querySelector<HTMLSelectElement>("#from");
const to = document.querySelector<HTMLSelectElement>("#to");
const dataView = document.querySelector<HTMLDivElement>("#data");
const menuBtn = document.querySelector<HTMLDivElement>(".nav__toggle");
const randomBtn = document.querySelector<HTMLDivElement>(".nav__shuffle");
const dictionary = document.querySelector<HTMLDivElement>(".dictionary");
const menu = document.querySelector<HTMLDivElement>(".nav__menu");
const form = document.querySelector<HTMLFormElement>("#form");
const text = document.querySelector("#text");

to?.addEventListener("change", (ev: any) => (translateTo = ev.target!.value));
form?.addEventListener("submit", submitTextTranslate);
text?.addEventListener("keyup", getText);
menuBtn?.addEventListener('click', toggleMobileMenu);
dictionaryBtn?.addEventListener("click", toggleMobileMenu);
randomBtn?.addEventListener("click", randomWord);

function toggleMobileMenu(e:any){
  e.preventDefault()
  menu?.classList.toggle('open__nav__menu')
};

function getText(e: any) {
  textToTranslate = e.target.value;
};

async function submitTextTranslate(e: Event) {
  e.preventDefault();
  getData(textToTranslate, translateTo);
  form!.reset();
};

async function randomWord (){
  const random = await getRandomWord();
  const definition = await getDefinitions(random.word);
  const text = sliceText(definition.definition);
  renderDitionary(definition);
  const targetLanguage = getTargetLang('en');
  const speechData = await readText(text, targetLanguage!);
  render(definition.word, text, speechData);
}

async function getData(textToTranslate: string, to: string) {
  if (!textToTranslate) {
    throw new Error("Add text to translate...");
  };

  if (!to) {
    throw new Error("Add text to translate...");
  };

  const textData = await translateText(textToTranslate, to);
  const text = textData[0]?.translations[0]?.text as string;
  const lang = textData[0]?.translations[0]?.to as string;
  const targetLanguage = getTargetLang(lang);
  const speechData = await readText(text, targetLanguage!);
  render(textToTranslate, text, speechData);
};

function reset(view: any) {
  view.innerHTML = "";
  hero?.classList.remove("hero__squiz");
};

function render(original: string, text: string, data: any) {
  dataView!.innerHTML = `
  <div class="result__container">
      <button class="result__close-btn">
        <i class="ri-close-fill"></i>
      </button>
      <h4>${original}</h4>
      ${text == undefined? 'No Definition Available....': text}
      ${data?`<audio class="audio__player" controls src=${data}></audio>`:''}
  </div>`;

  hero?.classList.add("hero__squiz");
  const closeBtn = document.querySelector(".result__close-btn");
  closeBtn?.addEventListener("click", () => reset(dataView));
};

interface Definition{
  definition: string;
  word: string;
}

function renderDitionary(definition: Definition){
  
  dictionary!.innerHTML = `
    <h4>${definition.word}</h4>
    <p>${definition.definition}</p>
  `;
};

function getTargetLang(lang: string): string {
  let language = "";
  for (let key in languagecode) {
    if (key === lang) {
      language = languagecode[key];
    }
  }
  return language;
};


function sliceText(text: string): string{
  if(!text)return 'Sorry translation is not available for this word yet!';
  const textArray = text.split('.');
  if(textArray[0] == '1'){
    return textArray[1]
  }
  return textArray[0]
}