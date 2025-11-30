/**
 * Input Component
 * Reusable form input with label and error display
 */

export default function Input({ label, error, ...props }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      {label && (
        <label style={{
          display: "block",
          marginBottom: "0.5rem",
          fontWeight: "500",
          color: "#333"
        }}>
          {label}
          {props.required && <span style={{ color: "red" }}> *</span>}
        </label>
      )}
      <input
        {...props}
        style={{
          width: "100%",
          padding: "0.75rem",
          border: error ? "2px solid #dc3545" : "1px solid #ddd",
          borderRadius: "4px",
          fontSize: "1rem",
          boxSizing: "border-box",
          ...props.style
        }}
      />
      {error && (
        <span style={{
          display: "block",
          marginTop: "0.25rem",
          color: "#dc3545",
          fontSize: "0.875rem"
        }}>
          {error}
        </span>
      )}
    </div>
  );
}

