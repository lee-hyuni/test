$(document).ready(function(){

    //젼역변수
    var $art = $("#art");
    var $slider = $art.find(".slider ul");
    var $prev = $art.find(".prev");
    var $next = $art.find(".next");
    var speed = 500;
    var isDone = true;

    // 1번 슬라이드를 처음에 보이게 하는 함수
    $slider.find("li").last().prependTo($slider);

    //브라우저가 리사이즈 시
    $(window).on("resize",function(){

        // 현재 슬라이드 li한칸의 넓이 구하기 (marginLeft를 구해버리면
        // 아래 이벤트함수에서 이동했을때 다시 값이 변하기 때문)
        var curPos = $slider.find("li").outerWidth();
        curPos = parseInt(curPos);
        curPos = -curPos;

        $slider.css({marginLeft : curPos});
    })

    //넥스트 버튼 클릭시
    $next.on("click",function(e){
        e.preventDefault();

        var curPos = $slider.find("li").outerWidth();
        curPos = parseInt(curPos);
        curPos = -curPos;

        //슬라이더를 curPos 두배만큼 왼쪽으로 이동하고
        $slider.stop().animate({marginLeft:curPos*2},speed,function(){
            $slider.find("li").first().appendTo($slider);
            //이동이 끝나면 다시 원래 위치인 curPos돌아옴
            $slider.css({marginLeft:curPos});
        })
    })

    $prev.on("click",function(e){
        e.preventDefault();

        var curPos = $slider.find("li").outerWidth();
        curPos = parseInt(curPos);
        curPos = -curPos;

        $slider.stop().animate({marginLeft:0},speed,function(){
            $slider.find("li").last().prependTo($slider);
            $slider.css({marginLeft:curPos});
        })
    })
});