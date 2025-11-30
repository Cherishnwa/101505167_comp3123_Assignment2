import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function HomePage() {
  const navigate = useNavigate();

  const loggedIn = localStorage.getItem("loggedIn");

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        height: "100vh",
        backgroundColor: "var(--bg)",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          fontWeight: "800",
          color: "var(--pink-dark)",
          marginBottom: "20px",
        }}
      >
        Employee Portal
      </h1>

      <p
        style={{
          color: "var(--text)",
          fontSize: "20px",
          maxWidth: "600px",
          marginBottom: "40px",
        }}
      >
        A modern and simple employee management system built with Node.js, MongoDB, and React.
      </p>

      {!loggedIn ? (
        // =====================
        // NOT LOGGED IN UI
        // =====================
        <div className="d-flex gap-3">
          <Button
            style={{
              backgroundColor: "var(--pink)",
              borderColor: "var(--pink-dark)",
              borderRadius: "12px",
              fontWeight: "600",
              padding: "10px 25px",
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>

          <Button
            style={{
              backgroundColor: "white",
              borderColor: "var(--pink-dark)",
              color: "var(--pink-dark)",
              borderRadius: "12px",
              fontWeight: "600",
              padding: "10px 25px",
            }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </div>
      ) : (
        // =====================
        // LOGGED IN UI
        // =====================
        <div className="d-flex gap-3">
          <Button
            style={{
              backgroundColor: "var(--pink)",
              borderColor: "var(--pink-dark)",
              borderRadius: "12px",
              fontWeight: "600",
              padding: "10px 25px",
            }}
            onClick={() => navigate("/employees")}
          >
            Go to Employees
          </Button>

          <Button
            style={{
              backgroundColor: "var(--pink-dark)",
              borderColor: "var(--pink-dark)",
              borderRadius: "12px",
              fontWeight: "600",
              padding: "10px 25px",
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      )}
    </Container>
  );
}

export default HomePage;
