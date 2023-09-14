import { Link } from "react-router-dom";
import homeIcon from "./../../assets/icons/home-simple.svg";
import searchIcon from "./../../assets/icons/search.svg";
import addIcon from "./../../assets/icons/add.svg";
import msgIcon from "./../../assets/icons/msg.svg";
import heartIcon from "./../../assets/icons/heart.svg";
export default function NavbarMobile() {
  return (
    <>
      <nav className="navbar-mobile">
        <ul className="menu-ul--horizontal">
            <li>
              <Link to="/">
                <img src={homeIcon} alt="homeIcon" />
              </Link>
            </li>
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
