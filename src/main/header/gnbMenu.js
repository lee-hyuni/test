$(document).ready(function(){

    var $header = $("#header");
    var $gnb_li = $("#gnb>li");
    var $sub = $gnb_li.find(".sub");
    var speed = 500;

    //브라우저 리사이즈시 다시 세로 위치값 갱신
    //$(window).on("resize", setPos );

    $(window).on("scroll",function(){
        var scroll = $(this).scrollTop();
        if( scroll >= 300){
            $header.slideDown();
        }
        if( scroll < 300){
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
                        position:"absolute", left:0, top:posY, display:"none"
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