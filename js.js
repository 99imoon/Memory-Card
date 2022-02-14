
//--------------- Variabels --------------
const cards = document.querySelectorAll(".card"),
  timeTag = document.querySelector(".time b"),
  mivesTag = document.querySelector(".moves b"),
  restartBtn = document.querySelector(".details button"),
  stars = document.querySelectorAll(".fa-star");

var maxTime = 30,
  timeLeft = maxTime,
  movesCounter = 0,
  matchedCard = 0,
  disableDeck = false,
  isPlaying = false,
  cardOne,
  cardTwo,
  timer;

//---------------- Timer ---------------
function initTimer() {
  if (timeLeft <= 0) {
    return clearInterval(timer);
  }
  timeLeft--;
  timeTag.innerText = timeLeft;
}

//-------------- Flip Card -------------
function flipCard({ target: clickedCard }) {
  if (!isPlaying) {
    isPlaying = true;
    timer = setInterval(initTimer, 1000);
  }
  if (clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
    movesCounter++;
    mivesTag.innerText = movesCounter;
    clickedCard.classList.add("flip","match");
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector(".back-view img").src,
      cardTwoImg = cardTwo.querySelector(".back-view img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

//------------ Match Card ------------
function matchCards(img1, img2) {
  if (img1 === img2) {
    matchedCard++;
    if (matchedCard == 8 && timeLeft > 0) {
      return clearInterval(timer);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    return (disableDeck = false);
  }

  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1200);

  removeStars();
}

//---------------- Stars ---------------
function removeStars() {
  if (movesCounter == 8) {
    stars[2].style.visibility = "collapse";
  }
  if (movesCounter == 16) {
    stars[1].style.visibility = "collapse";
  }
  if (movesCounter == 24) {
    stars[0].style.visibility = "collapse";
  }
}

//------------ Shuffle Card ------------
function shuffleCard() {
  timeLeft = maxTime;
  movesCounter = matchedCard = 0;
  cardOne = cardTwo = "";
  clearInterval(timer);
  timeTag.innerText = timeLeft;
  mivesTag.innerText = movesCounter;
  disableDeck = isPlaying = false;

  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

  cards.forEach((card, index) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector(".back-view img");
    setTimeout(() => {
      imgTag.src = `Images/img${arr[index]}.png`;
    }, 500);
    card.addEventListener("click", flipCard);
  });

  for (var i = 0; i < stars.length; i++) {
    stars[i].style.visibility = "visible";
  }
}
shuffleCard();

restartBtn.addEventListener("click", shuffleCard);

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
