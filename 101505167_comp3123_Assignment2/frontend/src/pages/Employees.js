import React, { useEffect, useState } from "react";
import { Container, Table, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Employees() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch employees when page loads
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/emp/employees"
        );
        setEmployees(res.data);
      } catch (err) {
        setError("Failed to load employees");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Delete employee
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete("http://localhost:5000/api/v1/emp/employees", {
        data: { id: id },
      });

      // Remove from UI instantly
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
    } catch (err) {
      alert("Failed to delete employee");
    }
  };

  return (
    <Container className="py-5">
      <h2
        className="text-center mb-4"
        style={{
          color: "var(--pink-dark)",
          fontWeight: "700",
          fontSize: "32px",
        }}
      >
        Employee Directory
      </h2>

      <div className="d-flex justify-content-end mb-3">
        <Button
          onClick={() => navigate("/employees/add")}
          style={{
            backgroundColor: "var(--pink)",
            borderColor: "var(--pink-dark)",
            borderRadius: "12px",
            fontWeight: "600",
          }}
        >
          + Add Employee
        </Button>
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" />
          <p style={{ color: "var(--text)" }}>Loading employees...</p>
        </div>
      ) : error ? (
        <p className="text-center text-danger">{error}</p>
      ) : (
        <Table bordered hover responsive>
          <thead style={{ backgroundColor: "var(--pink-light)" }}>
            <tr>
              <th>#</th>
              <th style={{ color: "var(--text)" }}>First Name</th>
              <th style={{ color: "var(--text)" }}>Last Name</th>
              <th style={{ color: "var(--text)" }}>Email</th>
              <th style={{ color: "var(--text)" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp, index) => (
              <tr key={emp._id}>
                <td>{index + 1}</td>
                <td>{emp.first_name}</td>
                <td>{emp.last_name}</td>
                <td>{emp.email}</td>

                <td>
                  <Button
                    size="sm"
                    onClick={() => navigate(`/employees/edit/${emp._id}`)}
                    style={{
                      backgroundColor: "var(--pink-light)",
                      border: "none",
                      color: "var(--text)",
                      marginRight: "8px",
                      borderRadius: "10px",
                      fontWeight: "600",
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    style={{
                      backgroundColor: "var(--pink-dark)",
                      border: "none",
                      borderRadius: "10px",
                      fontWeight: "600",
                    }}
                    onClick={() => handleDelete(emp._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default Employees;
