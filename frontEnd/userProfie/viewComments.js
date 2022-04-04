var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var comments = this.nextElementSibling;
    if (comments.style.maxHeight){
      comments.style.maxHeight = null;
    } else {
      comments.style.maxHeight = comments.scrollHeight + "px";
    }
  });
}