import { useEffect, useState, SyntheticEvent } from "react";
import patientService from "../../services/patients";
import {
	Patient,
	Diagnosis,
	EntryWithoutId,
	Entry,
	HealthCheckRating,
} from "../../types";
import { useParams } from "react-router-dom";
import {
	Typography,
	Box,
	TextField,
	Button,
	Input,
	InputLabel,
	MenuItem,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Alert } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import EntryDetails from "../EntryDetails";
import axios from "axios";

interface Props {
	diagnoses: Diagnosis[];
}

interface HealthCheckRatingOption {
	value: HealthCheckRating;
	label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.values(
	HealthCheckRating
)
	.filter((v) => typeof v === "number")
	.map((v) => {
		return {
			value: v,
			label: HealthCheckRating[v],
		};
	});

const PatientDetailPage = ({ diagnoses }: Props) => {
	const [patient, setPatient] = useState<Patient>();
	const [entries, setEntries] = useState<Entry[]>([]);
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [specialist, setSpecialist] = useState("");
	const [diagnosisCodes, setDiagnosisCodes] = useState<
		Array<Diagnosis["code"]>
	>([]);
	const [discharge, setDischarge] = useState({ date: "", criteria: "" });
	const [type, setType] = useState<
		"HealthCheck" | "Hospital" | "OccupationalHealthcare" | undefined
	>(undefined);
	const [healthCheckRating, setHealthCheckRating] = useState(
		HealthCheckRating.Healthy
	);
	const [employerName, setEmployerName] = useState("");
	const [sickLeave, setSickLeave] = useState({
		startDate: "",
		endDate: "",
	});
	const [error, setError] = useState<string>();
	const { id } = useParams<{ id: string }>();

	const codes = [
		"M24.2",
		"M51.2",
		"S03.5",
		"J10.1",
		"J06.9",
		"Z57.1",
		"N30.0",
		"H54.7",
		"J03.0",
		"L60.1",
		"Z74.3",
		"F43.2",
		"S62.5",
		"H35.29",
	];

	const entryTypeLabels = {
		HealthCheck: "HealthCheck entry",
		Hospital: "Hospital entry",
		OccupationalHealthcare: "Occupational H.C. entry",
	} as const;

	useEffect(() => {
		console.log(diagnosisCodes);
	}, [diagnosisCodes]);

	const submitNewEntry = async (values: EntryWithoutId) => {
		try {
			if (!id) return;
			const entry = await patientService.addEntry(id, values);
			setEntries(entries.concat(entry));
		} catch (e: unknown) {
			if (axios.isAxiosError(e)) {
				if (
					e.response?.data.error[0].message &&
					typeof e.response?.data.error[0].message === "string"
				) {
					setError(e.response.data.error[0].message);
				} else {
					setError("Unrecognized axios error");
				}
			} else {
				console.error("Unknown error", e);
				setError("Unknown error");
			}
		}
	};

	const handleSubmitEntry = (event: SyntheticEvent) => {
		event.preventDefault();

		const baseEntry = {
			description,
			date,
			specialist,
			diagnosisCodes,
		};

		switch (type) {
			case "HealthCheck":
				submitNewEntry({
					...baseEntry,
					type,
					healthCheckRating,
				});
				break;
			case "Hospital":
				submitNewEntry({
					...baseEntry,
					type,
					discharge,
				});
				break;
			case "OccupationalHealthcare":
				submitNewEntry({
					...baseEntry,
					type,
					employerName,
					sickLeave,
				});
		}
	};

	useEffect(() => {
		if (!id) return;
		const fetchPatient = async () => {
			const patient = await patientService.getPatient(id);
			setPatient(patient);
		};
		void fetchPatient();
	}, [id, entries]);

	const renderTypeSpecificField = () => {
		const handleChange = (event: SelectChangeEvent) => {
			const numericValue = Number(event.target.value);
			if (Object.values(HealthCheckRating).includes(numericValue)) {
				setHealthCheckRating(numericValue);
			} else {
				console.error("Invalid health check rating:", numericValue);
			}
		};

		switch (type) {
			case "HealthCheck":
				return (
					<>
						<InputLabel style={{ marginTop: 0 }}>
							Health check rating
						</InputLabel>
						<Select
							sx={{ marginBottom: "1em" }}
							fullWidth
							label="HealthCheck Rating"
							value={healthCheckRating.toString()}
							onChange={handleChange}
						>
							{healthCheckRatingOptions.map((rating) => {
								return (
									<MenuItem key={rating.value} value={rating.value.toString()}>
										{rating.label}
									</MenuItem>
								);
							})}
						</Select>
					</>
				);
			case "Hospital":
				return (
					<>
						<Typography>Discharge</Typography>
						<Box sx={{ padding: "1em" }}>
							<InputLabel>Date</InputLabel>
							<Input
								fullWidth
								type="date"
								sx={{ marginBottom: "1em" }}
								onChange={({ target }) => {
									setDischarge((prev) => ({ ...prev, date: target.value }));
								}}
							/>
							<TextField
								fullWidth
								label="Criteria"
								onChange={({ target }) =>
									setDischarge((prev) => ({ ...prev, criteria: target.value }))
								}
							/>
						</Box>
					</>
				);
			case "OccupationalHealthcare":
				return (
					<>
						<TextField
							onChange={({ target }) => setEmployerName(target.value)}
							fullWidth
							label="Employer Name"
						/>
						<Typography>Sick Leave</Typography>
						<Box sx={{ padding: "1em" }}>
							<InputLabel>Start date</InputLabel>
							<Input
								fullWidth
								type="date"
								onChange={({ target }) =>
									setSickLeave((prev) => ({ ...prev, startDate: target.value }))
								}
							/>
							<InputLabel>End date</InputLabel>
							<Input
								fullWidth
								type="date"
								onChange={({ target }) =>
									setSickLeave((prev) => ({ ...prev, endDate: target.value }))
								}
							/>
						</Box>
					</>
				);
			default:
				return null;
		}
	};

	const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
		const {
			target: { value },
		} = event;
		setDiagnosisCodes(
			// On autofill we get a stringified value.
			typeof value === "string" ? value.split(",") : value
		);
	};

