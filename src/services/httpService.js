import axios from "axios";
//import { toast } from "react-toastify";

//Header includes JWT from user to call protected APIs
//axios.defaults.headers.common["x-auth-token"] = localstorage.get.......;

//Handler for errors
axios.interceptors.response.use(null, error => {
  //Expected error
  if (
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500
  ) {
    return Promise.reject(error);
  }
  //Unexpeted error
  //toast.error("Something went wrong when deleting the post");
  console.log(error);
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
