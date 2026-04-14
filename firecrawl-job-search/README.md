# Firecrawl AI Job Search

A Next.js web app for searching jobs using the Firecrawl API with Google Authentication.

## Setup

1. Navigate to the project directory: `cd firecrawl-job-search`

2. Install dependencies: `npm install`

3. Set up environment variables in `.env.local`:
   - `GOOGLE_CLIENT_ID`: Your Google OAuth client ID (get from Google Cloud Console)
   - `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret
   - `FIRECRAWL_API_KEY`: Your Firecrawl API key (sign up at firecrawl.com)
   - `NEXTAUTH_URL`: `http://localhost:3000` (for local development)
   - `NEXTAUTH_SECRET`: A random secret string (generate with `openssl rand -base64 32`)

4. Run the development server: `npm run dev`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Google Authentication**: Users must log in with Google to access the job search.
- **Job Search**: Enter keywords to search for jobs via the Firecrawl API.
- **Results Display**: Shows job title, company, and a clickable link to apply.
- **Error Handling**: Displays errors if the API fails or if unauthorized.

## Notes

- The Firecrawl API endpoint and response format are assumed based on typical API structures. Please check the [Firecrawl API documentation](https://docs.firecrawl.com/) and update `pages/api/jobs.js` accordingly.
- Ensure your Google OAuth app is configured with the correct redirect URIs for NextAuth.

## Project Structure

- `pages/index.js`: Main homepage component
- `pages/_app.js`: App wrapper with NextAuth SessionProvider
- `pages/api/auth/[...nextauth].js`: NextAuth configuration for Google OAuth
- `pages/api/jobs.js`: API route for fetching jobs from Firecrawl
- `.env.local`: Environment variables (create this file with your keys)