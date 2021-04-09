$(document).ready(function () {

    var $slider = $("#slider");
    var $list = $slider.find(".list");
    var $list_li = $list.find("li");
    //var wid = $list.children("li").width();
    var $prev = $(".prev");
    var $next = $(".next");
    var i = -100; //해당 값은 추후 문자열 %와 결합되어 좌우 슬라이더의 margin-left에 대입될 전역변수
    var speed = 1000;
    var timer;
    var isDone = true;


    $list_li.last().prependTo($list);
    timer = setInterval(move, 60);

    $list.on("mouseenter", function () {
        clearInterval(timer);
    });

    $list.on("mouseleave", function () {
        timer = setInterval(move, 60);
    });

    //next 버튼 이벤트
    $next.on("click", function (e) {
        e.preventDefault();

        if (isDone) {
            isDone = false;
            next();
            clearInterval(timer); //좌우 버튼 클릭시 자동롤링이 멈추게 처리
        }
    });

    //prev 버튼 이벤트
    $prev.on("click", function (e) {
        e.preventDefault();

        if (isDone) {
            isDone = false;
            prev();
            clearInterval(timer);//좌우 버튼 클릭시 자동롤링이 멈추게 처리
        }
    });

//------------------함수 선언-----------------------
    
    //슬라이드 움직이는 함수
    function move() {
        if (i <= -200 ) { //현재 marginLeft값이 -100%이므로 -200%보다 적어질때까지 수치값이 떨어지면
            i = -100; //해당 값을 -100으로 변경해서 다시 -100%위치에서 시작되도록 초기화
            $list.children("li").first().appendTo($list);
        } else {
            i--;
        }
        $list.css({ marginLeft: i+"%" }); //이젠 px단위가 아닌 %단위로 움직이므로 i값에 %추가
    };

    //next함수정의
    function next() {
        $list.animate({ marginLeft: "-200%" }, speed, function () {
            $list.children("li").first().appendTo($list);
            $list.css({ marginLeft: "-100%" });
            
            isDone = true;
            i= -100;//next모션이 끝난직후 현재 위치값 -100을 다시 전역변수 i에 업데이트
        });
    }

    //prev함수정의
    function prev() {
        $list.animate({ marginLeft: "0%" }, speed, function () {
            $list.children("li").last().prependTo($list);
            $list.css({ marginLeft: "-100%" });          
            isDone = true;
            i=-100; //prev모션이 끝난직후 현재 위치값 -100을 다시 전역변수 i에 업데이트
        });
    }


});

/*
$(document).ready(function(){

    var $slider = $("#slider");
    var $slider_li = $slider.find("ul li");
    var $prev = $(".prev");
    var $next = $(".next");
    var len = $slider_li.length;
    var speed = 1000;
    var i = 0;

    //다음 버튼 클릭시
    $next.on("click", function(e){
        e.preventDefault();
  
        i = $slider_li.filter(".on").index();  
        (i== len-1) ?  i=0 : i++ ;    
       nextSlide(i);
    });

    //이전 버튼 클릭 시
    $prev.on("click", function(e){
        e.preventDefault();

        i = $slider_li.filter(".on").index();
        (i==0) ? i= len-1 : i--;
        prevSlide(i);     
    });


    function nextSlide(index){
        $slider_li.not(".on").css({ left: "100%"});
        $slider_li.filter(".on").stop().animate({ left: "-100%"},speed, function(){
            $(this).css({ left: "100%"}).removeClass("on");
        });
        
        $slider_li.eq(index).stop().animate({ left: "0%"},speed, function(){
            $(this).addClass("on");
        });
    }

    function prevSlide(index){
        $slider_li.not(".on").css({ left: "-100%"});
        $slider_li.filter(".on").stop().animate({ left: "100%" },speed, function(){
            $(this).css({ left: "-100%"}).removeClass("on");
        });

        $slider_li.eq(index).stop().animate({ left: "0%"},speed, function(){
            $(this).addClass("on");
        });
    }

 
});
*/