{
     const body = document.body;
//images wallpaper...
     const $image = {
          midnight: "url(./images/midnight.jpg)",//0
          sunrise: "url(./images/sunrise.jpg)",//6
          noon: "url(./images/noon.jpg)",//12
          sunset: "url(./images/sunset.jpg)",//18
          sleep: "url(./images/sleep.jpg)",//22
          dream: "url(./images/dream.jpg)",//22-05
          morning: "url(./images/morning.jpg)",
          afternoon: "url(./images/afternoon.jpg)",
          night: "url(./images/night.jpg)"
     };
     let hour = new Date().getHours();
     function change_wallpaper(){
          if(hour === 0) {//done
               body.style.backgroundImage = $image.midnight;
          }
          else if(hour === 6){//done
               body.style.backgroundImage = $image.sunrise;
          }
          else if(hour === 12){//done
               body.style.backgroundImage = $image.noon
          }
          else if(hour === 18){//done
               body.style.backgroundImage = $image.sunset;
          }
          else if(hour === 22){//done
               body.style.backgroundImage = $image.sleep;
          }
          else {
               if(hour < 6 || hour > 22){//done
                    body.style.backgroundImage = $image.dream;
               }
               else if(hour < 12){//done
                    body.style.backgroundImage = $image.morning;
               }
               else if(hour < 18){//done
                    body.style.backgroundImage = $image.afternoon;
               }
               else if(hour < 22){
                    body.style.backgroundImage = $image.night;
               }
          }
     }
     function check_hour(){
          let test = new Date().getHours();
          change_wallpaper();
          if(hour !== test){
               hour = new Date().getHours();
               check_hour();
          }
     }
     requestAnimationFrame(check_hour);
//...images wallpaper
}