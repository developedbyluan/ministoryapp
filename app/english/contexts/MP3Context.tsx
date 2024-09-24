"use client";

import React from "react";

type MP3ContextType = {
  mp3file: File | null;
  setMp3file: React.Dispatch<React.SetStateAction<File | null>>;
};

const MP3Context = React.createContext<MP3ContextType | undefined>(undefined);

export function MP3Provider({ children }: { children: React.ReactNode }) {
  const [mp3file, setMp3file] = React.useState<File | null>(null);
  return (
    <MP3Context.Provider value={{ mp3file, setMp3file }}>
      {children}
    </MP3Context.Provider>
  );
}

export function useMP3() {
  const context = React.useContext(MP3Context);

  if (context === undefined) {
    throw new Error("useMP3 must be used within a MP3Provider");
  }

  return context;
}
