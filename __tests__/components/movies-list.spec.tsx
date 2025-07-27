/* eslint-disable react/display-name */
import { useModal } from '@/components/modal-provider';
import MoviesList from '@/components/movies-list';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

// Simple component mocks
jest.mock('@/components/movie-thumbnail', () => (props: any) => (
  <div onClick={() => props.onClick(props.movie)}>{props.movie.title}</div>
));

jest.mock('@/components/movie-search', () => (props: any) => (
  <input 
    type="text" 
    onChange={(e) => props.onChange(e.target.value)} 
    data-testid="search-input" 
  />
));

describe('MoviesList', () => {
  const mockShowModal = jest.fn();
  
  beforeEach(() => {
    (useModal as jest.Mock).mockReturnValue({ showModal: mockShowModal });
  });

  it('renders movies', async () => {
    render(<MoviesList />);
    
    await waitFor(() => {
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Movie 2')).toBeInTheDocument();
    });
  });
});