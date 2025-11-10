import React from 'react';

// Performance optimization utilities

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Lazy loading utility for components
export const lazy = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) => {
  return React.lazy(importFunc);
};

// Virtualization helpers for large lists
export const getVisibleItems = <T>(
  items: T[],
  startIndex: number,
  visibleCount: number
): T[] => {
  return items.slice(startIndex, startIndex + visibleCount);
};

// Performance monitoring
export const measurePerformance = (name: string, fn: () => any) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
  return result;
};

// Optimized CSS-in-JS styles
export const optimizedStyles = {
  willChange: 'transform, opacity',
  backfaceVisibility: 'hidden' as const,
  perspective: 1000,
};

// Reduced motion preferences
export const respectsReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};