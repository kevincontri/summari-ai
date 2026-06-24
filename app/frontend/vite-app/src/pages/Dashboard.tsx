import NotesGrid from "../components/NotesGrid";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotes, createNote, updateNote, deleteNote } from "../api/notes";
import { useAuthStore } from "../contexts/useAuthStore";
import type { NoteBase, NoteCreateRequest, NoteUpdateRequest } from "../types/notes_types";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Header from "../components/Header";
import InputAI from "../components/InputAI";
import { useState, useMemo } from "react";
import { getAIResponse } from "../api/ai";
import NoteModal from "../components/NoteModal";
import { Toaster } from "../components/ui/sonner";
import { toast } from "sonner";
import DarkModeSwitch from "../components/DarkModeSwitch";
import { useThemeStore } from "../contexts/useThemeStore";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [aiQuery, setAIQuery] = useState<string>("");
  const [aiResponse, setAIResponse] = useState<string | null>(null);
  const [relatedNotes, setRelatedNotes] = useState<NoteBase[] | null>(null);
  const [showAIOutput, setShowAIOutput] = useState<boolean>(false);
  const [loadingAI, setLoadingAI] = useState<boolean>(false);
  const [showNoteModal, setShowNoteModal] = useState<boolean>(false);
  const [currentNote, setCurrentNote] = useState<NoteBase | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");
  const [isNoteUpdating, setIsNoteUpdating] = useState<boolean>(false);
  const [bg_color, setBgColor] = useState<string | undefined>(undefined);
  const theme = useThemeStore((state) => state.theme);

  const queryClient = useQueryClient();

  const fetchNotes = async (): Promise<NoteBase[] | []> => await getNotes();
  
  // Fetch notes from API
  const { data: notes, isLoading: notesLoading, error: notesError } = useQuery<NoteBase[] | []>({
    queryKey: ['notes'],
    queryFn: fetchNotes,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
  
  if (notesError) {
    toast.error("Error fetching notes: " + (notesError as Error).message);
    console.error("Error fetching notes:", notesError);
  }

  const { mutate: saveNoteMutation, isPending: isCreatingNote } = useMutation({
    mutationFn: async (notePayload: NoteCreateRequest | NoteUpdateRequest) => {
      if (isNoteUpdating && currentNote?.id) {
        return await updateNote(currentNote.id, notePayload as NoteUpdateRequest);
      } else {
        return await createNote(notePayload as NoteCreateRequest);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.dismiss("save-note");
      toast.success("Note saved successfully!");

      // Reset state after saving the note
      setCurrentNote(null);
      setIsNoteUpdating(false);
      setShowNoteModal(false);
      setNewTitle("");
      setNewContent("");
      setBgColor(undefined);
    },
    onError: (error) => {
      toast.error("Error saving note: " + (error as Error).message);
      console.error("Error saving note:", error);
    }
  });

  const { mutate: deleteNoteMutation } = useMutation({
    mutationFn: async (noteId: number) => await deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success("Note deleted successfully!");
    },
    onError: (error) => {
      toast.error("Error deleting note: " + (error as Error).message);
      console.error("Error deleting note:", error);
    }
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }

  // Search tool
  const filteredNotes = useMemo(() => {
    const all = notes ?? [];
    const q = searchQuery.trim().toLowerCase(); 
    if (!q) return all; // If search query is empty, return all notes
    return all.filter(note => note.title.toLowerCase().includes(q) || note.content.toLowerCase().includes(q)); // Filter notes based on title or content matching the search query
  }, [notes, searchQuery]);

  const handleSubmitToAI = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    if (notes!.length === 0) {
      toast.warning("You have no notes to analyze. Please create some notes first.");
      setLoadingAI(false);
      return;
    }

    // Validation of input
    if (!aiQuery.trim()) {
      toast.warning("Please enter a query for the AI.");
      setLoadingAI(false);
      return;
    }
    else if (aiQuery.trim().length < 8) {
      toast.warning("Please enter a longer query for the AI.");
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

  const handleSaveNote = async (note: Omit<NoteBase, "id" | "created_at" | "user_id"> | Partial<Omit<NoteBase, "id" | "created_at" | "user_id">>): Promise<void> => {
    if (!note.title?.trim() && !note.content?.trim()) {
      toast.error("Please enter a title and content for the note.");
      return;
    }
    if (!note.title?.trim()) {
      toast.error("Please enter a title for the note.");
      return;
    }
    if (!note.content?.trim()) {
      toast.error("Please enter content for the note.");
      return;
    }
    if (note.title.length > 100 || note.title.length < 3) {
      toast.error("Title must be between 3 and 100 characters.");
      return;
    }
    if (note.content.length > 1000 || note.content.length < 3) {
      toast.error("Content must be between 3 and 1000 characters.");
      return;
    }

    toast.loading("Saving note...", { id: "save-note" });
    await saveNoteMutation(note);
  }

  const handleOpenNoteModal = (note_id: number | null, bg_color?: string) => {
    const selectedNote = note_id
      ? (notes?.find(note => note.id === note_id) ?? null)
      : null;

    setBgColor(bg_color);
    setIsNoteUpdating(selectedNote !== null);
    setCurrentNote(selectedNote);
    setNewTitle(selectedNote?.title ?? "");
    setNewContent(selectedNote?.content ?? "");
    setShowNoteModal(true);
  }

  const handleDeleteNote = async (note_id: number) => {
    await deleteNoteMutation(note_id);
  }

  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  return (
    <>
    <Toaster position="top-center" richColors theme={theme}/>

    { notesLoading && 
    <Loading /> 
    }
    <div className={theme === 'dark' ? "dashboard-page-dark" : "dashboard-page"}>
      {theme === 'dark' && <div className="z-1 pointer-events-none absolute top-0 right-0 w-100 h-90 md:bg-orange-500 rounded-full blur-[250px] opacity-40" />}
      <Header logout={logout} navigate={navigate} handleSearch={handleSearch} searchQuery={searchQuery} theme={theme} />
      
      <InputAI handleSubmit={handleSubmitToAI} aiQuery={aiQuery} setAIQuery={setAIQuery} aiResponse={aiResponse} relatedNotes={relatedNotes} showAIOutput={showAIOutput} setShowAIOutput={setShowAIOutput} loadingAI={loadingAI} handleOpenNoteModal={handleOpenNoteModal} />

      <NotesGrid 
        notes={filteredNotes}
        count={filteredNotes.length}
        handleOpenNoteModal={handleOpenNoteModal} 
        onDelete={handleDeleteNote} 
        theme={theme}/>

      {showNoteModal && 
        <NoteModal 
          setShowNoteModal={setShowNoteModal}
          handleCreateNote={handleSaveNote}
          isCreatingNote={isCreatingNote}
          currentNote={currentNote} 
          newTitle={newTitle} 
          setNewTitle={setNewTitle} 
          newContent={newContent} 
          setNewContent={setNewContent}
          bg_color={bg_color}
          theme={theme}
          />
      }
    </div>
    <DarkModeSwitch />
    </>
  )
}