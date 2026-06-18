# Watchers' Grail - Movie Review Site

Watchers' Grail is a web application that allows users to discover movies and share their reviews. It features a backend proxy to securely interact with the TMDB (The Movie Database) API and a MongoDB-powered review system.

## Features

- **Movie Discovery:** Browse popular movies.
- **Search:** Find specific movies by title.
- **Reviews:** Read, create, update, and delete reviews for any movie.
- **Security:**
  - TMDB API key is hidden behind a backend proxy.
  - Express middleware like `helmet` for secure headers.
  - Environment variables for sensitive configuration.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **APIs:** TMDB API

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd watchers-grail
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    - Create a `.env` file in the root directory.
    - Add your TMDB API key and MongoDB URI:
      ```env
      TMDB_API_KEY=your_tmdb_api_key
      MONGODB_URI=your_mongodb_uri
      PORT=8000
      REVIEWS_NS=watchers_grail
      ```

4.  **Start the server:**
    ```bash
    node index.js
    ```

5.  **Open the site:**
    Open `movie_site.html` in your browser (if served by a local server or directly). Note: For full functionality, the frontend should be served by the Express backend or a local dev server that can route API calls to the backend.

## API Endpoints

- `GET /api/v1/movies`: Fetch popular movies.
- `GET /api/v1/movies/search?query=<title>`: Search for movies.
- `GET /api/v1/reviews/movie/:id`: Get reviews for a specific movie.
- `POST /api/v1/reviews/new`: Create a new review.
- `GET /api/v1/reviews/:id`: Get a specific review.
- `PUT /api/v1/reviews/:id`: Update a review.
- `DELETE /api/v1/reviews/:id`: Delete a review.
