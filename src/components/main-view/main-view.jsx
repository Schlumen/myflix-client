import { useEffect, useState } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view"
import { Row, Col, Button } from "react-bootstrap";

export const MainView = () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    function returnMovieCard(movie) {
        return (
            <Col className="mb-4" key={movie._id} xl={2} lg={3} md={4} xs={6}>
                <MovieCard
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            </Col>
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

    return (
        <>
            <Row className="justify-content-end mb-3">
                <Col md={1}>
                    <Button variant="primary" className="m-2" onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                    }}>Logout</Button>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                {!user ? (
                    <Col md={6}>
                        <LoginView
                            onLoggedIn={(user, token) => {
                                setUser(user);
                                setToken(token);
                            }} />
                        <SignupView />
                    </Col>
                ) : selectedMovie ? (
                    <>
                        <Col md={12}>
                            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
                        </Col>
                        <h3 className="mt-3 mb-3 text-light">Similar movies:</h3>
                        {movies.filter(movie => movie.genre === selectedMovie.genre ? true : false).map(movie => returnMovieCard(movie))}
                    </>
                ) : movies.length === 0 ? ( 
                    <div>The list is empty</div>
                ) : (
                    <>
                        {movies.map((movie) => returnMovieCard(movie))}
                    </>
                )}
            </Row>
        </>
    );
};