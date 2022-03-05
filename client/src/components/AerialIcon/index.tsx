import aerialIconSrc from "assets/images/aerial-icons/hollywood.webp";
import * as S from "components/AerialIcon/AerialIcon.styled";
import React from "react";

export const AerialIcon: React.FC = () => {
	return (
		<S.AerialIcon>
			<S.AerialIconContent>
				<S.AerialIconImage src={aerialIconSrc} />
			</S.AerialIconContent>
		</S.AerialIcon>
	);
};
