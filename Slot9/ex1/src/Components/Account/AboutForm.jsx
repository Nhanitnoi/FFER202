import React, { useState } from "react";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";

export default function AboutForm({ initial, onNext }) {
  const [form, setForm] = useState(initial || {});
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.firstName && form.lastName && form.email) {
      onNext(form);
    } else {
      setValidated(true);
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <h5><PersonCircle /> About</h5>
      <Row className="mb-3">
        <Col>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            required
            name="firstName"
            value={form.firstName || ""}
            onChange={handleChange}
            isInvalid={validated && !form.firstName}
          />
          <Form.Control.Feedback type="invalid">
            Required field
          </Form.Control.Feedback>
        </Col>
        <Col>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            required
            name="lastName"
            value={form.lastName || ""}
            onChange={handleChange}
            isInvalid={validated && !form.lastName}
          />
          <Form.Control.Feedback type="invalid">
            Required field
          </Form.Control.Feedback>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          required
          type="email"
          name="email"
          value={form.email || ""}
          onChange={handleChange}
          isInvalid={validated && !form.email}
        />
        <Form.Control.Feedback type="invalid">
          Required field
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone</Form.Label>
        <Form.Control name="phone" value={form.phone || ""} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Age</Form.Label>
        <Form.Control type="number" name="age" value={form.age || ""} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Avatar</Form.Label>
        <Form.Control type="file" name="avatar" onChange={handleChange} />
      </Form.Group>

      <Button type="submit">Next</Button>
    </Form>
  );
}
