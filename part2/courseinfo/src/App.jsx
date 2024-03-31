const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => (
	<p>
		<strong>Number of exercises {sum}</strong>
	</p>
);

const Part = ({ part }) => (
	<p>
		{part.name} {part.exercises}
	</p>
);

const Content = ({ parts }) => {
	const total = parts.reduce(
		(accumulator, currentValue) => accumulator + currentValue.exercises,
		0
	);

	return (
		<>
			{/* {console.log(parts)} */}
			{parts.map((part) => (
				<Part key={part.id} part={part} />
			))}
			<Total sum={total} />
		</>
	);
};

const Course = ({ course }) => {
	// console.log(course);
	return (
		<>
			<Header course={course.name} />
			<Content parts={course.parts} />
		</>
	);
};

const App = () => {
	const course = {
		id: 1,
		name: "Half Stack application development",
		parts: [
			{
				name: "Fundamentals of React",
				exercises: 10,
				id: 1,
			},
			{
				name: "Using props to pass data",
				exercises: 7,
				id: 2,
			},
			{
				name: "State of a component",
				exercises: 14,
				id: 3,
			},
		],
	};

	return <Course course={course} />;
};

export default App;
