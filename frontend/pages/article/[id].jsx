import React, { useState, useEffect } from "react";
import {
  ArticleManager_ABI,
  ArticleManager_Address,
} from "../../constants/constants";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import dark from "../../assets/dark.png";

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
