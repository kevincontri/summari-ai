import type { NoteBase } from "@/types/notes_types";
import AIMessageInput from "./AIMessageInput";
import AIMessageOutput from "./AIMessageOutput";
import { useThemeStore } from "../contexts/useThemeStore";

export default function InputAI({ handleSubmit, aiQuery, setAIQuery, aiResponse, relatedNotes, showAIOutput, setShowAIOutput, loadingAI, handleOpenNoteModal }: { handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void; aiQuery: string; setAIQuery: (query: string) => void; aiResponse: string | null; relatedNotes: NoteBase[] | null; showAIOutput: boolean; setShowAIOutput: (show: boolean) => void; loadingAI: boolean; handleOpenNoteModal: (noteId: number) => void }) {
  const theme = useThemeStore((state) => state.theme);
  return (
    <>
      <AIMessageInput aiQuery={aiQuery} setAIQuery={setAIQuery} handleSubmit={handleSubmit} theme={theme} />
      <AIMessageOutput aiResponse={aiResponse} showAIOutput={showAIOutput} setShowAIOutput={setShowAIOutput} loadingAI={loadingAI} relatedNotes={relatedNotes} handleOpenNoteModal={handleOpenNoteModal} theme={theme}/>
    </>
  )
}