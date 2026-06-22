import { Input } from "../components/ui/input"

export default function InputAI({ handleSubmit }: { handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) {
  return (
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
  )
}