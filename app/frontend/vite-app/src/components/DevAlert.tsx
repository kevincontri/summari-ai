import { Button } from "@/components/ui/button"
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Transition } from '@headlessui/react'

export default function DevAlert({ setDevAlert, showAlert }: {setDevAlert: (value: boolean) => void; showAlert: boolean}) {
  return (
    <Transition
        show={Boolean(showAlert)}
        enter="transition duration-500 ease-out"
        enterFrom="translate-y-10 opacity-0 scale-95"
        enterTo="translate-y-0 opacity-100 scale-100"
        leave="transition duration-300 ease-in"
        leaveFrom="translate-y-0 opacity-100 scale-100"
        leaveTo="translate-y-10 opacity-0 scale-95"
      >
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-200 md:w-full w-85 max-w-md">
        <Alert variant="default">
          <AlertTitle>Note from developer</AlertTitle>
          <AlertDescription>
            <p className="text-sm text-muted-foreground">
              This may take a few seconds; the server is starting up..
            </p>
          </AlertDescription>
          <AlertAction>
            <Button size="sm" onClick={() => setDevAlert(false)}>Dismiss</Button>
          </AlertAction>
        </Alert>
      </div>
    </Transition>
  )
}