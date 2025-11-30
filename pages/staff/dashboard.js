/**
 * Staff Dashboard
 * Dashboard for users with STAFF role
 */

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";
import Card from "../../components/Card";

export default function StaffDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
    if (user && user.role !== "STAFF") {
      router.push(`/${user.role.toLowerCase()}/dashboard`);
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem 0" }}>
      <h1 style={{ color: "#6F4E37", marginBottom: "2rem" }}>Staff Dashboard</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
        <Card title="Welcome Staff!">
          <p>Hello, <strong>{user.name}</strong>!</p>
          <p style={{ marginTop: "1rem", color: "#666" }}>
            Welcome to your staff dashboard. Here you can manage orders, update inventory, and assist customers.
          </p>
        </Card>

        <Card title="Today's Stats">
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <p style={{ margin: 0, color: "#666" }}>Pending Orders</p>
              <h2 style={{ margin: "0.25rem 0 0 0", color: "#6F4E37" }}>0</h2>
            </div>
            <div>
              <p style={{ margin: 0, color: "#666" }}>Completed Today</p>
              <h2 style={{ margin: "0.25rem 0 0 0", color: "#6F4E37" }}>0</h2>
            </div>
          </div>
        </Card>

        <Card title="Active Orders">
          <p style={{ color: "#666", textAlign: "center" }}>No active orders</p>
          <p style={{ color: "#999", fontSize: "0.875rem", textAlign: "center", marginTop: "0.5rem" }}>
            All caught up! 🎉
          </p>
        </Card>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <Card title="Staff Actions">
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <button style={{
              padding: "0.75rem",
              backgroundColor: "#6F4E37",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}>
              View All Orders
            </button>
            <button style={{
              padding: "0.75rem",
              backgroundColor: "#8B4513",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}>
              Manage Inventory
            </button>
            <button style={{
              padding: "0.75rem",
              backgroundColor: "transparent",
              color: "#6F4E37",
              border: "2px solid #6F4E37",
              borderRadius: "4px",
              cursor: "pointer"
            }}>
              Update Menu Items
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

