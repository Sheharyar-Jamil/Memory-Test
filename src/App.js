import { useEffect, useState } from "react";

const initialCard = [
  {
    id: 5423,
    obj: "⚽",
  },

  {
    id: 8723,
    obj: "☂️",
  },

  {
    id: 7612,
    obj: "📙",
  },

  {
    id: 9034,
    obj: "🍵",
  },

  {
    id: 8542,
    obj: "👞",
  },

  {
    id: 6666,
    obj: "⚽",
  },

  {
    id: 3906,
    obj: "☂️",
  },

  {
    id: 3456,
    obj: "👞",
  },

  {
    id: 8548,
    obj: "🚴‍♂️",
  },

  {
    id: 6646,
    obj: "👓",
  },

  {
    id: 6906,
    obj: "🍵",
  },

  {
    id: 3556,
    obj: "🌴",
  },

  {
    id: 8532,
    obj: "📙",
  },

  {
    id: 6696,
    obj: "🚴‍♂️",
  },

  {
    id: 3806,
    obj: "🌴",
  },

  {
    id: 3676,
    obj: "👓",
  },
];

function App() {
  const [selectedObj, setSelectedObj] = useState(null);
  const [prevSelectedObj, setPrevSelectedObj] = useState(null);
  const [move, setMove] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [matchCards, setMatchCards] = useState([]);

  useEffect(() => {
    let intervalID;
    if (timerStarted) {
      intervalID = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    }
    return () => clearInterval(intervalID);
  }, [timerStarted]);

  useEffect(() => {
    const shuffleCards = getRandomImage();
    setSelectedObj(shuffleCards);
  }, []);

  function getRandomImage() {
    const shuffleCard = [...initialCard].sort(() => Math.random() - 0.5);
    return shuffleCard.slice(0, 8);
  }

  function handleSelectObject(id, obj) {
    console.log(id, obj);

    // If user selected same card again
    if (id === selectedObj || matchCards.includes(obj)) return;

    // If it is first selection
    if (selectedObj === null) {
      setSelectedObj(id);
      setPrevSelectedObj(obj);
      return;
    }
    if (obj === prevSelectedObj) {
      setScore(function (score) {
        return score + move * 2;
      });

      setMatchCards(function (matchCards) {
        return [...matchCards, obj];
      });
    } else {
      // If not matched reset selection after short delay
      setTimeout(() => {
        setSelectedObj(null);
        setPrevSelectedObj(null);
      }, 3000);
    }
    setSelectedObj(id);
    setMove(function (move) {
      return move + 1;
    });
    setPrevSelectedObj(obj);

    setTimerStarted(true);
  }

  return (
    <div className="container center">
      <div className="move-timer">
        <Timer timer={timer} />
        <Move move={move} />
      </div>
      <Score score={score} />
      <MemoryTest />
      <Card
        onSelectedObj={handleSelectObject}
        selectedObj={selectedObj}
        matchCards={matchCards}
      />
    </div>
  );
}

function MemoryTest() {
  return (
    <>
      <h1 className="heading-primary">Memory Test</h1>
    </>
  );
}

function Card({ onSelectedObj, selectedObj, matchCards }) {
  const cards = initialCard;
  return (
    <div className="card-section">
      <ul className="card ">
        {cards.map(function (card) {
          return (
            <Cards
              cardObj={card}
              key={card.id}
              onSelectedObj={onSelectedObj}
              selectedObj={selectedObj}
              matchCards={matchCards}
            />
          );
        })}
      </ul>
    </div>
  );
}

function Cards({ cardObj, onSelectedObj, selectedObj, matchCards }) {
  const isSelected = selectedObj === cardObj.id;
  return (
    <>
      <li
        className={`card-list ${matchCards.includes(cardObj.obj) ? "red" : ""}`}
        onClick={() => onSelectedObj(cardObj.id, cardObj.obj)}
      >
        {isSelected || matchCards.includes(cardObj.obj) ? cardObj.obj : ""}
      </li>
    </>
  );
}

function Move({ move }) {
  return (
    <>
      <h3 className="heading-tertiary">
        Moves <span className="span-info">{move}</span>
      </h3>
    </>
  );
}

function Timer({ timer }) {
  return (
    <>
      <h3 className="heading-tertiary">
        Time <span className="span-info"> {timer}</span>
      </h3>
    </>
  );
}

function Score({ score }) {
  return (
    <>
      <h3 className="heading-tertiary">
        Your Score <span className="span-info">{score}</span>
      </h3>
    </>
  );
}

export default App;
