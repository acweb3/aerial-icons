import * as S from "components/SiteWrapper/SiteWrapper.styled";
import React from "react";

export const SiteWrapper: React.FC = ({ children }) => {
	return (
		<>
			<S.GlobalStyle />
			<S.SiteWrapper>{children}</S.SiteWrapper>
		</>
	);
};
