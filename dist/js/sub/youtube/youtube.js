$(document).ready(function () {

    //브라우저 로딩시 youtube데이터 호출 및 DOM생성
    callData({
        target: "#vidGallery",
        count: 6,
        key: "AIzaSyCJIUhDFnFhhSTlazsJkUi-xeEWZmlZVTc",
        playList: "PLY9SjIdEos6_OZLJSxsB-IFi_xRxMBz-z"
    });

    //리스트 썸네일 클릭시 팝업호출및 유튜브 영상호출
    $("body").on("click", "article a", function (e) {
        e.preventDefault();

        $(".pop").remove();
        var vidId = $(this).attr("href");

        createPop({
            width: 800,
            bg: "rgba(78, 74, 70, 0.8)",
            vidId: vidId
        });

        $("body").css({overflow:"hidden"});
    });


    //팝업 닫기버튼 클릭시 레이어 팝업 제거
    $("body").on("click", ".pop .close", function (e) {
        e.preventDefault();

        $(this).parent(".pop").remove();
        $("body").css({overflow:"auto"});
    })

//------------------함수 선언-----------------------
    
    //데이터를 호출해서 json데이타로부터 리스트 생성함수
    function callData(opt) {
        $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/playlistItems',
            dataType: "jsonp",
            data: {
                part: 'snippet',
                key: opt.key,
                maxResults: opt.count,
                playlistId: opt.playList
            }
        })
            .success(function (data) {
                console.log(data.items);
                var item = data.items;

                $(item).each(function (index, data) {
                    var p_txt = data.snippet.description;
                    var len = p_txt.length;
                    var t_txt = data.snippet.title;
                    var len2 = t_txt.length;

                    var date = data.snippet.publishedAt.split("T")[0];

                    (len > 130) ? p_txt = p_txt.substr(0, 130) + "..." : p_txt;
                    (len2 > 20) ? t_txt = t_txt.substr(0, 20) + " ..." : t_txt;

                    $(opt.target)
                        .append(
                            $("<article>")
                                .append(
                                    $("<a class='pic'>")
                                        .attr({
                                            href: data.snippet.resourceId.videoId
                                        })
                                        .css({ backgroundImage: "url(" + data.snippet.thumbnails.high.url + ")"})
                                        .append(
                                            $("<span>").text(date),
                                            $("<a class='play'>")
                                                .append(
                                                    $("<i class='far fa-play-circle'>")
                                                ),
                                            $("<div class='con'>")
                                                .append(
                                                    $("<h2>").text(t_txt)
                                                )
                                        ),
                                    $("<p>")
                                        .text(p_txt)
                                            
                                )
                        )
                })
            })
            .error(function (err) {
                console.error(err);
            })
    }

    //외부에서 영상id값을 동적으로 유튜브 팝업 생성함수
    function createPop(opt) {
        $("body")
            .append(
                $("<aside class='pop'>")
                    .css({
                        width: opt.width,
                        backgroundColor: opt.bg,
                        position: "fixed", top: "50%", left: "50%",
                        transform: "translate(-50%, -50%)", boxSizing: "border-box",
                        padding: 50, zIndex : 5
                    })
                    .append(
                        $("<a href='#' class='close'>")
                            .text("close")
                            .css({
                                position: "absolute", top: 20, right: 20, color: "#fff"
                            }),
                        $("<img src='img/loading.gif'>")
                        .css({
                            width:"100%", height:"100%", position:"absolute", top:"50%", left:"50%", padding:50, boxSizing: "border-box",
                            transform:"translate(-50%,-50%)"
                        }),
                        $("<iframe>")
                        .attr({
                            src: "https://www.youtube.com/embed/" + opt.vidId,
                            width: "100%", height: 600, frameborder: 0,
                            allowfullscreen: true
                        })
                    )
            )//append end

            $(".pop").fadeIn();

        setTimeout(function(){
            $(".pop").find("img").fadeOut();
        },1000);
    }


});