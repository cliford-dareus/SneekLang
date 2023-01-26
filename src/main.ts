import "./style.css";
import globe from "/globe.png";
import { readText, translateText } from "./api";
import "remixicon/fonts/remixicon.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="App">
    
    <header class="header">
        <a href="" class="logo">SNEEK<span class="accent">Lang</span></a>
        <div class="nav__menu">
          <h2>Dictionary</h2>
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
                <input name="text" id="text" type="text" value="" placeholder="Text here"/>
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

let translateTo = "";
// let translateFrom = "";
let textToTranslate = "";

const languagecode: { [index: string]: string } = {
  fr: "fr-fr",
  en: "en-us",
  de: "de-de",
  es: "es-es"
};

const hero = document.querySelector<HTMLDivElement>(".hero__section");
// const formBtn = document.querySelector<HTMLButtonElement>(".form__btn");
const to = document.querySelector<HTMLSelectElement>("#to");
// const from = document.querySelector<HTMLSelectElement>("#from");
const dataView = document.querySelector<HTMLDivElement>("#data");
const menuBtn = document.querySelector<HTMLDivElement>(".nav__toggle");
const randomBtn = document.querySelector<HTMLDivElement>(".nav__shuffle");
const menu = document.querySelector<HTMLDivElement>(".nav__menu");
const form = document.querySelector<HTMLFormElement>("#form");
const text = document.querySelector("#text");

to?.addEventListener("change", (ev: any) => (translateTo = ev.target!.value));
form?.addEventListener("submit", submitTextTranslate);
text?.addEventListener("keyup", getText);
menuBtn?.addEventListener('click', toggleMobileMenu);

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

function randomWord (){
  
}

async function getData(textToTranslate: string, to: string) {
  if (!textToTranslate) {
    throw new Error("Add text to translate...");
  };

  if (!to) {
    throw new Error("Add text to translate...");
  };

  const textData = await translateText(textToTranslate, to);
  const text = textData[0]?.translations[0]?.text;
  const lang = <string>textData[0]?.translations[0]?.to;
  const targetLanguage = getTargetLang(lang);
  const speechData = await readText(text, targetLanguage!);
  render(text, speechData);

  const closeBtn = document.querySelector(".result__close-btn");
  closeBtn?.addEventListener("click", () => reset(dataView));
};

function reset(view: any) {
  view.innerHTML = "";
  hero?.classList.remove("hero__squiz");
};

function render(text: string, data: any) {
  dataView!.innerHTML = `
  <div class="result__container">
      <button class="result__close-btn">
        <i class="ri-close-fill"></i>
      </button>
      ${text}

      <audio
        class="audio__player"
        // controls
        src=${data}>
    </audio>
  </div>`;

  hero?.classList.add("hero__squiz");
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
