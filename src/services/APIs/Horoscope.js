import { getToken } from "@/auth/userCookies";
import { apiError,getAuthToken,responseValidator} from "./../../helper/helper"
import { urlToHttpOptions } from "url";
const URL = process.env.NEXT_PUBLIC_BASE_URL;
export const horoscopeApi = async (data) => {
  const myHeaders = new Headers();
  const token = await getAuthToken(); 
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);
  //myHeaders.append("ngrok-skip-browser-warning", "true");
  const raw = JSON.stringify(data);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  try {
   
    const response = await fetch(URL + `/horoscope`, requestOptions);

    return response.json();
  } catch (error) {
    apiError(error);
  }
};