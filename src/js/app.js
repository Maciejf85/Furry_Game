import '../scss/main.scss';


var points = document.getElementById('points');
var counter = 0;

var time = setInterval(function(){
     counter++ ;
     if(counter >= 3) clearInterval(time) , counter = 3;
     points.innerHTML = counter;
},1000);


