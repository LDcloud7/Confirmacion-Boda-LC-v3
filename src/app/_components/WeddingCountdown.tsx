/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Countdown from "react-countdown";

const WeddingCountdown = () => {
  const weddingDate = new Date("2025-11-15T23:59:59");

  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return <span>¡La boda ha comenzado!</span>;
    } else {
      return (
        <span className="font-corsiva text-center text-3xl md:text-2xl lg:text-4xl">
          {days} Días, {hours} Horas, {minutes} Minutos, {seconds} Segundos
        </span>
      );
    }
  };

  return <Countdown date={weddingDate} renderer={renderer} />;
};

export default WeddingCountdown;
