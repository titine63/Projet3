import NavbarMobile from "../NavbarMobile/NavbarMobile";

// Footer en mobile (apparait en mobile uniquement)
export default function Footer() {
  return (
    <>
      <footer className="fixed bottom-0 z-10 w-full bg-stone-100 px-4 py-2 sm:hidden">
        <NavbarMobile />
      </footer>
    </>
  );
}
