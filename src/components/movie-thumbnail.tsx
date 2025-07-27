import Image from "next/image";
import { useEffect, useState } from "react"

export default function MovieThumbnail({movie}:{ movie: string }) {
  return <div className="flex flex-col">
    <Image src="movie.img" fill alt="movie.name" />
    movie.name
  </div>;
}
