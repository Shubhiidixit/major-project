"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";
import { AiOutlineDownload } from "react-icons/ai";

export default function MusicVideoGeneration() {
    const [query, setQuery] = useState("");
    const [tracks, setTracks] = useState<any[]>([]);

    // Function to fetch music videos using Deezer API
    const fetchMusic = async () => {
        try {
            const res = await fetch(
                `https://${process.env.NEXT_PUBLIC_RAPIDAPI_HOST}/search?q=${query}`,
                {
                    method: "GET",
                    headers: {
                        "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST || "",
                        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "",
                    },
                }
            );
            const data = await res.json();
            console.log(data);
            if (data.data && data.data.length > 0) {
                setTracks(data.data);
            } else {
                alert("No music found.");
            }
        } catch (error) {
            console.error("Error fetching music:", error);
            alert("An error occurred while fetching the music.");
        }
    };

    // Download function (here, we'll download the preview URL)
    const downloadTrack = (previewUrl: string) => {
        const link = document.createElement("a");
        link.href = previewUrl;
        link.download = "music_preview.mp3"; // This will download the music preview
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                        <a href="/dashboard">Home</a>
                    </li>
                    <li className={styles.sidebarMenuItem}>
                        <a href="/history">History</a>
                    </li>
                    <li className={styles.sidebarMenuItem}>
                        <a href="/settings">Settings</a>
                    </li>
                </ul>
            </aside>
            <main className={styles.mainContent}>
                <div className={styles.titleWithIcon}>
                    <img src="/music.png" alt="Music Icon" className={styles.titleIcon} />
                    <h1 className={styles.title}>Music Generation</h1>
                </div>
                <p className={styles.subtitle}>Turn your prompt into a music video.</p>

                <div className={styles.controls}>
                    <input
                        type="text"
                        placeholder="Enter your song or artist"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className={styles.input}
                    />
                    <button onClick={fetchMusic} className={styles.button}>
                        <AiOutlineDownload size={20} />
                        Generate
                    </button>
                </div>

                <div className={styles.tracksGrid}>
                    {tracks.map((track: any, index: number) => (
                        <div key={index} className={styles.trackWrapper}>
                            <img
                                src={track.album.cover_medium}
                                alt={`Track ${index}`}
                                className={styles.trackThumbnail}
                            />
                            <div className={styles.trackInfo}>
                                <h3>{track.title}</h3>
                                <p>{track.artist.name}</p>
                            </div>
                            <audio controls>
                                <source src={track.preview} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                            <button
                                onClick={() => downloadTrack(track.preview)}
                                className={styles.downloadButton}
                            >
                                <AiOutlineDownload size={24} />
                                Download Preview
                            </button>
                        </div>
                    ))}
                </div>

                {tracks.length === 0 && (
                    <div className={styles.placeholder}>
                        <p>No music generated.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
