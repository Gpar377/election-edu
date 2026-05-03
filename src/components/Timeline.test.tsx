import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Timeline } from './Timeline';

// Mock IntersectionObserver for framer-motion useInView
const mockIntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});

describe('Timeline Component', () => {
  it('renders all timeline steps', () => {
    render(<Timeline />);
    
    // Check if the first step renders
    expect(screen.getByText('Registration')).toBeInTheDocument();
    
    // Check if the last step renders
    expect(screen.getByText('Results')).toBeInTheDocument();
  });
});
