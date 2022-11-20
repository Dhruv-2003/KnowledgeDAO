import React from "react";
import Article from "../components/Article";

export default function Explore() {
  return (
    <div className=" dark:bg-gray-900 min-h-screen">
      <h1 className="text-center text-3xl  font-bold py-8 underline dark:text-white">
        Read Articles
      </h1>
      <div className=" mx-auto  py-4 w-96 md:w-6/12">
        <Article
          content={
            "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
          }
          title={"Noteworthy technology acquisitions 2021"}
          verified={true}
          link={"https://google.com"}
        />
      </div>
    </div>
  );
}
