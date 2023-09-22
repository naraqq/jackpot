import React, { useState, useRef, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
export default function SlotMachine() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  });
  const [jackpotWheels, setJackpotWheels] = useState([
    ["1", "2", "3", "4"],
    ["1", "2", "3", "4"],
    ["1", "2", "3", "4"],
    ["1", "2", "3", "4"],
  ]);
  const [armClicked, setArmClicked] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const wheelRefs = useRef([]);
  const [final, setFinal] = useState([]);

  useEffect(() => {
    // Initialize the wheel refs
    wheelRefs.current = jackpotWheels.map(() => React.createRef());
  }, []);
  const [trigger, settrigger] = useState(false);
  useEffect(() => {
    // This effect runs whenever the `final` state changes
    // So, you can check for the winning combination here
    checkWinningCombination();
  }, [final]); // Run this effect whenever `final` changes

  const winningCombinations = [
    {
      combination: ["1", "1", "1", "1"],
      message: "Өнөөдрийн галзуу ганц од нь та байх нь дээ",
    },
    {
      combination: ["1", "1", "1", "2"],
      message: "Өөртөө итгэлтэй бай. Чи бүхнийг чадна ооё",
    },
    {
      combination: ["1", "1", "1", "3"],
      message: "Толинд харах бүртээ өөртөө хөөрхөн шүү гэж хэлдэг хүн бол чи",
    },
    {
      combination: ["1", "1", "1", "4"],
      message: "Хазаад хаячихмаар сайхан золиг вэ ккк",
    },
    {
      combination: ["1", "1", "2", "2"],
      message: "Удахгүй аав юм уу ээж болох нь дээ",
    },
    { combination: ["1", "1", "2", "3"], message: "Өнөөдөр үхтэлээ уунаа!!!" },
    {
      combination: ["1", "1", "2", "4"],
      message: "Маргааш шартах нигууртай тул тааруулж ууна уу!!!",
    },
    {
      combination: ["1", "1", "3", "3"],
      message: "Хольж ууж үхэв дээ золиг минь",
    },
    {
      combination: ["1", "1", "3", "4"],
      message: "Биесийг гаргуунд нь гарга.... Өнөөдөр чиний өдөр",
    },
    {
      combination: ["1", "1", "4", "4"],
      message: "9 сарын 30нд цалин буух төлөвтэй",
    },
    {
      combination: ["1", "2", "2", "2"],
      message: "Тууштай ажиллавал захирал болох энүүхэнд байна даа хөгшөөн",
    },
    {
      combination: ["1", "2", "2", "3"],
      message: "Биеэ энхрийлүүштэй. Витамин авч уу.",
    },
    {
      combination: ["1", "2", "2", "4"],
      message: "Байгалийн үзэсгэлэнт цэцэг шиг хамгийн үзэсгэлэнтэй нь байна",
    },
    {
      combination: ["1", "2", "3", "3"],
      message: "Ардаа байгаа хүнээсээ караокед даалгах эрхийн бичиг аваарай",
    },
    {
      combination: ["1", "2", "3", "4"],
      // message: "Удахгүй аав юм уу ээж болох нь дээ",
      message: "Өнөөдрийн галзуу ганц од нь та байх нь дээ",
    },
    {
      combination: ["1", "2", "4", "4"],
      message: "Top influencer болж SAN, LA явах нь дээ",
    },
    {
      combination: ["1", "3", "3", "3"],
      message: "Тос даасан нүнжигтэй хүчит хар",
    },
    {
      combination: ["1", "3", "3", "4"],
      message: "Дотроосоо ч гаднаасаа ч гэрэлтсэн сайхан хүн шүү",
    },
    {
      combination: ["1", "3", "4", "4"],
      message: "Домгийн шувуу ирлээ гэсэн чинь чи байсан юм уу",
    },
    {
      combination: ["1", "4", "4", "4"],
      message: "Харсан болгон чинь мөнгө өгч ажил үйлс чинь бүтэх нь дээ",
    },
    {
      combination: ["2", "2", "2", "2"],
      message: "Насны намар чинь гадаа ирчихэж. Гараад уулзчихаад ирэх үү?",
    },
    {
      combination: ["2", "2", "2", "3"],
      message: "Ухаантайдаа миний найз. Самар сайн идээрэй",
    },
    {
      combination: ["2", "2", "2", "4"],
      message: "Ажлаа тултал хийвэл удахгүй тушаал дэвших нигууртай байна даа",
    },
    {
      combination: ["2", "2", "3", "3"],
      message: "Өглөө Тэрэлжид сэрэхээр аюултай нөхөр байна даа",
    },
    {
      combination: ["2", "2", "3", "4"],
      message: "Ирсэн дуучидтай бүжиглэвэл ажил үйлс нь бүтэх нигууртай",
    },
    { combination: ["2", "2", "4", "4"], message: "Сэтгэл нь сайхан юм даа" },
    {
      combination: ["2", "3", "3", "3"],
      message: "Яг Super Star шиг харагдаж байна",
    },
    {
      combination: ["2", "3", "3", "4"],
      message: "Мөрөөдөл чинь удахгүй биелнэ",
    },
    {
      combination: ["2", "3", "4", "4"],
      message: "3 хүслээ шивнэ. Даанч би биелүүлж чадахгүй.",
    },
    {
      combination: ["2", "4", "4", "4"],
      message: "Вуаа наашан өөлкөн харагдаж байнаа",
    },
    {
      combination: ["3", "3", "3", "3"],
      message: "Хүн алахаар шийдээ юу? Битгий ийм хөөрхөн бай",
    },
    {
      combination: ["3", "3", "3", "4"],
      message:
        "Өнгөрсөн амьдралтайгаа тооцоогоо дуусгаад урагшаа харж амьдраарай",
    },
    {
      combination: ["3", "3", "4", "4"],
      message: "Насны намар чинь гадаа ирчихэж. Гараад уулзчихаад ирэх үү?",
    },
    {
      combination: ["3", "4", "4", "4"],
      message: "Өө гал гал гал гал гал .......................",
    },
    {
      combination: ["4", "4", "4", "4"],
      message: "3 хүслээ шивнэ. Даанч би биелүүлж чадахгүй.",
    },
  ];
  const checkWinningCombination = () => {
    for (let index = 0; index < winningCombinations.length; index++) {
      const element = winningCombinations[index];
      let sortedMain = element.combination.sort();
      let sortedCur = final.sort();
      if (arraysEqual(sortedMain, sortedCur)) {
        setResultMessage(element.message);
        return;
      }
    }
  };

  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }
  const startJackpot = () => {
    settrigger(!trigger);

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

            // Check for winning combination after animation ends
            if (index === jackpotWheels.length - 1) {
              setTimeout(() => {
                // Ensure that final state is updated
                const newFinal = jackpotWheels.map((wheel) => wheel[0]);
                setFinal(newFinal);
              }, 0); // Use a timeout with 0ms delay to allow state update
            }
          }, 2000);
        }
      }, time);
    });
  };

  const handleClick = () => {
    if (!armClicked) {
      setArmClicked(true);
      setResultMessage(""); // Clear the previous result message
      setTimeout(() => {
        setArmClicked(false);
      }, 1000);
    }
  };

  return (
    <div className="">
      <img
        src="jackpot_bg.png"
        className="w-screen h-screen select-none"
        alt=""
      />
      <div className="fixed h-screen w-screen top-0 left-0 flex items-center justify-center">
        <div className="w-[calc(37%+100px)] ml-[100px] relative mt-8 flex">
          <div className="jackpot__screen">
            {jackpotWheels.map((wheel, index) => {
              return (
                <ul
                  key={index}
                  className="jackpot__wheel"
                  ref={wheelRefs.current[index]}
                >
                  {wheel.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="mb-10 flex items-center justify-center"
                      >
                        {/* {item} */}
                        <img
                          className="!h-[70px] my-5"
                          src={`images/${item}.png`}
                          alt={`${item}.png`}
                        />
                      </li>
                    );
                  })}
                </ul>
              );
            })}
          </div>
          <div className="w-[100px]">
            <div id="equation" className={armClicked ? "done" : ""}>
              <div id="shoulder">
                <div
                  id="arm"
                  className={armClicked ? "clicked" : ""}
                  onClick={() => {
                    handleClick();
                    startJackpot();
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed h-[400px] w-screen bottom-0 left-0 flex items-center justify-center">
        {resultMessage != "" && (
          <div
            data-aos="fade-up"
            className="bg-[#F0E9F1] w-[calc(50%)] p-4 text-xl rounded-2xl bg-grad select-none"
          >
            <p className="text-center font-semibold text-[#1D3182]">
              {resultMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
