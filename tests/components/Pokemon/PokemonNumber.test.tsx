import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PokemonNumber } from '@/components/Pokemon/PokemonNumber';

describe('PokemonNumber', () => {
  it('renders #001 for id=1', () => {
    render(<PokemonNumber id={1} className="" />);
    expect(screen.getByText('#001')).toBeInTheDocument();
  });

  it('renders #999 for id=999', () => {
    render(<PokemonNumber id={999} className="" />);
    expect(screen.getByText('#999')).toBeInTheDocument();
  });
});
