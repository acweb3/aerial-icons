import * as S from "components/Copy/Copy.styled";
import React from "react";

export const Copy: React.FC = ({ children }) => {
	return (
		<S.Copy>
			<S.Content>
				<S.H1>Aerial Icons</S.H1>
				<S.P>
					Each Aerial Icon begins as a photograph taken from a
					helicopter. Over the last 7 years, I’ve flown countless
					helicopter flights over Los Angeles and other locations
					across the United States. Collecting images of iconic and
					graphic subjects from above.
				</S.P>
			</S.Content>
		</S.Copy>
	);
};
