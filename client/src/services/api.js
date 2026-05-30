import axios from "axios";

const API = axios.create({
    baseURL: "https://event-media-platform.onrender.com/api",
  });

export default API;