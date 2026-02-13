var current_thumb = null

function cardOpen(element) {
  current_thumb=element
  var detail_template = document.getElementById("detail-view");
  var detail_content = document.getElementById("detail-content");
  var titleText = detail_template.querySelector("#detail-title");
  var captionText = detail_template.querySelector("#detail-caption");
  var detail_video = detail_template.querySelector("video");
  var detail_image = detail_template.querySelector("img");
  if (detail_video != null) {
    detail_video.remove()
  }
  if (detail_image != null) {
    detail_image.remove()
  }

  // Handle either video or image content
  try{
    var thumb_video = element.querySelector("video");
    detail_content.prepend(thumb_video.cloneNode(true));
    thumb_video.pause();
    var detail_video = detail_content.querySelector("video");
    detail_video.currentTime = thumb_video.currentTime.toString()
    detail_video.play()
    detail_video.muted=thumb_video.muted
    thumb_video.muted = "true";
  }
  catch{
    var this_image = element.querySelector("img");
    detail_content.prepend(this_image.cloneNode(true));
  }
  
  var new_title = element.querySelector("#title").innerHTML;

  try{
    var new_caption = element.querySelector("#detail-caption").innerHTML;
  }
  catch{
    try{
      var new_caption = element.querySelector("#caption").innerHTML;
    }
    catch{
      var new_caption = ""
    }
  }
  titleText.innerHTML = new_title;
  captionText.innerHTML = new_caption;

  document.getElementById("detail-view").style.display = "block";
  
}

function cardClose(element) {
    var detail_video = element.querySelector("video");
    var detail_image = element.querySelector("img");
    if (detail_video != null) {
        var thumb_video = current_thumb.querySelector("video")
        thumb_video.currentTime = detail_video.currentTime.toString();
        // if (!detail_video.paused) {
        //   thumb_video.play()
        // }
        // detail_video.pause();
        thumb_video.muted=detail_video.muted
        detail_video.remove();
    }
    else {detail_image.remove();}
    element.style.display="none";
    current_thumb=null;
}