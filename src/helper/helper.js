import { toast } from "react-toastify";

export const url = process.env.NEXT_PUBLIC_BASE_URL;

export const responseValidator = async (
  response,
  isToaster = false,
  message = null
) => {
  if (response.ok) {
    if (response?.status == 204) {
      toast.success(
        !message || message.length == 0 ? response.message : message,
        {
          toastId: "API-error-session-expired",
        }
      );
      return { status: true, code: 204 };
    } else {
      const res = await response.json();

      if (Array.isArray(res.data)) {
        if (isToaster) {
          toast.success(
            !message || message.length == 0 ? res.message : message,
            {
              toastId: `API-Response-success-${Math.random()}`,
            }
          );
        }
return { status: true, data: [...res.data], pagination: res.pagination };      } else if (typeof res.data === "object") {
        if (isToaster) {
          toast.success(
            !message || message.length == 0 ? res.message : message,
            {
              toastId: `API-Response-success-${Math.random()}`,
            }
          );
        }
        // return { status: true, data: res.data };
         return { status: true, data: res.data,  pagination: res.pagination };
      } else if (typeof res.data === "string") {
        if (isToaster) {
          toast.success(
            !message || message.length == 0 ? res.message : message,
            {
              toastId: `API-Response-success-${Math.random()}`,
            }
          );
        }
        // return { status: true, data: res.data };
         return { status: true, data: res.data,  pagination: res.pagination };
      } else {
        toast.error("response.data is neither an array nor an object", {
          toastId: `API-Response-error${Math.random()}`,
        });
      }
    }
  } 
  else if (response?.status === 401) {
    const err = await response.json();
  
    toast.error("Session Expired. Please log in again.", {
      toastId: "API-error-session-expired",
    });
  
   
    setTimeout(() => {
      window.location.href = "/";
    }, 2500); // redirect after 2.5s
  
    return {
      status: false,
      code: 401,
      message: err.message || "Session Expired.",
    };
  }
   else if (response?.status == 413) {
    toast.error("Media file which you attach is too large.", {
      toastId: "API-error-file-size-too-large",
    });
    return { status: false, code: 413, message: "file-size-too-large" };
  } else if (response?.status >= 400 && response?.status < 500) {
    const res = await response.json();
    toast.error(res.message, {
      toastId: `API-400-error${Math.random()}`,
    });
    return { status: false, code: 400, message: res };
  } else if (response?.status >= 500) {
    const res = await response.json();
    toast.error(res, {
      toastId: `API-500-error${Math.random()}`,
    });
    return {
      status: false,
      code: response?.status,
      message: "Encounter Server Side Error.",
    };
  } else {
    toast.error("Something went wrong", {
      toastId: `API-unknown-error${Math.random()}`,
    });
    return {
      status: false,
      code: response?.status,
      message: "Something went wrong.",
    };
  }
};
export const apiError = (e) => {
  if (e.name === "AbortError") {
  } else {
    toast.error("Takes more than the usual time. Please refresh the page.", {
      toastId: `API-Timeout-error`,
    });
  }
  return { status: false, message: e };
};

export const getAuthToken = async () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        unsubscribe(); 
        if (user) {
          try {
            const token = await user.getIdToken();
            resolve(token);
          } catch (error) {
            reject(error);
          }
        } else {
          reject(new Error("User is not authenticated"));
          toast.warn("User is not Authenicated! Please Login")
          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
   
        }
      });
    });
  };
