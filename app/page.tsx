"use client";

import { useState } from "react";
import { questionData } from "./data/questions";

type Unit = (typeof questionData.units)[number];
type Topic = Unit["topics"][number];
type Question = Topic["questions"][number];

export default function Page() {
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [incorrectQuestions, setIncorrectQuestions] = useState<Question[]>([]);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);

  const currentQuestion = activeQuestions[currentIndex];
  const percentage =
    activeQuestions.length > 0
      ? Math.round((score / activeQuestions.length) * 100)
      : 0;

  function startTopic(topic: Topic) {
    setSelectedTopic(topic);
    setActiveQuestions(topic.questions);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowSummary(false);
    setIncorrectQuestions([]);
  }

  function handleAnswer(index: number) {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);

    if (index === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    } else {
      setIncorrectQuestions((prev) => [...prev, currentQuestion]);
    }
  }

  function handleNext() {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setShowSummary(true);
    }
  }

  function retryIncorrect() {
    if (incorrectQuestions.length === 0) return;
    setActiveQuestions(incorrectQuestions);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowSummary(false);
    setIncorrectQuestions([]);
  }

  function goHome() {
    setSelectedUnit(null);
    setSelectedTopic(null);
    setActiveQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowSummary(false);
    setIncorrectQuestions([]);
  }

  function goToUnits() {
    setSelectedUnit(null);
    setSelectedTopic(null);
    setActiveQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowSummary(false);
    setIncorrectQuestions([]);
  }

  function goToTopics() {
    setSelectedTopic(null);
    setActiveQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowSummary(false);
    setIncorrectQuestions([]);
  }

  if (!selectedUnit) {
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
            {questionData.subject}
          </h1>

          <p style={{ marginBottom: "2rem", color: "#4b5563" }}>
            Select a unit to begin revision.
          </p>

          <div style={{ display: "grid", gap: "1rem" }}>
            {questionData.units.map((unit) => (
              <button
                key={unit.id}
                onClick={() => setSelectedUnit(unit)}
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
                {unit.title}
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (selectedUnit && !selectedTopic) {
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
            {selectedUnit.title}
          </h1>

          <p style={{ marginBottom: "2rem", color: "#4b5563" }}>
            Select a topic.
          </p>

          <div style={{ display: "grid", gap: "1rem", marginBottom: "1.5rem" }}>
            {selectedUnit.topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => startTopic(topic)}
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
                {topic.title}
              </button>
            ))}
          </div>

          <button
            onClick={goToUnits}
            style={{
              padding: "0.9rem 1.2rem",
              borderRadius: "12px",
              border: "none",
              background: "#6b7280",
              color: "white",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Back to Units
          </button>
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
            Score: <strong>{score}</strong> /{" "}
            <strong>{activeQuestions.length}</strong>
          </p>
          <p>
            Percentage: <strong>{percentage}%</strong>
          </p>

          <div style={{ display: "grid", gap: "1rem", marginTop: "1.5rem" }}>
            {incorrectQuestions.length > 0 && (
              <button
                onClick={retryIncorrect}
                style={{
                  padding: "1rem",
                  borderRadius: "12px",
                  border: "none",
                  background: "#f59e0b",
                  color: "white",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                Retry Incorrect Questions
              </button>
            )}

            <button
              onClick={() => selectedTopic && startTopic(selectedTopic)}
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
              onClick={goToTopics}
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

            <button
              onClick={goHome}
              style={{
                padding: "1rem",
                borderRadius: "12px",
                border: "none",
                background: "#374151",
                color: "white",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Back to Units
            </button>
          </div>
        </div>
      </main>
    );
  }

  const progressPercent =
    activeQuestions.length > 0
      ? ((currentIndex + 1) / activeQuestions.length) * 100
      : 0;

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
          <span>{selectedTopic?.title ?? "Topic"}</span>
          <span>
            Question {currentIndex + 1} of {activeQuestions.length}
          </span>
        </div>

        <div
          style={{
            width: "100%",
            height: "10px",
            background: "#e5e7eb",
            borderRadius: "999px",
            overflow: "hidden",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progressPercent}%`,
              background: "#2563eb",
            }}
          />
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

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
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

              <button
                onClick={goToTopics}
                style={{
                  padding: "0.9rem 1.2rem",
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
        )}
      </div>
    </main>
  );
}
