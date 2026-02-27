export interface User {
    name: string;
    email: string;
}

export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;

    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    restoreSession: () => Promise<void>;
}

export interface HealthEntry {
    id: string;
    date: string;
    heartRate: number;
    systolic: number;
    diastolic: number;
    spo2: number;
    temperature: number;
}

export interface HealthState {
    entries: HealthEntry[];
    addEntry: (entry: HealthEntry) => void;
    restoreEntries: () => Promise<void>;
}

export interface HealthEntry {
    id: string;
    date: string;
    heartRate: number;
    systolic: number;
    diastolic: number;
    spo2: number;
    temperature: number;
    symptoms: string[];
    notes?: string;
}