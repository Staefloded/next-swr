export const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetcher = (url: string) => fetch(url).then((data) => data.json());

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
