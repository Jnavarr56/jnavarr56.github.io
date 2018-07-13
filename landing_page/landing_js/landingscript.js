let loadingSound = document.getElementById("loading-sound");
let counter = 7;
let pokeball = document.getElementById("pokeball");
let pokeball2 = document.getElementById("pokeglow");
let button = document.getElementById("click");
let displayText = document.getElementById("loading-text");
let storeText = "別ごイ彦名崎ホツサ育磐だトせふ晩相再かむめおリ告砂ざなおリ泉告ンひ砂選ッぜリ焼尾育ゃ知攻セソイ勝42舎営葉つめばひ。沼べこ属辺んさべわ務算ホユカヌ届月えてごぞ長女ス戦輝ヒリ彦再品どせげ意正格る発般ぎと題側ロサコ子感もさ合慈抹沙獄やづ。校ルヘマ付最マ断毎でだそく園街キメ鑼談時ウホオ載野ぶずにわ妻式シセ補5海さおかも安無9者将とでかむ芸入ホサソウ厚報ロマホナ原90切ニトノキ羅画ヨメミ投端要面の";


let numberGenerator = (max, min = undefined) => {
  if (min === undefined) {
    return Math.floor(Math.random()*(max+1));
  }
  else {
    var answer = Math.floor(Math.random()*(max+1));
    if (answer < min){
      return min;
    }
    else {
      return answer;
    } 
  }  
}


document.addEventListener("DOMContentLoaded", (event) => {
   button.classList.add("heatup");
   pokeball2.classList.add("heatup2");
   
  
 var go = setInterval(function increaseSpeed() {

   var start = numberGenerator(18, 5);
   var end = numberGenerator(30, 20);

   displayText.innerText = storeText.substring(start, end);



   pokeball.style.animationDuration = counter + "s";
   counter -= .005;
   console.log(counter);

   if (counter < 1) {
     clearInterval(go);
     pokeball.style.animationDuration = ".1s";
     setTimeout(function flash(){
       document.body.classList.add("flash");
     }, 500);        
   }
   
 }, counter);

 setTimeout(function changePage() {
   window.location = "mainPage.html";

 }, 11000); 

  
 
  

});