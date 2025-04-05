import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Test from "./Test";

// 리액트의 진입점 -> createRoot
const root = ReactDOM.createRoot(document.querySelector("#root")!);
root.render(
	<React.StrictMode>
		<Test />
	</React.StrictMode>
);

// strictMode는 개발 중에 코드 문제를 알려주는 개발 도우미