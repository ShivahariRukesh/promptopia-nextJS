"use client";

import React from "react";
import { useEffect, useState } from "react";

const Feed = () => {
  const [prompt, setPrompt] = useState([]);
  useEffect(() => {
    const fetchFunc = async () => {
      const res = await fetch("/api/prompt/get", {
        method: "GET",
      });
      const getData = await res.json();
      setPrompt(getData);
      console.log("the get response is ", getData);
    };

    fetchFunc();
  }, []);
  return (
    <div>
      This is the prompt feedsd.
      <section>
        {prompt.map((item) => (
          <div>{item.prompt}</div>
        ))}
      </section>
    </div>
  );
};

export default Feed;
