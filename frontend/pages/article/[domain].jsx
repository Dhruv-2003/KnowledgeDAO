import React, { useState, useEffect } from "react";
import {
  ArticleManager_ABI,
  ArticleManager_Address,
} from "../../constants/constants";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import dark from "../../assets/dark.png";
import { Badge } from "flowbite-react";

export default function NewArticle() {
  const [article, setArticle] = useState({});
  const [articleId, setArticleId] = useState(0);

  const router = useRouter();
  const { domain } = router.query;

  const { address, isConnected } = useAccount();
  const provider = useProvider();

  const ArticleManager_Contract = useContract({
    address: ArticleManager_Address,
    abi: ArticleManager_ABI,
    signerOrProvider: provider,
  });

  useEffect(() => {
    if (domain) {
      fetchArticleID(domain);
    }
  }, [domain]);

  const fetchIPFS = async (URI) => {
    try {
      console.log("Fetching from IPFS ...");
      // const URL = `https://ipfs.io/ipfs/${metadataURI}/research.json`;
      const response = await fetch(URI);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchArticle = async (_articleId) => {
    try {
      console.log("Fetching Article");
      const article = await ArticleManager_Contract.getResearch(_articleId);
      // console.log(article);
      const response = await fetchIPFS(article.ipfsURI);
      // console.log(response);
      const parsedResponse = {
        PublisherName: response.PublisherName,
        PublisherAddress: article.publisher,
        ArticleName: response.ArticleName,
        ArticleContent: response.ArticleContent,
        ArticleMedia: response.ArticleMedia,
        Verified: article.verified,
        Domain: article.domainName,
      };
      console.log(parsedResponse);
      setArticle(parsedResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchArticleID = async (_domain) => {
    try {
      const _id = await ArticleManager_Contract.getArticleId(_domain);
      console.log(_id);
      setArticleId(_id);
      fetchArticle(_id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" dark:bg-gray-900 min-h-screen flex flex-col  items-center justify-start pt-6">
      <div className=" mx-auto md:w-7/12 px-4">
        <h1 className=" text-4xl font-semibold py-6 underline dark:text-white">
          {article.ArticleName}
        </h1>
        <div className="flex justify-between">
          <h2 className=" text-sm font-semibold py-2 underline dark:text-white">
            {article.PublisherName}
          </h2>
          <h2 className="  text-sm font-semibold py-2 underline dark:text-white">
            {article.PublisherAddress}
          </h2>
          <span>
            {article.verified}
            <Badge className="" color="purple">
              Verified
            </Badge>
          </span>
        </div>
        <p className="text-lg font-noraml text-justify py-6 mb-4 dark:text-white">
          {article.ArticleContent}
        </p>
      </div>
      <div className=" mx-auto md:w-7/12 px-4">
        <Image src={dark} />
      </div>
    </div>
  );
}
