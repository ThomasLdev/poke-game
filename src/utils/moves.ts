import type { MoveDetail, PokemonMoveEntry } from '@/types/pokemon';

const MAX_MOVES = 8;
const MAX_CANDIDATES = 20;

export function selectCandidates(rawMoves: PokemonMoveEntry[]): string[] {
  const levelUp: PokemonMoveEntry[] = [];
  const machine: PokemonMoveEntry[] = [];

  for (const entry of rawMoves) {
    const methods = entry.version_group_details.map((d) => d.move_learn_method.name);
    if (methods.includes('level-up')) {
      levelUp.push(entry);
    } else if (methods.includes('machine')) {
      machine.push(entry);
    }
  }

  const candidates = [...levelUp];
  for (const m of machine) {
    if (candidates.length >= MAX_CANDIDATES) break;
    candidates.push(m);
  }

  return candidates.slice(0, MAX_CANDIDATES).map((e) => e.move.name);
}

export function selectDiverseMoves(details: MoveDetail[]): MoveDetail[] {
  const byType = new Map<string, MoveDetail>();

  for (const move of details) {
    const typeName = move.type.name;
    const existing = byType.get(typeName);
    if (!existing || (move.power ?? 0) > (existing.power ?? 0)) {
      byType.set(typeName, move);
    }
  }

  const selected = new Set<string>();
  const result: MoveDetail[] = [];

  // One move per unique type first
  for (const move of byType.values()) {
    if (result.length >= MAX_MOVES) break;
    result.push(move);
    selected.add(move.name);
  }

  // Fill remaining with highest-power moves
  if (result.length < MAX_MOVES) {
    const remaining = details
      .filter((m) => !selected.has(m.name))
      .sort((a, b) => (b.power ?? 0) - (a.power ?? 0));

    for (const move of remaining) {
      if (result.length >= MAX_MOVES) break;
      result.push(move);
    }
  }

  return result;
}
