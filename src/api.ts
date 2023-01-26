import axios from "axios";
const baseUrl = "https://microsoft-translator-text.p.rapidapi.com";
const speechUrl = "https://voicerss-text-to-speech.p.rapidapi.com/";
const randomWordUrl ="https://random-word-by-api-ninjas.p.rapidapi.com/v1/randomword";
const dictionaryUrl ="https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary";

const options = {
  params: {
    "api-version": "3.0",
    profanityAction: "NoAction",
    textType: "plain",
  },
  headers: {
    "content-type": "application/json",
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
    "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
  },
};

const options2 = {
  params: {
    key: import.meta.env.VITE_SPEECH_KEY,
    r: "0",
    c: "WAV",
    f: "8khz_8bit_stereo",
    b64: "true",
  },
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
    "X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com",
  },
};

const options3 = {
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
    "X-RapidAPI-Host": "random-word-by-api-ninjas.p.rapidapi.com",
  },
};

const options4 = {
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
    "X-RapidAPI-Host": "dictionary-by-api-ninjas.p.rapidapi.com",
  },
};

export const translateText = async (text: string, to: string) => {
  const body = JSON.stringify([
    {
      text,
    },
  ]);
  try {
    const { data } = await axios.post(
      `${baseUrl}/translate?to=${to}`,
      body,
      options
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const readText = async (text: string, lang: string) => {
  try {
    const { data } = await axios.get(
      `${speechUrl}?src=${text}&hl=${lang}`,
      options2
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getDefinitions = async (word: string) => {
  try {
    const { data } = await axios.get(`${dictionaryUrl}?word=${word}`, options4);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getRandomWord = async (type: string = "verb") => {
  try {
    const { data } = await axios.get(`${randomWordUrl}?type=${type}`, options3);
    return data;
  } catch (error) {
    console.log(error);
  }
};
