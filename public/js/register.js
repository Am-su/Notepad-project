import { app, firebaseConfig } from "../js/firebase.js";
import { getDatabase, ref, set, push, child, get, update, remove } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

firebase.initializeApp(firebaseConfig);

const Auth = firebase.auth();
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

        
        logUser(user);
    
    }, function(error) {
        //에러가 발생했을 때 
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
    }
  });
});

function logUser(info){

  const db = getDatabase();
  set(ref(db,'users/'+info.uid),{
    email:email
  })
  console.log(info.uid);
  alert("회원가입 완료");
  window.location.href = "../html/login.html"
}