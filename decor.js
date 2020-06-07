function modifiedDragDrop(elem) {
  console.log(elem);
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  var twin;

  elem.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;

    twin = elem.firstElementChild.cloneNode();
    twin.className = 'placed-decor';
    twin.style.width = twin.dataset.width
    document.body.append(twin);
  }

  function elementDrag(e) {
    console.log('drag')
    e = e || window.event;
    e.preventDefault();
    twin.style.top = e.pageY - twin.offsetHeight / 2 + "px";
    twin.style.left = e.pageX - twin.offsetWidth / 2 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;

    setInterval(() => {
      connection.send({
        decor: true,
        src: twin.src,
        width: twin.style.width,
        top: twin.style.top,
        left: twin.style.left
      });
    }, 2500);
  }
}