"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TranscriptionEditorPage() {
  const [blocks, setBlocks] = React.useState<string[]>([]);
  const [transcriptions, setTranscriptions] = React.useState<string[]>([]);

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      console.log(file);
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target?.result as string;
        setBlocks(content.split("\n\n"));
      };

      reader.readAsText(file);
    }
  }

  function logLine(index: number) {
    const lines = blocks[index].split("\n");
    setTranscriptions((prev) => [...prev, lines[0]]);
    setBlocks((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-7 items-center p-4">
      <Input type="file" accept=".txt" onChange={handleFileUpload} />
      <div className="flex flex-col gap-7 items-start py-7">
        {transcriptions.map((transcription, index) => (
          <p key={crypto.randomUUID()}>{transcription}</p>
        ))}
      </div>
      <div className="flex flex-col gap-7 items-start py-7">
        {blocks.map((block, index) => (
          <div key={crypto.randomUUID()} className="flex items-center">
            <p>{block}</p>
            {index === 0 && <Button onClick={() => logLine(index)}>Log</Button>}
          </div>
        ))}
      </div>
    </div>
  );
}
