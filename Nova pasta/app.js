const nav = document.getElementById("nav");
const li = document.getElementsByClassName("menu-items");
const menuBtn = document.getElementById("btn-menu");

function showNavMenuList(){
     nav.style.transition="translate ease-in-out 300ms"
     nav.style.translate="100%";
     nav.style.opacity=1;
     setTimeout(function(){
          for(let i in li){
               li.item(i).style.opacity=1;
               li.item(i).style.pointerEvents = "all";
          }
     },400);
}
function hideNavMenuList(){
     nav.style.translate="-100%";
     for(let i in li){
          li.item(i).style.transition="opacity ease-in-out 0ms"
          li.item(i).style.pointerEvents = "none";
          li.item(i).style.opacity=0;
     }
}

menuBtn.addEventListener("click", function(){showNavMenuList()});
for(let i in li){
     li.item(i).addEventListener("click",function(){
          hideNavMenuList();
     });
}