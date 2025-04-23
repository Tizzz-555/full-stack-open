interface TotalProps {
	exercises: number;
}

const Total = ({ exercises }: TotalProps) => (
	<p>Number of exercises {exercises}</p>
);

export default Total;
