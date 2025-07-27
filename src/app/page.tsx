"use client";
import MoviesList from "@/components/movies-list";
import { useEffect, useState } from "react";

export default function Home() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptExports, setScriptExports] = useState(null);

  useEffect(() => {
    // Check if the script is already loaded
    if (window.theMovieDb) {
      setScriptLoaded(true);
      setScriptExports(window.theMovieDb);
      return;
    }

    const script = document.createElement('script');
    script.src = '/themoviedb.js';
    script.async = true;
    
    // Add event listeners to know when script loads
    script.onload = () => {
      setScriptLoaded(true);
      // Assuming your script attaches something to window
      setScriptExports(window.theMovieDb);
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

  window.theMovieDb.common.api_key = process.env.TMDB_API_KEY;

  return <MoviesList />;
}
