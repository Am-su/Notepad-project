import { app, firebaseConfig } from "../js/firebase.js";
import { getFirestore, collection, setDoc, doc} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const Auth = firebase.auth();
const db = getFirestore();
var uid;

$(document).ready(function(){
  $("#login").on("click",function(){
    login();
  })
  $("#btnAdd").on("click",function(){
    window.location.href = "../html/memo.html"
  })
  $("#save").on("click",function(){
    alert("미구현");
  })
})

function loginSuccess(firebaseUser){
  alert("로그인 성공");
  window.location.href = "../html/home.html";
}

function errorMessage(errorCode){
  switch(errorCode){
    case 'auth/email-already-in-use':
      alert("이미 존재하는 이메일입니다.");
      break;
    case 'auth/wrong-password':
      alert("비밀번호가 올바르지 않습니다.");
      break;
    case 'auth/user-not-found':
      alert("존재하지않는 이메일입니다.");
      break;
    case  'auth/invalid-email':
      alert("올바르지않은 이메일 형식입니다.");
      break;
    case 'auth/weak-password':
      alert("비밀번호를 6글자 이상이여야 합니다.")
  }
}

function login(){
  var email = $("#email").val();
  var pwd = $("#password").val();

  Auth.signInWithEmailAndPassword(email,pwd).then(function(firebaseUser){
    uid = firebaseUser.uid;
    loginSuccess(firebaseUser);
  }).catch(error => {
    errorMessage(error.code);
  })
}