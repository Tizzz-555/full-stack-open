import Part from "./Part";
import { ContentProps } from "../types";

const Content = ({ parts }: ContentProps) => (
	<div>
		{parts.map((part, i) => (
			<Part key={i} part={part} />
		))}
	</div>
);
export default Content;
