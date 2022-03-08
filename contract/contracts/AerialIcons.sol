// SPDX-License-Identifier: SPDX-License
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract AerialIcons is ERC721, Ownable, Pausable {
	address public sweetCooper = 0x35FB16Db88Bd1A37EFe58E4A936456c15065f713; // a⚡️c gnosis safe
	address private sweetAndy = 0x21868fCb0D4b262F72e4587B891B4Cf081232726;

	string public baseURI;

	uint128 private dropCount = 10;
	uint128 private constant MAX_SUPPLY = 100; // Max supply
	uint256 public listPrice = 10000000000000000; // 0.01 eth test price
	
	address[] private premintAddresses;

	// Keep track of state
	using Counters for Counters.Counter;
	Counters.Counter private counter;

	/**
	 * A bit wacky, but artist addresses and tokenIds are parallel arrays that
	 * compose into matching key-value pairs within premints.
	 *
	 * @param _baseURI base uri for tokens
	 */
	constructor(
		string memory _baseURI
	) ERC721("AerialIcons", "AerialIcons") {
		baseURI = _baseURI;
	}

	// General contract state
	/*------------------------------------*/

	function resetDropCount(uint128 _dropCount) public onlyOwner {
		dropCount = _dropCount;
	}

	/**
	 * Escape hatch to update price.
	 */
	function setPrice(uint128 _listPrice) public onlyOwner {
		listPrice = _listPrice;
	}

	/**
	 * Escape hatch to update URI.
	 */
	function setBaseURI(string memory _baseURI) public onlyOwner {
		baseURI = _baseURI;
	}


	/**
	 * Update sweet baby cooper's address in the event of an emergency
	 */
	function setSweetCooper(address _sweetCooper) public {
		require(msg.sender == sweetAndy, "NOT_ANDY");
		sweetCooper = _sweetCooper;
	}

	/**
	 * Add a user's address to premint mapping for a specific token.
	 */
	function setPremintAddresses(address[] memory _premintAddresses) public onlyOwner {
		premintAddresses = _premintAddresses;
	}

	/*
	 * Withdraw, sends:
	 * 95% of all past sales to artist.
	 * 5% of all past sales to devs.
	 */
	function withdraw() public onlyOwner {
		// Pass collaborators their cut
		uint256 balance = address(this).balance;

		// Send devs 4.95%
		(bool success, ) = sweetCooper.call{ value: (balance * 5) / 100 }("");
		require(success, "FAILED_SEND_DEV");

		// Send owner remainder
		(success, ) = owner().call{ value: (balance * 95) / 100 }("");
		require(success, "FAILED_SEND_OWNER");
	}

	// Minting
	/*------------------------------------*/

	/**
	 * Mint, updating storage of sales.
	 */
	function handleSale() private {
		_safeMint(msg.sender, counter.current());
		counter.increment();
	}

	/**
	 * Mint
	 */
	function publicMint() public whenNotPaused payable {
		require(listPrice <= msg.value, "LOW_ETH");
		require(dropCount > 0, "DROP_COMPLETE");
		require(counter.current() < MAX_SUPPLY, "MAX_SUPPLY_REACHED");

		handleSale();
	}

	// ERC721 Things
	/*------------------------------------*/

	/**
	 * Get total token supply
	 */
	function totalSupply() public view returns (uint256) {
		return counter.current();
	}

	/**
	 * Get token URI
	 */
	function tokenURI(uint256 _tokenId)
		public
		view
		override
		returns (string memory)
	{
		require(_exists(_tokenId), "TOKEN_DNE");
		return string(abi.encodePacked(baseURI, Strings.toString(_tokenId)));
	}
}
