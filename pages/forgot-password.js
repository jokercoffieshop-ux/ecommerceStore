/**
 * Forgot Password Page
 * Request password reset OTP
 */

import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import Link from "next/link";

export default function ForgotPassword() {
  const router = useRouter();
  const { sendOtp } = useAuth();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const result = await sendOtp(email, "password-reset");

    if (result.success) {
      setMessage(result.message);
      // Note: In a real app, you'd redirect to a reset password page with OTP verification
      setTimeout(() => {
        setMessage("Password reset functionality coming soon!");
      }, 2000);
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem 0" }}>
      <Card title="Forgot Password">
        <p style={{ textAlign: "center", color: "#666", marginBottom: "1.5rem" }}>
          Enter your email address and we'll send you a code to reset your password.
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
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="john@example.com"
          />

          <Button type="submit" loading={loading} style={{ width: "100%" }}>
            Send Reset Code
          </Button>
        </form>

        <p style={{ marginTop: "1.5rem", textAlign: "center", color: "#666" }}>
          Remember your password?{" "}
          <Link href="/login" style={{ color: "#6F4E37", fontWeight: "500" }}>
            Login here
          </Link>
        </p>
      </Card>
    </div>
  );
}

