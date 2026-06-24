import type { NoteBase } from "./notes_types";

export interface AIResponse {
  ai_response: string;
  related_notes : NoteBase[];
}