import type { NoteBase } from "@/types/notes_types";
import AIMessageInput from "./AIMessageInput";
import AIMessageOutput from "./AIMessageOutput";

export default function InputAI({ handleSubmit, aiQuery, setAIQuery, aiResponse, relatedNotes, showAIOutput, setShowAIOutput, loadingAI }: { handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void; aiQuery: string; setAIQuery: (query: string) => void; aiResponse: string | null; relatedNotes: NoteBase[] | null; showAIOutput: boolean; setShowAIOutput: (show: boolean) => void; loadingAI: boolean }) {

  return (
    <>
      <AIMessageInput aiQuery={aiQuery} setAIQuery={setAIQuery} handleSubmit={handleSubmit} />
      <AIMessageOutput aiResponse={aiResponse} showAIOutput={showAIOutput} setShowAIOutput={setShowAIOutput} loadingAI={loadingAI} relatedNotes={relatedNotes} />
    </>
  )
}