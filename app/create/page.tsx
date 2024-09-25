"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TranscriptionEditorPage() {
  const [blocks, setBlocks] = React.useState<string[]>([]);
  const [transcriptions, setTranscriptions] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (transcriptions.length <= 0) return;
    localStorage.setItem("transcriptions", JSON.stringify(transcriptions));
  }, [transcriptions]);

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

    const localTranscriptions = localStorage.getItem("transcriptions");
    if (localTranscriptions) {
      setTranscriptions(JSON.parse(localTranscriptions));
    }
  }

  function logLine(index: number) {
    setTranscriptions((prev) => [...prev, blocks[index]]);
    setBlocks((prev) => prev.filter((_, i) => i !== index));
  }

  function removeLine(index: number) {
    setTranscriptions((prev) => prev.filter((_, i) => i !== index));
    setBlocks((prev) => [transcriptions[index], ...prev]);
  }

  function syncTranscriptions() {
    setBlocks(blocks.filter((block) => !transcriptions.includes(block)));
  }

  const transcriptionElements = transcriptions.map((transcription, index) => {
    const [text, ipa, translation] = transcription.split("\n");
    const ipaArray = ipa.split(" ");
    const textArray = text.split(" ");

    const lineElements = ipaArray.map((ipa, index) => {
      return (
        <div className="flex flex-col text-center" key={crypto.randomUUID()}>
          <p className="text-sm text-muted-foreground">{ipa}</p>
          <p className="text-xl">{textArray[index]}</p>
        </div>
      );
    });

    return (
      <div key={crypto.randomUUID()}>
        <div className="flex flex-wrap gap-x-4">{lineElements}</div>
        <p className="text-sm text-muted-foreground">{translation}</p>
        {index === transcriptions.length - 1 && (
          <Button onClick={() => removeLine(index)}>Remove</Button>
        )}
      </div>
    );
  });

  const blockElements = blocks.map((block, index) => {
    const [text, ipa, translation] = block.split("\n");
    const ipaArray = ipa.split(" ");
    const textArray = text.split(" ");

    const lineElements = ipaArray.map((ipa, index) => {
      return (
        <div className="flex flex-col text-center" key={crypto.randomUUID()}>
          <p className="text-sm text-muted-foreground">{ipa}</p>
          <p className="text-xl">{textArray[index]}</p>
        </div>
      );
    });

    return (
      <div key={crypto.randomUUID()}>
        <div className="flex flex-wrap gap-x-4">{lineElements}</div>
        <p className="text-sm text-muted-foreground">{translation}</p>
        {index === 0 && <Button onClick={() => logLine(index)}>Log</Button>}
      </div>
    );
  });

  return (
    <div className="flex flex-col gap-7 items-start p-4">
      <Input type="file" accept=".txt" onChange={handleFileUpload} />
      <div className="flex flex-col gap-7 items-start py-7">
        {transcriptionElements}
      </div>
      <div className="fixed top-4 right-4">
        <Button onClick={syncTranscriptions}>Sync</Button>
      </div>
      <div className="flex flex-col gap-7 items-start py-7">
        {blockElements}
      </div>
    </div>
  );
}
