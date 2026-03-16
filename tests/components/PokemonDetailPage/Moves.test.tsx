import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { Moves } from '@/components/PokemonDetailPage/Moves';
import { renderWithProviders } from '@tests/utils/renderWithProviders';
import type { PokemonMoveEntry } from '@/types/pokemon';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

function jsonResponse(data: unknown) {
  return { ok: true, json: () => Promise.resolve(data) };
}

function makeRawMove(name: string, method: string): PokemonMoveEntry {
  return {
    move: { name, url: '' },
    version_group_details: [
      { level_learned_at: 1, move_learn_method: { name: method, url: '' }, version_group: { name: '', url: '' } },
    ],
  };
}

beforeEach(() => {
  mockFetch.mockReset();
});

describe('Moves', () => {
  it('renders skeleton when rawMoves is null', () => {
    const { container } = renderWithProviders(<Moves rawMoves={null} />);

    expect(container.querySelectorAll('.animate-pulse')).toHaveLength(8);
  });

  it('renders move names after loading', async () => {
    const rawMoves = [makeRawMove('tackle', 'level-up'), makeRawMove('growl', 'level-up')];

    mockFetch
      .mockResolvedValueOnce(jsonResponse({ name: 'tackle', type: { name: 'normal', url: '' }, power: 40, accuracy: 100, pp: 35, damage_class: { name: 'physical', url: '' } }))
      .mockResolvedValueOnce(jsonResponse({ name: 'growl', type: { name: 'normal', url: '' }, power: null, accuracy: 100, pp: 40, damage_class: { name: 'status', url: '' } }));

    renderWithProviders(<Moves rawMoves={rawMoves} />);

    await waitFor(() => {
      expect(screen.getByText('tackle')).toBeInTheDocument();
    });
    expect(screen.getByText('growl')).toBeInTheDocument();
  });

  it('renders hyphenated move names with spaces', async () => {
    const rawMoves = [makeRawMove('vine-whip', 'level-up')];

    mockFetch.mockResolvedValueOnce(jsonResponse({ name: 'vine-whip', type: { name: 'grass', url: '' }, power: 45, accuracy: 100, pp: 25, damage_class: { name: 'physical', url: '' } }));

    renderWithProviders(<Moves rawMoves={rawMoves} />);

    await waitFor(() => {
      expect(screen.getByText('vine whip')).toBeInTheDocument();
    });
  });
});
