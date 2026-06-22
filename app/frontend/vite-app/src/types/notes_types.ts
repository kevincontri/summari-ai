export interface NoteBase {
  id: number;
  title: string;
  content: string;
  user_id: number;
  created_at: string;
}

export interface NoteResponse {
  count: number;
  data: NoteBase[];
}
