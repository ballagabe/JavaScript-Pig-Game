/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
documentation:
random number = Math.floor(Math.random() * (max - min + 1)) + min;
*/
//displays
var player0, player1, player0Point, player1Point, player0HoldPoint, player1HoldPoint, round, dice;
var roundDisplay0 = document.querySelector(".player-0-panel");
var roundDisplay1 = document.querySelector(".player-1-panel");
var currentDicePoint = document.querySelector(".dice");
var player0PointDisplay = document.querySelector("#score-0");
var current0PointDisplay = document.querySelector("#current-0");
var player1PointDisplay = document.querySelector("#score-1");
var current1PointDisplay = document.querySelector("#current-1");
//buttons
var rollButton = document.querySelector(".btn-roll");
var holdButton = document.querySelector(".btn-hold");
var newButton = document.querySelector(".btn-new");
//add start values
player0 = 0;
player0Point = 0;
player0HoldPoint = 0;
player1 = 1;
player1Point = 0;
player1HoldPoint = 0;
//round calc & display
round = Math.floor(Math.random() * (1 - 0 + 1))+0;
roundCalc();
//new game
newButton.addEventListener('click' , newGame);
//start game
rollButton.addEventListener('click' , game);
//hold points
holdButton.addEventListener('click' , holdPoints);

//functions
function game(){
    //after roll dice
    dice = Math.floor(Math.random() * (6 - 1 + 1))+1;
    currentDicePoint.src = "dice-"+ dice + ".png";
    //point calc & display
    if(round==player0){
        player0Point += dice;
        player0PointDisplay.textContent = player0Point;
    }
    else if(round==player1){
        player1Point += dice;
        player1PointDisplay.textContent = player1Point;
    }
    

    //round turn
    roundTurn();
    roundCalc();
};
function roundCalc(){
    if(round==0){
        roundDisplay0.classList.add("active");
        roundDisplay1.classList.remove("active");
    }else{
        roundDisplay1.classList.add("active");
        roundDisplay0.classList.remove("active");
    }
};
function newGame(){
    document.querySelector("#name-0").style.color = "";
    document.querySelector("#name-0").textContent = "Player 1";
    document.querySelector("#name-1").style.color = "";
    document.querySelector("#name-1").textContent = "Player 2";
    holdButton.addEventListener('click' , holdPoints);
    newButton.addEventListener('click' , newGame);
    rollButton.addEventListener('click' , game);
    player0Point = 0;
    player0HoldPoint = 0;
    player1Point = 0;
    player1HoldPoint = 0;
    player0PointDisplay.textContent = player0Point;
    player1PointDisplay.textContent = player0Point;
    current0PointDisplay.textContent = player0HoldPoint;
    current1PointDisplay.textContent = player1HoldPoint;
    round = Math.floor(Math.random() * (1 - 0 + 1))+0;
    roundCalc();
};
function roundTurn(){
    if(dice == 1)
    {
        if(round==0)
        {
            player0Point = 0;
            player0PointDisplay.textContent = 0;
            round=1;
        }else if(round==1){
            player1Point = 0;
            player1PointDisplay.textContent = 0;
            round=0;
        }
    }
};
function holdPoints(){

    if(round==0)
    {
        player0HoldPoint += player0Point;
        current0PointDisplay.textContent = player0HoldPoint;
        player0Point = 0;
        player0PointDisplay.textContent = 0;
        round=1;
        if(player0HoldPoint >= 100)
        {
            endGame();
        }else{
            roundCalc();
        }
    }else if(round==1){
        player1HoldPoint += player1Point;
        current1PointDisplay.textContent = player1HoldPoint;
        player1Point = 0;
        player1PointDisplay.textContent = 0;
        round=0;
        if(player1HoldPoint >= 100)
        {
            endGame();
        }else{
            roundCalc();
        }
    }
    
}
function endGame(){

    if(player0HoldPoint >= 100){
        document.querySelector("#name-0").style.color = "green";
        document.querySelector("#name-0").textContent = "WINNER";
    }
    if(player1HoldPoint >= 100){
        document.querySelector("#name-1").style.color = "green";
        document.querySelector("#name-1").textContent = "WINNER";
        
    }


        roundDisplay0.classList.remove("active");
        roundDisplay1.classList.remove("active");
        holdButton.removeEventListener('click' , holdPoints);
        rollButton.removeEventListener('click' , game);
    
}