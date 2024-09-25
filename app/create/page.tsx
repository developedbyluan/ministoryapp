"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TranscriptionEditorPage() {
  const [blocks, setBlocks] = React.useState<string[]>([]);
  const [transcriptions, setTranscriptions] = React.useState<string[]>([]);
  const [audioFile, setAudioFile] = React.useState<File | null>(null);
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);

  const [isLogging, setIsLogging] = React.useState(false);

  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    if (transcriptions.length <= 0) return;
    localStorage.setItem("transcriptions", JSON.stringify(transcriptions));
  }, [transcriptions]);

  React.useEffect(() => {
    if (audioFile) {
      setAudioUrl(URL.createObjectURL(audioFile));
    }

    // Clean up the URL when the audio file changes
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioFile]);

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

  function handleMP3Upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
    }
  }

  function playPauseAudio() {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }

  function logLine(index: number) {
    playPauseAudio();
    if (!isLogging) {
      setIsLogging(true);
      return;
    }
    setTranscriptions((prev) => [...prev, blocks[index]]);
    setBlocks((prev) => prev.filter((_, i) => i !== index));
    setIsLogging(false);
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
        <p className="text-sm text-muted-foreground">
          {translation}
          {index === transcriptions.length - 1 && (
            <Button onClick={() => removeLine(index)}>Remove</Button>
          )}
        </p>
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
        <p className="text-sm text-muted-foreground">
          {translation}{" "}
          {index === 0 && (
            <Button onClick={() => logLine(index)}>
              {isLogging ? "Log" : "Play"}
            </Button>
          )}
        </p>
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
      <div>
        <Input type="file" accept=".mp3" onChange={handleMP3Upload} />
        {audioUrl && <audio ref={audioRef} src={audioUrl} controls />}
      </div>
      <div className="flex flex-col gap-7 items-start py-7">
        {blockElements}
      </div>
    </div>
  );
}
