import { create } from 'zustand';
import { mockLogin } from '../services/authService';
import { storage } from './storage';
import { AuthState, HealthState } from './types';

const AUTH_KEY = 'auth_user';
const HEALTH_KEY = 'health_entries';

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: false,
    error: null,

    login: async (email, password) => {
        try {
            set({ loading: true, error: null });

            const user = await mockLogin(email, password);

            await storage.setItem(AUTH_KEY, user);

            set({ user, loading: false });
        } catch (error: any) {
            set({
                error: error.message || 'Login failed',
                loading: false,
            });
        }
    },

    logout: async () => {
        await storage.removeItem(AUTH_KEY);
        set({ user: null });
    },

    restoreSession: async () => {
        const user = await storage.getItem(AUTH_KEY);
        if (user) {
            set({ user });
        }
    },
}));

export const useHealthStore = create<HealthState>((set) => ({
    entries: [],

    addEntry: async (entry) => {
        set((state) => {
            const updatedEntries = [entry, ...state.entries];
            storage.setItem(HEALTH_KEY, updatedEntries); // persist
            return { entries: updatedEntries };
        });
    },

    restoreEntries: async () => {
        const storedEntries = await storage.getItem(HEALTH_KEY);
        if (storedEntries) {
            set({ entries: storedEntries });
        }
    },
}));