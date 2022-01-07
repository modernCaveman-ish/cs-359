var tableRow = document.getElementsByTagName('tr');
let tableData = document.getElementsByTagName('td');
let resetBtn = document.querySelector('.reset');
const new_game = document.querySelector('.newGame');
let playerTurn = document.getElementsByClassName('player-turn');
var slots = document.querySelectorAll('.slot');
let date = new Date();

var player1 = null; // Name of Player1
var player2 = null; // Name of Player2

// Position tracker
const position = {
    row: 0,
    col: 0
};

// Game tracker
const game = {
    moves: 0,
    plays: 'red',
    game_active: 0, // Game not active. Press the reset Button to begin
    slots: [],
    clock: null
};

game.slots[0] = [0,0,0,0,0,0,0];
game.slots[1] = [0,0,0,0,0,0,0];
game.slots[2] = [0,0,0,0,0,0,0];
game.slots[3] = [0,0,0,0,0,0,0];
game.slots[4] = [0,0,0,0,0,0,0];
game.slots[5] = [0,0,0,0,0,0,0];


// NOTE document.getElementById('message').innerHTML+="Move "+ game.moves+ ". Player " + game.plays+"<br>";

// Get Clicked position of a clicked cell
function showPosition(row, col){
    position.row = row;
    position.col = col;
    
    // If game is active play the move
    if(game.game_active == 1){
        playMove(row, col);
    }
}

new_game.addEventListener('click', () => {
    // Clear the Message board
    document.getElementById('message').innerHTML = "";
    newGame();
});

resetBtn.addEventListener('click', () => {
    // alert('Reset Clicked');

    // Clear the Message board
    document.getElementById('message').innerHTML = "";
    resetGame();
    
    if(player1 != null && player2 != null){
        document.getElementById('message').innerHTML = player1 + ' plays first.';
    }
});

// Previously createNewGame();
function newGame(){
    player1 = null;
    player2 = null;

    while(!player1){
        player1 = prompt('Player1, please enter your name. Color: Red');
    };
    let colorPlayer1 = 'red';

    while(!player2){
        player2 = prompt('Player2, please enter your name. Color: Yellow');
    };
    let colorPlayer2 = 'yellow';

    console.log("New Game created!!"); //Needs to be typed into the info box

    document.getElementById('message').innerHTML+="Welcome "+ player1+ " and " + player2 + ", New Game Created!!" + "<br>";
    // Plus Reset the game
    // game.plays = 'red';
    // game.game_active = 1; // set game_active back to 0 when we have a winner
    
    // position.col = 0;
    // position.row = 0;
    
    resetGame();

    playerTurn.textContent = player1;
}

// Reset the game parameters and Make all cells white, but do not reset the names
function resetGame(){

    game.moves = 0; // Reset the moves counter
    // Reset the game.slots
    for(let i=0; i<6; i++){
        for(let j=0; j<7; j++){
        game.slots[i][j] = 0;
        }
    }

    for(let i=0; i<6; i++){
        for(let j=0; j<7; j++){
            game.slots[i][j] = 0;
            tableRow[i].children[j].style.backgroundColor = "white";
        }
    }

    game.plays = 'red';
    game.game_active = 1;
    game.moves = 0;
    // reset Clock
    game.clock = new Date();
}

function getPlayerTurn(){
    return game.plays;
}

function changePlayerTurn(){
    if(getPlayerTurn() == 'red') game.plays = 'yellow';
    else if(getPlayerTurn() == 'yellow') game.plays = 'red';
}

// Checks wether the move played is valid or not
function isValidMove(row, col){
    for(let i=0; i<6; i++){
        if(game.slots[i][col] == 0){
            return true;
        }
    }
    alert('Invalid Move');
    return false;
}

// Updates the page graphics, plus print the time needed
function updatePage(row, col) {
    //Color change
    document.getElementById('slot('+row+','+col+')').style.backgroundColor = game.plays;
    // Print the move played on message board
    document.getElementById('message').innerHTML+="Move "+ game.moves+ ". Player: " + getPlayerTurn() + ' at ' + row + ',' + col + ', ' + getSeconds() + 'sec' + "<br>";
}

