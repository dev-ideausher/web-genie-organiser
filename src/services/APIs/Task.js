import { da } from "react-day-picker/locale";
import { getToken } from "../auth/userCookies";
import { apiError,getAuthToken,responseValidator} from "./../../helper/helper"
import { urlToHttpOptions } from "url";
const URL = process.env.NEXT_PUBLIC_BASE_URL;
export const getTodayPendingAPI = async (date) => {
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
   
    const response = await fetch(URL + `/tasks/pending-today?date=${date}`, requestOptions);

    return response.json();
  } catch (error) {
    apiError(error);
  }
};
export const addTask = async (data) => {
    const myHeaders = new Headers();
    const token = await getAuthToken(); 
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body:JSON.stringify(data)
    };
    try {
     
      const response = await fetch(URL + `/tasks`, requestOptions);
  
      return response.json();
    } catch (error) {
      return (error);
    }
  };
  export const editTask = async (data,id) => {
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
     
      const response = await fetch(URL + `/tasks/${id}`, requestOptions);
  
      return response.json();
    } catch (error) {
      return (error);
    }
  };
  export const deleteTask = async (id) => {
    const token = await getAuthToken();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
  
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
  
    try {
        const response = await fetch(URL + `/tasks/${id}`, requestOptions);
      return responseValidator(response, true);
    } catch (e) {
      return apiError(e);
    }
  };
  export const completeTask = async (data) => {
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
     
      const response = await fetch(URL + `/tasks/${id}/mark-complete`, requestOptions);
  
      return response.json();
    } catch (error) {
      return (error);
    }
  };
  export const getTaskByID = async (ID) => {
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
     
      const response = await fetch(URL + `/tasks/${ID}`, requestOptions);
  
      return response.json();
    } catch (error) {
      apiError(error);
    }
  };




  export const addActivity = async (data) => {
    const myHeaders = new Headers();
    const token = await getAuthToken(); 
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body:JSON.stringify(data)
    };
    try {
     
      const response = await fetch(URL + `/activity`, requestOptions);
  
      return responseValidator(response)
    } catch (error) {
      return (error);
    }
  };
  export const editActivity = async (data,id) => {
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
     
      const response = await fetch(URL + `/activity/${id}`, requestOptions);
  
      return response.json();
    } catch (error) {
      return (error);
    }
  };
  export const getActivityById = async (id) => {
    const myHeaders = new Headers();
    const token = await getAuthToken(); 
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      body:JSON.stringify(data)
    };
    try {
     
      const response = await fetch(URL + `/activity/${id}`, requestOptions);
  
      return responseValidator(response);
    } catch (error) {
      return (error);
    }
  };
  export const deleteActivity = async (id) => {
    const token = await getAuthToken();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
  
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
  
    try {
        const response = await fetch(URL + `/activity/${id}`, requestOptions);
      return responseValidator(response, true);
    } catch (e) {
      return apiError(e);
    }
  };
  export const getActivityStats = async (ID) => {
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
     
      const response = await fetch(URL + `/activity/stats`, requestOptions);
  
      return response.json();
    } catch (error) {
      apiError(error);
    }
  };
