$(document).ready(function(){

    $("input[type=submit]").on("click",function(e){
        if(!isAgree("agree")) e.preventDefault();
        if(!isCheck1("category")) e.preventDefault();
        if(!isId("id", 4)) e.preventDefault();     
        if(!isPwd("pwd1","pwd2",10,16)) e.preventDefault();  
        if(!isTxt("name")) e.preventDefault();  
        if(!isTxt("address")) e.preventDefault();
        if(!isTxt("contact") || !isCheck2("contact")) e.preventDefault();  
        if(!isBirth("birth1","birth2","birth3")) e.preventDefault(); 
        if(!isTxt("email") || !isSelect("email2")) e.preventDefault();

    });
    
    
    //정보동의 인증함수
    function isAgree(name){
        var isCheck = $("input[name='"+name+"']").is(":checked");
        var errorMsg = $(".agreeBox .agreement");

        if(isCheck){
            errorMsg.removeClass("error");
            return true;
        }else {
            errorMsg.addClass("error");
            alert("가입 필수사항을 확인해 주세요.");
            return false;
        }        
    }

    //회원유형 선택함수
    function isCheck1(name){
        var isCheck = $("input[name='"+name+"']").is(":checked");
        var errorMsg = $(".category td div");

        if(isCheck){
            errorMsg.removeClass("error");
            return true;
        }else {
            errorMsg.addClass("error");
            return false;
        }        
    }

    //아이디 인증함수
    function isId(name, len){        
        if(len == undefined) len=4;  

        var txt = $("[name='"+name+"']").val();     

        if(txt ==""){
            $("[name='"+name+"']").addClass("error");
            return false;                                   
        }else{ 
            if(txt.length < len ){
                $("[name='"+name+"']").addClass("error");
                return false;  
            }else{
                $("[name='"+name+"']").removeClass("error");       
                return true; 
            }                     
        }
    }
 
    //비밀번호 인증함수
    function isPwd(name1, name2, lenMin, lenMax){
        //if(len==undefined) len=5;
        var pwd1 = $("input[name='"+name1+"']").val(); 
        var pwd2 = $("input[name='"+name2+"']").val();
        var errorMsg = $("table p");

        var num = /[0-9]/;
        var eng = /[a-zA-Z]/;
        var spc = /[~!@#$%^&*()_+|{}<>?;:=-\]\[]/;           

        var i=0;  

        if(pwd1 === pwd2){           
            (!pwd1.length < lenMin || !pwd1.length > lenMax ) ? i++ : errorMsg.addClass("error");
            // (spc.test(pwd1)) ? i++ : errorMsg.addClass("error");
            // (num.test(pwd1)) ? i++ : errorMsg.addClass("error");
            // (eng.test(pwd1)) ? i++ : errorMsg.addClass("error");
            if(spc.test(pwd1)) {i++};
            if(num.test(pwd1)) {i++};
            if(eng.test(pwd1)) {i++};

            if(i!=4){               
                errorMsg.addClass("error");
                $("input[name='"+name1+"']").addClass("error");
                $("input[name='"+name2+"']").addClass("error");       
            }else{
                errorMsg.removeClass("error");
                $("input[name='"+name1+"']").removeClass("error");
                $("input[name='"+name2+"']").removeClass("error");

                return true;
            }
        }else{
            alert("두개의 비밀번호를 동일하게 입력해주세요")
            $("input[name='"+name1+"']").addClass("error");
            $("input[name='"+name2+"']").addClass("error"); 

            return false;
        } 
    }

    //이름, 주소,연락처,이메일 텍스트 인증함수
    function isTxt(name){        
        var txt = $("[name='"+name+"']").val();     

        if(txt ==""){
            $("[name='"+name+"']").addClass("error");
            return false;                                   
        }else{ 
            $("[name='"+name+"']").removeClass("error");       
            return true;                    
        }
    }

    //생년월일 선택함수
    function isBirth(name1, name2, name3){
        var sel1 = $("select[name='"+name1+"']").children("option:selected").val();
        var sel2 = $("select[name='"+name2+"']").children("option:selected").val();
        var sel3 = $("select[name='"+name3+"']").children("option:selected").val();

        var i=0;

        (sel1 == "") ? $("select[name='"+name1+"']").addClass("error") : i++;
        (sel2 == "") ? $("select[name='"+name2+"']").addClass("error") : i++ ;
        (sel3 == "") ? $("select[name='"+name3+"']").addClass("error") : i++ ;

        if(i!=3){       
            return false;
        }else{
            $("select[name='"+name1+"']").removeClass("error");
            $("select[name='"+name2+"']").removeClass("error");
            $("select[name='"+name3+"']").removeClass("error");
            return true;
        };
    };

    //이메일 선택박스 인증함수
    function isSelect(name){
        var sel = $("select[name='"+name+"']").children("option:selected").val();
        
        if(sel == ""){
            $("select[name='"+name+"']").addClass("error");       
        }else{
            $("select[name='"+name+"']").removeClass("error");
            return true;
        }
    }

    //연락처 유형 선택함수 
    function isCheck2(name){
        var isCheck = $("input[name='"+name+"']").is(":checked");
        var errorMsg = $(".contact div");

        if(isCheck){
            errorMsg.removeClass("error");
            return true;
        }else {
            errorMsg.addClass("error");
            return false;
        }        
    };

});