// Now the game logic
function playMove(row, col){
    // console.log("playMove(" + row + ',' + col + ')');
    
    // assign the move to the right spot, not the one clicked
    // we take the collumn as it is and we need to search for the right row
    
    if(isValidMove(row, col)){

        for(let i=0; i<6; i++){
            if(game.slots[i][col] == 0){
                game.slots[i][col] = game.plays;
                //Color change
                updatePage(i, col);

                game.moves++; // Augment the move counter
                changePlayerTurn();
                break;
            }
        }
        if(game.moves > 5){
            hasPlayerWon();
        }
    }
}

// function that checks if the given arguments have the same color but not white
// TODO the panel updates after the alert thats bad
function isSameColor(first, second, third, fourth){
    if(first === second && first === third && first === fourth && first !== null && first !== 'white'){
        // console.log(first, second, third, fourth);
        return true;
    } else {
        return false;
    }
}

// Check Board for Win
function hasPlayerWon(){

    if(verticalWin() || horizontalWin() || diagonialWinLower() || diagonialWinUpper()
    || diagonalWinLowerMirrored() /*|| diagonalWinUpperMirrored() */){
        changePlayerTurn();
        alert('We have a Winner!!');
        document.getElementById('message').innerHTML = 'The Winner is ' + game.plays;
        resetGame();

        return true;
    } else{
        return false;
    }
}

// Works
function horizontalWin(){
    for(let i = 0; i<6; i++){
        for(let j=0; j<4; j++){
            if(isSameColor(document.getElementById('slot('+i+','+ (j+0) +')').style.backgroundColor , document.getElementById('slot('+i+','+ (j+1) +')').style.backgroundColor, document.getElementById('slot('+i+','+ (j+2) +')').style.backgroundColor, document.getElementById('slot('+i+','+ (j+3) +')').style.backgroundColor)){
                alert("Horizontal Win!!!");
                document.getElementById('slot('+i+','+ (j+0) +')').style.backgroundColor = 'orange';
                document.getElementById('slot('+i+','+ (j+1) +')').style.backgroundColor = 'orange';
                document.getElementById('slot('+i+','+ (j+2) +')').style.backgroundColor = 'orange';
                document.getElementById('slot('+i+','+ (j+3) +')').style.backgroundColor = 'orange';
                return true;
            }

        }
    }
}

// Works
function verticalWin(){
    // console.log('Checking for vertical WIn');
    for(let col=0; col<7; col++){
        for(let row=0; row<3; row++){
            if(isSameColor(document.getElementById('slot('+(row+0) +','+ (col) +')').style.backgroundColor , document.getElementById('slot('+(row+1)+','+ (col) +')').style.backgroundColor, document.getElementById('slot('+(row+2)+','+ (col) +')').style.backgroundColor, document.getElementById('slot('+(row+3)+','+ (col) +')').style.backgroundColor)){
                alert('Vertical Win!!!');
                document.getElementById('slot('+(row+0) +','+ (col) +')').style.backgroundColor = 'orange';
                document.getElementById('slot('+(row+1)+','+ (col) +')').style.backgroundColor = 'orange';
                document.getElementById('slot('+(row+2)+','+ (col) +')').style.backgroundColor = 'orange';
                document.getElementById('slot('+(row+3)+','+ (col) +')').style.backgroundColor  = 'orange';
                return true;
            }
        }
    }
}

function diagonialWinLower(){
    // console.log('Checking for diagonial WIn');
    for(let col=0; col<4; col++){
        for(let row=0; row<3; row++){
            if(isSameColor(document.getElementById('slot('+(row) +','+ (col) +')').style.backgroundColor,
            document.getElementById('slot('+(row+1) +','+ (col+1) +')').style.backgroundColor,
            document.getElementById('slot('+(row+2) +','+ (col+2) +')').style.backgroundColor,
            document.getElementById('slot('+(row+3) +','+ (col+3) +')').style.backgroundColor)){
                alert('Diagoninal Win!!!');
            document.getElementById('slot('+(row) +','+ (col) +')').style.backgroundColor= 'orange';
            document.getElementById('slot('+(row+1) +','+ (col+1) +')').style.backgroundColor= 'orange';
            document.getElementById('slot('+(row+2) +','+ (col+2) +')').style.backgroundColor= 'orange';
            document.getElementById('slot('+(row+3) +','+ (col+3) +')').style.backgroundColor= 'orange';
                return true;
            }
        }
    }
}

