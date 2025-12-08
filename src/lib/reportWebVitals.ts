import { onCLS, onINP, onLCP, onTTFB, onFCP } from 'web-vitals';
import type { Metric } from 'web-vitals';

export function reportWebVitals(onPerfEntry?: (metric: Metric) => void) {
    if (!onPerfEntry) return;
    onCLS(onPerfEntry);
    onINP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
    onFCP(onPerfEntry);
}
