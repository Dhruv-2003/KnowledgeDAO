import { Button } from "flowbite-react";
import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import { DAONFT_ABI, DAONFT_Address } from "../constants/constants";

export default function JoinDao() {
  const [isDAOUser, setIsDAOUser] = useState(false);
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const DAONFT_Contract = useContract({
    address: DAONFT_Address,
    abi: DAONFT_ABI,
    signerOrProvider: signer || provider,
  });

  const checkDAOUser = async () => {
    try {
      console.log("Checking User ...");
      const response = await DAONFT_Contract.balanceOf(address);
      console.log(response);
      if (response >= 1) {
        setIsDAOUser(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const joinDAONFT = async () => {
    try {
      if (!isDAOUser) {
        const amount = ethers.utils.parseEther("1");
        const tx = await DAONFT_Contract.safeMint({ value: amount });
        await tx.wait();
        console.log(tx);
        console.log("DAO Member NFT Minted");
      } else {
        console.log("Already a DAO User");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkDAOUser();
  }, []);

  return (
    <div className="mx-auto">
      {isDAOUser ? (
        <a>Already a DAO User</a>
      ) : (
        <Button
          onClick={() => {
            joinDAONFT();
          }}
        >
          Join DAO
        </Button>
      )}
    </div>
  );
}
