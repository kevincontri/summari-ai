import type { NoteBase } from "../types/notes_types";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import TextareaAutosize from "react-textarea-autosize"

export default function NoteModal({ setShowNoteModal, handleCreateNote, isCreatingNote, currentNote, newTitle, setNewTitle, newContent, setNewContent, bg_color }: { setShowNoteModal: (show: boolean) => void, handleCreateNote: (note: Omit<NoteBase, "id" | "created_at" | "user_id">) => Promise<void>, isCreatingNote: boolean, currentNote: NoteBase | null, newTitle: string, setNewTitle: (title: string) => void, newContent: string, setNewContent: (content: string) => void, bg_color?: string }) {

  const dateObj = new Date(currentNote?.created_at || Date.now());
  const dateStr = dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="absolute top-0 left-0 w-full h-screen z-100 flex items-center justify-center md:backdrop-blur-xs backdrop-blur-xs rounded-xl md:bg-black/30 md:p-0 p-5" onClick={() => setShowNoteModal(false)}>
      <div className={`${bg_color ?? "bg-[#F7C9A4]"} p-4 rounded-lg shadow-xl w-full max-w-md`} onClick={(e) => e.stopPropagation()}>
        <Input 
          type="text"
          required
          placeholder="Note title"
          variant="note"
          className="placeholder:text-[#9F886F] placeholder:text-md  placeholder:font-semibold text-lg font-semibold"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <TextareaAutosize 
          required
          minRows={10}
          maxRows={10}
          placeholder="Start writing..."
          className="placeholder:text-[#9F886F] placeholder:text-xs text-sm font-normal text-gray-700 w-full resize-none bg-transparent border-none outline-none px-2 py-1"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <hr className="w-full h-px mb-2 bg-[#9F886F] border-0 opacity-20"/>
        <div className="flex justify-between items-center">
          <span className="text-[#9F886F] text-xs font-semibold">{dateStr}</span>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowNoteModal(false)}>
              Cancel
            </Button>
            <Button variant="outline" onClick={() => handleCreateNote({ title: newTitle, content: newContent })}>
              {isCreatingNote ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}
