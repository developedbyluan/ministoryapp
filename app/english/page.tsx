"use client";

import React from "react";
import Link from "next/link";

export default function EnglishPage() {
  const lessonData = {
    "The Race MS.mp3": [
      {
        id: "1",
        text: "Hello, welcome to the mini-story for The Race. Let’s get started.",
        ipa: "həˈloʊ, ˈwɛlkəm tu ðə ˈmɪni-ˈstɔri fɔr ðə reɪs. lɛts gɛt ˈstɑrtəd.",
        translation:
          "Xin chào, chào mừng đến với câu chuyện nhỏ cho Cuộc Đua. Hãy bắt đầu thôi.",
        start: 0,
        end: 10,
        type: "tell",
        img: "no-img",
        alt: "no-alt",
      },
      {
        id: "2",
        text: "It was 5:00 and Alan was riding his motorcycle in San Francisco.",
        ipa: "ɪt wʌz 5:00 ænd ˈælən wʌz ˈraɪdɪŋ hɪz ˈmoʊtərˌsaɪkəl ɪn sæn frænˈsɪskoʊ.",
        translation:
          "Lúc đó là 5 giờ sáng và Alan đang lái xe máy ở San Francisco.",
        start: 10,
        end: 20,
        type: "tell",
        img: "motorcycle.png",
        alt: "allan riding motorcycle",
      },
      {
        id: "3",
        text: "When was Alan riding his motorcycle?",
        ipa: "wɛn wʌz ˈælən ˈraɪdɪŋ hɪz ˈmoʊtərˌsaɪkəl?",
        translation: "Alan đã lái xe máy khi nào?",
        start: 20,
        end: 30,
        type: "question",
        img: "no-img",
        alt: "no-alt",
      },
      {
        id: "4",
        text: "Well, at 5:00, right?",
        ipa: "wɛl, æt 5:00, raɪt?",
        translation: "À, lúc 5 giờ, đúng không?",
        start: 30,
        end: 40,
        type: "answer",
        img: "no-img",
        alt: "no-alt",
      },
    ],
  };

  React.useEffect(() => {
    localStorage.setItem("preferredLanguage", "english");
  }, []);
  return (
    <div>
      <h1>English</h1>
      <h2>Course: Original English</h2>
      <div>
        <label>
          Select Mp3
          <input type="file" accept=".mp3" />
        </label>
      </div>
      <ul>
        <li>Lesson 0: The Race MS.mp3</li>
        <li>Lesson 1: Day of The Dead MS.mp3</li>
      </ul>
      <Link href="/">Home</Link>
    </div>
  );
}
