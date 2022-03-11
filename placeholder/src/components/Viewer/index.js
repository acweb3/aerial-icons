import { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";

export const Viewer = ({ children }) => {
	return (
		<Canvas
			style={{
				width: "100vw",
				height: "100vh",
			}}
			pixelRatio={[1, 1]}
			camera={{ position: [10, 0, 10], fov: 10 }}
		>
			<color attach="background" args={["red"]} />
			{/* <ambientLight intensity={1} /> */}
			<Suspense fallback={null}>{children}</Suspense>
			<OrbitControls />
		</Canvas>
	);
};
