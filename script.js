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
const message = document.querySelector(".info__message");
const betweenInfo = document.querySelector(".between__info");

const overlay = document.querySelector(".overlay");
const popUp = document.querySelector(".popUp");
const popUpBtnYes = document.querySelector(".btn__yes");
const popUpBtnNo = document.querySelector(".btn__no");

let curNumber = MAX_SCORE;
let highScNumber = 0;
let gamePlaying;

// Generate random number between 1 and LAST_NUMBER number
const randomNumber = function () {
  return (myNumber.value = Math.trunc(Math.random() * LAST_NUMBER) + 1);
};

const wrongNumber = function () {
  curNumber--;
  message.textContent =
    +inputNumber.value < myNumber.value
      ? "❌ Try higher number !"
      : "❌ Try lower number !";
  message.classList.add("wrong");
  score.textContent = curNumber;
  inputNumber.value = "";
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
  message.classList.add("correct");
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

const openPopup = function () {
  overlay.classList.remove("hidden");
  popUp.classList.remove("hidden");
};

const closePopup = function () {
  overlay.classList.add("hidden");
  popUp.classList.add("hidden");
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
  message.classList.remove("wrong");
  message.classList.remove("correct");
  betweenInfo.textContent = `(Between 1 and ${LAST_NUMBER})`;
  myNumber.textContent = "?";
  inputNumber.value = "";
  inputNumber.focus();
  gamePlaying = true;
};

init();

btnAgain.addEventListener("click", function () {
  if (!gamePlaying) {
    init();
  } else {
    openPopup();
  }

  popUpBtnNo.addEventListener("click", closePopup);
  popUpBtnYes.addEventListener("click", function () {
    closePopup();
    init();
    highScNumber = 0;
    highScore.textContent = highScNumber;
  });
});
