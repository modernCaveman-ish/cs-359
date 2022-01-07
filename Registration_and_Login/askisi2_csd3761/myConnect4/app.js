// Selectors

var tableRow = document.getElementsByTagName('tr');
var tableData = document.getElementsByTagName('td');
var tableSlot = document.querySelector('.slot');
const playerTurn = document.querySelector('.player-turn');
const reset = document.querySelector('.reset');
const slots = document.querySelector('.slots');
const new_game = document.querySelector('.newGame');

// Get table coordinate in the console

for(let i=0; i < tableData.length; i++) {
    tableData[i].addEventListener('click', (e) => {
        console.log(`${e.target.parentElement.rowIndex}, ${e.target.cellIndex}`);
    })
}

// Set up Players Names, clear the board, clear the infobox, set up the new 
function newGame(){

}

//NewGame() Function
function setPlayers() {
    while(!player1) {
        var player1 = prompt('Player1 Enter your name!!');   
    }

    player1Color = 'red';

    while(!player2) {
        var player2 = prompt('Player2 Enter your name');
    }

    player2Color = 'yellow';

    var currentPlayer = 1;
    playerTurn.textContent = player1+ "'s turn!";
}


// tableData.forEach.call( (x) => {
//     for(let i=0; i<tableData.length; i++){
//         tableData[i].addEventListener('click', changeColor);
//         tableData.style.backgroundColor = "white";
//     }
// });


function changeColor(e) {
    let column = e.target.cellIndex;
    let row = [];

    for(let i=5; i > -1; i--){
        if(tableRow[i].children[column].style.backgroundColor === 'white'){
            row.push(tableRow[i].children[column]);
            if(currentPlayer === 1) {
                row[0].style.backgroundColor = player1Color;
                if(horizontalCheck()) {
                    return(alert('winner'));
                }
                playerTurn.textContent = player2 + "'s turn!";
                return currentPlayer = 2;
            }else{
                row[0].style.backgroundColor = player2Color;
                playerTurn.textContent = player1 + "'s turn!";
                return currentPlayer = 1;
            }
        }
    }
}

Array.prototype.forEach.call(tableData, (cell) => {
    cell.addEventListener('click', changeColor);
    // Set all slots to white for new game.
    cell.style.backgroundColor = 'white';
});

function colorMatchCheck(one, two, three, four){
    return (one === two && one === three && one === four && one !== 'white' && one !== undefined);
}

function horizontalCheck(){
    for (let row = 0; row < tableRow.length; row++){
        for (let col =0; col < 4; col++){
           if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor,tableRow[row].children[col+1].style.backgroundColor, 
                                tableRow[row].children[col+2].style.backgroundColor, tableRow[row].children[col+3].style.backgroundColor)){
                                    console.log("Player: " + currentPlayer + " moved");
               return true;
           }
        }
    }
}

function verticalCheck(){
    for(let col = 0; col < 4; col++){
        for(let row=0; row < tableRow.length; i++){
            if (colorMatchCheck(tableRow[col].children[row].style.backgroundColor,tableRow[col].children[row+1].style.backgroundColor, 
                tableRow[col].children[row+2].style.backgroundColor, tableRow[col].children[row+3].style.backgroundColor)){
            return true;
            }
        }
    }
}

reset.addEventListener('click', (e) => {
    slots.style.backgroundColor = 'white';
    setPlayers();
});

new_game.addEventListener('click', ()=>{
    newGame();
});