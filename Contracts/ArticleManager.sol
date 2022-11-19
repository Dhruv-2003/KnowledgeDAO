// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/access/Ownable.sol";

interface POPNFT {
    function safeMint(
        address to,
        uint256 tokenId,
        string memory uri
    ) external;
}

contract ArticleManager is Ownable {
    // stores the record of every article
    // Allows to register a Article , mint an NFT
    // Verification of an Article , voting record
    address public DAOAddress;

    POPNFT _nft;

    /// Struct for the Article storage
    struct Article {
        address publisher;
        string ipfsURI;
        uint256 dateOfPublication;
        bool verified;
        bool voting;
        string domainName;
    }

    /// Maintains the No. of record
    uint32 public totalArticles;
    uint32 public totalVerifiedArticles;
    mapping(address => uint32) public totalArticlePublished;

    /// Maintans the record
    mapping(uint32 => Article) public ArticlesPublished;
    mapping(address => mapping(uint32 => Article))
        public personalArticlesPublished;
    mapping(uint32 => Article) public verfiedArticlesPublished;

    /// Enables shareable link creation
    mapping(string => uint32) public domains;

    constructor(address _popNFTContract) public {
        _nft = POPNFT(_popNFTContract);
    }

    modifier onlyAuthorised() {
        require(
            msg.sender == owner() || msg.sender == DAOAddress,
            "Not Authorised"
        );
        _;
    }

    /// @dev function publishResearch
    function publishResearch(
        string memory _ipfsURI,
        string memory domainName,
        string memory _nftURI
    ) public returns (articleID) {
        uint32 articleId = totalArticles;
        uint32 personalArticleId = totalArticlePublished[msg.sender];

        Article storage _article = Article(
            msg.sender,
            _ipfsURI,
            block.timestamp,
            false,
            false,
            domainName
        );

        /// Storing the Record
        ArticlesPublished[articleId] = _article;
        personalArticlesPublished[msg.sender][personalArticleId] = _article;

        ///NFT minted
        _nft.safeMint(msg.sender, articleId, _nftURI);

        /// Increment
        totalArticles += 1;
        personalArticleId += 1;

        return articleId;
    }

    /// @dev Start the voting on the research called by the DAO contract
    function startVoting(uint256 _articleId) public onlyAutorised {
        require(_articleId < totalArticles, "Invalid article Id");
        Article storage _article = ArticlesPublished[_articleId];
        require(!_article.voting || !_article.verified, "Invalid Call");
        _article.voting = true;
    }

    /// @dev function verifyResearch
    function verifyResearch(uint256 _articleId)
        public
        onlyAuthorised
        returns (uint256 _verifiedArticleID)
    {
        require(_articleId < totalArticles, "Invalid article Id");
        Article storage _article = ArticlesPublished[_articleId];
        require(_article.voting || !_article.verified, "Invalid Call");
        _article.verified = true;
        _article.voting = false;

        uint32 verfiedArticleId = totalVerifiedArticles;

        verfiedArticlesPublished[verfiedArticleId] = _article;
        totalVerifiedArticles += 1;

        return totalVerifiedArticles;
    }

    /// @dev get functions for researches
    function getResearch(uint256 _articleId)
        public
        view
        returns (Article memory)
    {
        return ArticlesPublished[_articleId];
    }

    function getVerifiedResearch(uint256 _VerfiedArticleId)
        public
        view
        returns (Article memory)
    {
        return verfiedArticlesPublished[_VerfiedArticleId];
    }

    function getPersonalResearch(
        address userAddress,
        uint256 _personalArticleId
    ) public view returns (Article memory) {
        return personalArticlesPublished[userAddress][_personalArticleId];
    }
}
