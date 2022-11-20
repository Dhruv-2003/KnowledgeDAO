import { Button, Card, Tabs } from "flowbite-react";
import React from "react";
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
  return (
    <div>
      <div className=" dark:bg-gray-900 min-h-screen">
        <h1 className="text-center text-3xl underline font-bold py-8  dark:text-white">
          Vote
        </h1>

        <div className=" mx-auto flex-row flex flex-wrap items-start justify-center ">
          <div className="max-w-sm my-3 md:mx-4">
            <VoteCard
              title={"Learn to Code in HTML"}
              name={"Kushagra Sarathe"}
              voteCount={20}
            />
          </div>
          <div className="max-w-sm my-3 md:mx-4">
            <VoteCard
              title={"Improve coding logic"}
              name={"Dhruv Agarwal"}
              voteCount={20}
            />
          </div>
          <div className="max-w-sm my-3 md:mx-4">
            <VoteCard
              title={"Learn to Code in HTML"}
              name={"Kushagra Sarathe"}
              voteCount={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
