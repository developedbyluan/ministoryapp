"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TranscriptionEditorPage() {
  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      console.log(file);
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target?.result as string;
        console.log(content);
      };

      reader.readAsText(file);
    }
  }
  return (
    <div className="flex flex-col gap-7 items-center p-4">
      <Input type="file" accept=".txt" onChange={handleFileUpload} />
      <div className="flex flex-col gap-7 items-center py-7">
        <div className="flex flex-col items-center">
          <p>
            Hello, welcome to the mini-story for The Race. Let’s get started.
          </p>
          <Button>Log</Button>
        </div>

        <div className="flex flex-col items-center">
          <p>
            It was 5:00 and Alan was riding his motorcycle in San Francisco.
          </p>
        </div>
      </div>{" "}
      {/* ./ log line ui */}
    </div>
  );
}
