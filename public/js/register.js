import { app } from "../js/firebase.js";
import { getDatabase, ref, set, push, child, get, update, remove } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";


var Auth = firebase.auth();
var Fdatabase = firebase.getDatabase;
var userInfo;

$(document).ready(function(){
  $("#register").on('click',function(){
    var email = $("#email").val();
    var pwd1 = $("#pwd1").val();
    var pwd2 = $("#pwd2").val();

    if(pwd1 != pwd2){
      alert("비밀번호가 다릅니다.");
    }
    else{
      Auth.createUserWithEmailAndPassword(email, pwd2).then(function(user) {
    
        userInfo = user;
        //logUser();
        alert("회원가입 완료");
        window.location.href = "../html/login.html"
    
    }, function(error) {
        //에러가 발생했을 때 
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
    });
    }
    });
});

function logUser(){
  var ref = Fdatabase.ref("users/"+userInfo.uid); //저장될 곳을 users라는 부모 키를 레퍼런스로 지정.
  
  //저장 형식
  var obj = {
      email: email
  };

  ref.set(obj); // 고유한 자식 키가 하나 생셩이 되면서 json 삽입
  alert("가입성공");

  //메인 페이지로 이동시키고 세션 저장시키기
  window.location.href = "../html/login.html"
}