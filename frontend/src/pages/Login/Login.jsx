export default function Login() {
  return (
    <>
      <h1 className="logo">TRINDED</h1>
      <section className="section">
        <h2 className="h2">Connectez-vous</h2>
        <form className="form">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input"
            placeholder="Email"
          />
          <label htmlFor="password" className="label">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="input"
            placeholder="Mot de passe"
          />
        </form>
        <button type="submit" className="button">
          Se connecter
        </button>

        <a href="#" className="button">
          Ceci est un lien
        </a>
      </section>
    </>
  );
}
