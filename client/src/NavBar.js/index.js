import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
   <>
   <nav className="navbar bg-secondary">
        <h1 className="ms-5">
          <Link to="/" className="text-white text-decoration-none">Developer Hub</Link>
        </h1>
        <ul className="list-unstyled d-flex mt-3">
          <li className="me-3"><Link to="/login" className="text-white text-decoration-none">Login</Link></li>
          <li className="me-3"><Link to="/register" className="text-white text-decoration-none">Register</Link></li>
        </ul>
      </nav>
   </>
  )
}

export default NavBar