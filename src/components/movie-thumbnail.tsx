import Image from "next/image";
import { useInView } from "react-intersection-observer";

export default function MovieThumbnail({movie, onClick}:{ movie: string, onClick: () => void }) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '200px' });

  return <div className="movie flex flex-col items-center w-75 h-120 cursor-pointer rounded bg-gray-500 p-4" onClick={() => onClick() } ref={ref}>
    {inView && <div>
      <Image src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        width={300}
        height={450}
        />
      <div className="title flex flex-col">
        <span className="truncate w-65" title={movie.title}>Movie Title: {movie.title}</span>
        <span>Release date: {movie.release_date}</span>
      </div>
    </div>}
  </div>;
}
