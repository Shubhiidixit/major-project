"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import { AiOutlineDownload, AiOutlinePicture } from "react-icons/ai";

export default function ImageGeneration() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const fetchImages = async () => {
    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${query}&per_page=30`,
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY || "",
          },
        }
      );
      const data = await res.json();
      if (data.photos && data.photos.length > 0) {
        const fetchedImages = data.photos.map((photo: any) => photo.src.large);
        setImages([...images, ...fetchedImages]);
      } else {
        alert("No images found.");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      alert("An error occurred while fetching the images.");
    }
  };

  const downloadImage = (url: string) => {
    fetch(url, {
      method: "GET",
      headers: {},
    })
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "image.jpeg");
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      })
      .catch(error => console.error('Error downloading the image:', error));
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
          <img src="/img.png" alt="Image Icon" className={styles.titleIcon} />  {/* Added image icon */}
          <h1 className={styles.title}>Image Generation</h1>
        </div>
        <p className={styles.subtitle}>Turn your prompt into an image.</p>
        <div className={styles.controls}>
          <input
            type="text"
            placeholder="Enter your prompt here"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.input}
          />
          <button onClick={fetchImages} className={styles.button}>
            <AiOutlineDownload size={20} />
            Generate
          </button>
        </div>
        <div className={styles.imagesGrid}>
          {images.map((image, index) => (
            <div key={index} className={styles.imageWrapper}>
              <img
                src={image}
                alt={`Generated ${index}`}
                className={styles.image}
              />
              <button
                onClick={() => downloadImage(image)}
                className={styles.downloadButton}
              >
                <AiOutlineDownload size={24} />
              </button>
            </div>
          ))}
        </div>
        {images.length === 0 && (
          <div className={styles.placeholder}>
            <p>No images generated.</p>
          </div>
        )}
      </main>
    </div>
  );
}
