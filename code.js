//1-declare the buttons and divs and variables for scores and active player
let scores
let currentScore
let activePlayer
let newGameBtn = document.getElementById("new-game")
let rollBtn = document.getElementById("roll")
let holdBtn = document.getElementById("hold")
let winningScore = 100
let doubleSixRule = false
let lastDice

init()
//2-roll button function: a:random dice function b:updates dice img c: checks if its 1 or not if it is then change active player and sets current to 0 if not d:adds to active player current score
function rollDice() {
    return Math.floor(Math.random() * 6 + 1)
}

function changeActive() {
    lastDice = undefined
    if (activePlayer === 0) {
        activePlayer = 1
        document.querySelector(".box-0").classList.remove("active")
        document.querySelector(".box-1").classList.add("active")
    } else if (activePlayer === 1) {
        activePlayer = 0
        document.querySelector(".box-1").classList.remove("active")
        document.querySelector(".box-0").classList.add("active")
    }
}
function updateCurrentScore() {
    document.querySelector(".current-score-" + activePlayer).textContent = currentScore
}

rollBtn.addEventListener("click", function () {
    document.getElementById("dice-img").src = ""
    setTimeout(function () {
        let dice = rollDice()
        document.getElementById("dice-img").src = 'images/' + dice + '_dots.png'
        if (dice === 1) {
            document.getElementById("ah").play()
            currentScore = 0
            updateCurrentScore()
            changeActive()
            setTimeout(function () { document.getElementById("dice-img").src = "" }, 1000)
        } else if (doubleSixRule && dice === 6 && lastDice === 6) {
            document.getElementById("bye").play()
            currentScore = 0
            updateCurrentScore()
            scores[activePlayer] = 0
            document.querySelector(".score-" + activePlayer).textContent = 0
            changeActive()

        } else {
            currentScore += dice
            updateCurrentScore()
            lastDice = dice
        }
    }, 500)
})
//3 hold btn function: a:checks if winner b:ads the current to active player score c:sets current to 0 d:changes the active player
function checkWin() {
    if (scores[activePlayer] >= winningScore) {
        document.getElementById("applause").play()
        alert("player " + (activePlayer + 1) + " wins")
        init()
    }
}
holdBtn.addEventListener("click", function () {
    document.getElementById("dice-img").src = ""
    scores[activePlayer] += currentScore
    let previousScore = document.querySelector(".score-" + activePlayer)
    previousScore.textContent = Number(previousScore.textContent) + currentScore
    currentScore = 0
    checkWin()
    changeActive()
})

//4-reset game function: resets all scores
function init() {
    scores = [0, 0]
    currentScore = 0
    activePlayer = 0
    document.querySelector(".current-score-0").textContent = 0
    document.querySelector(".current-score-1").textContent = 0
    document.querySelector(".score-0").textContent = 0
    document.querySelector(".score-1").textContent = 0
    document.querySelector(".box-1").classList.remove("active")
    document.querySelector(".box-0").classList.add("active")
}

newGameBtn.addEventListener("click", init)

//5 - checking settings
function checkSettings() {
    doubleSixRule = document.getElementById("dblsix").checked
    winningScore = document.getElementById("win-score").value
}

document.getElementById("dblsix").addEventListener("change", checkSettings)
document.getElementById("win-score").addEventListener("change", checkSettings)