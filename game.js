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

// pobieramy img i tworzymy z nich tablicę
const hands = [...document.querySelectorAll(".select img")];

// pierwsza funkcja
function handSelection() {
    game.playerHand = this.dataset.option;
    // 1 czyści boxShadow we wszysdkich 
    hands.forEach(hand => hand.style.boxShadow = '');
    // 2 dodaje boxShadow do tego klikniętego
    this.style.boxShadow = '0 0 10px 3px yellow'
}

// wybór losowy komputera
function computerChoise() {
    return hands[Math.floor(Math.random() * 3)].dataset.option
}

// zwrócenie wyniku
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
// publikacja wyniku
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

// funkcja czyszcząca zaznaczenie po każdej grze i wybór playerHand
function endGame() {
    hands.forEach(hand => hand.style.boxShadow = '');
    game.playerHand = "";
}

// funkcja sterująca
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

//nasłuchiwanie na każdym elemencie talicy hands
hands.forEach(hand => hand.addEventListener('click', handSelection))

//nasłuchiwanie na przycisk Lets Play
document.querySelector('.start').addEventListener('click', startGame)