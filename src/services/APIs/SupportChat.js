import { getToken } from "../auth/userCookies";
import { apiError,getAuthToken,responseValidator} from "./../../helper/helper"
import { urlToHttpOptions } from "url";
const URL = process.env.NEXT_PUBLIC_BASE_URL;
export const getChatsHistoryAPI = async () => {
  const myHeaders = new Headers();
  const token = await getAuthToken(); 
  myHeaders.append("Authorization", `Bearer ${token}`);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
   
    const response = await fetch(URL + `/support`, requestOptions);

    return response.json();
  } catch (error) {
    apiError(error);
  }
};
export const getChatsById = async (id) => {
    const myHeaders = new Headers();
    const token = await getAuthToken(); 
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
     
      const response = await fetch(URL + `/support/${id}?sortOrder=asc`, requestOptions);
  
      return response.json();
    } catch (error) {
      apiError(error);
    }
  };
  export const sendMessage= async (data,ticektId) => {
    const myHeaders = new Headers();
    const token = await getAuthToken(); 
    myHeaders.append("Authorization", `Bearer ${token}`);

  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow",
    };
    try {
     
      const response = await fetch(URL + `/support/${ticektId}/messages`, requestOptions);
  
      return response.json();
    } catch (error) {
      apiError(error);
    }
  };
  export const createTicket= async (data) => {
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
     
      const response = await fetch(URL + `/support`, requestOptions);
  
      return response.json();
    } catch (error) {
      apiError(error);
    }
  };