import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { PersonFill, LockFill } from "react-bootstrap-icons";

export default function AccountForm({ initial, onNext, onPrev }) {
  const [form, setForm] = useState(initial || {});
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.username && form.password && form.password === form.confirmPassword) {
      onNext(form);
    } else {
      setValidated(true);
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <h5><LockFill /> Account</h5>

      <InputGroup className="mb-3">
        <InputGroup.Text><PersonFill /></InputGroup.Text>
        <Form.Control
          required
          placeholder="Username"
          name="username"
          value={form.username || ""}
          onChange={handleChange}
          isInvalid={validated && !form.username}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text><LockFill /></InputGroup.Text>
        <Form.Control
          required
          type="password"
          placeholder="Password"
          name="password"
          value={form.password || ""}
          onChange={handleChange}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text><LockFill /></InputGroup.Text>
        <Form.Control
          required
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={form.confirmPassword || ""}
          onChange={handleChange}
          isInvalid={validated && form.password !== form.confirmPassword}
        />
        <Form.Control.Feedback type="invalid">
          Passwords must match
        </Form.Control.Feedback>
      </InputGroup>

      <Form.Group className="mb-3">
        <Form.Label>Secret Question</Form.Label>
        <Form.Control name="secret" value={form.secret || ""} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Answer</Form.Label>
        <Form.Control name="answer" value={form.answer || ""} onChange={handleChange} />
      </Form.Group>

      <div className="d-flex justify-content-between">
        <Button variant="secondary" disabled onClick={onPrev}>
          Previous
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </Form>
  );
}
