import React from "react";
import { useState } from "react";
import { NFTStorage } from "nft.storage";
import { NFT_STORAGE_API_KEY } from "../constants";

/// used NFT.storage to prepare the metadata for the NFT
export const StoreMetadata = async (
  image,
  Name,
  PublisherName,
  articleURI,
  articleLink
) => {
  console.log("Preparing Metadata ....");
  const nft = {
    image: image,
    name: Name,
    description: `The Article was Published by ${PublisherName} . The content of the article is stored on IPFS here : ${articleURI} . It can be read here : ${articleLink}`,
    external_url: articleLink,
  };
  console.log("Uploading Metadata to IPFS ....");
  const client = new NFTStorage({ token: NFT_STORAGE_API_KEY });
  const metadata = await client.store(nft);
  console.log(metadata);
  console.log("NFT data stored successfully 🚀🚀");
  console.log("Metadata URI: ", metadata.url);

  return metadata;
};
