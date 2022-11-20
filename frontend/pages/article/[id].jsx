import Image from "next/image";
import React from "react";
import dark from "../../assets/dark.png";

export default function NewArticle() {
  return (
    <div className=" dark:bg-gray-900 min-h-screen flex flex-col  items-center justify-start pt-6">
      <div className=" mx-auto w-6/12">
        <h1 className=" text-4xl font-semibold py-6 underline dark:text-white">
          Title Here
        </h1>
        <p className="text-lg font-noraml text-justify py-6 mb-4 dark:text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
          accusamus tenetur harum. Doloribus, quod? Porro laborum amet
          recusandae corporis dolorem blanditiis nesciunt ut commodi impedit
          cum, numquam ipsum nulla dolore?
        </p>
      </div>
      <div className=" mx-auto w-6/12">
        <Image src={dark} />
      </div>
    </div>
  );
}
