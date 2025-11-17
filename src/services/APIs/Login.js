import { apiError,getAuthToken,responseValidator,url } from "../../helper/helper";
import { getToken } from "../Firebase/cookie";
export const registerApi = async (email, password) => {
  const myHeaders = new Headers();
  const token = await getAuthToken(); 
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", token);
  //myHeaders.append("ngrok-skip-browser-warning", "true");
  const raw = JSON.stringify({
    email: email,
    password: password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  try {
    console.log(url,getToken())
    const response = await fetch(url + `/auth/register`, requestOptions);

    return response.json();
  } catch (error) {
    apiError(error);
  }
};
export const loginApi = async (email, password) => {
  const myHeaders = new Headers();
  const token = await getAuthToken(); 
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", token);

  const raw = JSON.stringify({
    email: email,
    password: password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  try {
    console.log(url,getToken())
    const response = await fetch(url + `/auth/login`, requestOptions);

    return response.json();
  } catch (error) {
    apiError(error);
  }
};