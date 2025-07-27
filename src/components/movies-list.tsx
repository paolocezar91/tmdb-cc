'use client';
import { useEffect, useState } from "react";
import { useModal } from "./modal-provider";
import MovieSearch from "./movie-search";
import MovieThumbnail from "./movie-thumbnail";
import MoviesPaginator from "./movies-paginator";

export default function MoviesList() {
const { showModal } = useModal()
const [movies, setMovies] = useState<Record<string, string | number>[]>([]);
const [moviesBackup, setMoviesBackup] = useState<Record<string, string | number>[]>([]);
const [totalPages] = useState<number>(100);
const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const getMovies = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).theMovieDb.movies.getPopular({page: currentPage},
        (data: string) => {
          const movies = JSON.parse(data)
          if (movies.results && movies.results.length > 0) {
            setMovies(movies.results)
            setMoviesBackup(movies.results);
          }
        }, 
        (error: string) => {
          console.error(error)
        })
    }
  
    getMovies();
  }, [currentPage])

  const doSearch = (term: string) => {
    if(term) {
      setMovies(movies.filter((movie) => {
        return String(movie.title).toLowerCase().includes(term);
      }));
    } else {
      setMovies(moviesBackup);
    }
  }
  
  return <div className="movies-list h-full relative">
    <h1 className="text-xl text-bold mb-1">Popular movies list</h1>
    <MovieSearch onChange={(term) => doSearch(term)}></MovieSearch>
    <div className="flex flex-wrap justify-center gap-4 overflow-auto h-[70vh] md:h-[80vh] mt-5">
      {movies.map((m, idx) => {
        return <MovieThumbnail onClick={() => showModal(m)} key={idx} movie={m}></MovieThumbnail>
      })}
    </div>
    <MoviesPaginator 
      totalPages={totalPages} 
      currentPage={currentPage} 
      onClick={(val) => setCurrentPage(val)} 
    />
  </div>;
}
