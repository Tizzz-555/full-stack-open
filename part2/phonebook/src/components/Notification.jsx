const Notification = ({ okMessage, errorMessage }) => {
	if (!okMessage && !errorMessage) {
		return null;
	}
	if (okMessage) {
		return <div className={"ok"}>{okMessage}</div>;
	} else if (errorMessage) {
		return <div style={"error"}>{errorMessage}</div>;
	}
};

export default Notification;
