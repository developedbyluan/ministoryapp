"use client";

import { useParams } from "next/navigation";
import { lessonsDatabase } from "@/app/english/page";

export default function EnglishLessonPage() {
  const params = useParams();
  const lessonName = params.lesson[1];
  const lessonData = lessonsDatabase[lessonName];
  console.log(lessonData);
  return <div>English Lesson</div>;
}