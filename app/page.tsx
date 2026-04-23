"use client";

import { useState } from "react";
import { allQuestions } from "./data/questions";

type TopicKey = keyof typeof allQuestions;

export default function Page() {
  const [selectedTopic, setSelectedTopic] = useState<TopicKey | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const topics: { key: TopicKey; label: string }[] = [
    { key: "materials", label: "Materials & Properties" },
  ];

  const questions = selectedTopic ? allQuestions[selectedTopic] : [];
  const currentQuestion = questions[currentIndex];

  function startTopic(topic: TopicKey) {
    setSelectedTopic(topic);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowSummary(false);
  }

  function handleAnswer(index: number) {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);

    if (index === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
  }

  function handleNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setShowSummary(true);
    }
  }

  function goHome() {
    setSelectedTopic(null);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowSummary(false);
  }

  if (!selectedTopic) {
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

          <div style={{ display: "grid", gap: "1rem" }}>
            {topics.map((topic) => (
              <button
                key={topic.key}
                onClick={() => startTopic(topic.key)}
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
                {topic.label}
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (showSummary) {
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
          <h1>Topic Complete</h1>
          <p>
            Score: <strong>{score}</strong> / <strong>{questions.length}</strong>
          </p>

          <div style={{ display: "grid", gap: "1rem", marginTop: "1.5rem" }}>
            <button
              onClick={() => startTopic(selectedTopic)}
              style={{
                padding: "1rem",
                borderRadius: "12px",
                border: "none",
                background: "#2563eb",
                color: "white",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Restart Topic
            </button>

            <button
              onClick={goHome}
              style={{
                padding: "1rem",
                borderRadius: "12px",
                border: "none",
                background: "#6b7280",
                color: "white",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Back to Topics
            </button>
          </div>
        </div>
      </main>
    );
  }

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
            color: "#4b5563",
          }}
        >
          <span>Materials & Properties</span>
          <span>
            Question {currentIndex + 1} of {questions.length}
          </span>
        </div>

        <h2 style={{ marginBottom: "1.5rem" }}>{currentQuestion.question}</h2>

        <div style={{ display: "grid", gap: "1rem" }}>
          {currentQuestion.options.map((option, index) => {
            const isCorrect = index === currentQuestion.correctIndex;
            const isChosen = index === selectedAnswer;

            let background = "#2563eb";

            if (selectedAnswer !== null) {
              if (isCorrect) background = "#16a34a";
              else if (isChosen) background = "#dc2626";
              else background = "#9ca3af";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                style={{
                  padding: "1rem",
                  borderRadius: "12px",
                  border: "none",
                  background,
                  color: "white",
                  fontSize: "1rem",
                  cursor: selectedAnswer === null ? "pointer" : "default",
                  textAlign: "left",
                }}
              >
                {option}
              </button>
            );
          })}
        </div>

        {selectedAnswer !== null && (
          <div
            style={{
              marginTop: "1.5rem",
              padding: "1rem",
              borderRadius: "12px",
              background: "#eef2ff",
            }}
          >
            <p style={{ marginTop: 0 }}>
              <strong>
                {selectedAnswer === currentQuestion.correctIndex
                  ? "Correct"
                  : "Incorrect"}
              </strong>
            </p>

            <p>{currentQuestion.explanation}</p>

            <button
              onClick={handleNext}
              style={{
                padding: "0.9rem 1.2rem",
                borderRadius: "12px",
                border: "none",
                background: "#2563eb",
                color: "white",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Next Question
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
