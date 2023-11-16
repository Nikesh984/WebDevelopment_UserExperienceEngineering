import {
    Outlet,
    Link
  } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Layout({user, handleLogout}){
    return (
      <>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="">Indeed</Navbar.Brand>

            {user ? (
              <>
                {/* Conditionally render these items for authenticated users */}
                <Nav className="me-auto navbar-collapse justify-content-end">
                  <Link to="/home" className="nav-link">
                    Home
                  </Link>
                  <Link to="/jobs" className="nav-link">
                    Jobs
                  </Link>
                  <Link to="/about" className="nav-link">
                    About
                  </Link>
                  <Link to="/contact" className="nav-link">
                    Contact
                  </Link>
                  <Link to="/login" className="nav-link" onClick={handleLogout}>
                    Logout
                  </Link>
                </Nav>
              </>
            ) : (
              // Render this item for non-authenticated users
              <Nav className="me-auto navbar-collapse justify-content-end">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </Nav>
            )}
          </Container>
        </Navbar>
        <Outlet />
      </>
    );
}

export default Layout;