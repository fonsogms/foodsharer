import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <nav>
        <Link>Login</Link>
        <Link>Signup</Link>
      </nav>
    </div>
  );
};

export default Navbar;
