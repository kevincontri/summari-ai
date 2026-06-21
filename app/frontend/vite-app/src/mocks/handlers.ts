import {http, HttpResponse } from "msw";
import type { LoginRequest, RegisterRequest, TokenResponse, UserBase } from "../types/auth_types";

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
];