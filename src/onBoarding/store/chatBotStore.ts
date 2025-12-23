import { create } from 'zustand';
import { Message } from '../types';

interface gomaaProps {
    messages: Message[];
    addMessage: (message: Message) => void;
    botMessage: string;
    setBotMessage: (msg: string) => void;
    isCompleted: boolean;
    setIsCompleted: (state: boolean) => void;
}

export const useChatBotStore = create<gomaaProps>((set) => ({
    messages: [
        {
            role: 'bot',
            content: 'welcome-message',
        },
    ],
    addMessage: (message: Message) =>
        set((state) => ({ messages: [...state.messages, message] })),
    botMessage: '',
    setBotMessage: (msg: string) => set({ botMessage: msg }),
    isCompleted: false,
    setIsCompleted: (state: boolean) => set({ isCompleted: state }),
}));
