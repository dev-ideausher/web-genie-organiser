import { getToken } from "@/auth/userCookies";
import { apiError,getAuthToken,responseValidator} from "./../../helper/helper"
import { urlToHttpOptions } from "url";
const URL = process.env.NEXT_PUBLIC_BASE_URL;
export const registerApi = async (data) => {
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
   
    const response = await fetch(URL + `/auth/register`, requestOptions);

    return response.json();
  } catch (error) {
    apiError(error);
  }
};
export const LoginApi = async () => {
  const myHeaders = new Headers();
  const token = await getAuthToken(); 
 // console.log(token)
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);


  const raw = JSON.stringify({
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  try {
  
    const response = await fetch(URL + `/auth/login`, requestOptions);

    return response.json();
  } catch (error) {
    apiError(error);
  }
};