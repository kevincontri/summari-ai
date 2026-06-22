import { Input } from "../components/ui/input"

export default function InputAI({ handleSubmit, aiQuery, setAIQuery }: { handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void; aiQuery: string; setAIQuery: (query: string) => void }) {
  return (
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
  )
}