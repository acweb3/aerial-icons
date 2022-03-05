import * as S from "components/ui/Button/Button.styled";
import React from "react";

export const Button: React.FC<React.ComponentPropsWithoutRef<"button">> = ({
	children,
	...props
}) => {
	return (
		<S.ButtonContainer tabIndex={0} {...props}>
			{children}
		</S.ButtonContainer>
	);
};
