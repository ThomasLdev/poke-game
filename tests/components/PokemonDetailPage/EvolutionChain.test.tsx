import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { EvolutionChain } from '@/components/PokemonDetailPage/EvolutionChain';
import { renderWithProviders } from '@tests/utils/renderWithProviders';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

function jsonResponse(data: unknown) {
  return { ok: true, json: () => Promise.resolve(data) };
}

beforeEach(() => {
  mockFetch.mockReset();
});

const evolutionChainData = {
  id: 1,
  chain: {
    species: { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
    is_baby: false,
    evolution_details: [],
    evolves_to: [
      {
        species: { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon-species/2/' },
        is_baby: false,
        evolution_details: [{ trigger: { name: 'level-up', url: '' }, min_level: 16 }],
        evolves_to: [
          {
            species: { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon-species/3/' },
            is_baby: false,
            evolution_details: [{ trigger: { name: 'level-up', url: '' }, min_level: 32 }],
            evolves_to: [],
          },
        ],
      },
    ],
  },
};

describe('EvolutionChain', () => {
  it('renders skeleton while loading', () => {
    mockFetch.mockReturnValue(new Promise(() => {}));

    const { container } = renderWithProviders(
      <EvolutionChain pokemon_name="bulbasaur" evolution_chain_id={1} previousGridPage={1} />,
    );

    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders the full evolution chain after data loads', async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse(evolutionChainData));

    renderWithProviders(
      <EvolutionChain pokemon_name="bulbasaur" evolution_chain_id={1} previousGridPage={1} />,
    );

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
    expect(screen.getByText('venusaur')).toBeInTheDocument();
  });

  it('displays evolution levels', async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse(evolutionChainData));

    renderWithProviders(
      <EvolutionChain pokemon_name="bulbasaur" evolution_chain_id={1} previousGridPage={1} />,
    );

    await waitFor(() => {
      expect(screen.getByText('Lv. 16')).toBeInTheDocument();
    });
    expect(screen.getByText('Lv. 32')).toBeInTheDocument();
  });

  it('highlights the current pokemon', async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse(evolutionChainData));

    renderWithProviders(
      <EvolutionChain pokemon_name="ivysaur" evolution_chain_id={1} previousGridPage={1} />,
    );

    await waitFor(() => {
      expect(screen.getByText('ivysaur')).toHaveClass('text-yellow-400');
    });
    expect(screen.getByText('bulbasaur')).toHaveClass('text-white');
  });

  it('links each evolution to its detail page', async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse(evolutionChainData));

    renderWithProviders(
      <EvolutionChain pokemon_name="bulbasaur" evolution_chain_id={1} previousGridPage={1} />,
    );

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });

    const links = screen.getAllByRole('link');
    expect(links.map((l) => l.getAttribute('href'))).toEqual(['/pokemons/1', '/pokemons/2', '/pokemons/3']);
  });

  it('renders error message on fetch failure', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500, statusText: 'Internal Server Error' });

    renderWithProviders(
      <EvolutionChain pokemon_name="bulbasaur" evolution_chain_id={1} previousGridPage={1} />,
    );

    await waitFor(() => {
      expect(screen.getByText(/API error/)).toBeInTheDocument();
    });
  });
});
