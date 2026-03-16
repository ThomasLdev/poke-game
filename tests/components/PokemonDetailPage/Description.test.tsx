import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Description } from '@/components/PokemonDetailPage/Description';
import type { PokemonSpecies } from '@/types/pokemon';

describe('Description', () => {
  it('renders skeleton when speciesDetails is null', () => {
    const { container } = render(<Description speciesDetails={null} />);

    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders flavor text with newlines and form feeds replaced by spaces', () => {
    const species: PokemonSpecies = {
      flavor_text_entries: [
        { flavor_text: 'It breathes fire\nof such great\fheat.', language: { name: 'en' }, version: { name: 'red' } },
      ],
      evolution_chain: { url: '' },
    };

    render(<Description speciesDetails={species} />);

    expect(screen.getByText('It breathes fire of such great heat.')).toBeInTheDocument();
  });
});
