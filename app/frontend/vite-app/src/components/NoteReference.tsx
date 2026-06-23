import type { NoteBase } from "@/types/notes_types";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./ui/hover-card";
import { useState } from "react";

export default function NoteReference({ note }: { note: NoteBase }) {
  const [open, setOpen] = useState(false);

  return (
    <HoverCard open={open} onOpenChange={setOpen}>
      <HoverCardTrigger 
      onClick={() => setOpen(!open)}>
        <div className="note-opener-container" key={note.id}>
        <img src="./src/assets/dot.png" alt="Dot Icon" className="cursor-pointer h-2.5" />
        <p className="note-opener">{note.title}</p>
        </div>
      </HoverCardTrigger>
      <HoverCardContent>
        <h3 className="text-sm font-semibold">{note.title}</h3>
        <p className="text-sm text-muted-foreground mb-1">
          {note.content}
        </p>
        <span className="text-xs text-muted-foreground">
          {new Date(note.created_at).toLocaleString()}
        </span>
      </HoverCardContent>
    </HoverCard>
  )
}