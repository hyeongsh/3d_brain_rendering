import React, { useEffect, useRef } from "react";
import { Engine, EngineOptions, Scene, SceneOptions } from "@babylonjs/core";

type SceneComponentType = {
	antialias?: boolean;
	engineOptions?: EngineOptions;
	adaptToDeviceRatio?: boolean;
	sceneOptions?: SceneOptions;
	onRender: (scene: Scene, engine: Engine) => void;
	onSceneReady: (scene: Scene, engine: Engine) => void;
} & React.CanvasHTMLAttributes<HTMLCanvasElement>;
const SceneComponent: React.FC<SceneComponentType> = ({
	antialias,
	engineOptions,
	adaptToDeviceRatio,
	sceneOptions,
	onRender,
	onSceneReady,
	...rest
}) => { 
	const reactCanvas = useRef(null);

	// set up basic engine and scene
	useEffect(() => {
		const { current: canvas } = reactCanvas;
		if (!canvas) return;

		const engine = new Engine(
			canvas,
			antialias,
			engineOptions,
			adaptToDeviceRatio
		);
		const scene = new Scene(engine, sceneOptions);

		// scene이 준비되면
		if (scene.isReady()) {
			onSceneReady(scene, engine);
		} else {
			// onReadyObservable을 이용하여 scene을 관찰하고 있다가 준비되면 callback 실행
			scene.onReadyObservable.addOnce((scene: Scene) =>
				onSceneReady(scene, engine)
			);
		}

		engine.runRenderLoop(() => {
			if (typeof onRender === "function") onRender(scene, engine);
			scene.render();
		});

		// 반응형
		const resize = () => {
			scene.getEngine().resize();
		};

		if (window) {
			window.addEventListener("resize", resize);
		}

		return () => {
			scene.getEngine().dispose();

			if (window) {
				window.removeEventListener("resize", resize);
			}
		};
	}, [
		antialias,
		engineOptions,
		adaptToDeviceRatio,
		sceneOptions,
		onRender,
		onSceneReady
	]);

	return <canvas ref={reactCanvas} {...rest} />;
}

export default SceneComponent;