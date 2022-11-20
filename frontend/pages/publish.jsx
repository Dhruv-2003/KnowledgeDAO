import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  ArticleManager_ABI,
  ArticleManager_Address,
  DAOVoting_ABI,
  DAOVoting_Address,
  POPNFT_URI,
} from "../constants/constants";

import { StoreArticle } from "../functionality/storeArticle";
import { StoreMedia } from "../functionality/storeImages";
import { StoreMetadata } from "../functionality/storeMetadata";
import { ethers } from "ethers";

export default function Publish() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState([]);
  const [domain, setDomain] = useState("");

  const [editedDomain, setEditedDomain] = useState("");
  const [mediaURI, setMediaURI] = useState("");
  const [articleURI, setArticleURI] = useState("");
  const [nftURI, setNftURI] = useState("");
  const [articleLink, setArticleLink] = useState("");

  const [articleID, setArticleID] = useState(0);

  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const ArticleManager_Contract = useContract({
    address: ArticleManager_Address,
    abi: ArticleManager_ABI,
    signerOrProvider: signer || provider,
  });

  const DAOVoting_Contract = useContract({
    address: DAOVoting_Address,
    abi: DAOVoting_ABI,
    signerOrProvider: signer || provider,
  });

  useEffect(() => {
    generateArticleLink();
  }, [domain]);

  const generateArticleLink = () => {
    const newdomain = domain.replace(/ /g, "-");
    setEditedDomain(newdomain);
    const _articleLink = `https://localhost:3000/article/${newdomain}`;
    setArticleLink(_articleLink);
  };

  const handlePublish = async () => {
    try {
      generateArticleLink();
      if (media) {
        uploadMedia();
      } else {
        uploadArticle("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const uploadMedia = async () => {
    try {
      console.log("Storing the Media ...");
      const cid = await StoreMedia(media);
      const URI = `https://ipfs.io/ipfs/${cid}`;
      setMediaURI(URI);
      console.log(URI);
      uploadArticle(URI);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadArticle = async (_mediaURI) => {
    try {
      console.log("Storing the Article ...");
      const cid = await StoreArticle(name, address, title, content, _mediaURI);
      const URI = `https://ipfs.io/ipfs/${cid}`;
      console.log(URI);
      setArticleURI(URI);
      createNFT(URI);
    } catch (err) {
      console.log(err);
    }
  };

  const createNFT = async (_articleURI) => {
    try {
      console.log("Creating the NFT Metadata ..");
      const cid = await StoreMetadata(
        POPNFT_URI,
        title,
        name,
        _articleURI,
        articleLink
      );
      const URI = `https://ipfs.io/ipfs/${cid}`;
      console.log(URI);
      setNftURI(URI);
      publish(URI, _articleURI);
    } catch (err) {
      console.log(err);
    }
  };

  const publish = async (_nftURI, _articleURI) => {
    try {
      console.log("Publishing the Article , tx incoming --> ");
      const tx = await ArticleManager_Contract.publishResearch(
        _articleURI,
        editedDomain,
        _nftURI
      );
      await tx.wait();
      console.log(tx);
      const _id = tx.v;
      console.log(_id);
      setArticleID(_id);
    } catch (err) {
      console.log(err);
    }
  };

  const startVerifying = async () => {
    try {
      console.log("Starting Article Verification ..");
      const amount = ethers.utils.parseEther("0.5");
      const tx = await DAOVoting_Contract.addProposal(articleID, {
        value: amount,
      });

      await tx.wait();
      console.log("Verfiication Started");
    } catch (err) {
      console.log(err);
    }
  };

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
          <div>
            <div className="flex justify-between">
              <label className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Choose article Path
              </label>
              <label className=" block mb-2 text-sm font-medium text-gray-500 dark:text-gray-300">
                {/* &#40;e.g: knowledgedao/article/learn-to-code&#41; */}
                &#40;As : ${articleLink} &#41;
              </label>
            </div>
            <input
              onChange={(e) => {
                setDomain(e.target.value);
              }}
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter pathname of your choice..."
              required
            />
          </div>
          <div className="mt-5 grid gap-0 mb-3 md:grid-cols-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Content
            </label>
            <textarea
              onChange={(e) => {
                setContent(e.target.value);
              }}
              id="message"
              rows="12"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your article here..."
            ></textarea>
          </div>

          <div className="flex mt-6 items-center justify-center w-full">
            <label
              for="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e) => setMedia(e.target.files)}
              />
            </label>
          </div>

          <button
            type="submit"
            className="my-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              handlePublish();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
