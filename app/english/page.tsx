"use client";

import React from "react";
import Link from "next/link";

export default function EnglishPage() {
    React.useEffect(() => {
        localStorage.setItem("preferredLanguage", "english");
    }, []);
    return (
        <div>
            <h1>English</h1>
            <Link href="/">Home</Link>
        </div>
    )
}