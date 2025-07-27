'use client';
import { useEffect, useState } from "react";
import MovieThumbnail from "./movie-thumbnail";
import MovieSearch from "./movie-search";
import MovieDetails from "./movie-details";
import { useModal } from "./modal-provider";
import MoviesPaginator from "./movies-paginator";


export default function MoviesList() {
const { showModal } = useModal()
const [movies, setMovies] = useState<string[]>([]);
const [totalPages, setTotalPages] = useState<number>(0);
const [currentPage, setCurrentPage] = useState<number>(1);
const [moviesBackup, setMoviesBackup] = useState<string[]>([]);

  useEffect(() => {
    const getMovies = () => {
      theMovieDb.movies.getPopular({page: currentPage},
        (data: string) => {
          const movies = JSON.parse(data)
          if (movies.results && movies.results.length > 0) {
            setMovies(movies.results)
            setTotalPages(movies.total_pages);
            setMoviesBackup(movies.results);
          }
        }, 
        (error: string) => {
          // do something with errorCallback
          console.error(error)
        })
    }
  
    getMovies();
  }, [currentPage])

  const doSearch = (term: string) => {
    if(term) {
      setMovies(movies.filter((movie) => {
        return movie.title.toLowerCase().includes(term);
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
