import React from "react";
import router from "../assets/router.png";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate=useNavigate()

  return (
    <div className="navbar">
      <img src={router} alt="" width="130px" />
      {/* <ul>
        <Link to='/'><li>Home</li></Link>
        <Link to='/products'><li>Products</li></Link>
        <Link to='/about'><li>About</li></Link>
        <Link to='/contact'><li>Contact</li></Link>
      </ul> */}
      <ul>
        <NavLink to='/' ><li>Home</li></NavLink>
        <NavLink to='/products'><li>Products</li></NavLink>
        <NavLink to='/about'><li>About</li></NavLink>
        <NavLink to='/contact'><li>Contacts</li></NavLink>
        <NavLink to='/jobs'><li>Jobs</li></NavLink>
      </ul>
      <button onClick={()=>navigate('/about',{replace:true})}>Get started</button> {/* Does not save history */}
    </div>
  );
};

export default Navbar;
