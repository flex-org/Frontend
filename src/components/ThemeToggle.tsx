'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null; // Avoid hydration mismatch
    }

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <button
            onClick={toggleTheme}
            className="relative flex h-10 w-20 items-center rounded-full bg-gray-300 p-1 transition-colors dark:bg-gray-700"
            aria-label="Toggle theme"
        >
            {/* Slider */}
            <div
                className={`absolute h-8 w-8 rounded-full bg-white shadow-md transition-transform ${theme === 'dark' ? '-translate-x-10' : 'translate-x-0'
                    }`}
            />

            {/* Icons */}
            <div className="relative z-10 flex w-full justify-between px-1">
                <Sun className={`h-5 w-5 ${theme === 'light' ? 'text-yellow-500' : 'text-gray-400'}`} />
                <Moon className={`h-5 w-5 ${theme === 'dark' ? 'text-blue-400' : 'text-gray-400'}`} />
            </div>
        </button>
    );
}
