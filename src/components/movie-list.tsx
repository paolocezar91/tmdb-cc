'use client';

import { useEffect, useState } from "react"
import MovieThumbnail from "./movie-thumbnail";

export default function MovieList() {
  const [movies, setMovies] = useState<string[]>([]);

  useEffect(() => {
    setMovies(['a', 'b']);
  }, [])
  

  return <div className="flex flex-wrap">
    {movies.map((m, idx) => {
      return <MovieThumbnail key={idx} movie={m}></MovieThumbnail>
    })}
  </div>;
}
