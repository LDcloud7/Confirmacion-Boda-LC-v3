import Countdown from "react-countdown";

const WeddingCountdown = () => {
  const weddingDate = new Date("2025-05-07T15:00:00"); // Example date and time

  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return <span>The wedding has started!</span>;
    } else {
      return (
        <span>
          {days} days, {hours} hours, {minutes} minutes, {seconds} seconds
        </span>
      );
    }
  };

  return <Countdown date={weddingDate} renderer={renderer} />;
};

export default WeddingCountdown;
