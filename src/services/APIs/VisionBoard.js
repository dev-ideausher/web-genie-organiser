import { getToken } from "../auth/userCookies";
import { apiError,getAuthToken,responseValidator} from "./../../helper/helper"
import { urlToHttpOptions } from "url";
const URL = process.env.NEXT_PUBLIC_BASE_URL;
export const getVisionBoardApi = async () => {
  const myHeaders = new Headers();
  const token = await getAuthToken(); 
  //myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
   
    const response = await fetch(URL + `/vision-board`, requestOptions);

    return response.json();
  } catch (error) {
    apiError(error);
  }
};
export const CreateVisionboard = async (formData) => {
  const myHeaders = new Headers();
  const token = await getAuthToken(); 
  //myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);
  //myHeaders.append("ngrok-skip-browser-warning", "true");
  //const raw = JSON.stringify(data);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData,
    redirect: "follow",
  };
  try {
   
    const response = await fetch(URL + `/vision-board`, requestOptions);

    return response.json();
  } catch (error) {
    apiError(error);
  }
};
export const UpdateVisionboard = async (id,data) => {
  const myHeaders = new Headers();
  const token = await getAuthToken(); 
  //myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);
  //myHeaders.append("ngrok-skip-browser-warning", "true");
  //const raw = JSON.stringify(data);

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: data,
    redirect: "follow",
  };
  try {
   
    const response = await fetch(URL + `/vision-board/${visionBoardID}/goal/${goalId}`, requestOptions);

    return response.json();
  } catch (error) {
    apiError(error);
  }
};
export const deleteVisionBoard = async (Id) => {
  const token = await getAuthToken();
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  let endpoint = `${URL}/coupons/${Id}`
  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(`${endpoint}`, requestOptions);
    return responseValidator(response, true);
  } catch (e) {
    return apiError(e);
  }
};
