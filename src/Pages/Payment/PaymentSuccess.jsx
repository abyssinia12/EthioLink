// pages/PaymentSuccess.js
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Verifying payment...");

  useEffect(() => {
    const tx_ref = searchParams.get("ref");
    if (!tx_ref) return setStatus("No reference found in URL");

    axios
      .post("http://localhost:5000/api/payment/verify", { tx_ref })
      .then((res) => setStatus(res.data.message || "Payment Verified"))
      .catch((err) =>
        setStatus(err.response?.data?.message || "Payment verification failed")
      );
  }, [searchParams]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>{status}</h2>
    </div>
  );
}
