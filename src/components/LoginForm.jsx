// src/components/LoginForm.jsx
import React, { useReducer } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import ConfirmModal from './ConfirmModal';
import { useNavigate } from 'react-router-dom';

const initialFormState = {
  formData: { identifier: '', password: '' },
  errors: {},
  showSuccessModal: false,
};

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, formData: { ...state.formData, [action.field]: action.value } };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'SHOW_SUCCESS_MODAL':
      return { ...state, showSuccessModal: true };
    case 'HIDE_SUCCESS_MODAL':
      return { ...state, showSuccessModal: false };
    case 'RESET_FORM':
      return initialFormState;
    default:
      return state;
  }
}

function LoginForm() {
  const navigate = useNavigate();
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const { login, loading, error, clearError, user } = useAuth();

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name, value });
    if (error) clearError();
  };

  const validateForm = () => {
    const { identifier, password } = formState.formData;
    const errors = {};

    if (!identifier.trim()) errors.identifier = 'Username or Email is required.';
    else if (identifier.includes('@') && !emailRe.test(identifier))
      errors.identifier = 'Email is invalid format.';

    if (!password.trim()) errors.password = 'Password is required.';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters.';

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    dispatch({ type: 'SET_ERRORS', errors: validationErrors });
    if (Object.keys(validationErrors).length > 0) return;

    const result = await login({
      usernameOrEmail: formState.formData.identifier.trim(),
      password: formState.formData.password,
    });

    if (result.success) dispatch({ type: 'SHOW_SUCCESS_MODAL' });
  };

  const handleCloseSuccessModal = () => {
    dispatch({ type: 'HIDE_SUCCESS_MODAL' });
    dispatch({ type: 'RESET_FORM' });
    navigate('/home');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Card>
            <Card.Header><h3 className="text-center mb-0">Login</h3></Card.Header>

            <Card.Body>
              {error && (
                <Alert variant="danger" className="mb-3" dismissible onClose={clearError}>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Username or Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="identifier"
                    value={formState.formData.identifier}
                    onChange={handleChange}
                    isInvalid={!!formState.errors.identifier}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formState.errors.identifier}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formState.formData.password}
                    onChange={handleChange}
                    isInvalid={!!formState.errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formState.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ConfirmModal
        show={formState.showSuccessModal}
        title="Login Successful!"
        message={`Welcome, ${user?.username}! Login successful.`}
        onConfirm={handleCloseSuccessModal}
      />
    </Container>
  );
}

export default LoginForm;
