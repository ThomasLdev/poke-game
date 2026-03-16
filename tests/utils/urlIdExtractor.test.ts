import { describe, expect, it } from 'vitest';
import { extract } from '@/utils/urlIdExtractor';

describe('extract', () => {
  it('extracts the numeric id from a PokeAPI URL', () => {
    expect(extract('https://pokeapi.co/api/v2/evolution-chain/1/')).toBe(1);
  });

  it('handles URLs without trailing slash', () => {
    expect(extract('https://pokeapi.co/api/v2/pokemon/25')).toBe(25);
  });
});
