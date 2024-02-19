//NavbarMobile.jsx is a component that contains the mobile navbar with icons.
import { Link } from "react-router-dom";
import searchIcon from "./../../../assets/icons/search.svg";
import addIcon from "./../../../assets/icons/add.svg";
import msgIcon from "./../../../assets/icons/msg.svg";
import heartIcon from "./../../../assets/icons/heart.svg";

// Navbar en mobile (en bas de l'écran) avec des icônes
export default function NavbarMobile() {
  return (
    <>
      <nav className="h-full w-full sm:hidden">
        <ul className="flex items-center justify-between px-3">
          <li>
            <Link to="/buy">
              <img src={searchIcon} alt="searchIcon" />
            </Link>
          </li>
          <li>
            <Link to="sell">
              <img src={addIcon} alt="addIcon" />
            </Link>
          </li>
          <li>
            <Link to="/chat">
              <img src={msgIcon} alt="msgIcon" />
            </Link>
          </li>
          <li>
            <Link to="/favorites">
              <img src={heartIcon} alt="heartIcon" />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
