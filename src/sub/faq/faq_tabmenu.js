$(document).ready(function(){

    //DOM Caching
    var $inner = $(".inner2");
    var $menu = $inner.find(".list");
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