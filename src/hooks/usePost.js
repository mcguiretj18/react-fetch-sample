import axios from "axios";
import { useEffect } from "react";

export function usePost() {
  useEffect(() => {
    function createPostWithFetch() {
      const fetchOptions = {
        method: "POST",
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
      fetch("https://jsonplaceholder.typicode.com/posts", fetchOptions)
        .then((response) => response.json())
        .then((json) => console.log("fetch json", json));
    }
    createPostWithFetch();
  }, []);

  useEffect(() => {
    function createPostWithAxios() {
      const axiosOptions = {
        /* Add url here is a between axios and fetch */
        url: "https://jsonplaceholder.typicode.com/posts",
        method: 'POST',
        data: {
          title: "foo",
          body: "bar",
          userId: 1,
        },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      axios(axiosOptions)
        /* Axios also returns a response / error with a data property */
        .then((response) => console.log("axios json", response.data));
    }

    createPostWithAxios();
  });
}