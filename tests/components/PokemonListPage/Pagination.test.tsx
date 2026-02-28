import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Pagination } from '@/components/PokemonListPage/Pagination';

const defaults = {
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20',
  onPageChange: vi.fn(),
  limit: 20,
  offset: 20,
  loading: false,
};

describe('Pagination', () => {
  it('enables both buttons when next and previous exist', () => {
    render(<Pagination {...defaults} />);

    expect(screen.getByRole('button', { name: 'Previous' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled();
  });

  it('disables Previous when previous is null', () => {
    render(<Pagination {...defaults} previous={null} />);

    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
  });

  it('disables Next when next is null', () => {
    render(<Pagination {...defaults} next={null} />);

    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  it('disables both buttons while loading', () => {
    render(<Pagination {...defaults} loading={true} />);

    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  it('calls onPageChange with offset - limit when Previous is clicked', async () => {
    const onPageChange = vi.fn();
    render(<Pagination {...defaults} onPageChange={onPageChange} />);

    await userEvent.click(screen.getByRole('button', { name: 'Previous' }));

    expect(onPageChange).toHaveBeenCalledWith(0);
  });

  it('calls onPageChange with offset + limit when Next is clicked', async () => {
    const onPageChange = vi.fn();
    render(<Pagination {...defaults} onPageChange={onPageChange} />);

    await userEvent.click(screen.getByRole('button', { name: 'Next' }));

    expect(onPageChange).toHaveBeenCalledWith(40);
  });
});
