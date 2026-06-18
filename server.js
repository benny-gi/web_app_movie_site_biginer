import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import reviews from "./api/reviews.route.js";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Proxy for TMDB to hide API Key
app.get("/api/v1/movies", async (req, res) => {
    const api_key = process.env.TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&page=1&with_genres=28`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.get("/api/v1/movies/search", async (req, res) => {
    const api_key = process.env.TMDB_API_KEY;
    const query = req.query.query;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.use("/api/v1/reviews", reviews);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to serving the main page for any other route (SPA style)
app.use((req, res) => {
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'public', 'movie_site.html'));
        return;
    }
    res.status(404).json({ error: "not found" });
});

export default app;
