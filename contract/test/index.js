const chai = require("chai");
const { solidity } = require("ethereum-waffle");

const { config } = require("../config");
const arguments = require("../arguments");
const [ipfsURL, , , flightPassIndexes] = arguments;

chai.use(solidity);
const { expect } = chai;

describe("AerialIcons", function () {
	let AerialIcons;
	let hardhatToken;
	let owner;
	let signers;

	beforeEach(async () => {
		AerialIcons = await ethers.getContractFactory("AerialIcons");
		[owner, ...signers] = await ethers.getSigners();

		hardhatToken = await AerialIcons.deploy(
			config.ipfsURL,
			signers.slice(0, 6).map((addr) => addr.address),
			signers.slice(6, 9).map((addr) => addr.address),
			flightPassIndexes
		);
	});

	describe("Deployment", async () => {
		it("should set the right owner", async () => {
			const ownerAddress = await hardhatToken.owner();
			expect(ownerAddress).to.equal(owner.address);
		});
		it("should assign the total supply of tokens to owner", async () => {
			const ownerBalance = await hardhatToken.balanceOf(owner.address);
			const totalSupply = await hardhatToken.totalSupply();
			expect(ownerBalance).to.deep.equal(totalSupply);
		});
		it("should not mint without a new drop", async () => {
			await expect(
				hardhatToken.mint(1, {
					value: ethers.utils.parseEther("0.01"),
				})
			).to.be.revertedWith("DROP_SUPPLY_REACHED");
		});
	});

	describe("Transactions", async () => {
		it("should drop", async () => {
			await hardhatToken.setSweetAndy(owner.address);
			await hardhatToken.handleNewDrop(
				10,
				signers.slice(0, 9).map((addr) => addr.address)
			);
		});

		it("should mint", async () => {
			await hardhatToken.handleNewDrop(
				10,
				signers.slice(0, 9).map((addr) => addr.address)
			);
			await hardhatToken.connect(signers[0]).mint(1, {
				value: ethers.utils.parseEther("0.01"),
			});
			const tokenURI = await hardhatToken.tokenURI(0);
			expect(tokenURI).to.be.equal(`${ipfsURL}boarding_pass`);
		});

		it("should mint 10", async () => {
			await hardhatToken.handleNewDrop(
				10,
				signers.slice(0, 9).map((addr) => addr.address)
			);

			await expect(
				hardhatToken.connect(signers[0]).mint(10, {
					value: ethers.utils.parseEther("0.10"),
				})
			).to.be.revertedWith("DROP_SUPPLY_REACHED");

			await expect(
				hardhatToken.connect(signers[0]).mint(3, {
					value: ethers.utils.parseEther("0.10"),
				})
			).to.be.revertedWith("DROP_SUPPLY_REACHED");

			await hardhatToken.connect(signers[0]).mint(2, {
				value: ethers.utils.parseEther("0.02"),
			});

			let tokenURI = await hardhatToken.tokenURI(0);
			expect(tokenURI).to.be.equal(`${ipfsURL}boarding_pass`);

			tokenURI = await hardhatToken.tokenURI(1);
			expect(tokenURI).to.be.equal(`${ipfsURL}boarding_pass`);

			await expect(
				hardhatToken.connect(signers[10]).mint(1, {
					value: ethers.utils.parseEther("0.03"),
				})
			).to.be.revertedWith("DROP_SUPPLY_REACHED");

			await Promise.all(
				signers.slice(1, 8).map(async (signer, i) => {
					await hardhatToken.connect(signer).mint(1, {
						value: ethers.utils.parseEther("0.01"),
					});
				})
			);

			await expect(
				hardhatToken.connect(signers[9]).mint(1, {
					value: ethers.utils.parseEther("0.01"),
				})
			).to.be.revertedWith("DROP_SUPPLY_REACHED");

			await hardhatToken.connect(signers[8]).mint(1, {
				value: ethers.utils.parseEther("0.01"),
			});

			await Promise.all(
				[...Array(10)].map(async (x, i) => {
					if (flightPassIndexes.includes(i)) {
						const tokenURI = await hardhatToken.tokenURI(99);
						expect(tokenURI).to.be.equal(`${ipfsURL}flight_pass`);
						isPastFlightPass = true;
					} else {
						const actualIndex = i + (i > 3 ? -1 : 0);
						const tokenURI = await hardhatToken.tokenURI(
							actualIndex
						);
						expect(tokenURI).to.be.equal(
							`${ipfsURL}${actualIndex}`
						);
					}
				})
			);

			await expect(
				hardhatToken.connect(signers[9]).mint(1, {
					value: ethers.utils.parseEther("0.01"),
				})
			).to.be.revertedWith("DROP_SUPPLY_REACHED");
		});

		it("should mint 100", async () => {
			for (let i = 0; i < 11; i++) {
				await hardhatToken.handleNewDrop(
					10,
					signers.slice(0, 9).map((addr) => addr.address)
				);

				await expect(
					hardhatToken.connect(signers[0]).mint(10, {
						value: ethers.utils.parseEther("0.10"),
					})
				).to.be.revertedWith("DROP_SUPPLY_REACHED");

				await expect(
					hardhatToken.connect(signers[0]).mint(3, {
						value: ethers.utils.parseEther("0.10"),
					})
				).to.be.revertedWith("DROP_SUPPLY_REACHED");

				await hardhatToken.connect(signers[0]).mint(2, {
					value: ethers.utils.parseEther("0.02"),
				});

				let tokenURI = await hardhatToken.tokenURI(i * 10 + 0);
				expect(tokenURI).to.be.equal(`${ipfsURL}boarding_pass`);

				tokenURI = await hardhatToken.tokenURI(i * 10 + 1);
				expect(tokenURI).to.be.equal(`${ipfsURL}boarding_pass`);

				await expect(
					hardhatToken.connect(signers[10]).mint(1, {
						value: ethers.utils.parseEther("0.03"),
					})
				).to.be.revertedWith("DROP_SUPPLY_REACHED");

				await Promise.all(
					signers.slice(1, 8).map(async (signer, i) => {
						await hardhatToken.connect(signer).mint(1, {
							value: ethers.utils.parseEther("0.01"),
						});
					})
				);

				await expect(
					hardhatToken.connect(signers[9]).mint(1, {
						value: ethers.utils.parseEther("0.01"),
					})
				).to.be.revertedWith("DROP_SUPPLY_REACHED");

				await hardhatToken.connect(signers[8]).mint(1, {
					value: ethers.utils.parseEther("0.01"),
				});

				// await Promise.all(
				// 	[...Array(10)].map(async (x, i) => {
				// 		try {
				// 			const tokenURI = await hardhatToken.tokenURI(i);

				// 			console.log(tokenURI);
				// 		} catch (e) {
				// 			console.log("lol");
				// 		}
				// 	})
				// );

				await expect(
					hardhatToken.connect(signers[9]).mint(1, {
						value: ethers.utils.parseEther("0.01"),
					})
				).to.be.revertedWith("DROP_SUPPLY_REACHED");
			}
		});
	});
});
