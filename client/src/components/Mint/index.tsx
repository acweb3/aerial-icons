import detectEthereumProvider from "@metamask/detect-provider";
import * as S from "components/Mint/Mint.styled";
import { Button } from "components/ui/Button";
import { config } from "config";
import { useState } from "react";
import Web3 from "web3";
import { AbiItem } from "web3-utils";

const errorMap: Record<string, string> = {
	MAX_LIMIT_PER_BUYER: "Max limit per address reached",
	LOW_ETH: "Low balance",
	MAX_REACHED: "80/80 pieces have now been minted",
};

const connect = async () => {
	if (window.ethereum) {
		await (window.ethereum as unknown as any).request({
			method: "eth_requestAccounts",
		});
		return new Web3(window.ethereum as unknown as any);
	}
};

const isErrorMessage = (e: any): e is { message: string } => {
	return e.message && typeof e.message === "string";
};

export const Mint: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [tokenId, setTokenId] = useState(undefined);
	const [error, setError] = useState<string | undefined>(undefined);

	const connectToWallet = async () => {
		try {
			// Reset error state
			setError(undefined);

			const provider = await detectEthereumProvider();

			if (provider === null) {
				setError("No web3 wallet provider detected");
				return;
			}

			await (provider as unknown as any).request({
				method: "eth_requestAccounts",
			});

			const abi = (await import("./abi.json")).default;
			const web3 = await connect();

			if (web3) {
				const contract = new web3.eth.Contract(
					abi as AbiItem[],
					config.contractId
				);

				const encodedData = contract.methods.publicMint().encodeABI();

				const value = web3.utils.toHex((1e16).toString());
				const transactionParameters = {
					to: config.contractId,
					from: (window.ethereum as any).selectedAddress,
					value: value,
					data: encodedData,
				};

				const gasEstimate: number = await (
					window.ethereum as unknown as any
				)?.request({
					method: "eth_estimateGas",
					params: [transactionParameters],
				});
				setIsLoading(true);

				const tx = await contract.methods.publicMint().send({
					...transactionParameters,
					gas: gasEstimate,
				});

				setIsLoading(false);

				if (tx?.events?.Transfer?.returnValues?.tokenId) {
					setTokenId(tx.events.Transfer.returnValues.tokenId);
				}
			}
		} catch (e) {
			console.error(e);
			console.log(e);

			if (isErrorMessage(e) && e.message) {
				const [, errorMessage] = e.message.split(
					"execution reverted: "
				);
				if (errorMap[errorMessage]) {
					setError(errorMap[errorMessage]);
				} else if (e.message.includes("insufficient funds")) {
					setError("Insufficient funds");
				} else {
					setError("Something went wrong.");
				}
			}
		} finally {
			setIsLoading(false);
		}
	};

	const mintNFT = async () => {
		await connectToWallet();
	};

	return (
		<S.Mint>
			<Button
				onClick={() => {
					if (!isLoading) {
						mintNFT();
					}
				}}
			>
				{isLoading ? <S.Loader /> : <>Mint</>}
			</Button>

			{error && <S.Error>{error}</S.Error>}

			{tokenId && <>{tokenId}</>}
		</S.Mint>
	);
};
