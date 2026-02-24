import { useAuth } from "../context/AuthContext";

export default function ProfileSettings(){
  const {logout}=useAuth();

  return (
    <div className="profile-page">
      <h2>Account Settings</h2>

      <button className="logout-btn" onClick={logout}>
        Logout from all devices
      </button>
    </div>
  );
}
