"use client";
import React, { useEffect } from "react";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = res.json();
      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  });
  async function handleDelete() {}
  const handleEdit = () => {};
  return (
    <>
      <Profile
        name="ME"
        desc="Welcome to your personalized prfoi"
        data={posts}
        handelEdit={handleEdit}
        handleDelete={handleDelete}
      />
      ;
    </>
  );
};

export default MyProfile;
