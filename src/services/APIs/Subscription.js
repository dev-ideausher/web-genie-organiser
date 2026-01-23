import { getToken } from "../auth/userCookies";
import { apiError,getAuthToken,responseValidator} from "./../../helper/helper"
import { urlToHttpOptions } from "url";
const URL = process.env.NEXT_PUBLIC_BASE_URL;
export const getSubscription = async () => {
  const myHeaders = new Headers();
  const token = await getAuthToken(); 
  myHeaders.append("Authorization", `Bearer ${token}`);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
   
    const response = await fetch(URL + `/subscriptions/plans`, requestOptions);

    return response.json();
  } catch (error) {
    apiError(error);
  }
};
export const getSubscriptionCurrent = async () => {
    const myHeaders = new Headers();
    const token = await getAuthToken(); 
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
     
      const response = await fetch(URL + `/subscriptions/current`, requestOptions);
  
      return response.json();
    } catch (error) {
      apiError(error);
    }
  };
  export const getCard = async () => {
    const myHeaders = new Headers();
    const token = await getAuthToken(); 
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
     
      const response = await fetch(URL + `/subscriptions/payment-methods`, requestOptions);
  
      return response.json();
    } catch (error) {
      apiError(error);
    }
  };
export const getAllConversation = async () => {
    const myHeaders = new Headers();
    const token = await getAuthToken(); 
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
     
      const response = await fetch(URL + `/chatbot/conversations`, requestOptions);
  
      return response.json();
    } catch (error) {
      apiError(error);
    }
  };
  export const addCard= async (data) => {
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
     
      const response = await fetch(URL + `/subscriptions/payment-methods`, requestOptions);
  
      return response.json();
    } catch (error) {
      apiError(error);
    }
  };
  export const createCheckout= async (data) => {
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
     
      const response = await fetch(URL + `/subscriptions/checkout`, requestOptions);
  
      return response.json();
    } catch (error) {
      apiError(error);
    }
  };
  export const deleteChat = async (id) => {
    const token = await getAuthToken();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
  
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
  
    try {
        const response = await fetch(URL + `/chatbot/clear`, requestOptions);
      return responseValidator(response, true);
    } catch (e) {
      return apiError(e);
    }
  };
  
