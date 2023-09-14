import { Link } from "react-router-dom";
import userIcon from "./../../assets/icons/users-group-rounded-line.svg";

export default function Header() {
  return (
    <>
      <header className="header">
        <Link to="/">
          <span className="logo">TRINDED</span>
        </Link>

        <Link to="/login">
          <img src={userIcon}></img>
        </Link>
      </header>
    </>
  );
}
