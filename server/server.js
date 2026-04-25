const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* ================= NUMBER GAME ================= */

let numberGame = {
  player1Number: "",
  player2Number: "",
  turn: 1,
  attempts: {
    1: 5,
    2: 5
  },
  winner: null,
  started: false
};

app.post("/start", (req, res) => {
  const { p1Number, p2Number } = req.body;

  if (!p1Number || !p2Number) {
    return res.json({
      message: "Both players must enter numbers"
    });
  }

  numberGame = {
    player1Number: p1Number,
    player2Number: p2Number,
    turn: 1,
    attempts: {
      1: 5,
      2: 5
    },
    winner: null,
    started: true
  };

  res.json({
    message: "Game Started",
    turn: 1,
    attempts: numberGame.attempts
  });
});

app.post("/guess", (req, res) => {
  const { guess } = req.body;

  if (!numberGame.started) {
    return res.json({
      message: "Start the game first"
    });
  }

  const currentPlayer = numberGame.turn;
  const targetNumber =
    currentPlayer === 1
      ? numberGame.player2Number
      : numberGame.player1Number;

  if (parseInt(guess) === parseInt(targetNumber)) {
    numberGame.winner = `Player ${currentPlayer} Wins`;

    return res.json({
      message: "Correct Guess",
      winner: numberGame.winner
    });
  }

  numberGame.attempts[currentPlayer]--;

  if (numberGame.attempts[currentPlayer] <= 0) {
    numberGame.winner =
      currentPlayer === 1
        ? "Player 2 Wins"
        : "Player 1 Wins";

    return res.json({
      message: "No attempts left",
      winner: numberGame.winner
    });
  }

  numberGame.turn = currentPlayer === 1 ? 2 : 1;

  res.json({
    message: "Wrong Guess",
    turn: numberGame.turn,
    attempts: numberGame.attempts
  });
});

/* ================= WORD GAME ================= */

let wordGame = {
  player1Sentence: "",
  player2Sentence: "",
  hint1: "",
  hint2: "",
  turn: 1,
  attempts: {
    1: 5,
    2: 5
  },
  winner: null,
  started: false
};

app.post("/word/start", (req, res) => {
  const { p1Sentence, p2Sentence } = req.body;

  if (!p1Sentence || !p2Sentence) {
    return res.json({
      message: "Both players must enter sentences"
    });
  }

  wordGame = {
    player1Sentence: p1Sentence.toLowerCase(),
    player2Sentence: p2Sentence.toLowerCase(),
    hint1: p1Sentence.split(" ")[0],
    hint2: p2Sentence.split(" ")[0],
    turn: 1,
    attempts: {
      1: 5,
      2: 5
    },
    winner: null,
    started: true
  };

  res.json({
    message: "Word Game Started",
    hint1: wordGame.hint1,
    hint2: wordGame.hint2,
    turn: 1,
    attempts: wordGame.attempts
  });
});

app.post("/word/guess", (req, res) => {
  let { guess } = req.body;

  if (!wordGame.started) {
    return res.json({
      message: "Start word game first"
    });
  }

  guess = guess.toLowerCase();

  const currentPlayer = wordGame.turn;

  const targetSentence =
    currentPlayer === 1
      ? wordGame.player2Sentence
      : wordGame.player1Sentence;

  if (guess === targetSentence) {
    wordGame.winner = `Player ${currentPlayer} Wins`;

    return res.json({
      message: "Correct Guess",
      winner: wordGame.winner
    });
  }

  if (targetSentence.includes(guess)) {
    wordGame.attempts[currentPlayer]++;

    return res.json({
      message: "+1 Attempt Bonus!",
      turn: currentPlayer,
      attempts: wordGame.attempts
    });
  }

  wordGame.attempts[currentPlayer]--;

  if (wordGame.attempts[currentPlayer] <= 0) {
    wordGame.winner =
      currentPlayer === 1
        ? "Player 2 Wins"
        : "Player 1 Wins";

    return res.json({
      message: "Game Over",
      winner: wordGame.winner
    });
  }

  wordGame.turn = currentPlayer === 1 ? 2 : 1;

  res.json({
    message: "Wrong Guess",
    turn: wordGame.turn,
    attempts: wordGame.attempts
  });
});

/* ================= SERVER ================= */

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});