import * as S from "components/BasicContainer/BasicContainer.styled";
import React from "react";

export const BasicContainer: React.FC = ({ children }) => {
	return <S.BasicContainer>{children}</S.BasicContainer>;
};
