import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div className="text-light">
            <img className="float-left mr-3 mb-3" src={movie.image} alt="Movie Cover Image" />
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <h5>Genre: </h5>
            <p>{movie.genre}</p>
            <h5>Director: </h5>
            <p>{movie.director}</p>
            <Button onClick={onBackClick} variant="primary">Back</Button>
        </div>
    );
};

MovieView.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};