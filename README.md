# 🎮 Mystery Minds

Mystery Minds is a full-stack two-player web-based game built using **React.js (frontend)** and **Node.js + Express (backend)**. It includes interactive multiplayer gameplay with two modes: **Number Guessing Game** and **Word Guessing Game**.

Players compete by entering hidden inputs and taking turns to guess within limited attempts. The backend manages game logic, turn switching, validation, and winner declaration.
## 🚀 Features
- 👥 Two-player gameplay
- 🔢 Number Guessing Game
- 🧠 Word Guessing Game
- 🔁 Turn-based system
- 🎯 Attempt tracking (5 attempts per player)
- 🔒 Hidden inputs for fair gameplay
- 🏆 Automatic winner detection
- ⚡ Real-time frontend–backend communication (Axios API)
## 🛠️ Tech Stack
### Frontend:
- React.js
- Axios
- JavaScript (ES6)
- HTML & CSS (inline styling)
### Backend:
- Node.js
- Express.js
- CORS
## 📁 Project Structure
mystery_minds/
│
├── client/ # React frontend
│ ├── src/
│ ├── public/
│ ├── package.json
│
├── server/ # Node backend
│ ├── server.js
│ ├── package.json

## 🎮 Game Modes
### 🔢 Number Guessing Game
- Player 1 and Player 2 secretly enter numbers
- Players take turns guessing the opponent’s number
- Each player has 5 attempts
- Correct guess declares the winner
### 🧠 Word Guessing Game
- Players enter a full sentence
- Only the first word is shown as a hint
- Players guess hidden words alternately
- Remaining words must be guessed within attempts
