DecorAddButton.onclick = function(){

    // сворачивает и разворачивает список с картинками для декора

    if (fireplaceDecor.style.display == "none") {
        fireplaceDecor.style.display = "block";
    }
    else {
        fireplaceDecor.style.display = "none";
    }
}

fireplaceDecor.onmousedown = function(event) {

    let shiftX = event.clientX - fireplaceDecor.getBoundingClientRect().left;
    let shiftY = event.clientY - fireplaceDecor.getBoundingClientRect().top;
  
    fireplaceDecor.style.position = 'absolute';
    fireplaceDecor.style.zIndex = 1000;
    document.body.append(fireplaceDecor);
  
    moveAt(event.pageX, event.pageY);
  
    // переносит мяч на координаты (pageX, pageY),
    // дополнительно учитывая изначальный сдвиг относительно указателя мыши
    function moveAt(pageX, pageY) {
      fireplaceDecor.style.left = pageX - shiftX + 'px';
      fireplaceDecor.style.top = pageY - shiftY + 'px';
    }
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
  
    // передвигаем мяч при событии mousemove
    document.addEventListener('mousemove', onMouseMove);
  
    // отпустить мяч, удалить ненужные обработчики
    fireplaceDecor.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      fireplaceDecor.onmouseup = null;
    };
  
  };
  
  fireplaceDecor.ondragstart = function() {
    return false;
  };