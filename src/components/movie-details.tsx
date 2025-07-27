import Image from "next/image";

export default function MovieDetails({ movie }: { movie: string }) {
  return <div className="flex flex-col md:flex-row gap-4 overflow-auto max-h-[90vh]">
    <Image src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
      alt={movie.title}
      width={300}
      height={450}
    />
    <div className="title flex flex-col">
      <h2 className="bold text-xl border-b-2 border-solid mb-2" title={movie.title}>Movie Title: {movie.title}</h2>
      <span><strong>Release date:</strong> {movie.release_date}</span>
      <span><strong>Adult:</strong> {movie.adult ? "Yes" : "No"}</span>
      <span><strong>Original Language:</strong> {movie.original_language}</span>
      <span><strong>Original Title:</strong> {movie.original_title}</span>
      <span><strong>Overview:</strong> {movie.overview}</span>
      <span><strong>Popularity:</strong> {movie.popularity}</span>
      <span><strong>Vote Average:</strong> {movie.vote_average}</span>
      <span><strong>Vote Count:</strong> {movie.vote_count}</span>
    </div>
  </div>;
}
