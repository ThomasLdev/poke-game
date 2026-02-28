import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Header } from '@/components/Layout/Header';

describe('Header', () => {
  it('renders the brand name linking to home', () => {
    render(<Header />);

    const link = screen.getByRole('link', { name: 'PokéSearch' });
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders the search input', () => {
    render(<Header />);

    expect(screen.getByRole('textbox', { name: 'Search Pokémon' })).toBeInTheDocument();
  });
});
