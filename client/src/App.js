import { useState } from "react";
import axios from "axios";

function App() {
  const [screen, setScreen] = useState("home");

  /* ================= NUMBER GAME ================= */

  const [p1Number, setP1Number] = useState("");
  const [p2Number, setP2Number] = useState("");
  const [numberGuess, setNumberGuess] = useState("");
  const [numberMessage, setNumberMessage] = useState("");
  const [numberTurn, setNumberTurn] = useState(1);
  const [numberAttempts, setNumberAttempts] = useState({
    1: 5,
    2: 5
  });
  const [numberStarted, setNumberStarted] = useState(false);

  /* ================= WORD GAME ================= */

  const [p1Sentence, setP1Sentence] = useState("");
  const [p2Sentence, setP2Sentence] = useState("");
  const [wordGuess, setWordGuess] = useState("");
  const [wordMessage, setWordMessage] = useState("");
  const [hint1, setHint1] = useState("");
  const [hint2, setHint2] = useState("");
  const [wordTurn, setWordTurn] = useState(1);
  const [wordAttempts, setWordAttempts] = useState({
    1: 5,
    2: 5
  });
  const [wordStarted, setWordStarted] = useState(false);

  /* ================= COMMON STYLES ================= */

  const pageStyle = {
    minHeight: "100vh",
    background: "#111827",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial"
  };

  const cardStyle = {
    width: "420px",
    background: "#1f2937",
    padding: "30px",
    borderRadius: "16px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    fontSize: "15px"
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "white",
    fontSize: "15px",
    cursor: "pointer"
  };

  /* ================= NUMBER GAME FUNCTIONS ================= */

  const startNumberGame = async () => {
    try {
      const res = await axios.post("http://localhost:5000/start", {
        p1Number,
        p2Number
      });

      setNumberMessage(res.data.message);
      setNumberTurn(1);
      setNumberAttempts({
        1: 5,
        2: 5
      });
      setNumberStarted(true);
    } catch (err) {
      console.log(err);
    }
  };

  const guessNumber = async () => {
    try {
      const res = await axios.post("http://localhost:5000/guess", {
        guess: numberGuess
      });

      setNumberMessage(res.data.message);

      if (res.data.winner) {
        setNumberMessage(res.data.winner + " 🎉");
        setScreen("result");
      }

      if (res.data.turn) {
        setNumberTurn(res.data.turn);
      }

      if (res.data.attempts) {
        setNumberAttempts(res.data.attempts);
      }

      setNumberGuess("");
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= WORD GAME FUNCTIONS ================= */

  const startWordGame = async () => {
    try {
      const res = await axios.post("http://localhost:5000/word/start", {
        p1Sentence,
        p2Sentence
      });

      setWordMessage(res.data.message);
      setHint1(res.data.hint1);
      setHint2(res.data.hint2);
      setWordTurn(1);
      setWordAttempts({
        1: 5,
        2: 5
      });
      setWordStarted(true);
    } catch (err) {
      console.log(err);
    }
  };

  const guessWord = async () => {
    try {
      const res = await axios.post("http://localhost:5000/word/guess", {
        guess: wordGuess
      });

      setWordMessage(res.data.message);

      if (res.data.winner) {
        setWordMessage(res.data.winner + " 🎉");
        setScreen("result");
      }

      if (res.data.turn) {
        setWordTurn(res.data.turn);
      }

      if (res.data.attempts) {
        setWordAttempts(res.data.attempts);
      }

      setWordGuess("");
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= HOME ================= */

  if (screen === "home") {
    return (
      <div style={pageStyle}>
        <div style={cardStyle}>
          <h1>Mystery Minds 🎮</h1>

          <button
            style={buttonStyle}
            onClick={() => setScreen("number")}
          >
            Play Number Game
          </button>

          <button
            style={buttonStyle}
            onClick={() => setScreen("word")}
          >
            Play Word Game
          </button>
        </div>
      </div>
    );
  }

  /* ================= NUMBER GAME UI ================= */

  if (screen === "number") {
    return (
      <div style={pageStyle}>
        <div style={cardStyle}>
          <h2>🔢 Number Game</h2>

          <input
            type="password"
            placeholder="Player 1 Secret Number"
            style={inputStyle}
            value={p1Number}
            onChange={(e) => setP1Number(e.target.value)}
          />

          <input
            type="password"
            placeholder="Player 2 Secret Number"
            style={inputStyle}
            value={p2Number}
            onChange={(e) => setP2Number(e.target.value)}
          />

          <button
            style={buttonStyle}
            onClick={startNumberGame}
          >
            Start Game
          </button>

          {numberStarted && (
            <>
              <h3>🎮 Game Started</h3>
              <p>Turn: Player {numberTurn}</p>
              <p>
                Attempts → P1: {numberAttempts[1]} | P2:{" "}
                {numberAttempts[2]}
              </p>

              <input
                placeholder="Enter Guess"
                style={inputStyle}
                value={numberGuess}
                onChange={(e) => setNumberGuess(e.target.value)}
              />

              <button
                style={buttonStyle}
                onClick={guessNumber}
              >
                Guess
              </button>
            </>
          )}

          <p>{numberMessage}</p>

          <button
            style={buttonStyle}
            onClick={() => setScreen("home")}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  /* ================= WORD GAME UI ================= */

  if (screen === "word") {
    return (
      <div style={pageStyle}>
        <div style={cardStyle}>
          <h2>🧠 Word Game</h2>

          <input
            type="password"
            placeholder="Player 1 Secret Sentence"
            style={inputStyle}
            value={p1Sentence}
            onChange={(e) => setP1Sentence(e.target.value)}
          />

          <input
            type="password"
            placeholder="Player 2 Secret Sentence"
            style={inputStyle}
            value={p2Sentence}
            onChange={(e) => setP2Sentence(e.target.value)}
          />

          <button
            style={buttonStyle}
            onClick={startWordGame}
          >
            Start Word Game
          </button>

          {wordStarted && (
            <>
              <h4>Hint Player 1: {hint1}</h4>
              <h4>Hint Player 2: {hint2}</h4>

              <h3>🎮 Game Started</h3>
              <p>Turn: Player {wordTurn}</p>
              <p>
                Attempts → P1: {wordAttempts[1]} | P2:{" "}
                {wordAttempts[2]}
              </p>

              <input
                placeholder="Guess Full Sentence"
                style={inputStyle}
                value={wordGuess}
                onChange={(e) => setWordGuess(e.target.value)}
              />

              <button
                style={buttonStyle}
                onClick={guessWord}
              >
                Guess
              </button>
            </>
          )}

          <p>{wordMessage}</p>

          <button
            style={buttonStyle}
            onClick={() => setScreen("home")}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  /* ================= RESULT ================= */

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1>🎉 Game Over</h1>
        <p>{numberMessage || wordMessage}</p>

        <button
          style={buttonStyle}
          onClick={() => {
            setScreen("home");
            setNumberStarted(false);
            setWordStarted(false);
          }}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default App;