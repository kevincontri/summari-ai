import { Input } from "../components/ui/input";
import NotesGrid from "../components/NotesGrid";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getNotes, createNote, updateNote, deleteNote } from "../api/notes";
import { useAuthStore } from "../contexts/useAuthStore";
import type { NoteResponse } from "../types/notes_types";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Header from "../components/Header";
import InputAI from "../components/InputAI";

export default function Dashboard() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
  }

  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

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

  return (
    <>
    { notesLoading && 
    <Loading /> 
    }
    <div className="dashboard-page">
      <Header logout={logout} navigate={navigate} />
      <InputAI handleSubmit={handleSubmit} />
      <NotesGrid 
        notes={notes?.data || []}
        count={notes?.count || 0} />
    </div>
    </>
  )
}