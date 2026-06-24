import type { NoteBase } from "../types/notes_types";
import NoteCard from "./NoteCard";

export default function NotesGrid({ notes, count, handleOpenNoteModal, onDelete, theme }: { notes: NoteBase[], count: number, handleOpenNoteModal: (id: number | null, bg_color?: string) => void, onDelete: (id: number) => void, theme: string }) {
  return (
    <div className="p-6">
      <div className="flex gap-2 items-baseline">
        <h2 className={theme === 'dark' ? "notes-title-dark" : "notes-title"}>Your notes</h2>
        <span className={theme === 'dark' ? "notes-count-dark" : "notes-count"}>{count} notes</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <button 
        className={`${theme === 'dark' ? "new-btn-dark" : "new-btn"} ${notes.length === 0 ? "animated-button" : ""}`}
        onClick={() => {handleOpenNoteModal(null)}}>
          <span className={`text-3xl font-bold ${theme === 'dark' ? "text-gray-400" : "text-black"}`}>+</span>
          <span className={theme === 'dark' ? "text-sm mt-2 text-gray-400" : "text-sm mt-2 text-gray-600"}>New note</span>
        </button>

        {notes.map((note) => (
          <NoteCard key={note.id} note={note} handleOpenNoteModal={handleOpenNoteModal} onDelete={onDelete} theme={theme}/>
        ))}
      </div>
    </div>
  );
}
