const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0
}

const game = {
    playerHand: "",
    aiHand: ""
}


const hands = [...document.querySelectorAll(".select img")];

// player selection function
function handSelection() {
    game.playerHand = this.dataset.option;
    hands.forEach(hand => hand.style.boxShadow = '');
    this.style.boxShadow = '0 0 10px 3px yellow'
}

// computer selection function
function computerChoise() {
    return hands[Math.floor(Math.random() * 3)].dataset.option
}

// result function
function checkResult(player, ai) {
    // console.log(player, ai);
    if (player === ai) {
        return 'draw'
    } else if ((player === "papier" && ai === "kamień") || (player === "kamień" && ai === "nożyczki") || (player === "nożyczki" && ai === "papier")) {
        return 'win'
    } else {
        return 'loss'
    }

}
// publication of results 
function publishResult(player, ai, result) {

    document.querySelector('[data-summary="your-choice"]').textContent = player;
    document.querySelector('[data-summary="ai-choice"]').textContent = ai;
    document.querySelector('p.numbers span').textContent = ++gameSummary.numbers;

    if (result === 'win') {
        document.querySelector('p.wins span').textContent = ++gameSummary.wins;
        document.querySelector('[data-summary="who-win"]').textContent = 'Ty wygrałeś ;)'
        document.querySelector('[data-summary="who-win"]').style.color = 'green'
    } else if (result === 'loss') {
        document.querySelector('p.losses span').textContent = ++gameSummary.losses;
        document.querySelector('[data-summary="who-win"]').textContent = 'Wygrał komputer ;('
        document.querySelector('[data-summary="who-win"]').style.color = 'red'
    } else {
        document.querySelector('p.draws span').textContent = ++gameSummary.draws;
        document.querySelector('[data-summary="who-win"]').textContent = 'Remis :/'
        document.querySelector('[data-summary="who-win"]').style.color = 'grey'
    }
}

// clear computer and player selection function
function endGame() {
    hands.forEach(hand => hand.style.boxShadow = '');
    game.playerHand = "";
}

// control game function
function startGame() {
    if (game.playerHand === "") {
        // return kończy działanie i nie idzie dalej
        return alert("Wybierz dłoń!")
    }
    game.aiHand = computerChoise()
    const gameResult = checkResult(game.playerHand, game.aiHand)
    publishResult(game.playerHand, game.aiHand, gameResult)
    endGame()
}


hands.forEach(hand => hand.addEventListener('click', handSelection))

document.querySelector('.start').addEventListener('click', startGame)
