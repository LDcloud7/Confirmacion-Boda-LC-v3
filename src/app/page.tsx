"use client";

export default function Home() {
  return (
    <main className="flex h-[calc(100vh-var(--header-h))] w-full snap-y snap-mandatory flex-col overflow-y-auto overscroll-contain scroll-smooth">
      <section className="z-10 flex min-h-[calc(100vh-var(--header-h))] w-full snap-center snap-always items-center justify-center px-4 pt-28 text-center">
        <div className="mx-auto flex max-w-screen-lg flex-col items-center">
          <p className="font-sunday text-center text-5xl leading-tight font-bold md:text-7xl lg:text-8xl">
            ¡NOS CASAMOS!
          </p>
          <p className="font-corsiva mt-8 mb-3 text-center text-2xl md:mt-20 md:text-3xl lg:text-[2.5rem]">
            Y nos haría muy felices <br />
            compartir este día <br />
            tan especial contigo! 🎉
          </p>
          <h1 className="font-brown-sugar mt-6 text-center text-6xl leading-tight font-bold md:mt-8 md:text-7xl lg:text-8xl">
            Lucas y <br />
            Carolina
          </h1>
        </div>
      </section>
      <section className="flex min-h-[calc(100vh-var(--header-h))] w-full snap-center snap-always flex-col items-center justify-center px-4 pt-28 text-center">
        <div className="mx-auto flex max-w-screen-lg flex-col items-center">
          <div className="flex flex-row flex-wrap justify-center gap-2 text-center text-4xl leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="font-sunday text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem]">
              CIVIL
            </span>
            <span className="font-brown-sugar text-[2.5rem] sm:text-[3rem] md:text-[4rem] xl:text-[6rem]">
              |
            </span>
            <span className="font-brown-sugar text-[2.5rem] sm:text-[3rem] md:text-[4rem] xl:text-[6rem]">
              5/12
            </span>
            <span className="font-brown-sugar text-[2.5rem] sm:text-[3rem] md:text-[4rem] xl:text-[6rem]">
              |
            </span>
            <span className="font-brown-sugar text-[2.5rem] sm:text-[3rem] md:text-[4rem] xl:text-[6rem]">
              13:00
            </span>
          </div>
          <div className="lg:text-12xl mt-8 flex flex-row flex-wrap justify-center gap-2 text-4xl leading-tight sm:mt-14 sm:text-5xl md:text-6xl">
            <span className="font-sunday text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem]">
              CEREMONIA
            </span>
            <span className="font-brown-sugar text-[2.5rem] sm:text-[3rem] md:text-[4rem] xl:text-[6rem]">
              |
            </span>
            <span className="font-brown-sugar text-[2.5rem] sm:text-[3rem] md:text-[4rem] xl:text-[6rem]">
              7/12
            </span>
            <span className="font-brown-sugar text-[2.5rem] sm:text-[3rem] md:text-[4rem] xl:text-[6rem]">
              |
            </span>
            <span className="font-brown-sugar text-[2.5rem] sm:text-[3rem] md:text-[4rem] xl:text-[6rem]">
              16:30
            </span>
          </div>
          <p className="font-corsiva mt-6 text-2xl md:mt-10 md:text-3xl">
            Información del evento en confirmación
          </p>
          <p className="font-corsiva mt-2 text-xl md:text-2xl">
            Eclesiastés 3:11 <br />
            “Todo lo hizo hermoso en su tiempo; y ha <br />
            puesto eternidad en el corazón de ellos, sin que <br />
            alcance el hombre a entender la obra que ha <br />
            hecho Dios desde el principio hasta el fin.”
          </p>
        </div>
      </section>
      <section className="flex min-h-[calc(100vh-var(--header-h))] w-full snap-center snap-always flex-col items-center justify-center px-4 pt-28 text-center">
        <div className="mx-auto flex max-w-screen-lg flex-col items-center">
          <p className="font-corsiva mb-3 text-center text-2xl md:text-3xl">
            Hoy, con mucha alegría, le decimos si a <br />
            nuestro amor, le decimos sí a la voluntad <br />
            de Dios, porque de su mano, todo es más hermoso. Por eso queremos
            que seas parte <br />y te pedimos que nos confirmes por aqui!
          </p>
          <a
            href="/confirmacion"
            className="font-sunday m-auto my-8 w-3/4 rounded-xl border-2 border-black px-8 py-4 text-2xl hover:bg-black hover:text-white sm:w-2/3 md:w-1/2 md:text-3xl"
          >
            Confirmar Asistencia
          </a>
          <p className="font-corsiva mt-6 text-center text-2xl md:mt-10 md:text-3xl">
            Cantares 8:7 “Las muchas aguas no podrán apagar el amor, Ni lo
            ahogarán los ríos.”
          </p>
        </div>
      </section>
      <section className="flex min-h-[calc(100vh-var(--header-h))] w-full snap-center snap-always flex-col items-center justify-center px-4 pt-28 text-center">
        <div className="mx-auto flex max-w-screen-lg flex-col items-center">
          <p className="font-corsiva mb-3 text-center text-2xl md:text-3xl">
            Nuestro mayor regalo es poder compartir <br />
            este día tan único y especial contigo. <br />
            Sin embargo, a partir de ahora, <br />
            comenzamos a formar nuestra hermosa <br />
            familia. <br />
            Dejamos sin ningún compromiso, nuestro <br />
            número de cuenta bancaria en el caso de <br />
            que quieras ayudarnos a armar nuestra casita
            <br />o para usarlo con otro fin.
          </p>
          <div className="font-corsiva mt-5 mb-3 text-center text-xl md:text-2xl">
            <p>
              BROU <strong>110497632-00003</strong>
            </p>
            <p>
              Titular de la cuenta: <strong>Lucas Dorner</strong>
            </p>
          </div>
          <h1 className="font-brown-sugar mt-6 text-center text-6xl leading-tight font-bold md:mt-8 md:text-7xl lg:text-8xl">
            ¡LOS ESPERAMOS!
          </h1>
        </div>
      </section>
    </main>
  );
}
