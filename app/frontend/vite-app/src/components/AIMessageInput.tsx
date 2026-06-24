import { Input } from "./ui/input";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip"

export default function AIMessageInput({ aiQuery, setAIQuery, handleSubmit, theme }: { aiQuery: string; setAIQuery: (query: string) => void; handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void; theme: string }) {

  return (
  <div className={theme === 'dark' ? "ai-input-container-dark" : "ai-input-container"}>
      <div className="flex flex-row items-center space-x-2 w-full">
        <div className={theme === 'dark' ? "ai-icon-container-dark" : "ai-icon-container"}>
          <img src="./src/assets/stars.png" alt="Stars Icon" className={theme === 'dark' ? "ai-icon-dark hover:animate-spin" : "ai-icon hover:animate-spin"} />
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

        <Tooltip>
          <TooltipTrigger>
          <div 
          className="send-icon-container"
          onClick={(e: any) => handleSubmit(e)}>
            <img src="./src/assets/send.png" alt="Send Icon" className="send-icon cursor-pointer" />
          </div>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Send to AI</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
    )
}