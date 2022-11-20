// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

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
    uint256 public rewardAmount = 1 ether;

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

    uint32 public totalProposals;

    constructor(address _nftAddress, address _managerAddress) {
        _nft = DAONFT(_nftAddress);
        _manager = ArticleManager(_managerAddress);
    }

    modifier onlyDAOMember() {
        require(_nft.balanceOf(msg.sender) > 0, "You are not a DAO Member");
        _;
    }

    modifier onlyArticleOwner(uint32 articleId) {
        require(
            msg.sender == _manager.getResearch(articleId).publisher,
            "You are not the article Publisher"
        );
        _;
    }

    modifier isProposalActive(uint32 proposalsIndex) {
        require(proposals[proposalsIndex].deadline >= block.timestamp);
        _;
    }

    modifier isProposalEnded(uint32 proposalsIndex) {
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

        totalProposals += 1;
        return proposalId;
    }

    function vote(uint32 proposalId, Vote _vote)
        public
        onlyDAOMember
        isProposalActive(proposalId)
    {
        Proposal storage proposal = proposals[proposalId];
        if (_vote == Vote.Yes) {
            proposal.yayVotes += 1;
        } else proposal.nayVotes += 1;
    }

    function executeProposal(uint32 proposalId)
        public
        isProposalEnded(proposalId)
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
            require(sent, "Not sent");
        }
    }
}
