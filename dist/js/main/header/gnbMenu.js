$(document).ready(function(){

    var $header = $("#header");
    var $gnb_li = $("#gnb>li");
    var $sub = $gnb_li.find(".sub");
    var speed = 500;

    $(window).on("scroll",function(){
        var scroll = $(this).scrollTop();
        if( scroll >= 900){
            $header.slideDown();
        }
        else{
            $header.slideUp();
        }
    });


    $gnb_li.on("mouseenter focusin",function(){
        openSub(this);
    });

    $gnb_li.on("mouseleave focusout",function(){
        closeSub(this);
    });

   

    function openSub(el){
        var ht = $sub.outerHeight();
        var bg = $sub.css("background-color");
        var posY = $header.outerHeight();
        var isBgGnb = $(".bgGnb").length;

        if(!isBgGnb) {        
            $header.prepend(
                $("<div class='bgGnb'>")
                    .css({
                        width:"100%",  height:ht, backgroundColor:bg, 
                        position:"absolute", left:0, top:posY, display:"none",
                        borderBottom: "1px solid rgba(163, 131, 72, 0.4)"
                    })
            )
        }

        
        $(el).children(".sub").stop().slideDown(speed);
        $(".bgGnb").stop().slideDown(speed);
        $(el).children("a").addClass("on");
    }

    function closeSub(el){
        $(el).children(".sub").stop().slideUp(speed/2);
        $(".bgGnb").stop().slideUp(speed/2,function(){
            $(this).remove();
        });
        $(el).children("a").removeClass("on");
    }
});