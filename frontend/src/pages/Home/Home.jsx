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
            Répéter <span className="text-xl font-bold text-[#EC5A13]">.</span>
          </p>
        </>
      ),
    },
    {
      id: 2,
      text: (
        <p className="carousel-text">
          Si vous cherchez à transformer vos vêtements oubliés en trésor
          recherché ! Alors, vous êtes au bon endroit.
        </p>
      ),
    },
    {
      id: 3,
      text: (
        <p className="carousel-text">
          TRINDED est une brocante virtuelle, où chaque pièce a son histoire.
        </p>
      ),
    },
  ];
  return (
    <main className="main flex flex-col gap-8 md:gap-12 lg:gap-16 xl:gap-0">
      <Carousel>
        {carouselItems.map((item) => (
          <div
            className="flex w-[80%] flex-col items-center justify-center gap-2 sm:flex-row sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16"
            key={item.id}
          >
            {item.text}
          </div>
        ))}
      </Carousel>

      <section className="flex flex-col items-center gap-8 md:gap-12 lg:gap-16 xl:flex-row xl:gap-0">
        <div className="flex flex-col items-center md:text-2xl xl:mb-8 xl:w-1/3 xl:gap-10">
          <div className="flex flex-col items-center gap-8 text-center md:gap-12 lg:gap-14 xl:gap-16">
            <div className="flex flex-col items-center gap-2 md:gap-6">
              <h2 className="w-[90%]">Explorez notre brocante virtuelle</h2>
              <Link
                to="/buy"
                className="flex w-[10rem] items-center justify-between gap-5 bg-[#FCE3D7] py-1 pl-5 pr-2 shadow-sm shadow-black"
              >
                Acheter
                <BiSolidChevronsRight className="text-[#ec5a13]" />
              </Link>
            </div>
            <div className="flex flex-col items-center gap-2 md:gap-6">
              <h2 className="w-[90%]">
                Donnez une seconde vie à vos vêtements.
              </h2>
              <Link
                to="/sell"
                className="flex w-[10rem] items-center justify-between gap-5 bg-[#FCE3D7] py-1 pl-5 pr-2 shadow-sm shadow-black"
              >
                Vendre
                <BiSolidChevronsRight className="text-[#ec5a13]" />
              </Link>
            </div>
          </div>
        </div>
        <img
          className="w-[90%] xl:w-2/3"
          src="./../../../public/images/home-image.png"
          alt="dressing picture"
        />
      </section>
    </main>
  );
}
