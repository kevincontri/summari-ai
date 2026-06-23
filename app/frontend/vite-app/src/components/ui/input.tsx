import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

const loginInput = "mt-1 block w-full bg-transparent border-t-0 border-x-0 border-b-2 border-gray-300 focus:border-[#D06D3D] focus:ring-0 outline-none px-0 py-2"
const dashboardInput = "block w-full pr-4 bg-transparent border-none outline-none"
const aiInput = "block w-full bg-transparent border-none px-2"
const noteInput = "block w-full bg-transparent border-none px-2 py-1 resize-none outline-none "

function Input({ className, type, variant, ...props }: React.ComponentProps<"input"> & { variant?: "login" | "dashboard" | "ai" | "note" }) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        loginInput,
        variant == "dashboard" && dashboardInput,
        variant == "ai" && aiInput,
        variant == "note" && noteInput,
        className
      )}
      {...props}
    />
  )
}

export { Input }
