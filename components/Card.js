/**
 * Card Component
 * Reusable card container
 */

export default function Card({ title, children, style }) {
  return (
    <div style={{
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      padding: "2rem",
      maxWidth: "500px",
      margin: "0 auto",
      ...style
    }}>
      {title && (
        <h2 style={{
          marginTop: 0,
          marginBottom: "1.5rem",
          color: "#6F4E37",
          textAlign: "center"
        }}>
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}

