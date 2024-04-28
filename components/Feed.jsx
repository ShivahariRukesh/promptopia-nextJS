"use client";

import React from "react";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
const Feed = () => {
  const [prompts, setPrompts] = useState([]);

  const [searchText, setSearchText] = useState("");

  const handleTagClick = () => {};
  //This PromptCardList is rendered inside this file  because this component is only used in this Feed component
  const PromptCardList = ({ data, handleTagClick }) => {
    return (
      <div className="mt-16 prompt_layout">
        {data.map((item) => {
          return (
            <PromptCard
              key={item._id}
              post={item}
              handleTagClick={handleTagClick}
            />
          );
        })}
      </div>
    );
  };

  const handleSearchChange = (e) => {};

  useEffect(() => {
    const fetchFunc = async () => {
      const res = await fetch("/api/prompt/get", {
        method: "GET",
      });
      const getData = await res.json();
      setPrompts(getData);
      console.log("the get response is ", getData[0]?.creator);
    };

    fetchFunc();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={prompts} handleTagClick={handleTagClick} />
      {/* All Prompts */}
      {/* {searchText ? (
        <PromptCardList data={prompts} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )} */}
    </section>
  );
};

export default Feed;
