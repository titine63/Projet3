// NavbarDesktop.jsx
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaPinterestP } from 'react-icons/fa';
import favicon from "./../../../assets/icons/favicon.ico";

export default function NavbarDesktop() {
    return (
    <nav className="hidden sm:flex justify-between items-center w-full">
      <div className="flex items-center">
        <Link to="/" className="mr-6">
          <img src={favicon} alt="Logo" className="h-8" />
        </Link>
        <Link to="/about" className="hover:text-orange-600">À propos</Link>
        <Link to="/careers" className="ml-4 hover:text-orange-600">Carrière</Link>
        <Link to="/contact" className="ml-4 hover:text-orange-600">Contact</Link>
      </div>
      <div className="flex items-center">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="h-6 w-6" style={{ color: '#ec5a13' }} />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="ml-4">
          <FaInstagram className="h-6 w-6" style={{ color: '#ec5a13' }} />
        </a>
        <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer" className="ml-4">
          <FaPinterestP className="h-6 w-6" style={{ color: '#ec5a13' }} />
        </a>
      </div>
    </nav>
  );
}





