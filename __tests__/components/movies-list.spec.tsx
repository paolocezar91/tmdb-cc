/* eslint-disable react/display-name */
import { useModal } from '@/components/modal-provider';
import MoviesList from '@/components/movies-list';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';


jest.mock('themoviedb-javascript-library', () => ({
  movies: {
    getPopular: jest.fn((options, successCallback, errorCallback) => {
      if (options.page === 1) {
        successCallback(JSON.stringify({
          results: [
            { id: 1, title: 'Movie 1' },
            { id: 2, title: 'Movie 2' }
          ],
          total_pages: 5
        }));
      } else if (options.page === 2) {
        successCallback(JSON.stringify({
          results: [
            { id: 3, title: 'Movie 3' },
            { id: 4, title: 'Movie 4' }
          ],
          total_pages: 5
        }));
      } else {
        errorCallback('API error');
      }
    })
  }
}));

// Mock child components
jest.mock('./movie-thumbnail', () => {
  return function MockMovieThumbnail(props: any) {
    return <div onClick={() => props.onClick(props.movie)}>{props.movie.title}</div>;
  };
});

jest.mock('./movie-search', () => {
  return function MockMovieSearch(props: any) {
    return (
      <input 
        type="text" 
        onChange={(e) => props.onChange(e.target.value)} 
        data-testid="search-input" 
      />
    );
  };
});

jest.mock('./movies-paginator', () => {
  return function MockMoviesPaginator(props: any) {
    return (
      <div>
        <button onClick={() => props.onClick(props.currentPage - 1)}>Previous</button>
        <span>Page {props.currentPage} of {props.totalPages}</span>
        <button onClick={() => props.onClick(props.currentPage + 1)}>Next</button>
      </div>
    );
  };
});

jest.mock('./movie-details', () => {
  return function MockMovieDetails() {
    return <div>Movie Details</div>;
  };
});

describe('MoviesList Component', () => {
  const mockShowModal = jest.fn();
  
  beforeEach(() => {
    (useModal as jest.Mock).mockReturnValue({ showModal: mockShowModal });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with title', async () => {
    render(<MoviesList />);
    expect(screen.getByText('Popular movies list')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
    });
  });

  it('fetches and displays popular movies on initial render', async () => {
    render(<MoviesList />);
    
    await waitFor(() => {
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Movie 2')).toBeInTheDocument();
    });
  });

  it('handles pagination correctly', async () => {
    render(<MoviesList />);
    
    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
    });
    
    // Click next page
    fireEvent.click(screen.getByText('Next'));
    
    await waitFor(() => {
      expect(screen.getByText('Movie 3')).toBeInTheDocument();
      expect(screen.getByText('Movie 4')).toBeInTheDocument();
      expect(screen.queryByText('Movie 1')).not.toBeInTheDocument();
    });
  });

  it('filters movies based on search term', async () => {
    render(<MoviesList />);
    
    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
    });
    
    // Enter search term
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'Movie 2' } });
    
    await waitFor(() => {
      expect(screen.getByText('Movie 2')).toBeInTheDocument();
      expect(screen.queryByText('Movie 1')).not.toBeInTheDocument();
    });
    
    // Clear search
    fireEvent.change(searchInput, { target: { value: '' } });
    
    await waitFor(() => {
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Movie 2')).toBeInTheDocument();
    });
  });

  it('opens modal when a movie thumbnail is clicked', async () => {
    render(<MoviesList />);
    
    await waitFor(() => {
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Movie 1'));
    expect(mockShowModal).toHaveBeenCalledWith({ id: 1, title: 'Movie 1' });
  });

  it('displays error when API call fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Force error by setting page to 3 (mock is set to error on any page != 1 or 2)
    render(<MoviesList />);
    fireEvent.click(screen.getByText('Next')); // Page 2
    fireEvent.click(screen.getByText('Next')); // Page 3
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('API error');
    });
    
    consoleSpy.mockRestore();
  });

  it('maintains scrollable container for movie list', async () => {
    render(<MoviesList />);
    
    const container = screen.getByTestId('movies-container');
    expect(container).toHaveClass('overflow-auto');
    expect(container).toHaveClass('h-[70vh]');
    expect(container).toHaveClass('md:h-[80vh]');
  });
});