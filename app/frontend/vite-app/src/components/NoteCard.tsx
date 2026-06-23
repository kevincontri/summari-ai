import type { NoteBase } from "../types/notes_types";
import { useMemo } from "react";
import { Trash } from 'lucide-react'

const bgColors = [
  "bg-[#F7C9A4]",
  "bg-[#F4B89C]",
  "bg-[#F0C2C2]",
  "bg-[#F5E0B3]",
];

export default function NoteCard({ note, handleOpenNoteModal }: { note: NoteBase, handleOpenNoteModal: (id: number | null, bg_color?: string) => void }) {

  const dateObj = new Date(note.created_at);
  const dateStr = dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const randomBg = useMemo(() => {
  return bgColors[Math.floor(Math.random() * bgColors.length)];
  }, []);

  return (
    <div className={`group flex flex-col justify-between h-48 rounded-xl p-4 shadow-md transition ${randomBg} cursor-pointer hover:transform hover:scale-[1.02] hover:shadow-xl`} onClick={() => handleOpenNoteModal(note.id, randomBg)}>
      <div>
        <h3 className="font-semibold mb-2">{note.title}</h3>
        <p className="text-sm text-gray-700 mb-3 line-clamp-3">{note.content}</p>
      </div>
      <div className="flex justify-between items-center">
      <span className="text-xs text-gray-700 text-bottom font-bold">{dateStr}</span>
      <div className="hidden group-hover:block hover:bg-[rgba(208,109,61,0.3)] rounded-md p-1">
        <Trash className="h-4 cursor-pointer" />
      </div>
      </div>
    </div>
  );
}
