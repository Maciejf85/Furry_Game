import '../scss/main.scss';


var arr = ["url(../src/img/diamond-1.png)" , 
           "url(../src/img/diamond-2.png)" , 
           "url(../src/img/diamond-3.png)" , 
           "url(../src/img/diamond-4.png)" ,
           "url(../src/img/diamond-5.png)"
          ];
     
var character = document.createElement('div');
     character.classList.add('girl');

var diamondEl = document.createElement('div');
     diamondEl.classList.add('diamond');

var Character = function() {
     this.x = 0,
     this.y = 0,
     this.direction = "right"
     console.log(this.direction);
}

var Diamond = function() {
     this.x = Math.floor(Math.random() * 10),
     this.y = Math.floor(Math.random() * 10)
}

var Game = function() {
     this.char = new Character(),
     this.diamond = new Diamond(),
     this.board = document.querySelectorAll('#board > div'),
     this.score =  0,
     this.scoreBoard = document.getElementById('points');
     var _this = this;
     this.speed = 500;
     document.addEventListener('keydown', function(event){
          _this.turnChar(event);
      });


     
     this.position = function(x,y) {
          return x + (y * 10);
     }     

     this.showDiamond = function() {
          var diamNumber = Math.round(Math.random() * (arr.length-1))
          diamondEl.style.backgroundImage = arr[diamNumber];
          this.board[this.position(this.diamond.x , this.diamond.y)].appendChild(diamondEl);
     }

     this.showCharacter = function(){

          this.board[this.position(this.char.x , this.char.y)].appendChild(character);
     }
     this.startTimer = function() {
          this.id = setInterval(function(){
               _this.moveChar();
          }, this.speed)},

     this.addPoint = function(){
          this.score += 1;
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


     this.moveChar = function(){
          this.clearClass();
          
          if(this.char.direction == "right") {
               this.char.x += 1;
               character.classList.add('right');   
           }

           else if(this.char.direction == "down") {
               this.char.y += 1;
               character.classList.add('down');   
          }
          
          else if(this.char.direction == "left") {
               this.char.x -= 1;
               character.classList.add('left');   
          }
          
          else if(this.char.direction == "up") {
               character.classList.add('up');   
               this.char.y -= 1;
                  
           }
          

          this.showCharacter();
          if(this.char.x == this.diamond.x && this.char.y == this.diamond.y){
               this.addPoint();
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

var game = new Game();

game.showDiamond();
game.startTimer();


