DecorAddButton.onclick = function(){

    // сворачивает и разворачивает список с картинками для декора

    if (decorations.style.display == "none") {
      decorations.style.display = "block";
      for(var i; i < decorations.children.length; i++){
        decorations.children[i].style.display = "flex";
      }
    }
    else {
      decorations.style.display = "none";
      for(var i; i < decorations.children.length; i++){
        decorations.children[i].style.display = "none";
      }
    }
}


function modifiedDragDrop(elem) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  twin = elem.cloneNode();
  twin.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    twin.style.top = (twin.offsetTop - pos2) + "px";
    twin.style.left = (twin.offsetLeft - pos1) + "px";

    connection.send({
      id: twin.id,
      top: twin.style.top,
      left: twin.style.left
      });
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}