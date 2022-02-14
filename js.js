const cards = document.querySelectorAll(".card"),
  timeTag = document.querySelector(".time b"),
  mivesTag = document.querySelector(".moves b"),
  restartBtn = document.querySelector(".details button"),
  stars = document.querySelectorAll(".fa-star");

let maxTime = 60;
let timeLeft = maxTime;
let moves = 0;
let matchedCard = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;

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
    timer = setInterval(initTimer, 2000);
  }
  if (clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
    moves++;
    mivesTag.innerText = moves;
    clickedCard.classList.add("flip");
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

  //---------------- Stars ---------------
  if (moves > 8 && moves < 12) {
    for (i = 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.visibility = "collapse";
      }
    }
  } else if (moves > 13) {
    for (i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.visibility = "collapse";
      }
    }
  }
}

//------------ Shuffle Card ------------
function shuffleCard() {
  timeLeft = maxTime;
  moves = matchedCard = 0;
  cardOne = cardTwo = "";
  clearInterval(timer);
  timeTag.innerText = timeLeft;
  mivesTag.innerText = moves;
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
