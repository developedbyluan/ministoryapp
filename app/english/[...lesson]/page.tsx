"use client";

import { useParams } from "next/navigation";

export default function EnglishLessonPage() {
  const params = useParams();
  const lessonName = params.lesson[1];
  console.log(lessonName);
  return <div>English Lesson</div>;
}