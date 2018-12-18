import '../scss/main.scss';

var arr = ["url(../src/img/diamond-1.png)" , 
           "url(../src/img/diamond-2.png)" , 
           "url(../src/img/diamond-3.png)" , 
           "url(../src/img/diamond-4.png)" ,
           "url(../src/img/diamond-5.png)"
          ];

          

var bestPoints = 0;
var bestPointsEnd = document.querySelector('.end-bestScore');
var starterBoard = document.querySelector('.startBoard');
var endBoard = document.querySelector('.endBoard');

var character = document.createElement('div');
     character.classList.add('girl');

var diamondEl = document.createElement('div');
     diamondEl.classList.add('diamond');

var replay = document.querySelector('.endBoard-replay');
     replay.addEventListener('click', startBoard);

var hardBtn = document.querySelectorAll('[class*=Btn]');
     hardBtn.forEach(function(item){
          item.addEventListener('click',function(){
               var level = this.classList.value;
               var scoreD = 0;
               if(level == "easyBtn") {
                    level = 500;
                    character.style.animationDuration = '1s';
                    scoreD = 1;
               }
               else if(level == "mediumBtn"){
                    level = 200;
                    character.style.animationDuration = '0.5s';
                    scoreD = 3;
               }
               if(level == "hardBtn"){
                    level = 70;
                    character.style.animationDuration = '0.25s';
                    scoreD = 7;
               }
              startGame(level, scoreD);
          })
})

import { Character } from './char';
import { Diamond } from './diam';


var Game = function() {

     this.char = new Character(),
     this.diamond = new Diamond(),
     this.board = document.querySelectorAll('#board > div'),
     this.scoreBoard = document.getElementById('points');
     this.mainBoard = document.getElementById('board');
     this.boardScreen = document.querySelector('.backgroundContainer');
     this.boardScore = document.querySelector('.score');
     this.endScore = document.querySelector('.end-score');
     var _this = this;
     this.score = 0,
     this.scoreDiff = 1,
     this.x = 0,
     this.y = 0

     document.addEventListener('keydown', function(event){
          _this.turnChar(event);
      });

     
     this.position = function(x,y) {
          return x + (y * 10);
     }     

     this.showDiamond = function() {
          var diamNumber = Math.round(Math.random() * (arr.length-1)) //losowanie diamentu
          diamondEl.style.backgroundImage = arr[diamNumber]; // przypisanie diamentu z tablicy do background
          this.board[this.position(this.diamond.x , this.diamond.y)].appendChild(diamondEl); //
     }

     this.showCharacter = function(){
          this.board[this.position(this.char.x , this.char.y)].appendChild(character);
     }

     this.startTimer = function() {
          this.id = setInterval(function(){
               _this.moveChar();
          }, this.char.speed)},

     this.addPoint = function(){
          this.score += this.scoreDiff;
          this.scoreBoard.innerHTML = this.score;
          this.diamond = new Diamond();
          this.showDiamond();
     }
     this.clearClass = function(){
          character.classList.remove('left');
          character.classList.remove('right');
          character.classList.remove('up');
          character.classList.remove('down');
     }
     this.gameOver = function(){
          clearInterval(this.id);
          this.endScore.innerHTML = this.score;
          this.boardScreen.style.display = 'none';
          this.boardScore.style.display = 'none';
          endBoard.style.display = 'block';

          if(this.score <= bestPoints){
               console.log('gameOver => this.score <= bestScore '+ this.score , bestPoints)
               bestPointsRead();
               bestPointsEnd.innerHTML = bestPoints;
               endBoard.classList.remove('win');
          }else{
               endBoard.classList.add('win');
               bestPointsEnd.innerHTML = this.score;
               newRecord(this.score);             
               console.log('gameOver => this.score > bestScore '+ this.score , bestPoints)
          }
     }
     this.startGame = function(level, scoreD){
          this.scoreDiff = scoreD;
          this.char.speed = level;
          this.scoreBoard.innerHTML = this.score;
          this.mainBoard.style.display = 'block';
          this.boardScreen.style.display = 'block';
          this.boardScore.style.display = 'block';
          endBoard.style.display = 'none';
          starterBoard.style.display = 'none';         
     }

     this.moveChar = function(){


          if((this.char.x >= 0 && this.char.x <= 9)  && (this.char.y >= 0 && this.char.y <= 9)){

               if(this.char.direction == "right"){
                    this.x++;

                    if(this.x >= 10){
                         this.gameOver();
                    }else{
                         this.char.x = this.x;
                         this.clearClass();
                         character.classList.add('right');   
                    }
               }

               if(this.char.direction == "down"){
                    this.y++;

                    if(this.y >= 10){
                         this.gameOver();
                    }else{
                         this.char.y = this.y;
                         this.clearClass();
                         character.classList.add('down');   
                    }
               }

               if(this.char.direction == "left"){
                    this.x--;

                    if(this.x < 0){
                         this.gameOver();
                    }else{
                         this.char.x = this.x;
                         this.clearClass();
                         character.classList.add('left');   
                    }
               }

               if(this.char.direction == "up"){
                    this.y--;

                    if(this.y < 0){
                         this.gameOver();
                    }else{
                         this.char.y = this.y;
                         this.clearClass();
                         character.classList.add('up');   
                    }
               }

              


               if(this.char.x == this.diamond.x && this.char.y == this.diamond.y){
                    this.addPoint();
               }
               this.showCharacter();

          }



     }
          this.turnChar = function(event){

               switch (event.which) {
                    case 37:
                      this.char.direction = 'left';
                      break;
     
                      case 38:
                      this.char.direction = 'up';
                      break;
     
                      case 39:
                      this.char.direction = 'right';
                      break;
     
                      case 40:
                      this.char.direction = 'down';
                      break;
     
               }
          }
          
}



function startBoard(){
     starterBoard.style.display = "block";  
     endBoard.style.display = 'none';   
}

function startGame(level, scoreD){
     var game = new Game();

     game.startGame(level,scoreD);     
     game.showCharacter();
     game.showDiamond();
     game.startTimer();
}

startBoard();

function newRecord(result){

     var score = {
          points: result
     }

$.ajax({ //Wysłanie nowego wyniku
          type: "POST", //typ połączenia na post
          url: "../points/points.php",
          data: {
          score: score
               },
     }).done(function(){
          bestPointsRead();
     }).fail(function(error){
               console.log('error' + error)
          });

}
function bestPointsRead(){
          $.ajax({
               url: "../points/points.php"
          }).done(function(response){
               bestPoints = response.points;
     }).fail(function(error){
          console.log('error' + error)
     })
}
bestPointsRead();