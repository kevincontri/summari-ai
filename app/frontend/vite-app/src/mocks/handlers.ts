import {http, HttpResponse } from "msw";
import type { LoginRequest, RegisterRequest, TokenResponse, UserBase } from "../types/auth_types";
import type { AIResponse } from "../types/ai_types";

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
  http.get("*/notes", async () => {
    return HttpResponse.json({ count: 4, data: [
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
      }
    ]}, { status: 200 });
  }),

  // Mock for AI response
  http.post<any, { prompt: string }, AIResponse>("*/ai/ask", async ({ request }) => {
    const { prompt } = await request.json();
    return HttpResponse.json({ ai_response: `This is the AI response for the prompt: ${prompt}` }, { status: 200 });
  }),
];