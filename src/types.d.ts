declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    theMovieDb: any; // Replace 'any' with a more specific type if possible
  }
}