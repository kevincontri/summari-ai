import { Input } from "../components/ui/input";
import NotesGrid from "../components/NotesGrid";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getNotes, createNote, updateNote, deleteNote } from "../api/notes";
import { useAuthStore } from "../contexts/useAuthStore";
import type { NoteResponse } from "../types/notes_types";
import { useNavigate } from "react-router-dom";

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
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
    </div>}
      <div className="dashboard-page">
        <div className="header">
          <div className="flex flex-row items-center space-x-2">
            <img src="./src/assets/summari-logo.svg" alt="Logo" className="logo-img" />
            <span className="logo-text">Summari</span>
          </div>
          <div className="flex flex-row items-center space-x-3">  
          <div className="input-container">
            <img src="./src/assets/search.png" alt="Search Icon" className="search-icon cursor-pointer" />
            <Input placeholder="Search your notes..." variant="dashboard" className="placeholder:text-gray-700 placeholder:text-md"/>
          </div>
          <div onClick={() => logout(navigate)} className="logout-container" title="Logout">
            <img src="./src/assets/logout.png" alt="Logout Icon" className="logout-icon" />
          </div>
          </div>
        </div>
      
      <div className="ai-input-container">
        <form onSubmit={handleSubmit} className="flex flex-row items-center space-x-2 w-full">
          <div className="ai-icon-container hover:animate-spin">
            <img src="./src/assets/stars.png" alt="Stars Icon" title="Summari AI" className="ai-icon" />
          </div>

          <Input required placeholder="Ask Summari about your notes..." variant="ai" className="placeholder:text-gray-800 placeholder:text-md" />

          <div className="send-icon-container">
            <img src="./src/assets/send.png" alt="Send Icon" className="send-icon cursor-pointer" />
          </div>
        </form>
      </div>
        <NotesGrid 
        notes={notes?.data || []}
        count={notes?.count || 0} />
      </div>
    </>
  )
}