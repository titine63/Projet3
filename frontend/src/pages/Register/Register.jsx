import RegisterForm from "../../components/Auth/AuthForms/RegisterForm";

// Contenu de la page d'inscription en mobile
export default function Register() {
  return (
    <main className="main flex flex-col justify-center">
      <section className="section gap-6 md:gap-12">
        <div className="flex flex-col gap-3 md:gap-6 lg:gap-9">
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
        <RegisterForm className="form w-4/5 items-center gap-4 sm:w-3/4 md:w-2/3 md:gap-8 lg:w-1/2 xl:w-1/3" />
      </section>
    </main>
  );
}
