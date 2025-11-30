/**
 * OTP Verification Page
 * Verify email with OTP code sent to user's email
 */

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

export default function VerifyOtp() {
  const router = useRouter();
  const { verifyOtp, sendOtp } = useAuth();
  const { email } = router.query;

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!email) {
      router.push("/register");
    }
  }, [email, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const result = await verifyOtp(email, code);

    if (result.success) {
      setMessage(result.message);
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  const handleResend = async () => {
    setResending(true);
    setError("");
    setMessage("");

    const result = await sendOtp(email, "registration");

    if (result.success) {
      setMessage("New OTP sent to your email!");
    } else {
      setError(result.message);
    }

    setResending(false);
  };

  if (!email) {
    return null;
  }

  return (
    <div style={{ padding: "2rem 0" }}>
      <Card title="Verify Your Email">
        <p style={{ textAlign: "center", color: "#666", marginBottom: "1.5rem" }}>
          We've sent a 6-digit code to <strong>{email}</strong>
        </p>

        {message && (
          <div className="alert alert-success">
            {message}
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Verification Code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            placeholder="Enter 6-digit code"
            maxLength={6}
            style={{ textAlign: "center", fontSize: "1.5rem", letterSpacing: "0.5rem" }}
          />

          <Button type="submit" loading={loading} style={{ width: "100%" }}>
            Verify Email
          </Button>
        </form>

        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <p style={{ color: "#666", marginBottom: "0.5rem" }}>
            Didn't receive the code?
          </p>
          <Button
            variant="outline"
            onClick={handleResend}
            loading={resending}
            type="button"
          >
            Resend Code
          </Button>
        </div>
      </Card>
    </div>
  );
}

