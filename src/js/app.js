import '../scss/main.scss';
import { create } from 'domain';


var points = document.getElementById('points');
var counter = 0;
var animation = document.querySelector('.girl');
var boxes = document.querySelectorAll('#board > div');

console.log(boxes)


var time = setInterval(function(){
     
     counter++ ;
     // if(counter < 5) animation.style.WebkitAnimationName  = "walk-right";
     // if(counter > 5 && counter < 10 ) animation.style.WebkitAnimationName  = "walk-down";
     // if(counter > 10 && counter < 15 ) animation.style.WebkitAnimationName  = "walk-left";
     // if(counter > 15 && counter < 20 ) animation.style.WebkitAnimationName  = "walk-up";

     if(counter > 20)  counter = 0;
     points.innerHTML = counter;
},1000);


