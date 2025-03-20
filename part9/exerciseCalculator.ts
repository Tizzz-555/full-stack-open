interface evaluationObj {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

const calculateExercises = (args: number[], target: number): evaluationObj => {
	// calculate average time of daily exercise hours
	const trainingDays = args.filter((d) => d > 0);
	const totalTime = trainingDays.reduce(
		(acc: number, curr: number) => acc + curr
	);
	const average = totalTime / args.length;
	let rating =
		average >= target ? 3 : average < target && average >= target - 0.5 ? 2 : 1;

	let ratingDescription =
		rating === 3
			? "Well done!"
			: rating === 2
			? "Not too bad but could be better"
			: "Read David Goggins and try again";

	if (average >= target) {
		rating = 3;
		ratingDescription = "Well done!";
	}
	return {
		periodLength: args.length,
		trainingDays: trainingDays.length,
		success: rating === 3,
		rating,
		ratingDescription,
		target,
		average,
	};
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
