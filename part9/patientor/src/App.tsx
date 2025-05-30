import { useState, useEffect } from "react";
// import axios from "axios";
import { Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

// import { apiBaseUrl } from "./constants";
import { Patient, Diagnosis } from "./types";

import patientService from "./services/patients";
import diagnoseService from "./services/diagnoses";
import PatientListPage from "./components/PatientListPage";
import PatientDetailPage from "./components/PatientDetailPage";

const App = () => {
	const [patients, setPatients] = useState<Patient[]>([]);
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

	useEffect(() => {
		patientService.getAll().then((patients) => setPatients(patients));
		diagnoseService.getDiagnoses().then((diagnoses) => setDiagnoses(diagnoses));
	}, []);

	return (
		<div className="App">
			<Container>
				<Typography variant="h3" style={{ marginBottom: "0.5em" }}>
					Patientor
				</Typography>
				<Button component={Link} to="/" variant="contained" color="primary">
					Home
				</Button>
				<Divider hidden />
				<Routes>
					<Route
						path="/"
						element={
							<PatientListPage patients={patients} setPatients={setPatients} />
						}
					/>
					<Route
						path="/patients/:id"
						element={<PatientDetailPage diagnoses={diagnoses} />}
					/>
				</Routes>
			</Container>
		</div>
	);
};

export default App;
