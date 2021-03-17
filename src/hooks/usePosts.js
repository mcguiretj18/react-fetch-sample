import axios from "axios";
import { useEffect } from "react";
import { fetchWithInteceptor } from "../config";

export function usePosts() {
  useEffect(() => {
    function getMultiplePostsWithAxios() {
      axios
        .all([
          axios.get("https://jsonplaceholder.typicode.com/posts/1"),
          axios.get("https://jsonplaceholder.typicode.com/posts/2"),
        ])
        .then(
          axios.spread((post1, post2) => {
            console.log("axios post1", post1.data);
            console.log("axios post2", post2.data);
          })
        ).catch(console.error);
    }

    getMultiplePostsWithAxios();
  }, []);

  useEffect(() => {
    function getMultiplePostsWithFetch() {
      Promise.all([
        fetchWithInteceptor("https://jsonplaceholder.typicode.com/posts/1"),
        fetchWithInteceptor("https://jsonplaceholder.typicode.com/posts/2"),
      ]).then(async ([res1, res2]) => {
        const post1 = await res1.json();
        const post2 = await res2.json();

        console.log("fetch post1", post1);
        console.log("fetch post2", post2);
      }).catch(console.error);
    }

    getMultiplePostsWithFetch();
  }, []);
}
