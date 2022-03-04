import { app, firebaseConfig } from "../js/firebase.js";
import { getFirestore, collection, setDoc, doc, getDoc, addDoc, getDocs, updateDoc,
         increment, runTransaction, query, where, deleteDoc}
          from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const Auth = firebase.auth();
const db = getFirestore();

$(document).ready(function(){
  updateHome();
  $("#login").on("click",function(){
    login();
  })
  $("#btnAdd").on("click",function(){
    window.location.href = "../html/memo.html"
  })
  $("#save").on("click",function(){
    save();
    setTimeout(() => {
      window.location.href = "../html/home.html"        
    }, 3000);
  })
   $("#memoList").on("click","#delete",function(e){
    let title = $(this).prev().text();
    remove(title);
    setTimeout(() => {
      window.location.href = "../html/home.html"        
    }, 3000);
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
    sessionStorage.setItem('uid',firebaseUser.uid);
    loginSuccess(firebaseUser);
  }).catch(error => {
    errorMessage(error.code);
  })
}

async function save(){
  const uid = sessionStorage.getItem("uid");
  const ref = doc(db,"user/"+uid);
  var memoNum;

  await updateDoc(ref,{
    memoNum:increment(1)
  })

  const docSnap = await getDoc(ref);
  memoNum = parseInt(docSnap.data().memoNum);
  saveMemo(memoNum);
  
}

function saveMemo(num){
  const uid = sessionStorage.getItem("uid");
  const title = $("#title").val();
  const content = $("#content").val();
  //const src = "user/"+uid+"/memo"+num;

  setDoc(doc(db,"user/"+uid+"/memo/"+num),{
    title:title,
    content:content,
    num:num
  })
  alert("저장이 완료되었습니다.");
}

async function updateHome(){
  const uid = sessionStorage.getItem("uid");
  const ref = doc(db,"user/"+uid);
  const docSnap = await getDoc(ref);
  const memoNum = parseInt(docSnap.data().memoNum);
  
  if(memoNum > 0){
    for(var i=1;i<=memoNum;i++){
      //const src = "user/"+uid+"/memo"+i;
      const docRef = doc(db,"user/"+uid+"/memo/"+i);
      const docSnap = await getDoc(docRef);
      const title = docSnap.data().title;
      const content = docSnap.data().content;
  
      const li = document.createElement("li");
      li.setAttribute("class","memo");
      li.setAttribute("id","memo"+i);
  
      const childContent = document.createElement("div");
      childContent.setAttribute("class","content");
      childContent.append(content);
      
      const icon = document.createElement("i");
      icon.setAttribute("class","fa fa-trash");
      icon.setAttribute("id","delete");
      const head = document.createElement("p");
      head.append(title);
      
      const childTitle = document.createElement("div");
      childTitle.setAttribute("class","memoTitle");
      childTitle.append(head);
      childTitle.append(icon);
  
      li.appendChild(childTitle);
      li.appendChild(childContent);
      
  
      document.getElementById("memoList").appendChild(li);
  
    }
  }
}

async function remove(title){
  const uid = sessionStorage.getItem("uid");
  const memoRef = collection(db,"user/"+uid+"/memo");
  const q = query(memoRef, where("title","==",title));
  var num;
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    num = doc.data().num;
  });
  await deleteDoc(doc(db,"user/"+uid+"/memo/"+num));
  decNum(num);
}

async function decNum(num){
  const uid = sessionStorage.getItem("uid");
  const ref = doc(db,"user/"+uid);
  var reNum = num-1;

  await updateDoc(ref,{
    memoNum:reNum
  })
  alert("삭제되었습니다.")
}

export{ errorMessage };