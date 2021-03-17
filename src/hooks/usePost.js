import axios from "axios";
import { useEffect } from "react";

axios.interceptors.request.use((config) => {
  /* set configuration */
  console.log("Request was sent with axios");

  return config;
});

const fetchWithInteceptor = ((api) => {
  return (...args) => {
    const result = api.apply(this, args);
    return result.then(console.log("Request was sent with fetch"));
  };
})(window.fetch);

export function usePost() {
  useEffect(() => {
    function createPostWithFetch() {
      const controller = new AbortController();
      const fetchOptions = {
        method: "POST",
        signal: controller.signal,
        /* JSON.stringify is a difference between axios and fetch */
        body: JSON.stringify({
          title: "foo",
          body: "bar",
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      const promise = fetchWithInteceptor(
        "https://jsonplaceholder.typicode.com/posts",
        fetchOptions
      );
      // eslint-disable-next-line no-unused-vars
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      promise
        .then((response) => response.json())
        .then((json) => console.log("fetch json", json))
        .catch((error) => console.error("timeout exceeded"));
    }
    createPostWithFetch();
  }, []);

  useEffect(() => {
    function createPostWithAxios() {
      const axiosOptions = {
        /* Add url here is a between axios and fetch */
        url: "https://jsonplaceholder.typicode.com/posts",
        method: "POST",
        timeout: 4000, // 4 seconds timeout
        data: {
          title: "foo",
          body: "bar",
          userId: 2,
        },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      axios(axiosOptions)
        /* Axios also returns a response / error with a data property */
        .then((response) => console.log("axios json", response.data))
        .catch((error) => console.error("timeout exceeded"));
    }

    createPostWithAxios();
  });
}
