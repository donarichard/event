import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dev-event.herokuapp.com/v2/api"
});

export default axiosInstance;
