import { MP3Provider } from "@/app/english/contexts/MP3Context";
export default function EnglishLessonLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <MP3Provider>
      <div>{props.children}</div>
    </MP3Provider>
  );
}