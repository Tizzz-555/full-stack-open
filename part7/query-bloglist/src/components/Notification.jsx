import { useNotificationValue } from "../NotificationContext";

const Notification = () => {
	const notificationValue = useNotificationValue();

	if (!notificationValue) return null;

	if (notificationValue.success) {
		return <div className="ok">{notificationValue.message}</div>;
	} else {
		return <div className="error">{notificationValue.message}</div>;
	}
};

export default Notification;
