import type { NoteBase } from "../types/notes_types";
import { useMemo, useState } from "react";
import { Trash } from 'lucide-react'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "./ui/alert-dialog";

const bgColors = [
  "bg-[#F7C9A4]",
  "bg-[#F4B89C]",
  "bg-[#F0C2C2]",
  "bg-[#F5E0B3]",
];

const darkBgColors = [
  "bg-[#4C463B]",
  "bg-[#4B4541]",
  "bg-[#4D4A3F]",
  "bg-[#4C4339]",
  "bg-[#4A463D]",
]

export default function NoteCard({ note, handleOpenNoteModal, onDelete, theme }: { note: NoteBase, handleOpenNoteModal: (id: number | null, bg_color?: string) => void, onDelete: (id: number) => void, theme: string }) {
  const [open, setOpen] = useState(false);

  const dateObj = new Date(note.created_at);
  const dateStr = dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const randomBg = useMemo(() => {
    if (theme === 'dark') {
      return darkBgColors[Math.floor(Math.random() * darkBgColors.length)];
    } else {
      return bgColors[Math.floor(Math.random() * bgColors.length)];
    }}, [theme]);

  return (
    <div className={`group flex flex-col justify-between h-48 rounded-xl p-4 shadow-md transition ${randomBg} cursor-pointer hover:transform hover:scale-[1.02] hover:shadow-xl`} onClick={() => handleOpenNoteModal(note.id, randomBg)}>
      <div>
        <h3 className={`font-semibold mb-2 ${theme === 'dark' ? "text-white/75" : "text-black"}`}>{note.title}</h3>
        <p className={`text-sm ${theme === 'dark' ? "text-gray-300" : "text-gray-700"} mb-3 line-clamp-3`}>{note.content}</p>
      </div>
      <div className="flex justify-between items-center">
      <span className={`text-xs ${theme === 'dark' ? "text-white/40" : "text-gray-700"} text-bottom font-bold`}>{dateStr}</span>
      <div className={`lg:hidden group-hover:block ${theme === 'dark' ? "hover:bg-[rgba(255,255,255,0.3)]" : "hover:bg-[rgba(208,109,61,0.3)]"} rounded-md p-1`}>
      <div onClick={(e) => {e.stopPropagation();}}> 
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger>
            <Trash color={theme === 'dark' ? "white" : "black"} className="h-4 cursor-pointer" />
          </AlertDialogTrigger>
          <AlertDialogContent className={theme === 'dark' ? "alert-dialog-content-dark" : "alert-dialog-content"}>
            <AlertDialogHeader>
              <AlertDialogTitle className={theme === 'dark' ? "alert-dialog-title-dark" : "alert-dialog-title"}>Confirm Delete</AlertDialogTitle>
              <AlertDialogDescription className={theme === 'dark' ? "alert-dialog-description-dark" : "alert-dialog-description"}>
                Are you sure you want to delete this note? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className={theme === 'dark' ? "alert-dialog-cancel-dark" : "alert-dialog-cancel"} onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction 
              className={theme === 'dark' ? "bg-[#545454] hover:bg-[#514033]" : "bg-[#D06D3D] hover:bg-[#B85A3A]"} 
              onClick={() => {
                onDelete(note.id)
                setOpen(false);
                }}>
                  Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      </div>  
      </div>
    </div>
  );
}
