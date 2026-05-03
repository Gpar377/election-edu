import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
window.IntersectionObserver = MockIntersectionObserver as any;

// Mock Gemini Service
vi.mock('./services/GeminiService', () => ({
  chatWithGemini: vi.fn().mockResolvedValue('Mocked AI response'),
}));

describe('App Component', () => {
  it('renders the main application without crashing', async () => {
    render(<App />);
    const headers = screen.getAllByText(/ElectionEdu/i);
    expect(headers.length).toBeGreaterThan(0);
  });

  it('lazy loads components correctly', async () => {
    render(<App />);
    
    // Check if the suspense fallbacks or the actual components are eventually rendered
    await waitFor(() => {
      // Timeline section text should be present (not lazy loaded, but its content is)
      expect(screen.getByText(/India's Democratic Process/i)).toBeInTheDocument();
    });
  });
});
