import { describe, expect, it, vi, beforeEach } from 'vitest';
import { getPokemonDetail, getMove, getPokemonEvolutionChain, getPokemonList } from '@/api/pokemon';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

function jsonResponse(data: unknown) {
  return { ok: true, json: () => Promise.resolve(data) };
}

beforeEach(() => {
  mockFetch.mockReset();
});

describe('getPokemonDetail', () => {
  it('fetches pokemon and species then merges them', async () => {
    const pokemon = { id: 1, name: 'bulbasaur' };
    const species = {
      flavor_text_entries: [
        { flavor_text: 'A seed.', language: { name: 'en' }, version: { name: 'red' } },
        { flavor_text: 'Graine.', language: { name: 'fr' }, version: { name: 'red' } },
      ],
    };

    mockFetch
      .mockResolvedValueOnce(jsonResponse(pokemon))
      .mockResolvedValueOnce(jsonResponse(species));

    const result = await getPokemonDetail(1);

    expect(result).toEqual({
      ...pokemon,
      species_detail: { flavor_text_entries: [{ flavor_text: 'A seed.', language: { name: 'en' }, version: { name: 'red' } }] },
    });
  });
});

describe('getMove', () => {
  it('fetches a move by name', async () => {
    const move = { name: 'tackle', power: 40 };
    mockFetch.mockResolvedValueOnce(jsonResponse(move));

    const result = await getMove('tackle');

    expect(result).toEqual(move);
  });
});

describe('getPokemonEvolutionChain', () => {
  it('fetches an evolution chain by id', async () => {
    const chain = { id: 1, chain: { species: { name: 'bulbasaur' } } };
    mockFetch.mockResolvedValueOnce(jsonResponse(chain));

    const result = await getPokemonEvolutionChain(1);

    expect(result).toEqual(chain);
  });
});

describe('getPokemonList', () => {
  it('fetches list then fetches details for each result', async () => {
    const list = {
      count: 1,
      next: null,
      previous: null,
      results: [{ name: 'bulbasaur', url: '' }],
    };
    const detail = { id: 1, name: 'bulbasaur' };

    mockFetch
      .mockResolvedValueOnce(jsonResponse(list))
      .mockResolvedValueOnce(jsonResponse(detail));

    const result = await getPokemonList(20, 0);

    expect(result.results).toEqual([detail]);
    expect(result.count).toBe(1);
  });
});
