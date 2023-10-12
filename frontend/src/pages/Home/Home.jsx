import Carousel from "../../components/Carousel/Carousel";
import { Link } from "react-router-dom";
import { BiSolidChevronsRight } from "react-icons/bi";

export default function Home() {
  const carouselItems = [
    {
      id: 1,
      text: (
        <>
          <p className="carousel-text">
            Acheter <span className="text-xl font-bold text-[#EC5A13]">.</span>
          </p>
          <p className="carousel-text">
            Vendre <span className="text-xl font-bold text-[#EC5A13]">.</span>
          </p>
          <p className="carousel-text">
            Répéter<span className="text-xl font-bold text-[#EC5A13]">.</span>
          </p>
        </>
      ),
    },
    {
      id: 2,
      text: (
        <>
          <p className="carousel-text font-semibold">
            Si vous cherchez à transformer vos vêtements oubliés en trésor
            recherché ! Alors, vous êtes au bon endroit.
          </p>
        </>
      ),
    },
    {
      id: 3,
      text: (
        <>
          <p className="carousel-text font-semibold">
            TRINDED est une brocante virtuelle, où chaque pièce a son histoire.
          </p>
        </>
      ),
    },
  ];
  return (
    <main className="main flex flex-col">
      <Carousel>
        {carouselItems.map((item) => (
          <div className="carousel-item" key={item.id}>
            {item.text}
          </div>
        ))}
      </Carousel>
      {/* *************************************************fin carousel ************************************************** */}

      <section className="home-bottom">
        <div className="home-buttons">
          <div className="container-button-home">
            <h2>Explorez votre brocante virtuelle</h2>
            <Link to="/buy" className="button-homepage">
              Acheter
              <BiSolidChevronsRight className="justify-end text-[#ec5a13]" />
            </Link>
          </div>

          <div className="container-button-home">
            <h2>Donnez une seconde vie à vos vêtements.</h2>
            <Link to="/sell" className="button-homepage">
              Vendre
              <BiSolidChevronsRight className="text-[#ec5a13]" />
            </Link>
          </div>
        </div>
        <img
          className="home-img"
          src="/images/home-image.png"
          alt="home-img"
        />
      </section>
    </main>
  );
}
