import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="h-100" style={{ border: "none" }}>
            <Card.Img variant="top" src={movie.image} />
            <Card.Body className="h-100 d-flex flex-column">
                <Card.Title>{movie.title}</Card.Title>
                <Button className="mt-auto" onClick={() => onMovieClick(movie)} variant="primary">Open</Button>
            </Card.Body>
        </Card>
    )
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};