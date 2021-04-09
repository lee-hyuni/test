window.onload = function () {
    //표시할 지역의 경도, 위도, 줌레벨 설정하여 인스턴스 생성
    var mapContainer = document.querySelector('.kakaoMap');


    var mapOption = {
        center: new kakao.maps.LatLng(37.52376044960273, 127.04657658553575),
        level: 4
    };

    //좌표값과 마커이미지 갯수만큼 반복을 돌며 마커생성하고 버튼 이벤트 연결
    var markerOptions = [
        {
            title: '본점',
            latlng: new kakao.maps.LatLng(37.52376044960273, 127.04657658553575),
            imgSrc: 'img/marker1.png',
            imgSize: new kakao.maps.Size(170, 69),
            imgPos: { offset: new kakao.maps.Point(85, 69) },
            button: document.querySelectorAll(".tapList li")[0]
        },
        {
            title: '가맹점',
            latlng: new kakao.maps.LatLng(37.507052556409135, 126.75637375028074),
            imgSrc: 'img/marker2.png',
            imgSize: new kakao.maps.Size(170, 69),
            imgPos: { offset: new kakao.maps.Point(85, 69) },
            button: document.querySelectorAll(".tapList li")[1]
        },

    ];


    //초기 화면 맵 생성
    var map = new kakao.maps.Map(mapContainer, mapOption);


    //스카이뷰 컨트롤 표시
    var mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, daum.maps.ControlPosition.BOTTOMLEFT);


    //줌 컨트롤 표시
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, daum.maps.ControlPosition.TOPLEFT);


    //버튼클릭시 교통정보 표시  
    var t_on = document.querySelector('.trf_on');
    var t_off = document.querySelector('.trf_off');

    t_on.onclick = function () {
        t_off.classList.remove("on");
        t_on.classList.add("on");
        map.removeOverlayMapTypeId(daum.maps.MapTypeId.TRAFFIC);
        map.addOverlayMapTypeId(daum.maps.MapTypeId.TRAFFIC);
        return false;
    }

    t_off.onclick = function () {
        t_on.classList.remove("on");
        t_off.classList.add("on");
        map.removeOverlayMapTypeId(daum.maps.MapTypeId.TRAFFIC);
        return false;
    }

    var drag = true; //드래그 가능
    var zoom = false; //휠로 zoom가능

    //마커옵션의 갯수만큼 반복을 돌며 지점 보기 버튼 이벤트 연결

    for (var i = 0; i < markerOptions.length; i++) {
        new kakao.maps.Marker({
            map: map,
            position: markerOptions[i].latlng,
            title: markerOptions[i].title,
            image: new kakao.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imgSize, markerOptions[i].imgPos)
        });

        (function (index) {
            markerOptions[index].button.onclick = function (e) {
                e.preventDefault();
                for (var k = 0; k < markerOptions.length; k++) {
                    markerOptions[k].button.classList.remove("on");
                }
                markerOptions[index].button.classList.add("on");

                moveTo(markerOptions[index].latlng);
            }
        })(i);

        // resize시 맵 포커스 맞추는 함수
        window.onresize = function () {
            var active_btn = document.querySelector(".tapList li.on");
            var active_index = parseInt(active_btn.getAttribute("data-index")) - 1;
            map.setCenter(markerOptions[active_index].latlng);
        }

    }

    //지점으로 맵 이동 함수 정의
    function moveTo(target) {
        var moveLatLan = target;
        map.setCenter(moveLatLan);
        return false;
    }

    //드래그기능 활성화 
    setDraggable(drag);
    function setDraggable(draggable) {
        map.setDraggable(draggable);
    }

    //줌기능 활성화
    setZoomable(zoom);
    function setZoomable(zoomable) {
        map.setZoomable(zoomable);
    }

}