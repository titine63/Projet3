/* eslint-disable react/no-unescaped-entities */
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <>
      <section className="section">
        <div>
          <h2 className="h2">
            Inscrivez<span className="text-[#ec5a13]">.</span>
          </h2>
          <h2 className="h2">
            Explorez<span className="text-[#ec5a13]">.</span>
          </h2>
          <h2 className="h2">
            Economisez<span className="text-[#ec5a13]">.</span>
          </h2>
        </div>
        <form className="form relative">
          <AiOutlineUser className="absolute left-10 top-10 text-xl text-[#5e5e5e]" />
          <input
            type="email"
            id="email"
            name="email"
            className="input-auth"
            placeholder="Pseudo"
          />
          <HiOutlineMail className=" absolute left-10 top-[6.8rem] text-xl text-[#5e5e5e]" />
          <input
            type="email"
            id="email"
            name="email"
            className="input-auth"
            placeholder="Email"
          />
          <RiLockPasswordFill className=" absolute bottom-[2.8rem] left-10 text-xl text-[#5e5e5e]" />
          <input
            type="password"
            id="password"
            name="password"
            className="input-auth"
            placeholder="Mot de passe"
          />
        </form>
        <button type="submit" className="button-auth">
          Créer un compte
        </button>

        <Link to="/login" className="text-l mt-5 underline">
          Vous avez déjà un compte ?
        </Link>
      </section>
    </>
  );
}
