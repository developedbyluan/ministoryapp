"use client";

import { useParams } from "next/navigation";

export default function EnglishLessonPage() {
  const params = useParams();
  const lessonName = params.lesson[1];
  const lessonData = JSON.parse(localStorage.getItem(lessonName) || "{\"error\": \"Lesson not found in local storage\"}");
  console.log(lessonData);
  if (lessonData.error) {
    return <div>Error: {lessonData.error}</div>;
  }
  return <div>English Lesson</div>;
}