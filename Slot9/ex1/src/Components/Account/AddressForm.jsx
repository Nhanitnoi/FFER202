import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { GeoAlt } from "react-bootstrap-icons";

export default function AddressForm({ initial, onPrev, onFinish }) {
  const [form, setForm] = useState(initial || {});
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.street && form.city && form.country && form.zip) {
      onFinish(form);
    } else {
      setValidated(true);
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <h5><GeoAlt /> Address</h5>

      <Form.Group className="mb-3">
        <Form.Label>Street</Form.Label>
        <Form.Control
          required
          name="street"
          value={form.street || ""}
          onChange={handleChange}
          isInvalid={validated && !form.street}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>City</Form.Label>
        <Form.Control
          required
          name="city"
          value={form.city || ""}
          onChange={handleChange}
          isInvalid={validated && !form.city}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Country</Form.Label>
        <Form.Select
          required
          name="country"
          value={form.country || ""}
          onChange={handleChange}
          isInvalid={validated && !form.country}
        >
          <option value="">Choose...</option>
          <option>Vietnam</option>
          <option>USA</option>
          <option>Japan</option>
          <option>France</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Zip Code</Form.Label>
        <Form.Control
          required
          name="zip"
          value={form.zip || ""}
          onChange={handleChange}
          isInvalid={validated && !form.zip}
        />
      </Form.Group>

      <div className="d-flex justify-content-between">
        <Button variant="secondary" onClick={onPrev}>
          Previous
        </Button>
        <Button type="submit" variant="success">
          Finish
        </Button>
      </div>
    </Form>
  );
}
