'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import ToolTipComponent from './ToolTipComponent';

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    const toggleTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };
    return (
        <ToolTipComponent
            label={`switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'}`}
        >
            <Button
                onClick={toggleTheme}
                variant="outline"
                size="icon"
                aria-label="switch mode"
                name="switch mode"
                // className="hover:border-green-500 dark:hover:border-green-400"
            >
                {resolvedTheme === 'dark' ? (
                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 transition-all" />
                ) : (
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-all dark:scale-100" />
                )}
            </Button>
        </ToolTipComponent>
    );
}
