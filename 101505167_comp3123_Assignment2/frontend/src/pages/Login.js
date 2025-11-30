import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/v1/user/login", {
        email,
        password,
      });

      // mark user as logged in
      localStorage.setItem("loggedIn", "true");

      setSuccess("Login successful!");
      setError("");

      // redirect to employee list
      setTimeout(() => navigate("/employees"), 800);

    } catch (err) {
      setSuccess("");
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card
        className="p-4 shadow-lg"
        style={{
          width: "400px",
          borderRadius: "20px",
          backgroundColor: "white",
          border: "2px solid var(--pink-light)",
        }}
      >
        <h3 className="text-center mb-3"
          style={{
            color: "var(--pink-dark)",
            fontWeight: "700",
            fontSize: "28px",
          }}
        >
          Login
        </h3>

        {error && (
          <p className="text-center" style={{ color: "var(--pink-dark)" }}>
            {error}
          </p>
        )}

        {success && (
          <p className="text-center" style={{ color: "var(--pink)", fontWeight: "600" }}>
            {success}
          </p>
        )}

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--text)" }}>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderRadius: "12px" }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ color: "var(--text)" }}>Password</Form.Label>
            <Form.Control
              type="password"
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
            }}
          >
            Login
          </Button>
        </Form>

        <p className="text-center mt-3"
          style={{ color: "var(--text)", fontSize: "14px" }}
        >
          Don’t have an account?{" "}
          <span
            style={{
              color: "var(--pink-dark)",
              cursor: "pointer",
              fontWeight: "600",
            }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </Card>
    </Container>
  );
}

export default Login;
