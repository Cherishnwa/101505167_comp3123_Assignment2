import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: "var(--pink-light)",
        borderBottom: "2px solid var(--pink-dark)"
      }}
    >
      <Container>
        <Navbar.Brand
          style={{
            color: "var(--pink-dark)",
            fontWeight: "700",
            fontSize: "24px",
            cursor: "pointer"
          }}
          onClick={() => navigate("/employees")}
        >
          EMPLOYEE PORTAL
        </Navbar.Brand>

        <Nav className="ms-auto d-flex align-items-center">
          <Nav.Link
            onClick={() => navigate("/employees")}
            style={{
              color: "var(--text)",
              fontWeight: "600",
              marginRight: "20px",
              cursor: "pointer"
            }}
          >
            Employees
          </Nav.Link>

          <Nav.Link
            onClick={() => navigate("/employees/add")}
            style={{
              color: "var(--text)",
              fontWeight: "600",
              marginRight: "20px",
              cursor: "pointer"
            }}
          >
            Add Employee
          </Nav.Link>

          <Button
            onClick={handleLogout}
            style={{
              backgroundColor: "var(--pink-dark)",
              borderColor: "var(--pink-dark)",
              borderRadius: "12px",
              fontWeight: "600"
            }}
          >
            Logout
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navbar;

