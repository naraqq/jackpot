import React, { useState, useRef, useEffect } from "react";

function Test() {
  const [jackpotWheels, setJackpotWheels] = useState([
    ["1", "2", "3", "4"],
    ["1", "2", "3", "4"],
    ["1", "2", "3", "4"],
    ["1", "2", "3", "4"],
  ]);
  const [armClicked, setArmClicked] = useState(false);
  const wheelRefs = useRef([]);

  useEffect(() => {
    // Initialize the wheel refs
    wheelRefs.current = jackpotWheels.map(() => React.createRef());
  }, []);

  const startJackpot = () => {
    // Shuffle the jackpot wheels
    const shuffledJackpotWheels = jackpotWheels.map((wheel) => {
      const shuffledWheel = wheel.sort(() => Math.random() - 0.5);
      shuffledWheel.push(shuffledWheel[0]);
      return shuffledWheel;
    });

    // Set the jackpot wheels state
    setJackpotWheels(shuffledJackpotWheels);

    // Start the jackpot animation
    jackpotWheels.forEach((wheel, index) => {
      const time = 200 * index;

      setTimeout(() => {
        // Get the DOM element for the jackpot wheel
        const wheelElement = wheelRefs.current[index]?.current;

        // Check if the DOM element is not null
        if (wheelElement) {
          // Add the "animated" class to the jackpot wheel
          wheelElement.classList.add("animated");

          // Remove the "animated" class after 2 seconds
          setTimeout(() => {
            wheelElement.classList.remove("animated");
          }, 2000);
        }
      }, time);
    });
  };
  return (
    <div className="relative h-screen w-screen flex items-center justify-center">
      <img src="jackpot_bg.png" className="w-full h-full select-none" alt="" />
      <div className=" absolute">
        <div className="jackpot__screen">
          {jackpotWheels.map((wheel, index) => (
            <ul
              key={index}
              className="jackpot__wheel"
              ref={wheelRefs.current[index]}
            >
              {wheel.map((item, index) => (
                <li key={index} className="">
                  {/* {item} */}
                  <img
                    className="h-[100px]"
                    src={`images/${item}.png`}
                    alt=""
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
        <button className="jackpot__btn" onClick={startJackpot}>
          Start
        </button>
      </div>
    </div>
  );
}

export default Test;
