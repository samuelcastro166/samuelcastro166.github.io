{
     //constants
     const btn_reset_date = document.getElementById("clock-current-date-button");
     const btn_change_month_year = document.getElementById("calendar-change-month-and-year");
     const table = document.getElementById("table");
     const btn_up = document.getElementById("calendar-up");
     const btn_down = document.getElementById("calendar-down");
     const calendar_weekdays = document.getElementById("calendar-weekdays")
     
     //variables
     let currDate = new Date().getDate();
     let currMonth = new Date().getMonth() + 1;
     let currYear = new Date().getFullYear();

     let calendar = new Calendar();
     let c = new Date();
     let app_mode = "month";
     let app_year = c.getFullYear();
     let app_month = c.getMonth();

     //HEAD...
          function head_reset(){//done
               app_mode = "month";
               app_year = new Date().getFullYear();
               app_month = c.getMonth();
               update();
          }
          function head_check_change(direction){//done
               switch(app_mode){
                    case "month": head_change_month(direction);break;
                    case "year": head_change_year(direction);break;
                    case "decade": head_change_decade(direction);break;
               }
          }
          //show functions...
               function head_show_month_year(){//done
                    btn_change_month_year.innerText = calendar.month_name(app_month) +
                    " de " + app_year;
               }
               function head_show_year(){//done
                    btn_change_month_year.innerText = app_year;
               }
               function head_show_decade(){//done
                    if(app_year >= 10){
                         btn_change_month_year.innerText = app_year - (app_year % 10) +
                         "-" + (app_year - (app_year % 10) + 9);
                    }
                    else if (app_year < 10){
                         btn_change_month_year.innerText = app_year - (app_year % 10) + 1 +
                         "-" + (app_year - (app_year % 10) + 9);
                    }
               }
          //...show functions
          
          //change functions...
               function head_change_month(direction){//done
                    app_month += direction;
                    if(app_month < 0){
                         app_month = 11;
                         head_change_year(direction);
                    }
                    else if(app_month > 11){
                         app_month = 0;
                         head_change_year(direction);
                    }
                    else{
                         update();
                    }
               }
               function head_change_year(direction){//done
                    if(app_year + direction >= 1){
                         app_year += direction;
                         update();
                    }
               }
               function head_change_decade(direction){//done
                    if(app_year + direction >= 1){
                         app_year += (direction * 10);
                         update();
                    }
               }
               function head_change_mode(direction){//done
                    switch(direction){
                         case "out":
                              switch(app_mode){
                                   case "month": app_mode = "year";break;
                                   case "year": app_mode = "decade";break;
                              }
                              break;
                         case "in":
                              switch(app_mode){
                                   case "decade": app_mode = "year";break;
                                   case "year": app_mode = "month";break;
                              }
                              break;
                    }
                    update();
               }
               function head(){//done
                    switch(app_mode){
                         case "month": head_show_month_year();break;
                         case "year": head_show_year();break;
                         case "decade": head_show_decade();break;
                    }
               }
          //...change functions
     //...HEAD

     //BODY...
          //show... 
               function body_show_month_table(){
                    calendar_weekdays.style.display = "flex";
                    table.className="table"
                    let firstDay = calendar.calc_day(`01/${app_month + 1}/${app_year}`)
                    let lastDate = calendar.time(app_year).monthLength(app_month);
                    for(let i = 0; i < 7 * 6; i++){
                         if(i < firstDay){
                              table.innerHTML += `<div class="cells"></div>`;
                         }
                         else if(i >= firstDay && i < lastDate + firstDay){
                              if(i - firstDay + 1 == currDate && app_month + 1 == currMonth && app_year == currYear){
                                   table.innerHTML += `<div class="cells currDate not-empty">${i-firstDay+1}</div>`;
                              }
                              else{
                                   table.innerHTML += `<div class="cells not-empty">${i-firstDay+1}</div>`;
                              }
                         }
                    }
               }
               function body_show_year_table(){
                    calendar_weekdays.style.display = "none";
                    table.className = "year-mode";
                    for(let i = 0; i < 12; i++){
                         let x = calendar.month_name(i);
                         if(currYear == app_year && currMonth == i + 1){
                              table.innerHTML += `<div class="cells not-empty currDate" id="${i}">${x}</div>`
                         }
                         else {
                              table.innerHTML += `<div class="cells not-empty" id="${i}">${x}</div>`
                         }
                    }
               }
               function body_show_decade_table(){
                    calendar_weekdays.style.display = "none";
                    table.className = "decade-mode";
                    for(let i = app_year - (app_year % 10); i <= app_year - (app_year % 10) + 9; i++){
                         if(i == 0){table.innerHTML = "<div class='cells'></div>"}
                         else if(currYear == i){
                              table.innerHTML += `<div class="cells not-empty currDate" id="${i}">${i}</div>`
                         }
                         else {
                              table.innerHTML += `<div class="cells not-empty" id="${i}">${i}</div>`
                         }
                    }
               }
          //...show

          //add events...
               function body_add_events_for_decade_mode(){//done
                    let count = table.childElementCount;
                    for(let i = 0; i < count; i++){
                         table.children[i].addEventListener("click",function(e){
                              app_year = Number(e.target.id);
                              app_mode = "year";
                              update()
                         });
                    }
               }
               function body_add_events_for_year_mode(){//done
                    let count = table.childElementCount;
                    for(let i = 0; i < count; i++){
                         table.children[i].addEventListener("click",function(event){
                              app_month = Number(event.target.id)
                              app_mode = "month";
                              update();
                         });
                    }
               }
               function body_add_events(){//done
                    switch(app_mode){
                         case "decade": body_add_events_for_decade_mode();break;
                         case "year": body_add_events_for_year_mode();break;
                    }
               }
          //...add events
          function body_check_mode(){//done
               switch(app_mode){
                    case "month": body_show_month_table();break;
                    case "year": body_show_year_table();break;
                    case "decade": body_show_decade_table();break;
               }
          }
          function body_clear(){table.innerHTML = "";}//done
          
          function body(){//done
               body_clear();//done
               body_check_mode();//done
               body_add_events();//done
          }
     //...BODY

     //UPDATES THE APP ON EVERY USER'S INTERACTIONS
     function update() {
          head();//done
          body();//done
     };
     update();

     //EVENTS...
          btn_reset_date.addEventListener("click", function(){head_reset()});
          btn_change_month_year.addEventListener("click", function(){head_change_mode("out")});
          btn_up.addEventListener("click", function(){head_check_change(-1)});
          btn_down.addEventListener("click", function(){head_check_change(1)});
     //...EVENTS

     //end
}