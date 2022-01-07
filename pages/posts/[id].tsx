import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";

import { API_URL, fetcher, Post } from "../../lib";

const SinglePost = ({ post }: { post: Post }) => {
  const router = useRouter();
  const { data } = useSWR<Post>(`${URL}/${router.query?.id}`, fetcher, { fallbackData: post });

  return (
    <div className="container">
      <h3>{data?.title}</h3>
      <p>{data?.body}</p>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(API_URL);
  const posts: Post[] = await res.json();

  const paths = posts.map((post: Post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(`${API_URL}/${context.params?.id}`);
  const post: Post = await res.json();

  return {
    props: {
      post,
    },
  };
};

export default SinglePost;
