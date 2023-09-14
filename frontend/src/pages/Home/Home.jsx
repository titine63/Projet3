import Carousel from "../../components/Carousel/Carousel";

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
    <>
      <Carousel>
        {carouselItems.map((item) => (
          <div className="carousel-item" key={item.id}>
            {item.text}
          </div>
        ))}
      </Carousel>
      <section className="home-section">
        <div className="mb-7 flex flex-col items-center justify-center gap-1 text-center">
          <h2>Explorez votre brocante virtuelle</h2>
          <button className="flex min-w-[8.1rem] items-center justify-between gap-5 bg-[#FCE3D7] py-1 pl-5 pr-2">
            <p>Acheter</p>
            <BiSolidChevronsRight className="justify-end text-[#ec5a13]" />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 text-center">
          <h2>Donnez une seconde vie à vos vêtements.</h2>

          <button className="flex min-w-[8.1rem] items-center justify-between gap-5 bg-[#FCE3D7] py-1 pl-5 pr-2">
            <p>Vendre</p>
            <BiSolidChevronsRight className="text-[#ec5a13]" />
          </button>
        </div>
      </section>
    </>
  );
}
