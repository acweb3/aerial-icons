import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "react-three-fiber";

export const Model = (props) => {
	const { scene } = useGLTF("/boardingPass.glb");
	const modelRef = useRef();

	useFrame(({ clock }) => {
		modelRef.current.rotation.y = clock.getElapsedTime() / 10;
	});

	return <primitive ref={modelRef} object={scene} />;
};