function diagonialWinUpper(){
    // console.log('Checking for diagonialWin2');
    for(let col=0; col<4; col++){
        for(let row=5; row<2; row--){
            if(isSameColor(document.getElementById('slot('+(row) +','+ (col) +')').style.backgroundColor, 
            document.getElementById('slot('+(row-1) +','+ (col+1) +')').style.backgroundColor, 
            document.getElementById('slot('+(row-2) +','+ (col+2) +')').style.backgroundColor, 
            document.getElementById('slot('+(row-3) +','+ (col+3) +')').style.backgroundColor)){
                alert('Diagoninal Win2!!!');
                document.getElementById('slot('+(row) +','+ (col) +')').style.backgroundColor = 'orange';
            document.getElementById('slot('+(row-1) +','+ (col+1) +')').style.backgroundColor = 'orange';
            document.getElementById('slot('+(row-2) +','+ (col+2) +')').style.backgroundColor = 'orange';
            document.getElementById('slot('+(row-3) +','+ (col+3) +')').style.backgroundColor = 'orange';
            return true;
            }
        }
    }
}

function diagonalWinLowerMirrored(){
    for(var col = 6; col>=3; col--){
        for(var row=0; row<3; row++){
            if(isSameColor(document.getElementById('slot('+(row) +','+ (col) +')').style.backgroundColor,
            document.getElementById('slot('+(row+1) +','+ (col-1) +')').style.backgroundColor,
            document.getElementById('slot('+(row+2) +','+ (col-2) +')').style.backgroundColor,
            document.getElementById('slot('+(row+3) +','+ (col-3) +')').style.backgroundColor)){

                document.getElementById('slot('+(row) +','+ (col) +')').style.backgroundColor = 'orange';
                document.getElementById('slot('+(row+1) +','+ (col-1) +')').style.backgroundColor = 'orange';
                document.getElementById('slot('+(row+2) +','+ (col-2) +')').style.backgroundColor = 'orange';
                document.getElementById('slot('+(row+3) +','+ (col-3) +')').style.backgroundColor = 'orange';
                alert('DiagoninalWinLowerMirrored Win!!!');
                return true;
            }

        }
    }
}


// function diagonalWinUpperMirrored(){
//     // console.log('DiagonalWinUpperMirrored check');
//     for(let col=6; col>=3; col--){
//         for(let row=5; row >=2; row--){
//             if(document.getElementById('slot('+(row) +','+ (col) +')').style.backgroundColor,
//             document.getElementById('slot('+(row-1) +','+ (col-1) +')').style.backgroundColor,
//             document.getElementById('slot('+(row-2) +','+ (col-2) +')').style.backgroundColor,
//             document.getElementById('slot('+(row-3) +','+ (col-3) +')').style.backgroundColor){
//                 alert('DiagonialWinUpperMirrored Win!! + ' + row + ' ' + col);
//                 debugger;
            
//                 // change the color to highlight it
//             document.getElementById('slot('+(row) +','+ (col) +')').style.backgroundColor = 'orange';
//             document.getElementById('slot('+(row-1) +','+ (col-1) +')').style.backgroundColor = 'orange';
//             document.getElementById('slot('+(row-2) +','+ (col-2) +')').style.backgroundColor = 'orange';
//             document.getElementById('slot('+(row-3) +','+ (col-3) +')').style.backgroundColor = 'orange';
//                 return true;
//             }
//         }
//     }
// }

function getSeconds(){
    var endTime = new Date();
    var seconds = (endTime.getTime() - game.clock.getTime()) / 1000;
    game.clock = new Date();
    return seconds;
}