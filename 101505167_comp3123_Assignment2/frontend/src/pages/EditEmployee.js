import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [date_of_joining, setDateOfJoining] = useState("");
  const [department, setDepartment] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch employee details
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/emp/employees/${id}`
        );

        const emp = res.data;

        setFirstName(emp.first_name);
        setLastName(emp.last_name);
        setEmail(emp.email);
        setPosition(emp.position);
        setSalary(emp.salary);
        setDateOfJoining(emp.date_of_joining?.substring(0, 10)); // format yyyy-mm-dd
        setDepartment(emp.department);

      } catch (err) {
        setError("Failed to load employee details");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/v1/emp/employees/${id}`,
        {
          first_name,
          last_name,
          email,
          position,
          salary,
          date_of_joining,
          department,
        }
      );

      setSuccess("Employee updated successfully!");
      setError("");

      setTimeout(() => navigate("/employees"), 1000);

    } catch (err) {
      setSuccess("");
      setError(err.response?.data?.message || "Failed to update employee");
    }
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <p style={{ color: "var(--pink-dark)", fontSize: "18px" }}>
          Loading employee details...
        </p>
      </Container>
    );
  }

  return (
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
          Edit Employee
        </h3>

        {error && (
          <p
            className="text-center"
            style={{
              color: "var(--pink-dark)",
              fontWeight: "600",
            }}
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

        <Form onSubmit={handleUpdate}>
          {/* FIRST NAME */}
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

          {/* LAST NAME */}
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

          {/* EMAIL */}
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
            Save Changes
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
  );
}

export default EditEmployee;
