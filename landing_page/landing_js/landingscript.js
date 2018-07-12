let loadingSound = document.getElementById("loading-sound");
let counter = 7;
let pokeball = document.getElementById("pokeball");
let pokeball2 = document.getElementById("pokeglow");
let button = document.getElementById("click");

document.addEventListener("DOMContentLoaded", (event) => {
   button.classList.add("heatup");
   pokeball2.classList.add("heatup2");
   
  
 var go = setInterval(function increaseSpeed() {

   pokeball.style.animationDuration = counter + "s";
   counter -= .005;
   console.log(counter);
   
   if (counter < 1) {
     console.log("hit");
     clearInterval(go);
     pokeball.style.animationDuration = ".1s";
     setTimeout(function flash(){
       document.body.classList.add("flash");
     }, 500);
     
     
     
     
   }
   
 }, counter);

  
 
  
 

  
});