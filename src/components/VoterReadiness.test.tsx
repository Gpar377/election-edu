import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { VoterReadiness } from './VoterReadiness';

describe('VoterReadiness Component', () => {
  it('renders correctly and shows 0% progress initially', () => {
    render(<VoterReadiness />);
    expect(screen.getByText(/Civic Readiness Score/i)).toBeInTheDocument();
    const zeroTexts = screen.getAllByText(/0%/i);
    expect(zeroTexts.length).toBeGreaterThan(0);
  });

  it('updates progress when a task is clicked', () => {
    render(<VoterReadiness />);
    const taskButton = screen.getByText(/Registered on NVSP/i);
    fireEvent.click(taskButton);
    const progressTexts = screen.getAllByText(/25%/i);
    expect(progressTexts.length).toBeGreaterThan(0);
  });

  it('shows trophy when all tasks are complete', () => {
    render(<VoterReadiness />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => fireEvent.click(button));
    const maxProgressTexts = screen.getAllByText(/100%/i);
    expect(maxProgressTexts.length).toBeGreaterThan(0);
    expect(screen.getByText(/You're a Ready Citizen/i)).toBeInTheDocument();
  });
});