	return (
		<div>
			<Box sx={{ margin: "1em 0" }}>
				<Typography variant="h4" display="inline" sx={{ marginRight: "0.5em" }}>
					{patient?.name}
					{patient?.gender === "male" ? (
						<MaleIcon fontSize="large" />
					) : (
						<FemaleIcon fontSize="large" />
					)}
				</Typography>
				<Typography sx={{ marginTop: "1em" }}>ssn: {patient?.ssn}</Typography>
				<Typography>occupation: {patient?.occupation}</Typography>
				{error && (
					<Alert severity="error" onClose={() => setError(undefined)}>
						{error}
					</Alert>
				)}
				<Box sx={{ display: "flex", gap: "1em" }}>
					<Button
						onClick={() => setType("HealthCheck")}
						variant="contained"
						color="secondary"
						sx={{ marginTop: "1em" }}
					>
						New HealthCheck Entry
					</Button>
					<Button
						onClick={() => setType("Hospital")}
						variant="contained"
						color="secondary"
						sx={{ marginTop: "1em" }}
					>
						New Hospital Entry
					</Button>
					<Button
						onClick={() => setType("OccupationalHealthcare")}
						variant="contained"
						color="secondary"
						sx={{ marginTop: "1em" }}
					>
						New Occupational H.C. Entry
					</Button>
				</Box>
				{type && (
					<form onSubmit={handleSubmitEntry} style={{ marginTop: "1em" }}>
						<Box
							sx={{
								border: "3px dotted black",
								padding: "1em",
								display: "flex",
								flexDirection: "column",
								gap: "1em",
							}}
						>
							<Typography sx={{ marginBottom: "1em" }} variant="h6">
								{entryTypeLabels[type]}
							</Typography>
							<TextField
								fullWidth
								label="Description"
								onChange={({ target }) => setDescription(target.value)}
							/>
							<InputLabel>Date</InputLabel>
							<Input
								type="date"
								fullWidth
								onChange={({ target }) => setDate(target.value)}
							/>
							<TextField
								fullWidth
								label="Specialist"
								onChange={({ target }) => setSpecialist(target.value)}
							/>
							<InputLabel>Diagnosis codes</InputLabel>
							<Select
								fullWidth
								multiple
								value={diagnosisCodes}
								label="Diagnosis Codes"
								onChange={handleChange}
							>
								{codes.map((code) => (
									<MenuItem
										key={code}
										value={code}
										// style={getStyles(name, personName, theme)}
									>
										{code}
									</MenuItem>
								))}
							</Select>
							{renderTypeSpecificField()}
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									marginTop: "1em",
								}}
							>
								<Button
									onClick={() => setType(undefined)}
									color="error"
									variant="contained"
									type="button"
								>
									Cancel
								</Button>
								<Button type="submit" variant="contained">
									Add
								</Button>
							</Box>
						</Box>
					</form>
				)}
				<Typography variant="h5">entries</Typography>
				{patient?.entries.map((entry) => (
					<EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
				))}
			</Box>
		</div>
	);
};

export default PatientDetailPage;
