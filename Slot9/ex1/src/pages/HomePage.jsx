// src/pages/HomePage.jsx
import React, { useState, useMemo } from "react";
import SiteNav from "../Components/NavBar/SiteNav";
import FilterCard from "../Components/Filter/FilterCard";
import HomeCarousel from "../Components/home/HomeCarousel";
import MovieCard from "../Components/Movie/MovieCard";
import { movies as ALL_MOVIES } from "../data/movies";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function HomePage() {
  const [filterParams, setFilterParams] = useState({ q: "", yearRange: "all", sortBy: "none" });

  const filtered = useMemo(() => {
    let out = [...ALL_MOVIES];

    // search q in title or description (case-insensitive)
    if (filterParams.q && filterParams.q.trim() !== "") {
      const q = filterParams.q.toLowerCase();
      out = out.filter(m => m.title.toLowerCase().includes(q) || m.description.toLowerCase().includes(q));
    }

    // year filter
    if (filterParams.yearRange === "<=2000") out = out.filter(m => m.year <= 2000);
    if (filterParams.yearRange === "2001-2015") out = out.filter(m => m.year >= 2001 && m.year <= 2015);
    if (filterParams.yearRange === ">2015") out = out.filter(m => m.year > 2015);

    // sorting
    switch (filterParams.sortBy) {
      case "year_asc": out.sort((a,b)=>a.year-b.year); break;
      case "year_desc": out.sort((a,b)=>b.year-a.year); break;
      case "title_asc": out.sort((a,b)=>a.title.localeCompare(b.title)); break;
      case "title_desc": out.sort((a,b)=>b.title.localeCompare(a.title)); break;
      case "duration_asc": out.sort((a,b)=>a.duration-b.duration); break;
      case "duration_desc": out.sort((a,b)=>b.duration-a.duration); break;
      default: break;
    }

    return out;
  }, [filterParams]);

  const handleApply = (params) => setFilterParams(params);

  return (
    <>
      <SiteNav />
      <Container>
        <FilterCard onApply={handleApply} />
        <HomeCarousel />

        <div className="mt-4">
          <h4>Featured Movies</h4>
          <Row className="g-3 mt-2">
            {filtered.map(m => (
              <Col key={m.id} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
                <MovieCard movie={m} />
              </Col>
            ))}
            {filtered.length === 0 && <p className="text-muted">No movies match your filter.</p>}
          </Row>
        </div>
      </Container>
    </>
  );
}
