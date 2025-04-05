import React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import NeuronNetwork from "./Neuron";

const BrainModel: React.FC = () => {
	const gltf2 = useGLTF("/inside_brain.glb");

	const insideRoot = gltf2.scene.children[0].children[0].children[0].children[0];

	for (let i = 0; i < insideRoot.children.length; i++) {
		const leaf = insideRoot.children[i].children[0];
		let opacity = 0;
		if (i === 1 || i === 4 || i === 5) {
			opacity = 0.2;
		}
		if (leaf instanceof THREE.Mesh) {
			leaf.material = new THREE.MeshPhysicalMaterial({
				color: new THREE.Color("white"),
				transparent: true,
				opacity: opacity,
				transmission: 1.0,
				metalness: 0.9,
				roughness: 0.35,
				ior: 1.5,
				thickness: 0.2,
			});
		}
	}

	return (
		<>
			<primitive object={insideRoot} scale={4} position={[0, -2, 0]} />;
			<NeuronNetwork />
		</>
	)
};

export default BrainModel;