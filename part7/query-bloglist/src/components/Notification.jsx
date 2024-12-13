import { useNotificationValue } from "../NotificationContext";

const Notification = () => {
	const notificationValue = useNotificationValue();

	if (!notificationValue.notification) return null;

	if (notificationValue.notification.success) {
		return <div className="ok">{notificationValue.notification.message}</div>;
	} else {
		return (
			<div className="error">{notificationValue.notification.message}</div>
		);
	}
};

export default Notification;
