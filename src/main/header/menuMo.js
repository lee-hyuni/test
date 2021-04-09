$(document).ready(function(){
    var btnCall = document.querySelector(".btnCall");
    var menuMo = document.querySelector(".menuMo");
    
    btnCall.onclick = function(){
        menuMo.classList.toggle("on");
    }
    
    window.onresize = function(){
        var wid = window.innerWidth;
    
        if(wid >= 1180){
            menuMo.classList.remove("on");
        }
    }
});