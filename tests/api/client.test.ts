import { describe, expect, it, vi } from 'vitest';
import { get } from '@/api/client';

describe('get', () => {
  it('returns parsed JSON on success', async () => {
    const data = { name: 'pikachu', id: 25 };
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify(data), { status: 200 }),
    );

    const result = await get<{ name: string; id: number }>('/pokemon/25');

    expect(result).toEqual(data);
  });

  it('throws on HTTP error with status info', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(null, { status: 404, statusText: 'Not Found' }),
    );

    await expect(get('/pokemon/0')).rejects.toThrow(
      'API error: 404 Not Found',
    );
  });
});
