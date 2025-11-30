import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import BackButton from "../components/BackButton";

function AddEmployee() {
  const navigate = useNavigate();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [date_of_joining, setDateOfJoining] = useState("");
  const [department, setDepartment] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/v1/emp/employees", {
        first_name,
        last_name,
        email,
        position,
        salary,
        date_of_joining,
        department,
      });

      setSuccess("Employee added successfully!");
      setError("");

      setTimeout(() => navigate("/employees"), 1000);
    } catch (err) {
      setSuccess("");
      setError(err.response?.data?.message || "Failed to create employee");
    }
  };

  return (
    <>
      {/* Navbar */}
      <NavBar />

      {/* Back button */}
      <div className="d-flex justify-content-start px-4">
        <BackButton />
      </div>

      {/* Form container */}
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Card
          className="p-4 shadow-lg"
          style={{
            width: "500px",
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
            Add New Employee
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
              style={{ color: "var(--pink)", fontWeight: "700" }}
            >
              {success}
            </p>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "var(--text)" }}>First Name</Form.Label>
              <Form.Control
                type="text"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                required
                style={{ borderRadius: "12px" }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "var(--text)" }}>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                required
                style={{ borderRadius: "12px" }}
              />
            </Form.Group>

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

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "var(--text)" }}>Position</Form.Label>
              <Form.Control
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
                style={{ borderRadius: "12px" }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "var(--text)" }}>Salary</Form.Label>
              <Form.Control
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
                style={{ borderRadius: "12px" }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "var(--text)" }}>
                Date of Joining
              </Form.Label>
              <Form.Control
                type="date"
                value={date_of_joining}
                onChange={(e) => setDateOfJoining(e.target.value)}
                required
                style={{ borderRadius: "12px" }}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label style={{ color: "var(--text)" }}>Department</Form.Label>
              <Form.Control
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
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
              Add Employee
            </Button>
          </Form>

          <p
            className="text-center mt-3"
            style={{ color: "var(--text)", fontSize: "14px" }}
          >
            Cancel and return to{" "}
            <span
              style={{
                color: "var(--pink-dark)",
                cursor: "pointer",
                fontWeight: "600",
              }}
              onClick={() => navigate("/employees")}
            >
              Employee List
            </span>
          </p>
        </Card>
      </Container>
    </>
  );
}

export default AddEmployee;
