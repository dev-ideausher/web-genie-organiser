import { getToken } from "../auth/userCookies";
import { apiError,getAuthToken,responseValidator} from "./../../helper/helper"
import { urlToHttpOptions } from "url";
const URL = process.env.NEXT_PUBLIC_BASE_URL;
export const getCalenderEvents = async (month, year,search) => {
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
   
    const response = await fetch(URL + `/calendar-events?month=${month}&year=${year}&search=${search}`, requestOptions);

    return response.json();
  } catch (error) {
    apiError(error);
  }
};
export const createEvent= async (data) => {
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
     
      const response = await fetch(URL + `/calendar-events`, requestOptions);
  
      return responseValidator(response);
    } catch (error) {
      apiError(error);
    }
  };