var xhr = new XMLHttpRequest();
xhr.prevText = "";
xhr.onreadystatechange = function() {
  console.log("state", xhr.readyState);
  if (xhr.readyState == 4) {
    console.log("done")
  } else if (xhr.readyState > 2) {
    var res = xhr.responseText.substring(xhr.prevText.length);
    var result = JSON.parse(res);

    //update the progressbar
    var node = document.createElement('h3')
    node.setAttribute("class", "progress")
    node.innerHTML = "status: " + result.status + ", progress: " + result.progress
    document.getElementById('stream').appendChild(node);

    xhr.prevText = xhr.responseText;
  }
};

xhr.open("POST", "/echo", true);
xhr.send();
