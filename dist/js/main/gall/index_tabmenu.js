$(document).ready(function(){

    ///이거 다시쓰기,,, 너무 졸려

    //DOM Caching
    var $gall = $("#gall");
    var $inner = $gall.find(".inner");
    var $menu = $inner.find(".tapList");
    var $btns = $menu.find("li a");
    var $boxs = $inner.find(".window li");

    //binding Event
    $btns.on("click focusin",function(e){
        e.preventDefault();

        var isOn = $(this).hasClass("on");
        if(isOn) return;

        var target = $(this).attr("href");
        activation(target, $(this))
    });

    //function declaration
    function activation(target, el){
        $btns.removeClass("on");
        $boxs.hide();

        el.addClass("on");
        $(target).show();
    }
 
});