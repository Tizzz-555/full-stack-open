import { useEffect, useState, SyntheticEvent } from "react";
import patientService from "../services/patients";
import {
	Patient,
	Diagnosis,
	EntryWithoutId,
	Entry,
	HealthCheckRating,
} from "../types";
import { useParams } from "react-router-dom";
import { Typography, Box, TextField, Button } from "@mui/material";
import { Alert } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import EntryDetails from "./EntryDetails";
import axios from "axios";
interface Props {
	diagnoses: Diagnosis[];
}

// interface HealthCheckRatingOption {
// 	value: HealthCheckRating;
// 	label: number;
// }

// const healthCheckRatingOptions: HealthCheckRatingOption[] = (
// 	Object.values(HealthCheckRating).filter(
// 		(v) => typeof v === "number"
// 	) as HealthCheckRating[]
// ).map((v) => ({
// 	value: v,
// 	label: Number(v),
// }));

const PatientDetailPage = ({ diagnoses }: Props) => {
	const [patient, setPatient] = useState<Patient>();
	const [entries, setEntries] = useState<Entry[]>([]);
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [specialist, setSpecialist] = useState("");
	const [diagnosisCodes, setDiagnosisCodes] = useState("");
	// const [type, setType] = useState<
	// 	"HealthCheck" | "Hospital" | "OccupationalHealthcare"
	// >("HealthCheck");
	const [healthCheckRating, setHealthCheckRating] = useState(
		HealthCheckRating.Healthy
	);
	const [error, setError] = useState<string>();
	const { id } = useParams<{ id: string }>();

	const submitNewEntry = async (values: EntryWithoutId) => {
		try {
			if (!id) return;
			const entry = await patientService.addEntry(id, values);
			setEntries(entries.concat(entry));
			// setModalOpen(false);
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

		const processedDiagnosisCodes = diagnosisCodes
			.split(",")
			.map((code) => code.trim())
			.filter((code) => code.length > 0);

		submitNewEntry({
			description,
			date,
			type: "HealthCheck",
			specialist,
			healthCheckRating,
			diagnosisCodes: processedDiagnosisCodes,
		});
	};

	useEffect(() => {
		if (!id) return;
		const fetchPatient = async () => {
			const patient = await patientService.getPatient(id);
			setPatient(patient);
		};
		void fetchPatient();
	}, [id]);

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
				<form onSubmit={handleSubmitEntry} style={{ marginTop: "1em" }}>
					<Box sx={{ border: "3px dotted black", padding: "1em" }}>
						<Typography sx={{ marginBottom: "1em" }} variant="h6">
							New HealthCheck entry
						</Typography>
						<TextField
							sx={{ marginBottom: "1em" }}
							fullWidth
							label="Description"
							onChange={({ target }) => setDescription(target.value)}
						/>
						<TextField
							sx={{ marginBottom: "1em" }}
							fullWidth
							label="Date"
							onChange={({ target }) => setDate(target.value)}
						/>
						<TextField
							sx={{ marginBottom: "1em" }}
							fullWidth
							label="Specialist"
							onChange={({ target }) => setSpecialist(target.value)}
						/>
						<TextField
							sx={{ marginBottom: "1em" }}
							fullWidth
							label="HealthCheckRating"
							onChange={({ target }) =>
								setHealthCheckRating(Number(target.value) as HealthCheckRating)
							}
						/>
						<TextField
							sx={{ marginBottom: "1em" }}
							fullWidth
							label="DiagnosisCodes"
							onChange={({ target }) => setDiagnosisCodes(target.value)}
						/>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								marginTop: "1em",
							}}
						>
							<Button color="secondary" variant="contained" type="button">
								Cancel
							</Button>
							<Button type="submit" variant="contained">
								Add
							</Button>
						</Box>
					</Box>
				</form>
				<Typography variant="h5">entries</Typography>
				{patient?.entries.map((entry) => (
					<EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
				))}
			</Box>
		</div>
	);
};

export default PatientDetailPage;
