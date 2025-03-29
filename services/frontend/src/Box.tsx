import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Box: React.FC = () => {
	const meshRef = useRef<THREE.Mesh>(null!);
	const materialRef = useRef<THREE.MeshStandardMaterial>(null!);

	useFrame(({ clock }) => {
		const t = clock.getElapsedTime();

		if (meshRef.current) {
			meshRef.current.rotation.x += 0.01;
			meshRef.current.rotation.y += 0.01;
		}

		if (materialRef.current) {
			const intensity = (Math.sin(t * 5) + 1) / 2;
			const baseColor = new THREE.Color("skyblue");
			const emissiveColor = baseColor.clone().multiplyScalar(intensity * 0.8);
			materialRef.current.emissive = emissiveColor;
		}
	});

	return (
		<mesh ref={meshRef}>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial ref={materialRef} color="skyblue" emissive={"black"} />
		</mesh>
	);
};

export default Box;