import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Assistant } from './Assistant';

// Mock the Gemini service
vi.mock('../services/GeminiService', () => ({
  chatWithGemini: vi.fn().mockResolvedValue('Mocked AI response'),
}));

describe('Assistant Component', () => {
  it('renders initial welcome message', () => {
    render(<Assistant />);
    expect(screen.getByText(/Jai Hind/i)).toBeInTheDocument();
  });

  it('handles user input and submits', async () => {
    render(<Assistant />);
    const input = screen.getByPlaceholderText(/Ask about voting, registration, candidates/i);
    
    fireEvent.change(input, { target: { value: 'How to vote?' } });
    expect(input).toHaveValue('How to vote?');
    
    const buttons = screen.getAllByRole('button');
    const sendButton = buttons[buttons.length - 1];
    fireEvent.click(sendButton);
    
    // User message should appear
    expect(screen.getByText('How to vote?')).toBeInTheDocument();
    
    // AI response should appear after mock resolves
    await waitFor(() => {
      expect(screen.getByText('Mocked AI response')).toBeInTheDocument();
    });
  });

  it('renders quick prompts and allows clicking them', () => {
    render(<Assistant />);
    const quickPrompt = screen.getByText(/How do I check my voter registration/i);
    fireEvent.click(quickPrompt);
    
    expect(screen.getByText(/How do I check my voter registration/i)).toBeInTheDocument();
  });
});
