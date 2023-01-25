import axios from "axios";
import dotenv from 'dotenv'
dotenv.config();

const baseUrl = "https://microsoft-translator-text.p.rapidapi.com";

const options = {
  url: baseUrl + "/translate",
  method: "POST",
  params: {
    "to[0]": "fr",
    "api-version": "3.0",
    profanityAction: "NoAction",
    textType: "plain",
  },
  headers: {
    "content-type": "application/json",
    "X-RapidAPI-Key": process.env.RAPID_API_KEY,
    "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
  },
  data: '[{"Text":"I would really like to drive your car around the block a few times."}]',
};

export const translateText = async () => {
    try {
         const { data } = await axios.request(options);
        //  console.log(data)
         return data
    } catch (error) {
        console.log(error)
    }
};
