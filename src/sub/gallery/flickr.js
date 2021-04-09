$(document).ready(function(){

    /*-------------------전역변수------------------------- */
    var url = 'https://www.flickr.com/services/rest/?method=flickr.interestingness.getList';
    var url_search = 'https://www.flickr.com/services/rest/?method=flickr.photos.search';
    var key = '15e154c15e2c96d8a7341f607f8f6b2c';

    var target = document.querySelector(".list");


    /* -------------------이벤트 연결---------------------- */
    //브라우저 로딩시 Flickr 데이터 호출
    getFlickr(url, key, 40);

    //리스트의 썸네일 클릭시
    $("body").on("click", "#gallery ul li .flickr",function(e){
        e.preventDefault();

        $(".pop").remove();
        var imgSrc = $(this).attr("href");
        createPop(imgSrc);
    });

    //레이어팝업 닫기버튼 클릭시
    $("body").on("click",".pop span",function(){
        $(this).parent().fadeOut(5,function(){
            $(this).remove();
        })
    });  

    //검색버튼 클릭시
    $("#search button").on("click",function(){
        $(".list").removeClass("on");
        var tags = $(this).prev().val();
        getFlickr(url_search, key, 40, tags);
    });

    $("body").on("click","#gallery ul li .icon .heart", function(e){
        e.preventDefault();

        $(this).toggleClass("on");

        /*
        var like = $(this).hasClass("on");

        if(!like) {
            $(this).addClass("on");
        }else{
            $(this).removeClass("on");
        }
        */
    });


    /* ----------------------함수 정의부------------------------------ */

    //데이터 호출 함수 정의
    function getFlickr(url, key, num, tags){
        $.ajax({
            url : url,
            dataType : "json",
            data : {
                api_key : key,
                per_page : num,
                format : "json",
                nojsoncallback : 1,
                tags : tags,
                tagmode : "any",
                privacy_filter : 5
            }
        })
        .success(function(data){
            console.log(data.photos.photo);
            var item = data.photos.photo;
            $("#gallery ul").empty();
    
            $(item).each(function(index, data){
                var text = this.title;
                if(!text) text = "Image"; //텍스트가 없을때 대체 텍스트

                $("#gallery ul.list")
                    .append(
                        $("<li>")
                            .append(
                                $("<div class='box'>")
                                    .append(
                                        $("<a class='flickr'>")
                                        .attr({
                                            href : "https://live.staticflickr.com/"+this.server+"/"+this.id+"_"+this.secret+"_b.jpg"
                                        })
                                        .append(
                                            $("<img class='mainImg'>")
                                                .attr({
                                                    src : "https://live.staticflickr.com/"+this.server+"/"+this.id+"_"+this.secret+"_m.jpg",
                                                    onerror : "javascript:this.parentNode.parentNode.style='display:none;'"
                                                    //onerror : "javascript:this.src = 'img/defualt.png'"
                                                }),
                                            $("<img class='buddy'>")
                                            .attr({src : "http://farm"+this.farm+".staticflickr.com/"+this.server+"/buddyicons/"+this.owner+".jpg"})
                                            .css({borderRadius : "50%"})
                                        ),
                                    $("<div class='inner'>")
                                                .append(
                                                    $("<p>").text(this.owner),
                                                    $("<h1>").text(text),
                                                    $("<div class='icon'>")
                                                        .append(
                                                            $("<a class='heart'>").attr({href : "#"})
                                                                .append(
                                                                    $("<i class='fas fa-heart'>")
                                                                ),
                                                            $("<a class='comment'>").attr({href : "#"})
                                                                .append(
                                                                    $("<i class='fas fa-comment'>")
                                                                )
                                                        )
                                                )
                                    )
                                
                            )                   
                    )
            });

            setTimeout(function(){    
                iso = new Isotope( target, {     
                    itemSelector: '.list>li'  ,
                    columnWidth :  '.list>li',
                    transitionDuration: '0.8s',
                    percentPosition : true               
                });                
        
                $(".list").addClass("on");
            },1500);
        })
        .error(function(err){
            console.error(err);
        })
    }   

    //팝업 생성 함수 정의
    function createPop(imgSrc){
        $("body").append(
            $("<aside class='pop'>")
                .append(
                    $("<img>").attr("src",imgSrc),
                    $("<span>").text("close ●")
                )
        );
        $(".pop").fadeIn();
    }
});