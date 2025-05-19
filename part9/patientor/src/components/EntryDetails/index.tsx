import { Entry, Diagnosis } from "../../types";
import { Box, Typography } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HealthRatingBar from "../HealthRatingBar";

interface EntryDetailsProps {
	entry: Entry;
	diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const HospitalEntryDetails = ({
	entry,
	diagnoses,
}: {
	entry: Entry;
	diagnoses: Diagnosis[];
}) => {
	if (entry.type !== "Hospital") return null;
	return (
		<Box border={1} borderRadius={2} p={2} mb={2}>
			<Typography variant="subtitle1">
				{entry.date} <LocalHospitalIcon color="error" />
			</Typography>
			<Typography>{entry.description}</Typography>
			<Typography variant="body2">Specialist: {entry.specialist}</Typography>
			{entry.diagnosisCodes && (
				<ul>
					{entry.diagnosisCodes.map((code) => (
						<li key={code}>
							{code} - {diagnoses.find((d) => d.code === code)?.name}
						</li>
					))}
				</ul>
			)}
			<Typography variant="body2">
				<b>Discharge:</b> {entry.discharge.date} - {entry.discharge.criteria}
			</Typography>
		</Box>
	);
};

const OccupationalHealthcareEntryDetails = ({
	entry,
	diagnoses,
}: {
	entry: Entry;
	diagnoses: Diagnosis[];
}) => {
	if (entry.type !== "OccupationalHealthcare") return null;
	return (
		<Box border={1} borderRadius={2} p={2} mb={2}>
			<Typography variant="subtitle1">
				{entry.date} <WorkIcon color="primary" /> {entry.employerName}
			</Typography>
			<Typography>{entry.description}</Typography>
			<Typography variant="body2">Specialist: {entry.specialist}</Typography>
			{entry.diagnosisCodes && (
				<ul>
					{entry.diagnosisCodes.map((code) => (
						<li key={code}>
							{code} - {diagnoses.find((d) => d.code === code)?.name}
						</li>
					))}
				</ul>
			)}
			{entry.sickLeave && (
				<Typography variant="body2">
					<b>Sick leave:</b> {entry.sickLeave.startDate} -{" "}
					{entry.sickLeave.endDate}
				</Typography>
			)}
		</Box>
	);
};

const HealthCheckEntryDetails = ({
	entry,
	diagnoses,
}: {
	entry: Entry;
	diagnoses: Diagnosis[];
}) => {
	if (entry.type !== "HealthCheck") return null;
	return (
		<Box border={1} borderRadius={2} p={2} mb={2}>
			<Typography variant="subtitle1">
				{entry.date} <MedicalServicesIcon color="success" />
			</Typography>
			<Typography>{entry.description}</Typography>
			<Typography variant="body2">Specialist: {entry.specialist}</Typography>
			{entry.diagnosisCodes && (
				<ul>
					{entry.diagnosisCodes.map((code) => (
						<li key={code}>
							{code} - {diagnoses.find((d) => d.code === code)?.name}
						</li>
					))}
				</ul>
			)}
			<HealthRatingBar rating={entry.healthCheckRating} showText={false} />
		</Box>
	);
};

const EntryDetails = ({ entry, diagnoses }: EntryDetailsProps) => {
	switch (entry.type) {
		case "Hospital":
			return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />;
		case "OccupationalHealthcare":
			return (
				<OccupationalHealthcareEntryDetails
					entry={entry}
					diagnoses={diagnoses}
				/>
			);
		case "HealthCheck":
			return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />;
		default:
			return assertNever(entry);
	}
};

export default EntryDetails;
