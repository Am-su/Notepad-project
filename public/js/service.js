import { app, firebaseConfig } from "../js/firebase.js";
import { getFirestore, collection, setDoc, doc, getDoc, addDoc, getDocs, updateDoc,
        increment, runTransaction, query, where, deleteDoc}
          from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const Auth = firebase.auth();
const db = getFirestore();
var lastIndex;

$(document).ready(function(){
  $("#login").on("click",function(){
    login();
  })
  $("#btnAdd").on("click",function(){
    window.location.href = "../html/newMemo.html"
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
    ProgressEvent();
  })
  $("#logout").on("click",function(){
    logout();
  })
  $("#close").on("click",function(){
    window.location.href = "../html/home.html"
  })
  $("#memoList").on("click",".memo",function(){
    let title = $(this).children().children("p").html();
    openMemo(title);
    setTimeout(() => {
      window.location.href = "../html/memo.html";
    }, 1000);
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
  var lastIndex;

  await updateDoc(ref,{
    memoNum:increment(1),
    lastIndex:increment(1)
  })

  const docSnap = await getDoc(ref);
  lastIndex = parseInt(docSnap.data().lastIndex);
  saveMemo(lastIndex);
  
}

function saveMemo(num){
  const uid = sessionStorage.getItem("uid");
  const title = $("#title").val();
  const content = $("#content").val();
  const registerDate = new Date().toISOString('ko').slice(0,10);
  

  setDoc(doc(db,"user/"+uid+"/memo/"+num),{
    title:title,
    content:content,
    num:num,
    registerDate:registerDate
  })
  alert("저장이 완료되었습니다.");
}

async function updateHome(){
  const uid = sessionStorage.getItem("uid");
  const ref = doc(db,"user/"+uid);
  const docSnap = await getDoc(ref);
  const memoNum = parseInt(docSnap.data().memoNum);

  if(memoNum>0){
    const querySnapshot = await getDocs(collection(db,"user/"+uid+"/memo"));
    querySnapshot.forEach((doc)=>{
      const title = doc.data().title;
      const content = doc.data().content;
      lastIndex = doc.data().num;
      const registerDate = doc.data().registerDate;

      const li = document.createElement("li");
      li.setAttribute("class","memo");
      li.setAttribute("id","memo"+doc.id);
  
      const childContent = document.createElement("div");
      childContent.setAttribute("class","content");
      var head = document.createElement("p");
      head.append(content);
      const date = document.createElement("span");
      date.setAttribute("id","registerDate");
      date.append(registerDate);

      childContent.append(head);
      childContent.append(date);

      const icon = document.createElement("i");
      icon.setAttribute("class","fa fa-trash");
      icon.setAttribute("id","delete");
      head = document.createElement("p");
      head.append(title);
      
      const childTitle = document.createElement("div");
      childTitle.setAttribute("class","memoTitle");
      childTitle.append(head);
      childTitle.append(icon);
  
      li.appendChild(childTitle);
      li.appendChild(childContent);
      
  
      document.getElementById("memoList").appendChild(li);
      
    })
    await updateDoc(ref,{
      lastIndex:lastIndex
    })
  }
}

async function remove(title){
  const uid = sessionStorage.getItem("uid");
  const memoRef = collection(db,"user/"+uid+"/memo");
  const q = query(memoRef, where("title","==",title));
  var num;
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    num = doc.data().num;
  });
  await deleteDoc(doc(db,"user/"+uid+"/memo/"+num));
  decNum();
}

async function decNum(){
  const uid = sessionStorage.getItem("uid");
  const ref = doc(db,"user/"+uid);
  const refSnapshot = await getDoc(ref);
  var reNum = refSnapshot.data().memoNum - 1;
  var lastIndex = refSnapshot.data().lastIndex - 1;
  
  await updateDoc(ref,{
    memoNum:reNum,
    lastIndex:lastIndex
  })
  alert("삭제되었습니다.")
}

function logout(){
  Auth.signOut().then(function(){
    alert("로그아웃 되었습니다.");
    window.location.href = "../html/login.html";
  }).catch(function(){
    if(error){
      alert("로그아웃 실패");
    }
  })
}

async function openMemo(title){
  const uid = sessionStorage.getItem("uid");
  const memoRef = collection(db,"user/"+uid+"/memo");
  const q = query(memoRef, where("title","==",title));
  var num;
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    num = doc.data().num;
  });

  var memo = doc(db,"user/"+uid+"/memo/"+num);
  var memoSnapshot = await getDoc(memo);
  var title = memoSnapshot.data().title;
  var content = memoSnapshot.data().content;
  var registerDate = memoSnapshot.data().registerDate;

  sessionStorage.setItem("date",registerDate);
  sessionStorage.setItem("title",title);
  sessionStorage.setItem("content",content);
}
export{ errorMessage };