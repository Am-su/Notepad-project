import { app, firebaseConfig } from "../js/firebase.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { errorMessage } from "../js/service.js";

const Auth = firebase.auth();

$(document).ready(function(){
  $("#send").on('click',function(){
    const email = $("#email").val();
    
    if (email != null) {
      Auth.sendPasswordResetEmail(email).then(function() {
        alert("비밀번호 재설정 메일을 보냈습니다.");
      },function(error){
        errorMessage(error.code);
      })
    }
  })
})