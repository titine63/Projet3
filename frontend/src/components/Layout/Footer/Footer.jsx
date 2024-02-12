// Footer.jsx
import NavbarMobile from "../NavbarMobile/NavbarMobile";
import NavbarDesktop from "../NavbarDesktop/NavbarDesktop"; // Assurez-vous que ce composant est créé

export default function Footer() {
  return (
    <footer className="w-full bg-stone-100 px-4 py-2">
      {/* NavbarMobile est affichée uniquement sur les petits écrans */}
      <div className="sm:hidden">
        <NavbarMobile />
      </div>
      
      {/* NavbarDesktop est affichée uniquement sur les écrans medium et plus grands */}
      <div className="hidden sm:block">
        <NavbarDesktop />
      </div>
    </footer>
  );
}
