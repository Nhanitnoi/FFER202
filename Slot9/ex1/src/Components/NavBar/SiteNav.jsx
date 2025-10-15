// src/components/Account/AddressForm.jsx
import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function AddressForm({ initial = {}, onPrev, onFinish }) {
  const [street, setStreet] = useState(initial.street || "");
  const [city, setCity] = useState(initial.city || "");
  const [country, setCountry] = useState(initial.country || "");
  const [zip, setZip] = useState(initial.zip || "");
  const [submitted, setSubmitted] = useState(false);

  const isInvalid = (val) => submitted && (!val || String(val).trim() === "");

  const handleFinish = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!street || !city || !country || !zip) return;
    onFinish({ street, city, country, zip });
  };

  return (
    <Form onSubmit={handleFinish}>
      <Form.Group className="mb-2">
        <Form.Label>Street</Form.Label>
        <Form.Control value={street} onChange={(e)=>setStreet(e.target.value)} isInvalid={isInvalid(street)} />
        <Form.Control.Feedback type="invalid">Street is required</Form.Control.Feedback>
      </Form.Group>

      <Row className="g-2">
        <Col md={6}>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control value={city} onChange={(e)=>setCity(e.target.value)} isInvalid={isInvalid(city)} />
            <Form.Control.Feedback type="invalid">City required</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Country</Form.Label>
            <Form.Select value={country} onChange={(e)=>setCountry(e.target.value)} isInvalid={isInvalid(country)}>
              <option value="">Select</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Japan">Japan</option>
              <option value="France">France</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">Country required</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Zip Code</Form.Label>
            <Form.Control value={zip} onChange={(e)=>setZip(e.target.value)} isInvalid={isInvalid(zip)} />
            <Form.Control.Feedback type="invalid">Zip required</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <div className="mt-3 d-flex justify-content-between">
        <Button variant="secondary" onClick={onPrev}>Previous</Button>
        <Button variant="success" type="submit">Finish</Button>
      </div>
    </Form>
  );
}
