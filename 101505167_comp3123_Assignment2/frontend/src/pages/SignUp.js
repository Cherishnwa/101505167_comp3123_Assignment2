import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/signup",
        {username,email,password,}
      );

      setSuccess("Account created! Redirecting...");
      setError("");

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setSuccess("");
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card
        className="p-4 shadow-lg"
        style={{
          width: "430px",
          borderRadius: "20px",
          backgroundColor: "white",
          border: "2px solid var(--pink-light)",
        }}
      >
        <h3
          className="text-center mb-3"
          style={{
            color: "var(--pink-dark)",
            fontWeight: "700",
            fontSize: "28px",
          }}
        >
          Create Your Account
        </h3>

        {error && (
          <p
            className="text-center"
            style={{ color: "var(--pink-dark)", fontWeight: "600" }}
          >
            {error}
          </p>
        )}

        {success && (
          <p
            className="text-center"
            style={{
              color: "var(--pink)",
              fontWeight: "700",
            }}
          >
            {success}
          </p>
        )}

        <Form onSubmit={handleSignup}>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--text)" }}>
              Username
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ borderRadius: "12px" }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--text)" }}>
              Email
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderRadius: "12px" }}/>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ color: "var(--text)" }}>
              Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Create a strong password"
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
            Sign Up
          </Button>
        </Form>

        <p
          className="text-center mt-3"
          style={{ color: "var(--text)", fontSize: "14px" }}
        >
          Already have an account?{" "}
          <span
            style={{
              color: "var(--pink-dark)",
              cursor: "pointer",
              fontWeight: "600",
            }}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </Card>
    </Container>
  );
}

export default Signup;
