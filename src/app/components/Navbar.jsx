// src/app/components/Navbar.jsx
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">DrishtVyu</h2>
      <ul className="nav-links">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/Rate">Rate</Link></li>
        <li><Link href="/services">Services</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
