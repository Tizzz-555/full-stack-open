interface CoursePart {
	name: string;
	exerciseCount: number;
}

interface ContentProps {
	parts: CoursePart[];
}
const Content = ({ parts }: ContentProps) => (
	<div>
		{parts.map((part, i) => (
			<p key={i}>
				{part.name} {part.exerciseCount}
			</p>
		))}
	</div>
);
export default Content;
