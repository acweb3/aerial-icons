const requiredEnvVar = (name: string, envVar: string | undefined) => {
	if (!envVar) {
		throw new Error(`Environment variable ${name} missing`);
	}

	return envVar;
};

export const config = {
	flagshipURL: requiredEnvVar('flagshipURL', process.env.REACT_APP_FLAGSHIP_URL),
	contractId: requiredEnvVar('contractID', process.env.REACT_APP_CONTRACT_ID),
};
