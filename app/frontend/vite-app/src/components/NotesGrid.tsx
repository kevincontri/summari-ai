import type { NoteBase } from "../types/notes_types";
import NoteCard from "./NoteCard";

export default function NotesGrid({ notes, count }: { notes: NoteBase[], count: number }) {
  return (
    <div className="p-6">
      <div className="flex gap-2 items-baseline">
        <h2 className="notes-title">Your notes</h2>
        <span className="notes-count">{count} notes</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <button className="new-btn">
          <span className="text-3xl font-bold">+</span>
          <span className="text-sm mt-2 text-gray-600">New note</span>
        </button>

        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}
