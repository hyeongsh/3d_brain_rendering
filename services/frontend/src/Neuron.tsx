import React, { useRef, useState, useEffect } from "react";
import { NeuronData, ConnectionData } from "./Types";

// position이라는 prop -> 기본값은 position [0, 0, 0]의 리스트를 받겠다는 뜻
const NeuronSphere: React.FC<{ id: string; position?: [number, number, number] }> = ({ id, position = [0, 0, 0] }) => {
	// JSX 문법 : 왼쪽 position prop에 변수의 값을 전달한다.
	let emissiveColor = "black";
	if (/Frontal/i.test(id)) emissiveColor = "red";
	if (/Parietal/i.test(id)) emissiveColor = "green";
	return (
		<group position={position}>
			{/* Soma (세포체) */}
			<mesh>
				<sphereGeometry args={[0.01, 32, 32]} />
				<meshStandardMaterial
					color="white"
					emissive={emissiveColor}
					emissiveIntensity={15}
				/>
			</mesh>
		</group>
	);
};

const NeuronNetwork: React.FC = () => {
	const neuronsRef = useRef<NeuronData[]>([]);
	const connectionsRef = useRef<ConnectionData[]>([]);
	const [loaded, setLoaded] = useState(false);

	// useEffect(() => {
	// 	Promise.all([
	// 	  fetch("/neurons.json").then(res => res.json()),
	// 	  fetch("/connections.json").then(res => res.json())
	// 	]).then(([neuronsData, connectionsData]) => {
	// 	  neuronsRef.current = neuronsData;
	// 	  connectionsRef.current = connectionsData;
	// 	  setLoaded(true);
	// 	});
	// }, []);
	
	// useEffect(() => {
	// 	fetch("/neurons.json").then(res => res.json())
	// 	.then((neuronsData) => {
	// 	  neuronsRef.current = neuronsData;
	// 	  setLoaded(true);
	// 	});
	// }, []);

	neuronsRef.current = [
		{ "id": "Frontal01", "position": [-0.47, 0.13, 2.08] },
		{ "id": "Frontal02", "position": [-1.03, 0.07, 1.71] },
		{ "id": "Frontal11", "position": [-0.52, 0.53, 2.47] },
		{ "id": "Frontal12", "position": [-1.18, 0.47, 2.14] },
		{ "id": "Frontal13", "position": [-1.44, 0.54, 1.57] },
		{ "id": "Frontal14", "position": [-1.53, 0.49, 1.12] },
		{ "id": "Frontal1a", "position": [-0.49, 0.51, 1.73] },
		{ "id": "Frontal21", "position": [-0.53, 1.02, 2.53] },
		{ "id": "Frontal22", "position": [-1.01, 1.05, 2.08] },
		{ "id": "Frontal23", "position": [-1.28, 1.02, 1.74] },
		{ "id": "Frontal24", "position": [-1.48, 0.97, 1.29] },
		{ "id": "Frontal25", "position": [-1.64, 1.04, 0.94] },
		{ "id": "Frontal26", "position": [-1.71, 1.01, 0.52] },
		{ "id": "Frontal2a", "position": [-0.61, 1.03, 2.08] },
		{ "id": "Frontal31", "position": [-0.53, 1.54, 2.19] },
		{ "id": "Frontal32", "position": [-0.88, 1.48, 1.77] },
		{ "id": "Frontal33", "position": [-1.08, 1.53, 1.37] },
		{ "id": "Frontal34", "position": [-1.18, 1.52, 1.04] },
		{ "id": "Frontal3a", "position": [-0.41, 1.46, 1.9] },
		{ "id": "Frontal3b", "position": [-0.6, 1.49, 1.3] },
		{ "id": "Frontal3c", "position": [-0.8, 1.52, 0.8] },
		{ "id": "Frontal45", "position": [-1.31, 1.48, 0.63] },
		{ "id": "Frontal41", "position": [-0.52, 1.97, 1.63] },
		{ "id": "Frontal42", "position": [-0.81, 2.02, 1.20] },
		{ "id": "Frontal43", "position": [-0.92, 1.97, 0.76] },
		{ "id": "Frontal44", "position": [-1.03, 1.98, 0.44] },
		{ "id": "Frontal4c", "position": [-0.4, 1.82, 0.8] },
		{ "id": "Frontal51", "position": [-0.52, 2.21, 1.05] },
		{ "id": "Frontal52", "position": [-0.72, 2.18, 0.52] },
		{ "id": "Frontal61", "position": [-0.49, 2.33, 0.38] },

		{ "id": "Parietal01", "position": [-1.76, 0.83, 0.17] },
		{ "id": "Parietal02", "position": [-1.94, 0.88, -0.07] },
		{ "id": "Parietal03", "position": [-2.04, 0.77, -0.46] },
		{ "id": "Parietal04", "position": [-1.97, 0.82, -0.77] },
		{ "id": "Parietal11", "position": [-1.62, 1.27, 0.23] },
		{ "id": "Parietal12", "position": [-1.73, 1.28, -0.06] },
		{ "id": "Parietal13", "position": [-1.76, 1.34, -0.48] },
		{ "id": "Parietal14", "position": [-1.78, 1.31, -0.82] },
		{ "id": "Parietal1a", "position": [-1.3, 1.21, 0.22] },
		{ "id": "Parietal1b", "position": [-1.2, 1.33, -0.52] },
		{ "id": "Parietal21", "position": [-1.33, 1.83, 0.24] },
		{ "id": "Parietal22", "position": [-1.43, 1.76, -0.13] },
		{ "id": "Parietal23", "position": [-1.49, 1.82, -0.53] },
		{ "id": "Parietal24", "position": [-1.47, 1.76, -0.84] },
		{ "id": "Parietal2a", "position": [-1.0, 1.7, 0.15] },
		{ "id": "Parietal2b", "position": [-0.5, 1.77, 0] },
		{ "id": "Parietal2c", "position": [-0.83, 1.6, -0.4] },
		{ "id": "Parietal2d", "position": [-1.01, 1.8, -0.9] },
		{ "id": "Parietal31", "position": [-0.68, 2.24, 0.24] },
		{ "id": "Parietal32", "position": [-0.83, 2.17, -0.22] },
		{ "id": "Parietal33", "position": [-0.77, 2.18, -0.63] },
		{ "id": "Parietal3a", "position": [-0.68, 2.04, -0.54] },
		{ "id": "Parietal43", "position": [-0.54, 2.27, 0.03] },

		{ "id": "Midbrain1", "position": [-0.5, 1, 0.9] },
		{ "id": "Midbrain2", "position": [-0.5, 1, 0.5] },
		{ "id": "Midbrain3", "position": [-0.5, 1, 0.1] },
		{ "id": "Midbrain4", "position": [-0.5, 1, -0.3] },
		{ "id": "Midbrain5", "position": [-0.5, 1, -0.7] },


		{ "id": "nx", "position": [0, 0, 0] }
	];

	return (
		<>
			{neuronsRef.current.map(n => (
				<NeuronSphere key={n.id} id={n.id} position={n.position} />
			))}
		</>
	);
};

export default NeuronNetwork