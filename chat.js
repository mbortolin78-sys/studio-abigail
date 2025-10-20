import React, { useState } from "react";

export default function ChatAbigail() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "✨ Benvenuta in Studio Abigail — uno spazio dove le parole si trasformano in luce." },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
  };

  return (
    <div
      style={{
        backgroundColor: "#F4EFE1",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "Palatino, serif",
        padding: "20px",
      }}
    >
      <div style={{ flex: 1, overflowY: "auto", padding: "10px 0" }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                backgroundColor: msg.sender === "ai" ? "#F7F3E8" : "#F4EFE1",
                color: "#2C2C2C",
                padding: "10px 15px",
                border: "0.5px solid rgba(0,0,0,0.1)",
                borderRadius: "12px",
                maxWidth: msg.sender === "ai" ? "96%" : "65%",
                textAlign: "justify",
                lineHeight: "1.5em",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          borderTop: "0.5px solid rgba(0,0,0,0.1)",
        }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Scrivi messaggio..."
          style={{
            flex: 1,
            resize: "none",
            border: "none",
            backgroundColor: "#F4EFE1",
            padding: "10px",
            fontSize: "15px",
            fontFamily: "Palatino, serif",
            outline: "none",
          }}
          rows={2}
        />
        <button
          onClick={handleSend}
          style={{
            marginLeft: "10px",
            padding: "8px 14px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#D8CBBB",
            color: "#2C2C2C",
            fontFamily: "Palatino, serif",
            cursor: "pointer",
          }}
        >
          INVIA
        </button>
      </div>
    </div>
  );
}
