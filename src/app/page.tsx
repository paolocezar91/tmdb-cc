/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MoviesList from "@/components/movies-list";
import { useEffect, useState } from "react";

export default function Home() {
  // Honestly I lost so much time with this. There's no (or at least I wasnt able to find one) typed lib for theMovieDB. 
  // I had to inject it as a script like this after 1 hour of looking for it or attempting to type it myself.
  
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [_, setScriptExports] = useState(null);

  useEffect(() => {
    // Check if the script is already loaded
    if ((window as any).theMovieDb) {
      setScriptLoaded(true);
      setScriptExports((window as any).theMovieDb);
      return;
    }

    const script = document.createElement('script');
    script.src = '/themoviedb.js';
    script.async = true;
    
    // Add event listeners to know when script loads
    script.onload = () => {
      setScriptLoaded(true);
      // Assuming your script attaches something to window
      setScriptExports((window as any).theMovieDb);
    };
    
    script.onerror = () => {
      console.error('Script failed to load');
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!scriptLoaded) {
    return <div>Loading script...</div>;
  }

  (window as any).theMovieDb.common.api_key = process.env.TMDB_API_KEY;

  return <MoviesList />;
}
