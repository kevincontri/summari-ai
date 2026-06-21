import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

async function enableMocking() {
  //return; // Disable MSW for now.
  // @ts-ignore
  if (import.meta.env.MODE !== "development") return;
  const { worker } = await import("./mocks/browser.js");
  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>,
  );
});
