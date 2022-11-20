import { Web3Storage } from "web3.storage";

import { WEB3STORAGE_TOKEN } from "../constants/constants";
function getAccessToken() {
  return WEB3STORAGE_TOKEN;
}

function MakeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

/// used NFT.storage to prepare the metadata for the NFT
export const StoreMetadata = async (
  image,
  Name,
  PublisherName,
  articleURI,
  articleLink
) => {
  console.log("Preparing Metadata ....");
  const obj = {
    image: image,
    name: Name,
    description: `The Article was Published by ${PublisherName} . The content of the article is stored on IPFS here : ${articleURI} . It can be read here : ${articleLink}`,
    external_url: articleLink,
  };
  const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
  const files = [new File([blob], "nft.json")];
  console.log("Uploading data to IPFS with web3.storage....");
  const client = MakeStorageClient();
  const cid = await client.put(files, { wrapWithDirectory: false });
  console.log("Stored files with cid:", cid);
  return cid;
};
