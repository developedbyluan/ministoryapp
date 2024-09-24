"use client";

import { useParams } from "next/navigation";
import { useMP3 } from "@/app/english/contexts/MP3Context";
import type { LessonData } from "@/app/english/page";
export default function EnglishLessonPage() {
  const params = useParams();
  const lessonName = params.lesson[1];
  const lessonData = JSON.parse(
    localStorage.getItem(lessonName) ||
      '{"error": "Lesson not found in local storage"}'
  );
  const { mp3file } = useMP3();
  console.log(lessonData);
  console.log(mp3file);

  const lineElements = lessonData.map((line: LessonData) => {
    console.log(line.ipa);
    const ipaArray = line.ipa.split(" ");
    const textArray = line.text.split(" ");

    const lineElement = ipaArray.map((ipa: string, index: number) => {
      return (
        <div key={crypto.randomUUID()} className="text-center">
          <p className="text-sm text-neutral-200">{ipa}</p>
          <p className="text-xl">{textArray[index]}</p>
        </div>
      );
    });
    return (
      <div key={line.id} className="flex flex-wrap items-start gap-x-2 mt-7">
        {lineElement}
      </div>
    );
  });
  if (lessonData.error) {
    return <div>Error: {lessonData.error}</div>;
  }
  return (
    <div>
      <h1>English Lesson</h1>
      <div>{lineElements}</div>
    </div>
  );
}
