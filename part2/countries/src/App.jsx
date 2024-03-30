import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const App = () => {
	const [left, setLeft] = useState(0);
	const [right, setRight] = useState(0);

	return (
		<div>
			{left}
			<button onClick={() => setLeft(left + 1)}>left</button>
			<button onClick={() => setRight(right + 1)}>right</button>
			{right}
		</div>
	);
};
export default App;
