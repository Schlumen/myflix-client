import PropTypes from "prop-types";
import { Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router"
import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const movie = movies.find(m => m.id === movieId);
    const similarMovies = movies.filter(movie => movie.genre === movie.genre ? true : false)

    return (
        <>
            <Col md={12}>
                <div className="text-light">
                    <img className="float-start me-3 mb-2" src={movie.image} alt="Movie Cover Image" />
                    <h2>{movie.title}</h2>
                    <p>{movie.description}</p>
                    <h5>Genre: </h5>
                    <p>{movie.genre}</p>
                    <h5>Director: </h5>
                    <p>{movie.director}</p>
                    <Link to={"/"}>
                        <Button variant="primary">Back</Button>
                    </Link>
                    <h3 className="mt-3 mb-3 text-light">Similar movies:</h3>
                </div>
            </Col> 
            {similarMovies.map(movie => (
                <Col className="mb-4" key={movie.id} xl={2} lg={3} md={4} xs={6}>
                    <MovieCard movie={movie} />
                </Col>
            ))}
        </>
    );
};

MovieView.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired
    }).isRequired)
};