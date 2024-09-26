"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();
  const STORAGE_KEY = "preferredLanguage";

  React.useEffect(() => {
    const languages = [
      { id: "english", name: "English", route: "/english" },
      { id: "chinese", name: "Chinese", route: "/chinese" },
      { id: "spanish", name: "Spanish", route: "/spanish" },
      { id: "arabic", name: "Arabic", route: "/arabic" },
    ];

    const preferredLanguage = localStorage.getItem(STORAGE_KEY);

    if (!preferredLanguage) return;

    if (preferredLanguage) {
      const language = languages.find((lang) => lang.id === preferredLanguage);
      if (language) {
        router.push(language.route);
      }
    }
  }, [router]);
  return (
    <div>
      <h1>Choose Language</h1>
      <ul>
        <li>
          <Link href="/english">English</Link>
        </li>
        <li>
          <button>Chinese</button>
        </li>
        <li>
          <button>Spanish</button>
        </li>
        <li>
          <button>Arabic</button>
        </li>
      </ul>
    </div>
  );
}
