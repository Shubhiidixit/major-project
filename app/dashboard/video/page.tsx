"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import { AiOutlineDownload, AiOutlineVideoCamera } from "react-icons/ai";  // Import video icon

export default function VideoGeneration() {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState<string[]>([]);

  const fetchVideos = async () => {
    try {
      const res = await fetch(
        `https://api.pexels.com/videos/search?query=${query}&per_page=10`,
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY || "",
          },
        }
      );
      const data = await res.json();
      if (data.videos && data.videos.length > 0) {
        const fetchedVideos = data.videos.map((video: any) => video.video_files[0].link);
        setVideos([...videos, ...fetchedVideos]);
      } else {
        alert("No videos found.");
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      alert("An error occurred while fetching the videos.");
    }
  };

  const downloadVideo = (url: string) => {
    fetch(url, {
      method: "GET",
      headers: {},
    })
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "video.mp4");
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      })
      .catch(error => console.error('Error downloading the video:', error));
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
            <Link href="/history">History</Link>
          </li>
          <li className={styles.sidebarMenuItem}>
            <Link href="/settings">Settings</Link>
          </li>
        </ul>
      </aside>
      <main className={styles.mainContent}>
        <div className={styles.titleWithIcon}>
          <img src="/video.png" alt="Image Icon" className={styles.titleIcon} />  {/* Added image icon */}
          <h1 className={styles.title}>Video Generation</h1>
        </div>
        <p className={styles.subtitle}>Turn your prompt into a video.</p>
        <div className={styles.controls}>
          <input
            type="text"
            placeholder="Enter your prompt here"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.input}
          />
          <button onClick={fetchVideos} className={styles.button}>
            <AiOutlineDownload size={20} />
            Generate
          </button>
        </div>
        <div className={styles.videosGrid}>
          {videos.map((video, index) => (
            <div key={index} className={styles.videoWrapper}>
              <video
                src={video}
                controls
                className={styles.video}
              />
              <button
                onClick={() => downloadVideo(video)}
                className={styles.downloadButton}
              >
                <AiOutlineDownload size={24} />
              </button>
            </div>
          ))}
        </div>
        {videos.length === 0 && (
          <div className={styles.placeholder}>
            <p>No videos generated.</p>
          </div>
        )}
      </main>
    </div>
  );
}
