"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import { AiOutlineSend } from "react-icons/ai";
import ReactMarkdown from "react-markdown";
import { summarizeText } from "./summary";

export default function SummarySection() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateSummary = async () => {
        if (message.trim()) {
            setLoading(true);
            setError(null);

            try {
                const result = summarizeText(message);
                if (result) {
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        `**You:** ${message}`,
                        `**Summary:** ${result}`,
                    ]);
                } else {
                    throw new Error("Failed to summarize the text");
                }
                setMessage("");
            } catch (error) {
                setError("An error occurred while summarizing the message.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        } else {
            setError("Please enter some text to summarize.");
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
                    <img src="/summary.png" alt="Summary Icon" className={styles.titleIcon} />
                    <h1 className={styles.title}>Summarizer</h1>
                </div>
                <p className={styles.subtitle}>Enter text to generate a summary.</p>
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
                            placeholder="Type your text here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className={styles.input}
                        />
                        <button
                            onClick={generateSummary}
                            className={styles.button}
                            disabled={loading}
                        >
                            <AiOutlineSend size={20} />
                            {loading ? "Processing..." : "Generate Summary"}
                        </button>
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                </div>
            </main>
        </div>
    );
}
