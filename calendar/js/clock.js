{
const calendar = new Calendar();
const ampm_btn = document.getElementById("ampm-checkbox");
const clock = {
     hour: document.getElementById("clock-hours"),
     min: document.getElementById("clock-minutes"),
     sec: document.getElementById("clock-seconds"),
     ampm: document.getElementById("clock-ampm"),
     date: document.getElementById("clock-current-date-button")
}
//ampm btn functions...
let ampmIsOn = false;
let ampmIsFocus = false;
let btn = {
     left: ampm_btn.getClientRects().item(0).left,
     right: ampm_btn.getClientRects().item(0).right,
     get size(){return this.right - this.left}
}
let ball = {size: ampm_btn.children[0].getClientRects().item(0).width}
let mouse = {
     xi: undefined,
     x : undefined,
     xl: undefined,
     down: false,
     moved: false,
     get downMoved(){return this.down && this.moved}
}
function reset_all(){
     mouse.xi = undefined;
     mouse.xl = undefined;
     mouse.down = false;
     mouse.moved = false;
}
function change_mode(){
     if(ampmIsOn){
          ampm_btn.title = "#Desativar modo 12 horas";
          ampm_btn.style.color = "#0f0";
          ampm_btn.children[0].style.width = `${btn.size}px`;
          clock.ampm.parentElement.classList.add("on");
     }
     else{
          ampm_btn.style.color = "#f00";
          ampm_btn.children[0].style.width = `${ball.size}px`;
          clock.ampm.parentElement.classList.remove("on");
     }
}
function change_ampm_variable(){ampmIsOn = ampmIsOn ? false : true}
function change_transition(){
     if(mouse.down){
          ampm_btn.children[0].style.transition = "none";
     }
     else{
          ampm_btn.children[0].style.transition =
          "width ease-in-out 200ms";
     }
}
function change_width(n){
     let x;
     x = Math.floor(n - btn.left + (ball.size / 2));
     x = x > btn.right ? btn.size : x;
     x = x < ball.size ? ball.size : x;
     if(n <= btn.left + (btn.size / 2)){
          ampm_btn.style.color = "#f00"
          ampmIsOn = false;
     }
     else{
          ampm_btn.style.color = "#0f0"
          ampmIsOn = true;
     }
     ampm_btn.children[0].style.width = `${x}px`;

}
//eventListeners...
     window.addEventListener("resize",()=>{
          btn = {
               left: ampm_btn.getClientRects().item(0).left,
               right: ampm_btn.getClientRects().item(0).right,
               get size(){return this.right - this.left}
          };
          ball = {
               size: ampm_btn.children[0].getClientRects().item(0).width
          };
          
     })

     //on focusin
     ampm_btn.addEventListener("focusin",()=>{ampmIsFocus=true})
     //on kaypressed
     ampm_btn.addEventListener("keypress",(e)=>{
          let $key = e.key;
          if(ampmIsFocus){
               if($key === "Enter" || $key === " "){
                    change_ampm_variable();
                    change_mode();
               }
          }
     })
     //on focusout
     ampm_btn.addEventListener("focusout",()=>{ampmIsFocus=false})


     //mouse down
     ampm_btn.addEventListener("mousedown",(e)=>{
          mouse.down = true;
          mouse.xi = e.clientX;
          change_transition();
     })

     //mouse move
     document.body.addEventListener("mousemove",(e)=>{
          if(mouse.down && !(mouse.xi === e.clientX)){mouse.moved = true};
          if(mouse.downMoved){change_width(e.clientX)}
     })
     //mouse up
     document.body.addEventListener("mouseup",(e)=>{
          mouse.xl = e.clientX;
          if(!mouse.downMoved && mouse.xl === mouse.xi){
               change_ampm_variable();
               change_mode();
          }
          else if(mouse.moved){
               change_mode();
          }
          reset_all();change_transition();
     })
change_mode();

//eventListeners...
//...ampm btn functions


//clock functions...
     function show_hour(){
          let hour = new Date().getHours();
          if(ampmIsOn && hour >= 12){
               hour = hour - 12;
          }
          let h = hour < 10 ? "0" + hour : hour;
          clock.hour.innerText = h;
     }
     function show_minutes(){
          let minutes = new Date().getMinutes();
          let m = minutes < 10 ? "0" + minutes : minutes;
          clock.min.innerText = m;
     }
     function show_seconds(){
          let seconds = new Date().getSeconds();
          let s = seconds < 10 ? "0" + seconds : seconds;
          clock.sec.innerText = s;
     }
     function show_ampm(){
          if(new Date().getHours() < 12){
               clock.ampm.innerText = "am"
          }
          else{
               clock.ampm.innerText = "pm"
          }
     }
     function show_current_date(){
          let day = new Date().getDay();
          let dayName = day === 0 || day === 6 ? calendar.day_name(day) : calendar.day_name(day) + "-feira";
          let date = new Date().getDate();
          let month = new Date().getMonth();
          let monthName = calendar.month_name(month);
          let year = new Date().getFullYear();
          clock.date.innerText = dayName + ", Dia " + date + " de " +
          monthName + " de " + year;
     }
//...clock functions

function update(){
     requestAnimationFrame(update);
     show_ampm();
     show_hour();
     show_minutes();
     show_seconds();
     show_current_date();
}
update();
}