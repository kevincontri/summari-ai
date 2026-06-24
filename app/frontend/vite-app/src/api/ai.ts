import api from './axios';
import type { AIResponse } from '../types/ai_types';

export const getAIResponse = async (prompt: string): Promise<AIResponse> => {
  const response = await api.post('/ai/ask', { prompt });
  return response.data;
}