import React, { useState, useEffect } from "react";
import Article from "../components/Article";
import {
  ArticleManager_ABI,
  ArticleManager_Address,
} from "../constants/constants";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import { Spinner } from "flowbite-react";

export default function Explore() {
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
    <div className=" dark:bg-gray-900 min-h-screen">
      <h1 className="text-center text-3xl  font-bold py-8 underline dark:text-white">
        Read Articles
      </h1>
      {/* <div className="flex justify-center items-center mt-[-200px] min-h-screen">
        <Spinner aria-label="Default status example"></Spinner>
        <span className="mx-2"> Loading Articles...</span>
      </div> */}

      <div className=" mx-auto  py-4 w-96 md:w-6/12">
        {articles ? (
          articles.map((article, key) => {
            return (
              <Article
                content={article.ArticleContent}
                title={article.ArticleName}
                verified={article.Verified}
                key={key}
                link={`http://localhost:3000/article/${article.Domain}`}
              />
            );
          })
        ) : (
          <a>No Articles Found</a>
        )}
      </div>
    </div>
  );
}
