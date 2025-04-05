import React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import NeuronNetwork from "./Neuron";

const BrainModel: React.FC = () => {
	const gltf = useGLTF("/big_brain.glb");
	const gltf2 = useGLTF("/inside_brain.glb");

	const rootNode = gltf.scene.children[0].children[0].children[0];
	const insideRoot = gltf2.scene.children[0].children[0].children[0].children[0];

	for (let i = 0; i < insideRoot.children.length; i++) {
		const leaf = insideRoot.children[i].children[0];
		let opacity = 0;
		if (i === 1 || i === 4) {
			opacity = 1;
		} else if (i === 5) {
			opacity = 1;
		}
		if (leaf instanceof THREE.Mesh) {
			leaf.material = new THREE.MeshPhysicalMaterial({
				color: new THREE.Color("white"),
				transparent: true,
				opacity: opacity,
				transmission: 1.0,
				metalness: 0.5,
				roughness: 0.05,
				ior: 1.5,
				thickness: 0.2,
				reflectivity: 1.0,
			});
		}
	}

	for (const node of rootNode.children) {
		const leaf = node.children[0]
		if (leaf instanceof THREE.Mesh) {
			const region = classifyRegion(node.name);
			let color = "" ;
			let opacity = 0.4
			if (region === "Unknown") {
				opacity = 0;
			}
			// if (region === "Frontal") {
			// 	color = "red";
			// }
			leaf.material = new THREE.MeshPhysicalMaterial({
				color: new THREE.Color("white"),
				transparent: true,
				opacity: opacity,
				clearcoat: 1,
				clearcoatRoughness: 0.1
			});
		}
	}

	return (
		<>
			<primitive object={insideRoot} scale={[3, 3, -3]} position={[0, -1.5, 0]} />;
			<primitive object={rootNode} scale={0.0003} position={[0, -1, 0]} />;
			<primitive object={rootNode.clone()} scale={[-0.0003, 0.0003, 0.0003]} position={[0, -1, 0]} />;
		</>
	)
};

const classifyRegion = (name: string): string => {
	if (/frontal/i.test(name)) return "Frontal";
	if (/pre_Central/i.test(name)) return "Frontal";
	if (/PreCentral/i.test(name)) return "Frontal";

	if (/parietal/i.test(name)) return "Parietal";
	if (/PostCentral/i.test(name)) return "Parietal";
	if (/Post_Central/i.test(name)) return "Parietal";
	if (/ParaCentral/i.test(name)) return "Parietal";
	if (/Supra_Marginal/i.test(name)) return "Parietal";
	if (/PreCuneus/i.test(name)) return "Parietal";

	if (/temporal/i.test(name)) return "Temporal";

	if (/occipital/i.test(name)) return "Occipital";
	if (/Cuneus/i.test(name)) return "Occipital";
	if (/lingual/i.test(name)) return "Occipital";

	return "Unknown";
};

export default BrainModel;