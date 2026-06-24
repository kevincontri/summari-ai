import api from './axios';
import type { NoteBase } from '../types/notes_types';

export const getNotes = async (): Promise<NoteBase[]> => {
    const response = await api.get('/notes');
    return response.data.notes;
}

export const createNote = async (note: Omit<NoteBase, 'id' | 'created_at' | 'user_id'>): Promise<NoteBase> => {
    console.log("Creating note:", note);
    const response = await api.post('/notes', note);
    return response.data;
}

export const getNote = async (id: number): Promise<NoteBase> => {
    const response = await api.get(`/notes/${id}`);
    return response.data;
}

export const updateNote = async (id: number, note: Partial<Omit<NoteBase, 'id' | 'created_at' | 'user_id'>>): Promise<NoteBase> => {
    const response = await api.put(`/notes/${id}`, note);
    return response.data;
}

export const deleteNote = async (id: number): Promise<void> => {
    await api.delete(`/notes/${id}`);
}