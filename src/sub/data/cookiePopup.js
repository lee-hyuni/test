$(document).ready(function(){

    createPop({
        name: "#popup",
        data_url: "pop.html",
        isMask: true,
        isCk: true
    });
   
    var isCookie = document.cookie.indexOf("popup=done");


    //처음 로딩시 쿠키가 있는지 판단해서 쿠키가 없을때만 팝업 보이기
    if(isCookie == -1){
        console.log("쿠키없음");
        $("#popup").show();
        $(".mask").show();
    }else{
        console.log("쿠키있음")
        $("#popup").hide();
        $(".mask").hide();
    }

    //쿠키 팝업 닫기 버튼 클릭시
    $("body").on("click", "#popup .close",function(e){
        e.preventDefault();
        removePop(this);        
    });


    //쿠키 생성 함수 정의
    function setCookie(cookieName, cookieVal, time){     
        var today = new Date();
        var date = today.getDate();
        today.setDate(date+time);     
        var duedate = today.toGMTString();
        document.cookie = cookieName+"="+cookieVal+"; path=/; expires="+duedate;
    }


    //팝업 생성 함수 정의
    function createPop(opt){  
        var def_opt = {
            name: "#popup",
            data_url: "error.html",
            isMask: false,
            isCk: false,
            custom_css: undefined
        }
        // var opt = Object.assign({}, def_opt, opt); //이 경우 에크마6 코드로 익스에서 동작을 안한다
        var opt = $.extend({}, def_opt, opt);


        //opt.isMask값에 따라 배경 막 생성 유무 결정
        if(opt.isMask){
            $("body").append(
                $("<div class='mask'>").css({
                    width: '100%', height: '100%',  backgroundColor: 'rgba(0,0,0,0.5)',
                    position: "fixed", top: 0, left: 0,  zIndex: 11, display: "none"
                }).fadeIn()
            )            
        }

        //opt.custo_css 값에 따라 레이어팝업의 커스텀 css구문 등록
        var result_css;

        var def_css = {
                position:'absolute', top: '13%', left:'10%', 
                zIndex: 12, display:"none"
        }    

        if(opt.custom_css == undefined){
            result_css = def_css;
        }else{
            result_css = Object.assign({}, def_css, opt.custom_css);
        }        

        //opt.name값에 따라 레이어팝업 클래스명 지정
        var id_name = opt.name.split("#")[1];      

        //동적으로 팝업 생성
        $("body").append(  
            $("<aside>").attr("id", id_name)
                .css(result_css)
                .append(
                    $("<div class='inner'>"),
                    $("<div class='wrap'>")
                        .append(
                            $("<input type='checkbox'>"),
                            $("<label>").text("오늘 하루 그만보기.")
                        ),
                    $("<a href='#'>").addClass("close").text("CLOSE X")
                ).fadeIn()
        );
        
        //opt.isCk값에 따라 체크박스 생성 유무 결정
        if(!opt.isCk) $(opt.name).find(".wrap").hide();      

        
        //opt.data_url값에 따라 팝업에 들어갈 데이터 결정
        $.ajax({
            url: opt.data_url
        })
        .success(function(data){         
            $(opt.name).find(".inner").html(data);
        })
        .error(function(err){
            console.error(err);
        })
    }


    //팝업 제거 함수 정의
    function removePop(el){
        // el == this
        //체크유무와, 해당 팝업의 클래스 이름 변수에 할당
        var isChecked = $(el).prev().find("input[type=checkbox]").is(":checked");
        var id_name = $(el).parent().attr("id");    

        //체크시 하루동안 클래스 이름으로 쿠키생성
        if(isChecked) setCookie(id_name, "done", 1);

        //해당 팝업은 fadeOut 이후 제거
        $(el).parent().fadeOut(500, function(){
            $(this).remove();
        });
        
        //마스크 fadeOut 이후 제거
        $(".mask").fadeOut(500,function(){
            $(this).remove();
        })
    }
 
});