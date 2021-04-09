$(document).ready(function(){

    var $dt = $(".faqTab dt");
    var $dd = $(".faqTab dd");


    //클릭한 메뉴만 활성화되고 나머지는 자동으로 닫히는 토글메뉴
    $dt.on("click",function(e){
        e.preventDefault(); 
               
        var isOn = $(this).hasClass("on");

        $dt.removeClass("on");
        $dd.slideUp();

        if(isOn){
            $(this).removeClass("on");
            $(this).next("dd").slideUp();
            return;
        } 

        $(this).addClass("on");
        $(this).next("dd").slideDown();
    });
    
});