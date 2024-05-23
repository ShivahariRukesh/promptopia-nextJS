"use client";

import React, { useEffect, useState } from "react";
import Profile from "@components/Profile";

const otherProfile = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();
      console.log("data", data);
      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, []);

  return (
    <>
      <Profile
        name="ME"
        desc="Welcome to your personalized prfoi"
        data={posts}
      />
    </>
  );
};

export default otherProfile;
