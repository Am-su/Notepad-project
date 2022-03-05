window.onload = function(){
  var date = sessionStorage.getItem("date");
  var title = sessionStorage.getItem("title");
  var content = sessionStorage.getItem("content");

  $("#header > #memoTitle").html(title);
  $("#panel > #registerDate").html("작성일 : "+ date);
  $("#panel > #content").html(content);
}