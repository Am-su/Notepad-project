const firebaseConfig = {
  apiKey: "AIzaSyAY_ZwqstnZjhd8CJ-UKxySp9Yo_e7S6_Q",
  authDomain: "memo-app-ba46d.firebaseapp.com",
  databaseURL: "https://memo-app-ba46d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "memo-app-ba46d",
  storageBucket: "memo-app-ba46d.appspot.com",
  messagingSenderId: "531565961205",
  appId: "1:531565961205:web:087a2489a973dc7ce3cabc"
};

firebase.initializeApp(firebaseConfig);
var Auth=firebase.auth();
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