// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// SOUL BOUND Token minted directly to the
contract POPNFT is ERC721, ERC721URIStorage, Ownable {
    address public managerAddress;

    constructor() ERC721("ProofOfPublish", "POP") {}

    function setManager(address _newAddress) public onlyOwner {
        require(_newAddress != address(0), "Not a valid address");
        managerAddress = _newAddress;
    }

    modifier onlyManager() {
        require(msg.sender == managerAddress, "Not Authorized");
        _;
    }

    function safeMint(
        address to,
        uint256 tokenId,
        string memory uri
    ) public onlyManager {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        require(
            to == address(0) || from == address(0),
            "The NFT is non transferrable"
        );
        // super._beforeTokenTransfer(from, to, tokenId);
    }

    /// can be called by the owner of token to exit the DAO
    /// Burns the token ID from the users Account
    function burn(uint256 tokenId) external {
        require(
            ownerOf(tokenId) == msg.sender,
            "Only owner of the token can burn it"
        );
        _burn(tokenId);
    }

    /// function to remove someone from the DAO  , called only by the owner
    /// will burn the token ID from the users account
    function revoke(uint256 tokenId) external onlyOwner {
        _burn(tokenId);
    }

    /// after any token transfer , events are emitted, revoke show when the NFT is burnt
    /// attest when NFT is minted
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        if (from == address(0)) {
            emit Attest(to, tokenId);
        } else if (to == address(0)) {
            emit Revoke(to, tokenId);
        }
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
