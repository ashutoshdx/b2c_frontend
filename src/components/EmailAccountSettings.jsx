import { useParams } from "react-router-dom";

const EmailAccountSettings = () => {
  const { senderId } = useParams();
  return (
    <div className="email-account-setting">
      <h1>Email Account Settings</h1>
    </div>
  );
};

export default EmailAccountSettings;
