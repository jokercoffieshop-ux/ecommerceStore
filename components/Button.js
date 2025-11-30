/**
 * Button Component
 * Reusable button with loading state
 */

export default function Button({ children, loading, variant = "primary", ...props }) {
  const variants = {
    primary: {
      backgroundColor: "#6F4E37",
      color: "white",
      border: "none",
    },
    secondary: {
      backgroundColor: "#8B4513",
      color: "white",
      border: "none",
    },
    outline: {
      backgroundColor: "transparent",
      color: "#6F4E37",
      border: "2px solid #6F4E37",
    },
  };

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      style={{
        ...variants[variant],
        padding: "0.75rem 1.5rem",
        borderRadius: "4px",
        fontSize: "1rem",
        fontWeight: "500",
        cursor: loading || props.disabled ? "not-allowed" : "pointer",
        opacity: loading || props.disabled ? 0.6 : 1,
        transition: "all 0.2s",
        ...props.style
      }}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

