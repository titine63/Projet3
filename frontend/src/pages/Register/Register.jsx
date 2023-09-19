/* eslint-disable react/no-unescaped-entities */
export default function Register() {
  return (
    <>
      <section className="section">
        <h2 className="h2">Connectez-vous</h2>
        <form className="form">
          <label htmlFor="pseudo" className="label">
            pseudo
          </label>
          <input
            type="text"
            id="pseudo"
            name="pseudo"
            className="input"
            placeholder="Pseudo"
          />
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
          S'inscrire
        </button>
      </section>
    </>
  );
}
