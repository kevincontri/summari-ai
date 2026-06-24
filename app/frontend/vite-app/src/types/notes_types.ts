export interface NoteBase {
  id: number;
  title: string;
  content: string;
  user_id: number;
  created_at: string;
}

export type NoteCreateRequest = Omit<NoteBase, "id" | "created_at" | "user_id">;

export type NoteUpdateRequest = Partial<Omit<NoteBase, "id" | "created_at" | "user_id">>;