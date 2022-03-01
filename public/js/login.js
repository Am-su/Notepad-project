import { app, firebaseConfig } from "../js/firebase.js";

firebase.initializeApp(firebaseConfig);

var Auth = firebase.auth();
// var Fdatabase = firebase.database;
var userInfo;

$(document).ready(function(){
  $(".yet").on('click',function(){
    alert("미구현");
  })

  $("#login").on("click",function(){
    var email = $("#email").val();
    var pwd = $("#password").val();

    Auth.signInWithEmailAndPassword(email,pwd).then(function(firebaseUser){
      loginSuccess(firebaseUser);
    }).catch(function(error){
      alert(error);
      alert("로그인 실패");
    })
  })
})

function loginSuccess(firebaseUser){
  alert("로그인 성공");
  // Fdatabase.ref("users/"+firebaseUser.uid).once('value').then(function(snapshot){
  //   alert(snapshot.val().name)
  // });
  window.location.href = "../html/home.html";
}