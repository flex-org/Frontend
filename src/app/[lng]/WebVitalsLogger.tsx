'use client';
import { reportWebVitals } from '@/lib/reportWebVitals';
import { useEffect } from 'react';

const WebVitalsLogger = () => {
    useEffect(() => {
        reportWebVitals(console.log);
    }, []);
    return null;
};

export default WebVitalsLogger;
