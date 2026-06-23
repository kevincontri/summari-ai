import NotesGrid from "../components/NotesGrid";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getNotes, createNote, updateNote, deleteNote } from "../api/notes";
import { useAuthStore } from "../contexts/useAuthStore";
import type { NoteBase, NoteResponse } from "../types/notes_types";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Header from "../components/Header";
import InputAI from "../components/InputAI";
import { useState, useMemo } from "react";
import { getAIResponse } from "../api/ai";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [aiQuery, setAIQuery] = useState<string>("");
  const [aiResponse, setAIResponse] = useState<string | null>(null);
  const [relatedNotes, setRelatedNotes] = useState<NoteBase[] | null>(null);
  const [showAIOutput, setShowAIOutput] = useState<boolean>(false);
  const [loadingAI, setLoadingAI] = useState<boolean>(false);

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
    // Validation of input
    if (!aiQuery.trim()) {
      alert("Please enter a query for the AI.");
      setLoadingAI(false);
      return;
    }
    else if (aiQuery.trim().length < 8) {
      alert("Please enter a longer query for the AI.");
      setLoadingAI(false);
      return;
    }

    // Reset state
    setRelatedNotes(null);
    setAIResponse(null);
    setShowAIOutput(false);

    // Set UI and Loading states
    setLoadingAI(true);
    setShowAIOutput(true);
    e.preventDefault();

    // Fetch AI response
    const aiResponse = await getAIResponse(aiQuery);
    setAIResponse(aiResponse.ai_response);
    setRelatedNotes(aiResponse.related_notes);
    setLoadingAI(false);
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
      <InputAI handleSubmit={handleSubmitToAI} aiQuery={aiQuery} setAIQuery={setAIQuery} aiResponse={aiResponse} relatedNotes={relatedNotes} showAIOutput={showAIOutput} setShowAIOutput={setShowAIOutput} loadingAI={loadingAI}/>
      <NotesGrid 
        notes={filteredNotes}
        count={filteredNotes.length} />
    </div>
    </>
  )
}