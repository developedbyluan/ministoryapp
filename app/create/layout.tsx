import { Toaster } from "@/components/ui/toaster"

export default function TranscriptionEditorLayout(props: { children: React.ReactNode }) {
  return (
    <div>
      <Toaster />
      <main>{props.children}</main>
    </div>
  );
}