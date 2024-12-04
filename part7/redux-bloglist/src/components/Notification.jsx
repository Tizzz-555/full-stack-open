import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification) {
    return null;
  }

  return (
    <div className={notification.success ? "ok" : "error"}>
      {notification.message}
    </div>
  );
};

export default Notification;
