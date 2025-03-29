import React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const BrainModel: React.FC = () => {
	const gltf = useGLTF("/big_brain.glb");
	// const gltf = useGLTF("/inside_brain.glb");
	
	const rootNode = gltf.scene.children[0].children[0].children[0];

	const regionColors: Record<string, string> = {
		Frontal: "#ff0000",
		Parietal: "#00ff00",
		Occipital: "#0000ff",
		Temporal: "#ffff00",
		Unknown: "#ffffff",
	}

	const regionIndices: Record<string, number[]> = {
		"Frontal": [3, 5, 11, 13, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26, 28, 29, 32, 33, 52, 53, 57, 73, 77],
		"Parietal": [0, 1, 4, 8, 10, 34, 36, 38, 42, 43, 44, 45, 48, 55, 56, 67, 68, 69, 70, 71, 72, 74, 75, 76],
		"Occipital": [2, 9, 12, 39, 40, 46, 54, 62, 63, 64],
		"Temporal": [6, 7, 16, 17, 27, 41, 49, 50, 58, 59, 60, 65, 66],
		"Unknown": [30, 31, 35, 37, 47, 51, 61],
	};

	for (const [region, indices] of Object.entries(regionIndices)) {
		const color = new THREE.Color(regionColors[region]);

		for (const index of indices) {
			const node = rootNode.children[index].children[0];
			if ((node as THREE.Mesh).material) {
				const mesh = node as THREE.Mesh;
				(mesh.material as THREE.MeshStandardMaterial).transparent = true;
				(mesh.material as THREE.MeshStandardMaterial).color = color;
				if (region === "Unknown") {
					(mesh.material as THREE.MeshStandardMaterial).opacity = 0;
					continue ;
				}
				(mesh.material as THREE.MeshStandardMaterial).opacity = 0.3;
			}
		}
	}

	return <primitive object={rootNode} scale={0.0003} position={[0, -2, 0]} />;
};

export default BrainModel;