import "./style.css";
import globe from "/globe.png";
import { translateText } from "./api";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="App">
    <div class="blob">
       <svg xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 350">
        <path d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z"/>
      </svg>
    </div>
    <header class="header">
        <a href="" class="logo">SNEEK<span class="accent">Lang</span></a>
        <ul class="nav__menu">
          <li class="">
            <a href="" class="nav__links">Notes</a>
          </li>
          <li class="">
            <a href="" class="nav__links">Saves</a>
          </li>
        </ul>
        <div class="nav__toggle"></div>
    </header>

    <main class>
        <section class="section hero__section">
          <div class="lang__selector lang__to">
            <label class="">To</label>
            <select id="to" class="select__style">
              <option value="english">English</option>
              <option value="english">English</option>
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

        <section class="section entry__section">
          <div class="input__container">
            <form id="form">
              <div class="flex lang__input">
                <label>Enter text to Translate</label>
                <input name="text" type="text" placeholder="Text here"/>
              </div>
              <button>Translate</button>
            </form>
          </div>
          
        </section>
    </main>

    <footer class="footer">

    </footer>
  </div>
`;

let translateTo = "";
let translateFrom = "";

const to = document.querySelector<Element>("#to");
const dataView = document.querySelector<Element>("#data");
const from = document.querySelector<Element>("#from");
const form = document.querySelector<Element>("#form");

to?.addEventListener("change", getData);
form?.addEventListener("submit", submitTextTranslate);

async function getData() {
  const data = await translateText();
  const text = data[0].translations[0].text;
  dataView!.innerHTML = `
  <div class="">
      ${text}
  </div>`;
}

async function submitTextTranslate(e: Event) {
  e.preventDefault();

  console.log(form?.querySelector('input[name="text"]'));
}
