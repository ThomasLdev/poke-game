import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { Grid } from '@/components/PokemonListPage/Grid';
import type { Pokemon, PokemonListResponse } from '@/types/pokemon';

function makePokemon(overrides: Partial<Pokemon> & { id: number; name: string }): Pokemon {
  return {
    height: 7,
    weight: 69,
    base_experience: 64,
    order: overrides.id,
    types: [{ slot: 1, type: { name: 'grass', url: '' } }],
    stats: [],
    abilities: [],
    sprites: { other: { 'official-artwork': { front_default: `https://img/${overrides.id}.png` } } },
    ...overrides,
  };
}

const mockData: PokemonListResponse = {
  count: 2,
  next: null,
  previous: null,
  results: [makePokemon({ id: 1, name: 'bulbasaur' }), makePokemon({ id: 4, name: 'charmander' })],
};

describe('Grid', () => {
  it('renders skeleton cards when showSkeleton is true', () => {
    const { container } = render(<Grid data={null} showSkeleton={true} />);

    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons).toHaveLength(20);
  });

  it('renders pokemon cards when data is provided', () => {
    render(
      <MemoryRouter>
        <Grid data={mockData} showSkeleton={false} />
      </MemoryRouter>,
    );

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('charmander')).toBeInTheDocument();
  });

  it('renders pokemon images with correct alt text', () => {
    render(
      <MemoryRouter>
        <Grid data={mockData} showSkeleton={false} />
      </MemoryRouter>,
    );

    expect(screen.getByAltText('bulbasaur')).toHaveAttribute('src', 'https://img/1.png');
    expect(screen.getByAltText('charmander')).toHaveAttribute('src', 'https://img/4.png');
  });

  it('links each card to the correct detail page', () => {
    render(
      <MemoryRouter>
        <Grid data={mockData} showSkeleton={false} />
      </MemoryRouter>,
    );

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/pokemons/1');
    expect(links[1]).toHaveAttribute('href', '/pokemons/4');
  });
});
