import useSWR, { useSWRConfig } from "swr";
import { API_URL, fetcher, Post } from "../lib";
import Link from "next/link";

const Posts = (): JSX.Element => {
  const { data: posts } = useSWR<Post[]>(API_URL, fetcher);
  const { mutate } = useSWRConfig();

  const onDelete = async (id: number) => {
    return await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    mutate(API_URL);
  };

  return (
    <div className="flex space-y-4 flex-col">
      {posts &&
        posts.slice(0, 10).map((post) => (
          <div key={post.id} className="rounded-md shadow-md border flex flex-col w-full p-5">
            <span>{post.id}</span>
            <Link href={`/posts/${post.id}`}>
              <a className="text-lg font-bold capitalize mb-3 hover:underline">{post.title}</a>
            </Link>

            <p className="text-gray-500 font-medium">{post.body}</p>

            <div className="mt-5 w-full flex self-end space-x-2">
              <button>Edit</button>
              <button onClick={() => onDelete(post.id)} className="text-red-900 font-medium">
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Posts;
