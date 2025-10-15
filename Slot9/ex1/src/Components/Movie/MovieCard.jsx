import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import "./MovieCard.css";

export default function MovieCard({ movie }) {
  if (!movie) return null;

  return (
    <Card className="movie-card">
      <Card.Img
        variant="top"
        src={movie.poster}
        alt={movie.title}
        className="movie-poster"
      />
      <Card.Body>
        <Card.Title className="movie-title">{movie.title}</Card.Title>

        <div className="movie-badges">
          <Badge bg="dark">{movie.genre}</Badge>
          <Badge bg="secondary">{movie.year}</Badge>
          <Badge bg="info" text="dark">{movie.country}</Badge>
        </div>

        <Card.Text className="movie-desc">{movie.description}</Card.Text>

        <p className="movie-details">
          ⏱ {movie.duration} min | ⭐ {movie.rating}
        </p>

        <Button variant="primary" size="sm">
          Watch Trailer
        </Button>
      </Card.Body>
    </Card>
  );
}
