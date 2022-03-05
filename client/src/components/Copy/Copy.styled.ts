import styled from "styled-components";

export const H1 = styled.h1`
	font-size: 60px;
	font-weight: 300;
    line-height: 1.3em;
    text-align: center;

	background: #000;

	z-index: 2;
`;

export const P = styled.p`
	text-align: center;

	font-size: 24px;
	font-weight: 300;

	margin-top: 12px;
	max-width: 500px;

	z-index: 2;
`;

export const Content = styled.div`
	flex: 1;

	display: flex;
	flex-direction: column;
	justify-content: end;
	align-items: center;
`;

export const Copy = styled.div`
	display: flex;
	margin-top: auto;
	height: calc(100% - 200px)
`;
