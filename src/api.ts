import axios from "axios";
const baseUrl = "https://microsoft-translator-text.p.rapidapi.com";
const speechUrl = "https://voicerss-text-to-speech.p.rapidapi.com/";

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
