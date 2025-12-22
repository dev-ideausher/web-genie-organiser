import { getToken } from "../auth/userCookies";
import { apiError,getAuthToken,responseValidator} from "./../../helper/helper"
import { urlToHttpOptions } from "url";
const URL = process.env.NEXT_PUBLIC_BASE_URL;
export const getvideo = async () => {
  const myHeaders = new Headers();
  const token = await getAuthToken(); 
  myHeaders.append("Authorization", `Bearer ${token}`);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
   
    const response = await fetch(URL + `/video`, requestOptions);

    return response.json();
  } catch (error) {
    apiError(error);
  }
};
export const getvideoById = async (id) => {
    const myHeaders = new Headers();
    const token = await getAuthToken(); 
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
     
      const response = await fetch(URL + `/video/${id}`, requestOptions);
  
      return response.json();
    } catch (error) {
      apiError(error);
    }
  };
 
  export const createvideo= async (data) => {
    const myHeaders = new Headers();
    const token = await getAuthToken(); 
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const raw = JSON.stringify(data);
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
     
      const response = await fetch(URL + `/video`, requestOptions);
  
      return response.json();
    } catch (error) {
      apiError(error);
    }
  };
  export const deletevideo = async (id) => {
    const token = await getAuthToken();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
  
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
  
    try {
        const response = await fetch(URL + `/video/${id}`, requestOptions);
      return responseValidator(response, true);
    } catch (e) {
      return apiError(e);
    }
  };
  export const updatevideo = async (id,data) => {
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
     
      const response = await fetch(URL + `/video/${id}`, requestOptions);
  
      return response.json();
    } catch (error) {
      return (error);
    }
  };