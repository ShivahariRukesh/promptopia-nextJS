"use client";
import React, { useEffect, useState } from "react";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();
      console.log("data", data);
      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, []);

  async function handleDelete(po) {
    try {
      console.log("delete log", po._id);
      const res = await fetch(`/api/prompt/${po._id}`, {
        method: "DELETE",
      });
      router.push("/");
    } catch (err) {
      console.log("DeletionPrompt error", err);
    }
  }

  const handleEdit = (po) => {
    console.log("Passed");
    router.push(`/profile/update-prompt?id=${po._id}`);
  };
  return (
    <>
      <Profile
        name="ME"
        desc="Welcome to your personalized prfoi"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default MyProfile;
