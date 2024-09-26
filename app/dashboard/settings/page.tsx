"use client";

import React from "react";
import Link from "next/link";
import { UserProfile } from "@clerk/nextjs";
import styles from "./styles.module.css";

export default function Settings() {
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
                <UserProfile />
            </main>
        </div>
    );
}
