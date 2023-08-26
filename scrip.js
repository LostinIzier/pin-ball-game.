import Ball from "./ball.js"
import Paddle from "./Paddle.js"

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScore= document.getElementById("player-score")
const compuretScore= document.getElementById("computer-score")
let last_time
function update(time) {
    if(last_time!=null)
    {
      const delta=time-last_time
      ball.update(delta,[playerPaddle.rect(),computerPaddle.rect()])
      computerPaddle.update(delta,ball.y)
      const hue=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))

      document.documentElement.style.setProperty("--hue",hue+delta*.01)
      if(islose()){
        handle_loose()

      }
    }
    last_time=time;
    window.requestAnimationFrame(update)
}
function islose(){
    const rect=ball.rect()
    return rect.right>=window.innerWidth || rect.left <=0
}
function handle_loose(){
    const rect= ball.rect()
    if(rect.right>=window.innerWidth)
    {
        playerScore.textContent=parseInt(playerScore.textContent)+1
    }
    else{
        compuretScore.textContent=parseInt(compuretScore.textContent)+1
    }

    ball.reset()
    computerPaddle.reset()

}
document.addEventListener("mousemove", e=>{
    playerPaddle.position=(e.y/ window.innerHeight)*100
})
window.requestAnimationFrame(update)