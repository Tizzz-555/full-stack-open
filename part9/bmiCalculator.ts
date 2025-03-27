// Write a function calculateBmi that calculates a BMI based on a given height (in centimeters) and weight (in kilograms) and then returns a message that suits the results.
import { parseBmiArgs } from "./utils";

export const calculateBmi = (h: number, w: number) => {
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

if (require.main === module) {
	try {
		const { height, weight } = parseBmiArgs(process.argv);
		console.log(calculateBmi(height, weight));
	} catch (error: unknown) {
		let errorMessage = "Something bad happened.";
		if (error instanceof Error) {
			errorMessage += " Error: " + error.message;
		}
		console.log(errorMessage);
	}
}
