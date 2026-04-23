import { render, screen, fireEvent } from '@testing-library/react';
import { VoterReadiness } from '../components/VoterReadiness';
import { describe, it, expect } from 'vitest';

describe('VoterReadiness Component', () => {
  it('renders correctly', () => {
    render(<VoterReadiness />);
    expect(screen.getByText(/Citizen Readiness/i)).toBeInTheDocument();
    expect(screen.getByText(/0%/i)).toBeInTheDocument();
  });

  it('updates progress when a task is clicked', () => {
    render(<VoterReadiness />);
    const taskButton = screen.getByText(/Registered on NVSP/i);
    fireEvent.click(taskButton);
    expect(screen.getByText(/25%/i)).toBeInTheDocument();
  });

  it('shows trophy when all tasks are complete', () => {
    render(<VoterReadiness />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => fireEvent.click(button));
    expect(screen.getByText(/100%/i)).toBeInTheDocument();
    expect(screen.getByText(/You are a Ready Citizen/i)).toBeInTheDocument();
  });
});
