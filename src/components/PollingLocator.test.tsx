import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PollingLocator } from './PollingLocator';

describe('PollingLocator Component', () => {
  it('renders the interactive map interface', () => {
    render(<PollingLocator />);
    expect(screen.getByPlaceholderText(/Search by area, pincode/i)).toBeInTheDocument();
  });

  it('renders standard polling stations', () => {
    render(<PollingLocator />);
    expect(screen.getByText(/St. Mary's Secondary School/i)).toBeInTheDocument();
    expect(screen.getByText(/Community Center — Ward 4/i)).toBeInTheDocument();
  });

  it('renders crowd status indicators', () => {
    render(<PollingLocator />);
    expect(screen.getByText(/Moderate Crowd/i)).toBeInTheDocument();
  });
});
