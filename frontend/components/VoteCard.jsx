import { Button, Card } from "flowbite-react";
import React from "react";

export default function VoteCard(props) {
  return (
    <div>
      <div className=" dark:bg-gray-900 min-h-screen">
        <div className=" mx-auto flex-row flex flex-wrap items-start justify-center ">
          <div className="max-w-sm my-3 md:mx-4">
            <Card className="  p-4">
              <a href="#">
                <h1 className="text-2xl mb-5 mt-2.5  font-semibold tracking-tight text-gray-900 dark:text-white">
                  {props.title}
                </h1>
                <h5 className=" mt-2.5 tracking-tight text-gray-900  font-semibold dark:text-white">
                  <span className="text-lg font-normal">Published By:</span>{" "}
                  <span className="underline text-lg">{props.name}</span>
                </h5>
              </a>

              <div className="flex items-start flex-col justify-start w-full">
                <span className="text-lg text-gray-900 dark:text-white">
                  Total votes :{" "}
                  <span className="text-xl font-bold">{props.voteCount}</span>
                </span>
              </div>
              <div className="">
                <button
                  href="#"
                  className="rounded-md w-full  mx-auto mt-4 bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Upvote
                </button>
                <button
                  href="#"
                  className="mx-auto w-full rounded-md  mt-4 bg-green-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
                >
                  Read
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
