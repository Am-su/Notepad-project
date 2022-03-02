import { app, firebaseConfig } from "../js/firebase.js";
import { getFirestore, collection, setDoc, doc} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { errorMessage } from "../js/login.js";



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
      logUser(user,email);
      setTimeout(() => {
        window.location.href = "../html/login.html"        
      }, 3000);
    }, function(error) {
        //에러가 발생했을 때 
        console.log(error.code);
        errorMessage(error.code);
      });
    }
  });
});

function logUser(user,email){

  const db = getFirestore();
  setDoc(doc(db,"user",user.uid),{
    email:email,
    memoNum:0
  })
  alert("회원가입 완료");
}
