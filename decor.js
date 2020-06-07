function modifiedDragDrop(elem) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  var twin;
  var counter = 0;

  elem.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    counter++;
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
    e = e || window.event;
    e.preventDefault();
    twin.style.top = e.pageY - twin.offsetHeight / 2 + "px";
    twin.style.left = e.pageX - twin.offsetWidth / 2 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    var id = [connection.userid, counter].join('_');
    console.log(id);

    setInterval(() => {
      connection.send({
        id: id,
        decor: true,
        src: twin.src,
        width: twin.style.width,
        top: twin.style.top,
        left: twin.style.left
      });
    }, 2500);
  }
}