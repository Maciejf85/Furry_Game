import '../scss/main.scss';

var cnt = 0;
const easy = 500,
     medium = 150,
     hard = 100;
     
var character = document.createElement('div');
     character.classList.add('girl');

var diamond = document.createElement('div');
     diamond.classList.add('diamond');

var Character = function() {
     this.x = 0,
     this.y = 0,
     this.direction = "right"
}

var Diamond = function() {
     this.x = Math.floor(Math.random() * 10),
     this.y = Math.floor(Math.random() * 10)
}

var Game = function() {
     this.char = new Character();
     this.diamond = new Diamond();
     this.board = document.querySelectorAll('#board > div');
     this.score =  0;
     this.scoreBoard = document.getElementById('points');

     this.position = function(x,y) {
          return x + (y * 10);
     }     

     this.showCharacter = function() {
          this.board[this.position(this.diamond.x , this.diamond.y)].appendChild(diamond);
     }

     this.showDiamond = function(){
          this.board[this.position(this.char.x , this.char.y)].appendChild(character);
     }


}

var game = new Game();

game.showCharacter();
game.showDiamond();


