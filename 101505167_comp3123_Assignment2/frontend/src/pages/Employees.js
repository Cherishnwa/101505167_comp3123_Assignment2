import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

function Employees() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load employee list
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/emp/employees");
        setEmployees(res.data);
      } catch (err) {
        setError("Failed to load employee list");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Delete employee
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/v1/emp/employees?eid=${id}`
      );

      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
    } catch (err) {
      alert("Failed to delete employee");
    }
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <Container className="text-center pt-5">
          <p style={{ color: "var(--pink-dark)" }}>Loading employees...</p>
        </Container>
      </>
    );
  }

  return (
    <>
      <NavBar />

      <Container className="pt-4">
        <h2 style={{ color: "var(--pink-dark)", fontWeight: "700" }}>
          Employee List
        </h2>

        {error && (
          <p style={{ color: "var(--pink-dark)", fontWeight: "600" }}>
            {error}
          </p>
        )}

        {/* Add Employee Button */}
        <div className="text-end mb-3">
          <Button
            onClick={() => navigate("/employees/add")}
            style={{
              backgroundColor: "var(--pink)",
              borderColor: "var(--pink-dark)",
              borderRadius: "10px",
              fontWeight: "600",
            }}
          >
            + Add Employee
          </Button>
        </div>

        {/* Employee Table */}
        <Table bordered hover>
          <thead style={{ backgroundColor: "var(--pink-light)" }}>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Date Joined</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.first_name} {emp.last_name}</td>
                <td>{emp.email}</td>
                <td>{emp.position}</td>
                <td>${emp.salary}</td>
                <td>{emp.date_of_joining?.substring(0, 10)}</td>
                <td>{emp.department}</td>

                <td style={{ width: "180px" }}>
                  {/* EDIT BUTTON */}
                  <Button
                    size="sm"
                    onClick={() => navigate(`/employees/edit/${emp._id}`)}
                    style={{
                      backgroundColor: "var(--pink-light)",
                      borderColor: "var(--pink-dark)",
                      color: "var(--pink-dark)",
                      marginRight: "10px",
                      borderRadius: "10px",
                      fontWeight: "600",
                    }}
                  >
                    Edit
                  </Button>

                  {/* DELETE BUTTON */}
                  <Button
                    size="sm"
                    onClick={() => handleDelete(emp._id)}
                    style={{
                      backgroundColor: "#ff5c8a",
                      borderColor: "#ff5c8a",
                      borderRadius: "10px",
                      fontWeight: "600",
                    }}
                  >
                    Delete
                  </Button>
                </td>

              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Employees;
