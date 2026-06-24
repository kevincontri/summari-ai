import type { NoteBase } from "@/types/notes_types";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./ui/hover-card";
import { useState } from "react";

export default function NoteReference({ note, handleOpenNoteModal, theme }: { note: NoteBase, handleOpenNoteModal: (noteId: number) => void, theme: string }) {
  const [open, setOpen] = useState(false);

  const dateObj = new Date(note.created_at);
  const dateStr = dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <HoverCard open={open} onOpenChange={setOpen}>
      <HoverCardTrigger 
      onClick={() => setOpen(!open)}>
        <div className={theme === 'dark' ? "note-opener-container-dark" : "note-opener-container"} key={note.id}>
        <img src="./src/assets/dot.png" alt="Dot Icon" className="cursor-pointer h-2.5" />
        <p className={theme === 'dark' ? "note-opener-dark" : "note-opener"}>{note.title}</p>
        </div>
      </HoverCardTrigger>
      <HoverCardContent 
      onClick={() => handleOpenNoteModal(Number(note.id))}
      >
        <h3 className={`text-sm font-semibold ${theme === 'dark' ? "text-white" : "text-black"}`}>{note.title}</h3>
        <p className={`text-sm ${theme === 'dark' ? "text-gray-300" : "text-gray-600"} mb-1`}>
          {note.content}
        </p>
        <span className={`text-xs ${theme === 'dark' ? "text-gray-400" : "text-gray-500"}`}>
          {dateStr}
        </span>
      </HoverCardContent>
    </HoverCard>
  )
}