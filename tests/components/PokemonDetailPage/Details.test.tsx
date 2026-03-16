import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Details } from '@/components/PokemonDetailPage/Details';
import type { Pokemon } from '@/types/pokemon';

const pokemon: Pokemon = {
  id: 6,
  name: 'charizard',
  height: 17,
  weight: 905,
  base_experience: 267,
  order: 6,
  types: [{ slot: 1, type: { name: 'fire', url: '' } }],
  stats: [],
  abilities: [
    { ability: { name: 'blaze', url: '' }, is_hidden: false },
    { ability: { name: 'solar-power', url: '' }, is_hidden: true },
  ],
  sprites: { other: { 'official-artwork': { front_default: '' } } },
  moves: [],
  species_detail: null,
};

describe('Details', () => {
  it('renders skeleton when pokemon is null', () => {
    const { container } = render(<Details pokemon={null} />);

    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('computes and displays height in meters', () => {
    render(<Details pokemon={pokemon} />);

    expect(screen.getByText('1.7 meter(s)')).toBeInTheDocument();
  });

  it('computes and displays weight in kilograms', () => {
    render(<Details pokemon={pokemon} />);

    expect(screen.getByText('90.5 kg(s)')).toBeInTheDocument();
  });

  it('displays base experience', () => {
    render(<Details pokemon={pokemon} />);

    expect(screen.getByText('267')).toBeInTheDocument();
  });

  it('shows the first non-hidden ability as primary', () => {
    render(<Details pokemon={pokemon} />);

    expect(screen.getAllByText('blaze')).toHaveLength(2);
  });

  it('labels hidden abilities', () => {
    render(<Details pokemon={pokemon} />);

    expect(screen.getByText(/solar-power/)).toHaveTextContent('solar-power (Hidden)');
  });
});
