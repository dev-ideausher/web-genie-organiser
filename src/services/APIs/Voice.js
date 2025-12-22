import { getToken } from "../auth/userCookies";
import { apiError,getAuthToken,responseValidator} from "./../../helper/helper"
import { urlToHttpOptions } from "url";
const URL = process.env.NEXT_PUBLIC_BASE_URL;
export const getVoice = async () => {
  const myHeaders = new Headers();
  const token = await getAuthToken(); 
  myHeaders.append("Authorization", `Bearer ${token}`);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
   
    const response = await fetch(URL + `/voice-notes`, requestOptions);

    return response.json();
  } catch (error) {
    apiError(error);
  }
};
export const getVoiceById = async (id) => {
    const myHeaders = new Headers();
    const token = await getAuthToken(); 
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
     
      const response = await fetch(URL + `/voice-notes/${id}`, requestOptions);
  
      return response.json();
    } catch (error) {
      apiError(error);
    }
  };
 
  export const createVoice= async (data) => {
    const myHeaders = new Headers();
    const token = await getAuthToken(); 

    myHeaders.append("Authorization", `Bearer ${token}`);
    const raw = JSON.stringify(data);
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body:data,
      redirect: "follow",
    };
    try {
     
      const response = await fetch(URL + `/voice-notes`, requestOptions);
  
      return response.json();
    } catch (error) {
      apiError(error);
    }
  };
  export const deleteVoice = async (id) => {
    const token = await getAuthToken();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
  
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
  
    try {
        const response = await fetch(URL + `/voice-notes/${id}`, requestOptions);
      return responseValidator(response, true);
    } catch (e) {
      return apiError(e);
    }
  };
  export const updateVoice = async (id,data) => {
    const myHeaders = new Headers();
    const token = await getAuthToken(); 
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      redirect: "follow",
      body:JSON.stringify(data)
    };
    try {
     
      const response = await fetch(URL + `/voice-notes/${id}`, requestOptions);
  
      return response.json();
    } catch (error) {
      return (error);
    }
  };