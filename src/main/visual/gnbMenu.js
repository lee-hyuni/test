$(document).ready(function(){

    var isDone = true;

    //돋보기아이콘에 input border 만들어주는 이벤트
    $(".icon li a").on("click",function(e){
        e.preventDefault();
        $(this).siblings(".search").toggleClass("on");
    })

    //article의 글자를 각각 span으로 분리하기 
    $(".panel li").each(function(){
        var item = $(this).find("h1");
        letter(item);
    });

    //네비 버튼 클릭시
    $(".navi li").on("click", function(){
        var isOn = $(this).hasClass("on");

        if(isOn) return;

        if(isDone){
            isDone = false;
            var i = $(this).index();

            $(".navi li").removeClass("on");
            $(".navi li").eq(i).addClass("on");

            $(".panel li").eq(i).addClass("next");

            setTimeout(function(){
                $(".panel li.on").removeClass();
                $(".panel li").eq(i).removeClass("next").addClass("on");    

                setTimeout(function(){
                    isDone = true;  
                },1000);
            },1000);            
        }
    });

    //gnb 2depth   
    $("#gnb>li>a").on("focusin", function(){
        $("#gnb>li>a").parent("li").removeClass("on");
        $(this).parent("li").addClass("on");
    });         

    $("#gnb>li").each(function(){
        $(this).find("li").last().children("a").on("focusout", function(){
            $(this).parent("li").parent("ul").parent(".sub").parent("li").removeClass("on");
        });
    })   



    //글자 분리함수 정의
    function letter(el){
        var i=0;
        var txt = el.text();
        el.empty();        

        for(var letter of txt){
            el.append(
                $("<span>").text(letter).css({transitionDelay: 0.15*i+"s"})
            );    
            i++;
        }
    }

});