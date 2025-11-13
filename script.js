

let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

//  NEW — scoreboard elements added
let currentLevelDisplay = document.querySelector("#current-level");
let bestScoreDisplay = document.querySelector("#best-score");

// NEW — LocalStorage se best score load karna
let bestScore = localStorage.getItem("bestScore") || 0;
bestScoreDisplay.innerText = bestScore;

document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});


function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => btn.classList.remove("userFlash"), 100);
}

function levelUp() {
    userSeq = [];
    level++;

    h2.innerText = `Level ${level}`;

    //  NEW — scoreboard me level update
    currentLevelDisplay.innerText = level;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`#${randColor}`);
    
    gameSeq.push(randColor);
    console.log("Game Sequence:", gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {

        //  NEW — Game Over animation
        document.body.classList.add("game-over");
        setTimeout(() => document.body.classList.remove("game-over"), 400);

        h2.innerHTML = `Game Over! Your Score: <b>${level}</b> <br>Press any key to restart`;

        // NEW — Best Score Update call
        updateBestScore();
        
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn => btn.addEventListener("click", btnPress));


//  NEW — Compare and Save Best Score
function updateBestScore() {
    if (level > bestScore) {
        bestScore = level;
        localStorage.setItem("bestScore", bestScore);
        bestScoreDisplay.innerText = bestScore;
    }
}

//  Changed — Reset scoreboard also
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    currentLevelDisplay.innerText = level; // ✅ NEW
}
