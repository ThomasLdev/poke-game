import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Stats } from '@/components/PokemonDetailPage/Stats';
import type { PokemonStat } from '@/types/pokemon';

const stats: PokemonStat[] = [
  { base_stat: 78, stat: { name: 'hp', url: '' } },
  { base_stat: 84, stat: { name: 'attack', url: '' } },
  { base_stat: 100, stat: { name: 'speed', url: '' } },
];

describe('Stats', () => {
  it('renders the section heading', () => {
    render(<Stats stats={stats} />);

    expect(screen.getByText('Base Stats')).toBeInTheDocument();
  });

  it('renders each stat name and value', () => {
    render(<Stats stats={stats} />);

    expect(screen.getByText('hp')).toBeInTheDocument();
    expect(screen.getByText('78')).toBeInTheDocument();
    expect(screen.getByText('attack')).toBeInTheDocument();
    expect(screen.getByText('84')).toBeInTheDocument();
    expect(screen.getByText('speed')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('sets stat bar width based on base_stat', () => {
    const { container } = render(<Stats stats={[{ base_stat: 65, stat: { name: 'defense', url: '' } }]} />);

    const bar = container.querySelector('.bg-green-500');
    expect(bar).toHaveStyle({ width: '65%' });
  });
});
