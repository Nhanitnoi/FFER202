// src/components/Filter/FilterCard.jsx
import React, { useState } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";

export default function FilterCard({ onApply }) {
  // onApply nhận object { q, yearRange, sortBy }
  const [q, setQ] = useState("");
  const [yearRange, setYearRange] = useState("all");
  const [sortBy, setSortBy] = useState("none");

  const handleApply = (e) => {
    e.preventDefault();
    if (onApply) onApply({ q, yearRange, sortBy });
  };

  const handleReset = () => {
    setQ("");
    setYearRange("all");
    setSortBy("none");
    if (onApply) onApply({ q: "", yearRange: "all", sortBy: "none" });
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Form onSubmit={handleApply}>
          <Row className="g-2">
            <Col md={5}>
              <Form.Label>Search</Form.Label>
              <Form.Control
                placeholder="Search by title or description..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </Col>

            <Col md={4}>
              <Form.Label>Filter by Year</Form.Label>
              <Form.Select value={yearRange} onChange={(e) => setYearRange(e.target.value)}>
                <option value="all">All years</option>
                <option value="<=2000">Year ≤ 2000</option>
                <option value="2001-2015">2001 - 2015</option>
                <option value=">2015">Year &gt; 2015</option>
              </Form.Select>
            </Col>

            <Col md={3}>
              <Form.Label>Sort</Form.Label>
              <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="none">No sorting</option>
                <option value="year_asc">Year ↑</option>
                <option value="year_desc">Year ↓</option>
                <option value="title_asc">Title A→Z</option>
                <option value="title_desc">Title Z→A</option>
                <option value="duration_asc">Duration ↑</option>
                <option value="duration_desc">Duration ↓</option>
              </Form.Select>
            </Col>
          </Row>

          <div className="mt-3 d-flex gap-2">
            <Button type="submit" variant="primary" size="sm">Apply</Button>
            <Button variant="outline-secondary" size="sm" onClick={handleReset}>Reset</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
