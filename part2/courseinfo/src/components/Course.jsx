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
			{parts.map((part) => (
				<Part key={part.id} part={part} />
			))}
			<Total sum={total} />
		</>
	);
};

const Course = ({ course }) => {
	console.log(course);
	return (
		<>
			<Header course={course.name} />
			<Content parts={course.parts} />
		</>
	);
};

export default Course;
