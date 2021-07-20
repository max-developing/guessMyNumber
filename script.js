"use strict";

const LAST_NUMBER = 50; // Enter last number, game will always be from 1 to 'your last number'
const MAX_SCORE = 25; // Max score number

const btnAgain = document.querySelector(".btn__again");
const btnCheck = document.querySelector(".btn__check");

const inputNumber = document.querySelector(".check__number");
const myNumber = document.querySelector(".my__number");

const score = document.querySelector(".score");
const highScore = document.querySelector(".highScore");

const heading = document.querySelector(".heading");
const message = document.querySelector(".info__highOrLow");

let curNumber = MAX_SCORE;
let highScNumber = 0;
let gamePlaying;

const randomNumber = function () {
  return (myNumber.value = Math.trunc(Math.random() * LAST_NUMBER) + 1);
};

const wrongNumber = function () {
  curNumber--;
  message.textContent =
    +inputNumber.value < myNumber.value
      ? "❌ Try higher number !"
      : "❌ Try lower number !";
  score.textContent = curNumber;
};

const updateHighScore = function () {
  if (highScNumber > curNumber || highScNumber === curNumber) return;
  if (highScNumber < curNumber) {
    highScNumber = curNumber;
    highScore.textContent = curNumber;
  }
};

const correctGuessing = function () {
  message.textContent = "✔ Correct Number !";
  myNumber.textContent = myNumber.value;
  gamePlaying = false;
};

const gameOver = function () {
  message.textContent = "Game over, please try again 🤞";
  highScNumber = 0;
  highScore.textContent = highScNumber;
  gamePlaying = false;
};

const checkWin = function () {
  if (gamePlaying) {
    // Guard clause
    if (
      !myNumber.value ||
      +inputNumber.value < 1 ||
      +inputNumber.value === 0 ||
      +inputNumber.value > 50 ||
      inputNumber.value === ""
    )
      return;

    // Game logic
    if (+inputNumber.value === myNumber.value) {
      updateHighScore();
      correctGuessing();
    }

    if (
      +inputNumber.value < myNumber.value ||
      +inputNumber.value > myNumber.value
    ) {
      wrongNumber();
    }

    if (curNumber === 0) {
      gameOver();
    }
  }
};

btnCheck.addEventListener("click", checkWin);
document.addEventListener("keydown", function (e) {
  if (!e) return;
  if (e.key === "Enter") checkWin();
});

const init = function () {
  randomNumber();
  curNumber = MAX_SCORE;
  score.textContent = curNumber;
  message.textContent = "Start guessing . . .";
  myNumber.textContent = "?";
  inputNumber.value = "";
  inputNumber.focus();
  gamePlaying = true;
};

init();

btnAgain.addEventListener("click", function () {
  if (!gamePlaying) init();
});
