import React from "react";
import { Badge, Button, Card, DarkThemeToggle, Flowbite } from "flowbite-react";

export default function Article(props) {
  return (
    <div>
      <Card className=" mb-6 hover:scale-[1.02] transition ease-in-out">
        <div className="flex justify-between">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {props.title}
          </h5>
          {props.verified ? (
            <Badge className="" color="purple">
              Verified
            </Badge>
          ) : (
            ""
          )}
        </div>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {`${props.content}`.slice(0, 100)}...
        </p>
        <Button>
          <a href={props.link}>Read more</a>
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
  );
}
