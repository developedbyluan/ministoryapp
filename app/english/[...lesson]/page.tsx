"use client";

import { useParams } from "next/navigation";
import { useMP3 } from "@/app/english/contexts/MP3Context";

export default function EnglishLessonPage() {
  const params = useParams();
  const lessonName = params.lesson[1];
  const lessonData = JSON.parse(localStorage.getItem(lessonName) || "{\"error\": \"Lesson not found in local storage\"}");
  const { mp3file } = useMP3();
  console.log(lessonData);
  console.log(mp3file);
  if (lessonData.error) {
    return <div>Error: {lessonData.error}</div>;
  }
  return <div>English Lesson</div>;
}