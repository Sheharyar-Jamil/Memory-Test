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
  const [selectedObj, setSelectedObj] = useState(initialCard);
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
    const allCardsMatched = matchCards.length === initialCard.length / 2;
    if (allCardsMatched) {
      setTimerStarted(false);
    }
  }, [matchCards]);

  useEffect(() => {
    const shuffleCards = getRandomImage();
    setSelectedObj(shuffleCards);
    console.log(shuffleCards);
  }, []);

  function allCardsMatched() {
    return matchCards.length === initialCard.length / 2;
  }

  function getRandomImage() {
    const shuffleCard = [...initialCard].sort(function () {
      return Math.random() - 0.5;
    });
    console.log("Shuffle Card: ", shuffleCard);
    const shuffleCardID = shuffleCard.map(function (shuffleCard, index) {
      return { ...shuffleCard, id: index + 10 };
    });
    return shuffleCardID.slice(0, 16);
  }

  function handleSelectObject(id, obj) {
    console.log(id);
    // If user selected same card again
    if (selectedObj.length === 0 || matchCards.includes(obj)) return;

    // If it is first selection
    if (selectedObj.length === 0) {
      setSelectedObj([{ id, obj }]);
      setPrevSelectedObj(obj);
      return;
    }
    if (obj === prevSelectedObj) {
      setScore(function (score) {
        return score + move * 2;
      });

      setMatchCards(function (matchCards) {
        console.log("Match Cards: ", matchCards);
        return [...matchCards, obj];
      });
    }

    // Check if card is already selected
    if (
      selectedObj.some(function (card) {
        return card.id === id && !matchCards.includes(obj);
      })
    ) {
      return;
    }
    console.log("selected Obj: ", selectedObj);
    setSelectedObj(function (prevObj) {
      console.log("PrevObj: ", prevObj);
      return [...prevObj, { id, obj }];
    });
    setMove(function (move) {
      return move + 1;
    });
    setPrevSelectedObj(obj);

    setTimerStarted(true);
  }

  function handleRestart() {
    setSelectedObj(initialCard);
    setPrevSelectedObj(null);
    setMatchCards([]);
    setMove(0);
    setTimer(0);
    setScore(0);
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

      {allCardsMatched() && (
        <button className="btn" onClick={handleRestart}>
          Restart
        </button>
      )}
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
  return (
    <div className="card-section">
      <ul className="card ">
        {selectedObj.map(function (card) {
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
  const isSelected = selectedObj.some(function (obj) {
    return obj && obj.id === cardObj.id;
  });

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
