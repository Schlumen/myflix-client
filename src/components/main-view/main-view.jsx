import { useEffect, useState } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://myflixapi-11d1.onrender.com/movies")
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
    }, []);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        )
    }

    if (movies.length === 0) {
        return <div>The list is empty</div>;
    }

    return (
        <div>
            {movies.map((movie) => {
                return (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                        }}
                    />
                );
            })}
        </div>
    );
};