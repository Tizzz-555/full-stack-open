// Write a function calculateBmi that calculates a BMI based on a given height (in centimeters) and weight (in kilograms) and then returns a message that suits the results.

const calculateBmi = (h: number, w: number) => {
	const meterH = h / 100;
	const bmiAlgo = w / Math.pow(meterH, 2);

	if (bmiAlgo < 18.5) {
		return "Under weight";
	} else if (bmiAlgo >= 18.5 && bmiAlgo <= 25) {
		return "Normal range";
	} else {
		return "Over weight";
	}
};

console.log(calculateBmi(180, 74));

// output (Normal range)
