import { BasicContainer } from "components/BasicContainer";
import { Mint } from "components/Mint";
import { SiteWrapper } from "components/SiteWrapper";

export const App = () => {
	return (
		<SiteWrapper>
			<BasicContainer>
				<Mint />
			</BasicContainer>
		</SiteWrapper>
	);
};
