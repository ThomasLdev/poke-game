import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PokemonTypes } from '@/components/Pokemon/PokemonTypes';
import type { PokemonType } from '@/types/pokemon';

const fireType: PokemonType = { slot: 1, type: { name: 'fire', url: '' } };
const flyingType: PokemonType = { slot: 2, type: { name: 'flying', url: '' } };

describe('PokemonTypes', () => {
  it('renders each type name', () => {
    render(<PokemonTypes pokemonTypes={[fireType, flyingType]} className="" />);

    expect(screen.getByText('fire')).toBeInTheDocument();
    expect(screen.getByText('flying')).toBeInTheDocument();
  });

  it('applies the type-specific CSS class', () => {
    render(<PokemonTypes pokemonTypes={[fireType]} className="" />);

    expect(screen.getByText('fire')).toHaveClass('type-fire');
  });

  it('applies the custom className', () => {
    render(<PokemonTypes pokemonTypes={[fireType]} className="px-2 text-xs" />);

    expect(screen.getByText('fire')).toHaveClass('px-2 text-xs');
  });

  it('renders nothing for an empty array', () => {
    const { container } = render(<PokemonTypes pokemonTypes={[]} className="" />);

    expect(container).toBeEmptyDOMElement();
  });
});
