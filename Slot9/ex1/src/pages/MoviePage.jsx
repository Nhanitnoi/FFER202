// src/pages/MoviePage.jsx
import React from "react";
import MovieCard from "../Components/Movie/MovieCard";
import { movies } from "../data/movies";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SiteNav from "../Components/NavBar/SiteNav";

export default function MoviePage() {
  return (
    <>
      <SiteNav />
      <Container className="my-4">
        <h2 className="text-center mb-4">🎬 Movie Collections</h2>
        <Row className="justify-content-center">
          {movies.map((movie) => (
            <Col
              key={movie.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="d-flex justify-content-center"
            >
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
