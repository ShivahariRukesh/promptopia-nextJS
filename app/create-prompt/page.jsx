"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const page = () => {
  //It is an object destructuring pattern.It's extracting the data property
  //from the object returned by useSession() and assigning it to a new variable named session.
  const { data: session } = useSession();

  const router = useRouter();
  const [submit, setSubmit] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmit(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
          image: session?.user.image,
        }),
      });
      if (response.ok) {
        console.log(response);
        router.push("/");
      }
    } catch (err) {
      console.log("error while submitting prompt", err);
    } finally {
      setSubmit(false);
    }
  };
  return (
    <>
      {session ? (
        <Form
          type="Create"
          post={post}
          setPost={setPost}
          submitted={submit}
          handleSubmit={createPrompt}
        />
      ) : (
        <div>Please Login First</div>
      )}
    </>
  );
};

export default page;
