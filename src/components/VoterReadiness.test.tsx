import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { VoterReadiness } from './VoterReadiness';

describe('VoterReadiness Component', () => {
  it('renders the readiness title', () => {
    render(<VoterReadiness />);
    const heading = screen.getByText(/Voter Readiness Check/i);
    expect(heading).toBeInTheDocument();
  });

  it('updates progress when a task is clicked', () => {
    render(<VoterReadiness />);
    
    // Initial state should be 0%
    let progressText = screen.getByText('0%');
    expect(progressText).toBeInTheDocument();

    // Find the first task and click it
    const firstTask = screen.getByText('Registered on NVSP');
    fireEvent.click(firstTask);

    // Progress should update to 25% (1 out of 4 tasks)
    progressText = screen.getByText('25%');
    expect(progressText).toBeInTheDocument();
  });
});
