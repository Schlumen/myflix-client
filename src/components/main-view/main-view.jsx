import { useEffect, useState } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view"

export const MainView = () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    function returnMovieCard(movie) {
        return (
            <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }}
            />
        );
    }

    useEffect(() => {
        if (!token) return;

        fetch("https://myflixapi-11d1.onrender.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(resonse => resonse.json())
        .then(movies => {
            const moviesFromAPI = movies.map(movie => {
                return {
                    id: movie._id,
                    title: movie.title,
                    description: movie.description,
                    genre: movie.genre.name,
                    director: movie.director.name,
                    image: movie.imageurl
                };
            });
            setMovies(moviesFromAPI);
        });
    }, [token]);

    if (!user) {
        return (
            <LoginView
                onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                }}
            />
        )
    }

    if (selectedMovie) {
        let similarMovies = movies.filter(movie => movie.genre === selectedMovie.genre ? true : false);
        return (
            <>
                <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
                <br />
                <h2>Similar movies:</h2>
                {similarMovies.map((movie) => returnMovieCard(movie))}
            </>
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty</div>;
    }

    return (
        <div>
            {movies.map((movie) => returnMovieCard(movie))}
            <button onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
            }}>Logout</button>
        </div>
    );
};