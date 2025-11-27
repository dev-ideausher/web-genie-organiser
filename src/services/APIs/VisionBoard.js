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
    method: "GETT",
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