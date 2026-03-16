import { describe, expect, it } from 'vitest';
import { selectCandidates, selectDiverseMoves } from '@/utils/moves';
import type { MoveDetail, PokemonMoveEntry } from '@/types/pokemon';

function makeMove(name: string, method: string): PokemonMoveEntry {
  return {
    move: { name, url: '' },
    version_group_details: [
      { level_learned_at: 1, move_learn_method: { name: method, url: '' }, version_group: { name: '', url: '' } },
    ],
  };
}

function makeMoveDetail(name: string, type: string, power: number | null): MoveDetail {
  return { name, type: { name: type, url: '' }, power, accuracy: 100, pp: 10, damage_class: { name: 'physical', url: '' } };
}

describe('selectCandidates', () => {
  it('prioritises level-up moves over machine moves', () => {
    const moves = [
      makeMove('tackle', 'level-up'),
      makeMove('tm-move', 'machine'),
    ];

    const result = selectCandidates(moves);

    expect(result[0]).toBe('tackle');
    expect(result).toContain('tm-move');
  });

  it('caps output at 20 candidates', () => {
    const moves = Array.from({ length: 30 }, (_, i) => makeMove(`move-${i}`, 'level-up'));

    expect(selectCandidates(moves)).toHaveLength(20);
  });

  it('fills with machine moves when level-up moves are fewer than 20', () => {
    const levelUp = Array.from({ length: 5 }, (_, i) => makeMove(`lu-${i}`, 'level-up'));
    const machine = Array.from({ length: 5 }, (_, i) => makeMove(`tm-${i}`, 'machine'));

    const result = selectCandidates([...levelUp, ...machine]);

    expect(result).toHaveLength(10);
    expect(result.filter((n) => n.startsWith('lu-'))).toHaveLength(5);
    expect(result.filter((n) => n.startsWith('tm-'))).toHaveLength(5);
  });

  it('ignores moves that are neither level-up nor machine', () => {
    const moves = [makeMove('egg-move', 'egg'), makeMove('tackle', 'level-up')];

    expect(selectCandidates(moves)).toEqual(['tackle']);
  });
});

describe('selectDiverseMoves', () => {
  it('picks one move per type, preferring higher power', () => {
    const details = [
      makeMoveDetail('weak-fire', 'fire', 40),
      makeMoveDetail('strong-fire', 'fire', 90),
      makeMoveDetail('water-gun', 'water', 40),
    ];

    const result = selectDiverseMoves(details);

    expect(result.find((m) => m.type.name === 'fire')!.name).toBe('strong-fire');
    expect(result.find((m) => m.type.name === 'water')!.name).toBe('water-gun');
    expect(result).toHaveLength(3);
  });

  it('caps result at 8 moves', () => {
    const details = Array.from({ length: 15 }, (_, i) =>
      makeMoveDetail(`move-${i}`, `type-${i}`, 50),
    );

    expect(selectDiverseMoves(details)).toHaveLength(8);
  });

  it('fills remaining slots with highest-power moves after type diversity', () => {
    const details = [
      makeMoveDetail('fire-blast', 'fire', 110),
      makeMoveDetail('flamethrower', 'fire', 90),
      makeMoveDetail('ember', 'fire', 40),
    ];

    const result = selectDiverseMoves(details);

    expect(result[0].name).toBe('fire-blast');
    expect(result[1].name).toBe('flamethrower');
    expect(result[2].name).toBe('ember');
  });

  it('returns empty array for empty input', () => {
    expect(selectDiverseMoves([])).toEqual([]);
  });
});
