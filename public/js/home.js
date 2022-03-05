import { app, firebaseConfig } from "../js/firebase.js";
import { getFirestore, collection, setDoc, doc, getDoc, addDoc, getDocs, updateDoc,
        increment, runTransaction, query, where, deleteDoc}
          from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const Auth = firebase.auth();
const db = getFirestore();
var lastIndex;

$(document).ready(function(){
  updateHome();
})

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