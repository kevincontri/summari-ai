import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "mt-1 block w-full bg-transparent border-t-0 border-x-0 border-b-2 border-gray-300 focus:border-green-400 focus:ring-0 outline-none px-0 py-2",
        className
      )}
      {...props}
    />
  )
}

export { Input }
