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
  const [isReplaying, setIsReplaying] = React.useState(false);
  const [isSynced, setIsSynced] = React.useState(false);

  const [timestamps, setTimestamps] = React.useState<number[]>([]);

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

  React.useEffect(() => {
    if (timestamps.length <= 0) return;
    console.log(timestamps);
    localStorage.setItem("timestamps", JSON.stringify(timestamps));
  }, [timestamps]);

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
    if (!file) return;
    setAudioFile(file);
    const localTimestamps = JSON.parse(
      localStorage.getItem("timestamps") || "[]"
    );
    if (localTimestamps && localTimestamps.length > 0) {
      setTimestamps(localTimestamps);
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

  function pauseAudioAtTimestamp(timestamp: number) {
    if (!audioRef.current) return;
    audioRef.current.currentTime = timestamp;
    setIsLogging(false);
    audioRef.current.pause();
  }

  function replayLine(start: number, end: number) {
    if (!audioRef.current) return;
    setIsReplaying(true);
    audioRef.current.currentTime = start;
    audioRef.current.play();
    const timeout = (end - start) * 1000;
    setTimeout(() => {
      audioRef.current?.pause();
      audioRef.current!.currentTime = end;
      setIsReplaying(false);
    }, timeout);
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
    setTimestamps((prev) => [...prev, audioRef.current?.currentTime as number]);
  }

  function removeLine(index: number) {
    setTranscriptions((prev) => prev.filter((_, i) => i !== index));
    setTimestamps((prev) => prev.filter((_, i) => i !== index));
    setBlocks((prev) => [transcriptions[index], ...prev]);
    pauseAudioAtTimestamp(timestamps[index - 1] || 0);
  }

  function syncTranscriptions() {
    setBlocks(blocks.filter((block) => !transcriptions.includes(block)));
    setIsSynced(true);

    if (audioRef.current && timestamps.length > 0) {
      audioRef.current!.currentTime = timestamps.at(-1) || 0;
    }
  }

  function restart() {
    window.location.reload();
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
            <>
              <Button
                onClick={() => removeLine(index)}
                disabled={isLogging || isReplaying || !isSynced}
              >
                Remove
              </Button>
              <Button
                onClick={() =>
                  replayLine(timestamps[index - 1] || 0, timestamps[index] || 0)
                }
                disabled={isLogging || isReplaying || !isSynced}
              >
                Replay
              </Button>
            </>
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
            <Button
              onClick={() => logLine(index)}
              disabled={isReplaying || !isSynced}
            >
              {isLogging ? "Log" : "Play"}
            </Button>
          )}
        </p>
      </div>
    );
  });

  return (
    <div className="flex flex-col gap-7 items-start p-4">
      {!isSynced ? (
        <div className="flex justify-between mx-auto">
          <Input type="file" accept=".txt" onChange={handleFileUpload} />
          <div>
            <Input type="file" accept=".mp3" onChange={handleMP3Upload} />
            {audioUrl && <audio ref={audioRef} src={audioUrl} />}
          </div>
        </div>
      ) : (
        <div className="fixed bottom-4 right-4 flex flex-col gap-4">
          <Button onClick={restart}>Restart</Button>
          <Button>Export JSON</Button>
        </div>
      )}

      <div className="flex flex-col gap-7 items-start py-7 mt-10">
        {transcriptionElements}
      </div>
      {blocks.length > 0 && audioFile && (
        <div
          style={{ display: isSynced ? "none" : "flex" }}
          className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-neutral-600/90 z-50"
        >
          <Button
            onClick={syncTranscriptions}
            disabled={isSynced}
            className="text-2xl"
          >
            Sync
          </Button>
        </div>
      )}
      <div className="border border-neutral-200 w-full"></div>
      <div className="flex flex-col gap-7 items-start py-7">
        {blockElements}
      </div>
    </div>
  );
}
