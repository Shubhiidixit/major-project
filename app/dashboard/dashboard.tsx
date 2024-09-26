"use client";

import React from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import { useAuth, SignInButton, UserButton, RedirectToSignIn } from "@clerk/nextjs";

export default function Dashboard() {
    const { isSignedIn } = useAuth();

    if (!isSignedIn) {
        return <RedirectToSignIn />;
    }

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
                        <Link href="/dashboard/settings">Settings</Link>
                    </li>
                </ul>
            </aside>

            <main className={styles.mainContent}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>Elevate Your Ideas with AI</h1>
                    <p className={styles.subtitle}>Engage with the most intelligent AI</p>
                </div>

                <div className={styles.userButtonContainer}>
                    <UserButton />
                </div>
                <div className={styles.cardGrid}>
                    <div className={styles.card}>
                        <Link href="/dashboard/image">
                            <div className={styles.cardInner}>
                                <div className={styles.cardFront}>
                                    <img src="/img.png" alt="Image Generation" className={styles.cardIcon} />
                                    <h3>Image Generation</h3>
                                </div>
                                <div className={styles.cardBack}>
                                    <p>Generate stunning images with the power of AI.</p>
                                </div>
                            </div>
                        </Link>
                        <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '1rem', color: '#191919', fontWeight: 'bold', textDecoration: 'underline' }}>
                            <Link href="/dashboard/image">Click to Try</Link>
                        </p>
                    </div>

                    <div className={styles.card}>
                        <Link href="/dashboard/video">
                            <div className={styles.cardInner}>
                                <div className={styles.cardFront}>
                                    <img src="/video.png" alt="Video Generation" className={styles.cardIcon} />
                                    <h3>Video Generation</h3>
                                </div>
                                <div className={styles.cardBack}>
                                    <p>Create engaging videos seamlessly.</p>
                                </div>
                            </div>
                        </Link>
                        <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '1rem', color: '#191919', fontWeight: 'bold', textDecoration: 'underline' }}>
                            <Link href="/dashboard/video">Click to Try</Link>
                        </p>
                    </div>

                    <div className={styles.card}>
                        <Link href="/dashboard/chat">
                            <div className={styles.cardInner}>
                                <div className={styles.cardFront}>
                                    <img src="/chat.png" alt="Chatting" className={styles.cardIcon} />
                                    <h3>Chatting</h3>
                                </div>
                                <div className={styles.cardBack}>
                                    <p>Interact with AI for smart responses.</p>
                                </div>
                            </div>
                        </Link>
                        <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '1rem', color: '#191919', fontWeight: 'bold', textDecoration: 'underline' }}>
                            <Link href="/dashboard/chat">Click to Try</Link>
                        </p>
                    </div>

                    <div className={styles.card}>
                        <Link href="/dashboard/summary">
                            <div className={styles.cardInner}>
                                <div className={styles.cardFront}>
                                    <img src="/summary.png" alt="Summarizer" className={styles.cardIcon} />
                                    <h3>Summarizer</h3>
                                </div>
                                <div className={styles.cardBack}>
                                    <p>Quickly summarize text to extract key points with ease.</p>
                                </div>
                            </div>
                        </Link>
                        <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '1rem', color: '#191919', fontWeight: 'bold', textDecoration: 'underline' }}>
                            <Link href="/dashboard/summary">Click to Try</Link>
                        </p>
                    </div>

                    <div className={styles.card}>
                        <Link href="/dashboard/code">
                            <div className={styles.cardInner}>
                                <div className={styles.cardFront}>
                                    <img src="/code.png" alt="Code Generation" className={styles.cardIcon} />
                                    <h3>Code Generation</h3>
                                </div>
                                <div className={styles.cardBack}>
                                    <p>Get code snippets quickly and easily.</p>
                                </div>
                            </div>
                        </Link>
                        <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '1rem', color: '#191919', fontWeight: 'bold', textDecoration: 'underline' }}>
                            <Link href="/dashboard/code">Click to Try</Link>
                        </p>
                    </div>

                    <div className={styles.card}>
                        <Link href="/dashboard/music">
                            <div className={styles.cardInner}>
                                <div className={styles.cardFront}>
                                    <img src="/music.png" alt="Music Generation" className={styles.cardIcon} />
                                    <h3>Music Generation</h3>
                                </div>
                                <div className={styles.cardBack}>
                                    <p>Generate music tracks with AI.</p>
                                </div>
                            </div>
                        </Link>
                        <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '1rem', color: '#191919', fontWeight: 'bold', textDecoration: 'underline' }}>
                            <Link href="/dashboard/music">Click to Try</Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
