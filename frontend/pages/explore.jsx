import { Button, Card, DarkThemeToggle, Flowbite } from "flowbite-react";
import React from "react";

export default function Explore() {
  return (
    <div className=" dark:bg-gray-900 min-h-screen">
      <Flowbite>
        <DarkThemeToggle />
      </Flowbite>
      <h1 className="text-center text-3xl  font-bold my-4 underline dark:text-white">
        Publish
      </h1>
      <div className=" mx-auto  py-4 w-96 md:w-6/12">
        <Card className=" mb-6 hover:scale-[1.02] transition ease-in-out">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <Button>
            Read more
            <svg
              className="ml-2 -mr-1 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </Card>
      </div>
    </div>
  );
}
