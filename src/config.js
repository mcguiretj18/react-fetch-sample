import axios from "axios";

axios.interceptors.request.use((config) => {
  /* set configuration */
  console.log("Request was sent with axios");

  return config;
});

export const fetchWithInteceptor = ((api) => {
  return (...args) => {
    const result = api.apply(this, args);
    return result.then(console.log("Request was sent with fetch"));
  };
})(window.fetch);
