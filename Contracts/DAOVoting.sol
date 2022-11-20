// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/access/Ownable.sol";

interface DAONFT {
    function balanceOf(address user) external returns (uint256);
}

// interface ArticleManager {
//     function startVoting(uint256 _articleId) external;

//     function verifyResearch(uint256 _articleId)
//         external
//         returns (uint256 _verifiedArticleID);

//     function getResearch(uint256 _articleId)
//         external
//         view
//         returns (Article memory);
// }

import "./ArticleManager.sol";

contract DAOVoting is Ownable {
    DAONFT _nft;
    ArticleManager _manager;

    uint256 public votingCost = 0.5 ether;
    uint256 public votingPeriod = 2 days;

    enum Vote {
        Yes, // Yes = 0
        No // No = 1
    }

    struct Proposal {
        uint32 articleId;
        address publisher;
        uint256 timestamp;
        uint256 yayVotes;
        uint256 nayVotes;
        uint256 deadline;
        bool verified;
    }

    mapping(address => mapping(uint256 => bool)) hasVoted;
    mapping(uint256 => Proposal) public proposals;

    uint256 public totalProposals;

    constructor(address _nftAddress, address _managerAddress) public {
        _nft = DAONFT(_nftAddress);
        _manager = ArticleManager(_managerAddress);
    }

    modifier onlyDAOMember() {
        require(_nft.balanceOf(msg.sender) > 0, "You are not a DAO Member");
    }

    modifier onlyArticleOwner(uint32 articleId) {
        require(
            msg.sender == _manager.getResearch(articleId).publisher,
            "You are not the article Publisher"
        );
    }

    modifier isProposalActive() {
        require(proposals[proposalsIndex].deadline >= block.timestamp);
        _;
    }

    modifier isProposalEnded() {
        require(proposals[proposalsIndex].deadline <= block.timestamp);
        _;
    }

    function addProposal(uint32 _articleId)
        public
        payable
        onlyArticleOwner(_articleId)
        returns (uint32 _proposalId)
    {
        require(msg.value >= votingCost, "Required cost not sent ");
        _manager.startVoting(_articleId);

        uint32 proposalId = totalProposals;
        proposals[proposalId] = Proposal(
            _articleId,
            msg.sender,
            block.timestamp,
            0,
            0,
            block.timestamp + votingPeriod,
            false
        );
    }

    function vote(uint256 proposalId, Vote vote)
        public
        onlyDAOMember
        isProposalActive
    {
        Proposal storage proposal = proposals[proposalId];
        if (vote == Vote.Yes) {
            proposal.yayVotes += 1;
        } else proposal.nayVotes += 1;
    }

    function executeProposal(uint256 proposalId)
        public
        isProposalEnded
        onlyOwner
    {
        Proposal storage proposal = proposals[proposalId];
        if (proposal.yayVotes > proposal.nayVotes) {
            proposal.verified = true;
            uint32 _articleId = proposal.articleId;
            _manager.verifyResearch(_articleId);
            address publisher = proposal.publisher;

            /// send some rewards
            (bool sent, ) = publisher.call{value: rewardAmount}("");
        }
    }
}
