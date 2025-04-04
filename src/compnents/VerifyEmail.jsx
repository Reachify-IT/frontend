import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const token = searchParams.get("token");

    fetch(`${import.meta.env.VITE_BackendURL}/api/auth/verify-email?token=${token}`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Verification failed!"));
  }, [searchParams]);

  return <div>{message}</div>;
};

export default VerifyEmail;
