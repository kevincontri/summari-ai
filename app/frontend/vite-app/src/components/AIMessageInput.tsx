import { Input } from "./ui/input";

export default function AIMessageInput({ aiQuery, setAIQuery, handleSubmit, theme }: { aiQuery: string; setAIQuery: (query: string) => void; handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void; theme: string }) {

  return (
  <div className={theme === 'dark' ? "ai-input-container-dark" : "ai-input-container"}>
      <div className="flex flex-row items-center space-x-2 w-full">
        <div className={theme === 'dark' ? "ai-icon-container-dark hover:animate-spin" : "ai-icon-container hover:animate-spin"}>
          <img src="./src/assets/stars.png" alt="Stars Icon" title="Summari AI" className={theme === 'dark' ? "ai-icon-dark" : "ai-icon"} />
        </div>

        <Input  
          placeholder="Ask Summari about your notes..." 
          variant="ai" 
          className={`${theme === 'dark' ? "placeholder:text-[#ffffff6d] text-gray-200" : "placeholder:text-gray-600"} placeholder:text-md`} 
          value={aiQuery}
          onChange={(e) => setAIQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
            }
          }}
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