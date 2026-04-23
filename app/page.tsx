export default function Page() {
  const topics = [
    "Materials & Properties",
    "Manufacturing Processes",
    "Tools & Equipment",
    "Health & Safety",
    "Engineering Drawings",
    "Systems & Components",
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "white",
          borderRadius: "16px",
          padding: "2rem",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ marginBottom: "0.5rem", fontSize: "2rem" }}>
          OCR Engineering Level 1/2
        </h1>

        <p style={{ marginBottom: "2rem", color: "#4b5563" }}>
          Select a topic to begin revision.
        </p>

        <div
          style={{
            display: "grid",
            gap: "1rem",
          }}
        >
          {topics.map((topic) => (
            <button
              key={topic}
              style={{
                padding: "1rem",
                borderRadius: "12px",
                border: "none",
                background: "#2563eb",
                color: "white",
                fontSize: "1rem",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
