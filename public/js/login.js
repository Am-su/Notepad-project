const firebaseConfig = {
  apiKey: "AIzaSyBdhDxGZdHCn8PZQyDKnZeTrIrI3tXFtLA",
  authDomain: "memo-app-8e2cf.firebaseapp.com",
  databaseURL: "https://memo-app-8e2cf-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "memo-app-8e2cf",
  storageBucket: "memo-app-8e2cf.appspot.com",
  messagingSenderId: "242022781053",
  appId: "1:242022781053:web:40694e7c1a39c373ba2114",
  measurementId: "G-L52XWCCL0K"
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