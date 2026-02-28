import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { GridSkeletonCard } from '@/components/PokemonListPage/GridSkeletonCard';

describe('GridSkeletonCard', () => {
  it('renders with the pulse animation', () => {
    const { container } = render(<GridSkeletonCard />);

    expect(container.firstElementChild).toHaveClass('animate-pulse');
  });
});
