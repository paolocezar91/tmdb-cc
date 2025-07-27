# TMDB Coding Challenge
Thanks for reading this readme. This is a coding challenge for a job application for Senior React Developer.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## .env file

Use an .env file with this format with the TMDB API key.
```
TMDB_API_KEY="YOUR KEY"
```

## Live Preview

You can access https://tmdb-cc.vercel.app/ to view the live preview, but to avoid connection problems please check [this stack overflow](https://stackoverflow.com/a/24434461) question to see how to disable mixed-content checking in Google Chrome.

## Tecnical decisions

I first created a skeleton of the project, with all components (list, thumbnail, details, paginator and search). After they more or less setup I attempted to connect to the API, which was a big problem as the JS wrappers for it don't actually are typed, so I spent a lot of time figuring that out. In the end I opted for a script injection with the libs original file, similar to how they use on their own demo. After that it was more or less ok to lint it and prepare it for deploy at Vercel

If I had more time I would:
- Make it look more visually appealing.
- Add more unit tests and configure them properly.
- Make the movies a correctly typed interface
- Make the search actually query instead of local searching