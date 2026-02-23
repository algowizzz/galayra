import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const { googleLogin } = useAuth();

  useEffect(() => {
    const run = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) return navigate("/login");

      await googleLogin(token);
      navigate("/");
    };

    run();
  }, []);

  return <div style={{ padding: 40 }}>Signing you in...</div>;
}
