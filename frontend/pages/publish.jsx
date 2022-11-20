import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { DarkThemeToggle, Flowbite } from "flowbite-react";

export default function Publish() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <>
      <div className=" dark:bg-gray-900 min-h-screen">
        <h1 className="text-center text-3xl underline font-bold py-8  dark:text-white">
          Publish
        </h1>
        <div className=" mx-auto  py-4 w-96 md:w-5/12">
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your name
              </label>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                id="last_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Please enter your name..."
                required
              />
            </div>
            <div>
              <label className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Article Title
              </label>
              <input
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter title for your article"
                required
              />
            </div>
          </div>
          <div className="grid gap-0 mb-3 md:grid-cols-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Content
            </label>
            <textarea
              onChange={(e) => {
                setContent(e.target.value);
              }}
              id="message"
              rows="8"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your article here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="my-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
