import { PartProps } from "../types";

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member:
		${JSON.stringify(value)}`
	);
};

const Part = ({ part }: PartProps) => {
	const sharedHeader = (
		<p>
			<strong>
				{part.name} {part.exerciseCount}
			</strong>
		</p>
	);

	const uniquePart = (() => {
		switch (part.kind) {
			case "basic":
				return <i>{part.description}</i>;
			case "group":
				return <p>Project exercises: {part.groupProjectCount}</p>;
			case "background":
				return (
					<div>
						<i>{part.description}</i>
						<a href={part.backgroundMaterial}>Background material</a>
					</div>
				);
			case "special":
				return (
					<div>
						<i>{part.description}</i>
						<p>
							required skills:{" "}
							{part.requirements.map((r, i) => (
								<span key={i}>
									{r}
									{i < part.requirements.length - 1 ? ", " : "."}
								</span>
							))}
						</p>
					</div>
				);

			default:
				// const _exhaustiveCheck: never = part;
				return assertNever(part);
		}
	})();

	return (
		<div>
			{sharedHeader}
			{uniquePart}
		</div>
	);
};
export default Part;
