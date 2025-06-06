import { useEffect } from "react";
import patientService from "../services/patients";
import { Patient, Diagnosis } from "../types";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import EntryDetails from "./EntryDetails";

interface Props {
	diagnoses: Diagnosis[];
}

const PatientDetailPage = ({ diagnoses }: Props) => {
	const [patient, setPatient] = useState<Patient>();
	const { id } = useParams<{ id: string }>();

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
				<Typography variant="h5">entries</Typography>
				{patient?.entries.map((entry) => (
					<EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
				))}
			</Box>
		</div>
	);
};

export default PatientDetailPage;
