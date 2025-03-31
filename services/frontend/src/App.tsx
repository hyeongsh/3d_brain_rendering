import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import BrainModel from "./BrainModel";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// 함수형 컴포넌트라는 것을 타입스크립트에게 명시해줌
const App: React.FC = () => {
	return (
		// 조명 + 직접 만든 박스 + 마우스 컨트롤
		<Canvas camera={{ position: [-5, 0, 0] }}style={{ height: "100vh", background: "#111" }}>
			<ambientLight intensity={0.6} />
  			<pointLight position={[5, 10, 10]} intensity={100} />
			<pointLight position={[2, 2, -10]} intensity={100} />
			<Suspense fallback={null}>
				<BrainModel />
			</Suspense>
			<EffectComposer>
    		<Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={0.6} />
  			</EffectComposer>
			<OrbitControls />
		</Canvas>
	)
};

export default App;