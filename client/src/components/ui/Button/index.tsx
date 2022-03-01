import * as S from "components/ui/Button/Button.styled";
import React from "react";

export const Button: React.FC<React.ComponentPropsWithoutRef<"button">> = ({
	children,
	...props
}) => {
	return <S.ButtonContainer {...props}>{children}</S.ButtonContainer>;
};
