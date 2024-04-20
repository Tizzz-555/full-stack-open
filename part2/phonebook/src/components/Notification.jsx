const Notification = ({ okMessage, errorMessage }) => {
	if (!okMessage && !errorMessage) {
		return null;
	}
	const okStyle = {
		color: "green",
		background: "lightgrey",
		fontSize: "20px",
		borderStyle: "solid",
		width: "25%",
		borderRadius: "5px",
		padding: "10px",
		marginBottom: "10px",
	};

	const errorStyle = {
		color: "red",
		background: "lightgrey",
		fontSize: "20px",
		borderStyle: "solid",
		width: "50%",
		borderRadius: "5px",
		padding: "10px",
		marginBottom: "10px",
	};

	if (okMessage) {
		return <div style={okStyle}>{okMessage}</div>;
	} else if (errorMessage) {
		return <div style={errorStyle}>{errorMessage}</div>;
	}
};

export default Notification;
