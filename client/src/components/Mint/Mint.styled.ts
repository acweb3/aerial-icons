import styled from "styled-components";
import { ThreeDots } from "react-loading-icons";
import { breakpoints } from "common/styles/breakpoints";

export const Loader = styled(ThreeDots)`
	width: 38px;
	height: 14px;
`;

export const Error = styled.span`
	color: #f00;
	font-style: italic;

	margin-top: 8px;
`;

export const Mint = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	margin-top: 12px;

	& > a {
		margin-top: 16px;
		margin-bottom: 12px;
	}

	${breakpoints.medium`
		& > a {
			margin-top: 0;
			margin-left: 16px;
		}
	`}
`;
