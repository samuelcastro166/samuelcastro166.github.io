//reusable functions
     function yearNumber(){return new Date().getFullYear()};
     function weekdayName(number){
          if(number === undefined){number = new Date().getDay();}
          let name;
          switch(number){
               case 0:
                    name = 'domingo';
                    break;
               case 1:
                    name = 'segunda-feira';
                    break;
               case 2:
                    name = 'terça-feira';
                    break;
               case 3:
                    name = 'quarta-feira';
                    break;
               case 4:
                    name = 'quinta-feira';
                    break;
               case 5:
                    name = 'sexta-feira';
                    break;
               case 6:
                    name = 'sábado';
                    break;
          }
          return name;
     }
     function monthName(number){
          if(number === undefined){number = new Date().getMonth();}
          let name;
          switch(number){
               case 0:
                    name = "janeiro";
                    break;
               case 1:
                    name = "fevereiro";
                    break;
               case 2:
                    name = "março";
                    break;
               case 3:
                    name = "abril";
                    break;
               case 4:
                    name = "maio";
                    break;
               case 5:
                    name = "junho";
                    break;
               case 6:
                    name = "julho";
                    break;
               case 7:
                    name = "agosto";
                    break;
               case 8:
                    name = "setembro";
                    break;
               case 9:
                    name = "outubro";
                    break;
               case 10:
                    name = "novembro";
                    break;
               case 11:
                    name = "dezembro";
                    break;
          }
          return name;
     }
     function dayNumber(){return new Date().getDate()};
//reusable functions

{
     //ampm ids
     const AMPM = document.getElementById("clock-ampm");
     const switcherAppearence = document.getElementById("check-anime");
     const switcherMode = document.getElementById("check-ampm");
     let isAmpmOn;

     //clock time ids
     const hours = document.getElementById("clock-hours");
     const minutes = document.getElementById("clock-minutes");
     const seconds = document.getElementById("clock-seconds");

     //clock date ids
     const weekday = document.getElementById("clock-weekday");
     const day = document.getElementById("clock-day");
     const month = document.getElementById("clock-month");
     const year = document.getElementById("clock-year");

     function changeMode(){
          let v = switcherMode.value;
          let middle = Math.ceil(switcherMode.max / 2);
          
          if(v < middle){
               isAmpmOn = false;
               switcherAppearence.className = '';
               AMPM.className = 'ampm-off'
          }
          else{
               isAmpmOn = true;
               switcherMode.style.color="#0f05";
               switcherAppearence.className = "on";
               AMPM.className = 'ampm-on';
          }
     }
     changeMode();
     switcherMode.addEventListener('change', changeMode);


     //clock show the time
     {
          

          setInterval(function(){
               let h = new Date().getHours();
               let m = new Date().getMinutes();
               let s = new Date().getSeconds();
               let ampm = (h < 12) ? "AM" : "PM"; 

               h = ((isAmpmOn) && h > 12) ? h - 12 : h;
               h = (h < 10) ? "0" + h : h;
               m = (m < 10) ? "0" + m : m;
               s = (s < 10) ? "0" + s : s;


               hours.innerText = h;
               minutes.innerText = m;
               seconds.innerText = s;
               if(isAmpmOn){AMPM.innerText= ampm;}
          },100)
     }

     //clock show the date here -v-
     {
          function showDate(){
               weekday.innerText = weekdayName();
               day.innerText = dayNumber();
               month.innerText = monthName();
               year.innerText = yearNumber();
          }
          setInterval(showDate, 500)
     }
     //clock show the date here -^-
}