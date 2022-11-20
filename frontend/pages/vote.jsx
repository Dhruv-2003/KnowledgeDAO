import { Button, Card, Tabs } from "flowbite-react";
import React, { useState, useEffect } from "react";
import VoteCard from "../components/VoteCard";

import {
  ArticleManager_ABI,
  ArticleManager_Address,
  DAOVoting_ABI,
  DAOVoting_Address,
} from "../constants/constants";

import { useAccount, useContract, useProvider, useSigner } from "wagmi";

export default function Vote() {
  const [articles, setArticles] = useState([]);

  const { address, isConnected } = useAccount();
  const provider = useProvider();

  const ArticleManager_Contract = useContract({
    address: ArticleManager_Address,
    abi: ArticleManager_ABI,
    signerOrProvider: provider,
  });

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
        Voting: article.voting,
        Domain: article.domainName,
      };
      console.log(parsedResponse);
      return parsedResponse;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchArticles = async () => {
    try {
      console.log("Fetching Articles");

      const totalArticles = await ArticleManager_Contract.totalArticles();
      console.log(totalArticles);
      const promises = [];
      for (let id = 0; id < totalArticles; id++) {
        const articlePromise = fetchArticle(id);
        promises.push(articlePromise);
      }

      const _articles = await Promise.all(promises);
      console.log(_articles);
      setArticles(_articles);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div>
      <div className=" dark:bg-gray-900 min-h-screen">
        <h1 className="text-center text-3xl underline font-bold py-8  dark:text-white">
          Vote
        </h1>

        <div className=" mx-auto flex-row flex flex-wrap items-start justify-center ">
          {articles ? (
            articles.map((article) => {
              return article.voting ? (
                <div className="max-w-sm my-3 md:mx-4">
                  <VoteCard
                    title={"Learn to Code in HTML"}
                    name={"Kushagra Sarathe"}
                    voteCount={20}
                  />
                </div>
              ) : (
                <a></a>
              );
            })
          ) : (
            <a>No Article for voting </a>
          )}
        </div>
      </div>
    </div>
  );
}
