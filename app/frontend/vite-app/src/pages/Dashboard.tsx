import NotesGrid from "../components/NotesGrid";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getNotes, createNote, updateNote, deleteNote } from "../api/notes";
import { useAuthStore } from "../contexts/useAuthStore";
import type { NoteResponse } from "../types/notes_types";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Header from "../components/Header";
import InputAI from "../components/InputAI";
import { useState, useMemo } from "react";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchNotes = async (): Promise<NoteResponse> => await getNotes();
  
  // Fetch notes from API
  const { data: notes, isLoading: notesLoading, error: notesError } = useQuery<NoteResponse>({
    queryKey: ['notes'],
    queryFn: fetchNotes,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
  
  if (notesError) {
    alert("Error fetching notes: " + (notesError as Error).message);
    console.error("Error fetching notes:", notesError);
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }

  // Search tool
  const filteredNotes = useMemo(() => {
    const all = notes?.data ?? [];
    const q = searchQuery.trim().toLowerCase(); 
    if (!q) return all; // If search query is empty, return all notes
    return all.filter(note => note.title.toLowerCase().includes(q) || note.content.toLowerCase().includes(q)); // Filter notes based on title or content matching the search query
  }, [notes, searchQuery]);

  const handleSubmitToAI = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
  }

  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();



  return (
    <>
    { notesLoading && 
    <Loading /> 
    }
    <div className="dashboard-page">
      <Header logout={logout} navigate={navigate} handleSearch={handleSearch} searchQuery={searchQuery} />
      <InputAI handleSubmit={handleSubmitToAI} />
      <NotesGrid 
        notes={filteredNotes}
        count={filteredNotes.length} />
    </div>
    </>
  )
}