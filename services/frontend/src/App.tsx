import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import BrainModel from "./BrainModel";

// 함수형 컴포넌트라는 것을 타입스크립트에게 명시해줌
const App: React.FC = () => {
	return (
		// 조명 + 직접 만든 박스 + 마우스 컨트롤
		<Canvas style={{ height: "100vh", background: "#111" }}>
			<ambientLight intensity={0.5} />
			<pointLight position={[10, 10, 10]} />
			<Suspense fallback={null}>
				<BrainModel />
			</Suspense>
			<OrbitControls />
		</Canvas>
	)
};

export default App;