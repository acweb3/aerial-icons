import styled from "styled-components";
import { breakpoints } from "common/styles/breakpoints";

export const ButtonContainer = styled.button`
	font-size: 10px;
    font-family: Arial,Helvetica,sans-serif;

	color: #FFFFFF;
    font-weight: normal;
    font-style: normal;
    letter-spacing: 0.05em;
    font-family: worksans-extralight,"work sans",sans-serif;
    font-size: 10px;
	color: #fff;
	background-color: #333333;
	border-color: #333333;

	display: inline-block;
	width: 100%;
	height: auto;
	border: 1px solid #333333;
	text-align: center;
	cursor: pointer;

	outline: none;

	transition: all 0.2s ease, visibility 0s;

	&:disabled,
	&:active,
	&:focus,
	&:hover {
		border: 1px solid #333333;
    	background: rgba(232, 230, 230, 0.63);
	}

	${breakpoints.small`
		width: auto;
	`}
`;
