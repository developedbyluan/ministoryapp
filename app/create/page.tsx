import { Button } from "@/components/ui/button"

export default function TranscriptionEditorPage() {
return (
  <div className="flex flex-col gap-7 items-center py-7">
    <div className="flex flex-col items-center">
      <p>Hello, welcome to the mini-story for The Race. Let’s get started.</p>
      <Button>Log</Button>
    </div>

    <div className="flex flex-col items-center">
      <p>It was 5:00 and Alan was riding his motorcycle in San Francisco.</p>
    </div>
  </div>
)
}