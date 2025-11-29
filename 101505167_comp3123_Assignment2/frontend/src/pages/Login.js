import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/v1/user/login", {email,password,});

      navigate("/employees");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}>

      <Card
        className="p-4 shadow-lg"
        style={{
          width: "390px",
          borderRadius: "20px",
          backgroundColor: "white",
          border: "2px solid var(--pink-light)",
        }}>

        <h3
          className="text-center mb-3"
          style={{
            color: "var(--pink-dark)",
            fontWeight: "700",
            fontSize: "28px",
          }}>Login</h3>

        {error && (
          <p
            className="text-center"
            style={{ color: "var(--pink-dark)", fontWeight: "600" }}
          >
            {error}
          </p>
        )}

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--text)" }}>
              Email
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderRadius: "12px" }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ color: "var(--text)" }}>
              Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ borderRadius: "12px" }}
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100"
            style={{
              backgroundColor: "var(--pink)",
              borderColor: "var(--pink-dark)",
              borderRadius: "12px",
              fontWeight: "600",
            }}>Login
          </Button>
        </Form>

        <p
          className="text-center mt-3"
          style={{ color: "var(--text)", fontSize: "14px" }}>Don't have an account?{" "}

          <span
            style={{
              color: "var(--pink-dark)",
              cursor: "pointer",
              fontWeight: "600",
            }}
            onClick={() => navigate("/signup")}
          >
            Create one
          </span>
        </p>
      </Card>
    </Container>
  );
}

export default Login;
