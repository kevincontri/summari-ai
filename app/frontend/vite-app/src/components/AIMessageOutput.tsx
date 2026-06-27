import { Transition } from "@headlessui/react";
import { ScaleLoader } from "react-spinners";
import { X } from 'lucide-react';
import type { NoteBase } from "@/types/notes_types";
import NoteReference from "./NoteReference";
import starsIcon from "../assets/stars.png";

export default function AIMessageOutput({ aiResponse, showAIOutput, setShowAIOutput, loadingAI, relatedNotes, handleOpenNoteModal, theme }: { aiResponse: string | null; showAIOutput: boolean; setShowAIOutput: (show: boolean) => void; loadingAI: boolean; relatedNotes: NoteBase[] | null; handleOpenNoteModal: (noteId: number) => void; theme: string }) {
  return (
    <Transition
      show={Boolean(showAIOutput)}
      enter="transition duration-300 ease-out"
      enterFrom="opacity-0 translate-y-[-4] scale-95"
      enterTo="opacity-100 translate-y-0 scale-100"
      leave="transition duration-200 ease-in"
      leaveFrom="opacity-100 translate-y-0 scale-100"
      leaveTo="opacity-0 translate-y-[-4] scale-95"
      >
      <div className={`ai-output-container ${theme === 'dark' ? "ai-output-container-dark" : "ai-output-container"}`}>
        {loadingAI && 
          <div className="loading-container">
           <ScaleLoader color="#D06D3D" height={35} width={4} radius={2} margin={2} speedMultiplier={0.6}/>
          </div>
        }
        {aiResponse && !loadingAI && (
        <div>
          <div className="ai-output-header">
            <div className="flex flex-row items-center space-x-2">
              <img src={starsIcon} alt="Stars Icon" title="Summari AI" className={theme === 'dark' ? "ai-icon-dark" : "ai-icon"} />
              <h2 className={theme === 'dark' ? "ai-output-title-dark" : "ai-output-title"}>Summari</h2>
            </div>
            <X onClick={() => setShowAIOutput(false)} className="cursor-pointer" color={`${theme === 'dark' ? "#ffffff" : "#000000"}`}/>
          </div>
        </div>
        )}
        <div className="ai-output-content">
          <p className={theme === 'dark' ? "ai-output-text-dark" : "ai-output-text"}>{aiResponse}</p>
        </div>
        <div className="flex flex-col md:flex-row items-center md:space-x-2">
          {relatedNotes?.map((note) => (
            <NoteReference key={note.id} note={note} handleOpenNoteModal={handleOpenNoteModal} theme={theme} />
          ))}
        </div>
      </div>
      </Transition>
  )
}