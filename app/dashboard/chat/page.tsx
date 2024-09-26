"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import { AiOutlineSend } from "react-icons/ai";
import ReactMarkdown from "react-markdown";

export default function ChatSection() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async () => {
    if (message.trim()) {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/send-message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        });

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        const data = await response.json();

        if (data.response) {
          setMessages((prevMessages) => [
            ...prevMessages,
            `**You:** ${message}`,
            `**AI:** ${data.response}`,
          ]);
        } else {
          throw new Error("Invalid response from API");
        }

        setMessage("");
      } catch (error) {
        setError("An error occurred while sending the message.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className="flex items-center mb-6">
          <img src="/logo.png" alt="MultiGen AI Logo" className="h-8 w-8 mr-2" />
          <h1 className="text-2xl font-bold text-white">MultiGen AI</h1>
        </div>
        <ul className={styles.sidebarMenu}>
          <li className={styles.sidebarMenuItem}>
            <Link href="/dashboard">Home</Link>
          </li>
          <li className={styles.sidebarMenuItem}>
            <Link href="/settings">Settings</Link>
          </li>
        </ul>
      </aside>
      <main className={styles.mainContent}>
        <div className={styles.titleWithIcon}>
          <img src="/chat.png" alt="Chat Icon" className={styles.titleIcon} />
          <h1 className={styles.title}>Chat Section</h1>
        </div>
        <p className={styles.subtitle}>Chat with our AI.</p>
        <div className={styles.chatBox}>
          <div className={styles.messages}>
            {messages.length === 0 && (
              <div className={styles.placeholder}>
                <p>No messages yet.</p>
              </div>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.startsWith("**You:**") ? styles.userMessage : styles.aiMessage}
              >
                <ReactMarkdown>{msg}</ReactMarkdown>
              </div>
            ))}
          </div>
          <div className={styles.controls}>
            <input
              type="text"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={styles.input}
            />
            <button
              onClick={sendMessage}
              className={styles.button}
              disabled={loading}
            >
              <AiOutlineSend size={20} />
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </main>
    </div>
  );
}
