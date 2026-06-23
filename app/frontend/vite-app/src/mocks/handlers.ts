import {http, delay, HttpResponse } from "msw";
import type { LoginRequest, RegisterRequest, TokenResponse, UserBase } from "../types/auth_types";
import type { AIResponse } from "../types/ai_types";
import type { NoteBase, NoteCreateRequest, NoteUpdateRequest } from "../types/notes_types";

export const handlers = [
  // Mock for login endpoint
  http.post<any, LoginRequest, TokenResponse>("*/auth/login", async () => {
    return HttpResponse.json({
      access_token: "FAKE_TOKEN",
      token_type: "bearer"
    }, { status: 200 });
  }),

  // Mock for register endpoint
  http.post<any, RegisterRequest, UserBase>("*/auth/register", async ({ request }) => {
    const { email, username, password } = await request.json();
    return HttpResponse.json({
      id: 1,
      email,
      username,
      password,
      created_at: new Date().toISOString()
    }, { status: 201 });
  }),

  // Mock for fetching notes
  http.get<any, any, any>("*/notes", async () => {
    return HttpResponse.json(
      { notes: [
      {
        id: 1,
        title: "First note",
        content: "This is the first note",
        created_at: new Date().toISOString(),
        user_id: 1
      },
      {
        id: 2,
        title: "Second note",
        content: "This is the second note",
        created_at: new Date().toISOString(),
        user_id: 1
      },
      {
        id: 3,
        title: "Third note",
        content: "This is the third note",
        created_at: new Date().toISOString(),
        user_id: 1
      },
      {
        id: 4,
        title: "Fourth note",
        content: "This is the fourth note",
        created_at: new Date().toISOString(),
        user_id: 1
      }] }, { status: 200 });
  }),

  // Mock for AI response
  http.post<any, { prompt: string }, AIResponse>("*/ai/ask", async ({ request }) => {
    const { prompt } = await request.json();
    await delay(2000); // Simulate a delay for the AI response
    return HttpResponse.json(
      { ai_response: `This is the AI response for the prompt: ${prompt}`, related_notes: [{"id": 1, "title": "First note", "content": "This is the first note", "user_id": 1, "created_at": "2022-01-01T00:00:00.000Z"}, {"id": 2, "title": "Second note", "content": "This is the second note", "user_id": 1, "created_at": "2022-01-01T00:00:00.000Z"}] }, { status: 200 });
  }),

  // Mock for creating a note
  http.post<any, NoteCreateRequest, NoteBase>("*/notes", async ({ request }) => {
    const { title, content } = await request.json();
    return HttpResponse.json({ id: 1, title, content, created_at: new Date().toISOString(), user_id: 1 }, { status: 201 });
  }),

  // Mock for updating a note
  http.put<any, NoteUpdateRequest, NoteBase>("*/notes/:id", async ({ request, params }) => {
    const { title = "", content = "" } = await request.json();
    const noteId = parseInt(params.id as string, 10);
    return HttpResponse.json({ id: noteId, title, content, created_at: new Date().toISOString(), user_id: 1 }, { status: 200 });
  }),

  // Mock for deleting a note
  http.delete<any, any, { message: string }>("*/notes/:id", async ({ params }) => {
    const noteId = parseInt(params.id as string, 10);
    return HttpResponse.json({ message: `Note with id ${noteId} deleted successfully` }, { status: 200 });
  }),
];