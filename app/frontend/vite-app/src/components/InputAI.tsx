import { Input } from "../components/ui/input"
import { X } from 'lucide-react';

export default function InputAI({ handleSubmit, aiQuery, setAIQuery }: { handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void; aiQuery: string; setAIQuery: (query: string) => void }) {
  return (
    <>
    <div className="ai-input-container">
      <div className="flex flex-row items-center space-x-2 w-full">
        <div className="ai-icon-container hover:animate-spin">
          <img src="./src/assets/stars.png" alt="Stars Icon" title="Summari AI" className="ai-icon" />
        </div>

        <Input 
          required 
          placeholder="Ask Summari about your notes..." 
          variant="ai" 
          className="placeholder:text-gray-800 placeholder:text-md" 
          value={aiQuery}
          onChange={(e) => setAIQuery(e.target.value)}
        />

        <div 
        className="send-icon-container"
        onClick={(e: any) => handleSubmit(e)}>
          <img src="./src/assets/send.png" alt="Send Icon" className="send-icon cursor-pointer" />
        </div>
      </div>
    </div>
    {/* Output Modal */}
    <div className="ai-output-container">
      <div className="ai-output-header">
        <div className="flex flex-row items-center space-x-2">
          <img src="./src/assets/stars.png" alt="Stars Icon" title="Summari AI" className="ai-icon" />
          <h2 className="ai-output-title">Summari</h2>
        </div>
        <X onClick={() => setAIQuery("")} className="cursor-pointer"/>
      </div>
      {/* TODO: MAKE THIS DYNAMIC + COMPONENT DEDICATED FOR THIS */}
      <div className="ai-output-content">
        <p className="ai-output-text">Here's what I found across your notes: "Embeddings vs. keyword search: what actually wins" looks most relevant — Cosine similarity holds up surprisingly well on short notes.</p>
      </div>
      <div className="flex flex-col md:flex-row items-center md:space-x-2">
        <div className="note-opener-container">
          <img src="./src/assets/dot.png" alt="Dot Icon" className="cursor-pointer h-2.5" />
          <span className="note-opener">Embeddings vs. keyword search: what actually wins</span>
        </div>
        <div className="note-opener-container">
          <img src="./src/assets/dot.png" alt="Dot Icon" className="cursor-pointer h-2.5" />
          <span className="note-opener">Embeddings vs. keyword search: what actually wins</span>
        </div>
      </div>
    </div>
  </>
  )
}