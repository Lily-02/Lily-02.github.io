 /* 
Purpose: - Loop and Zoom feautures
Action:
- Add names of buttons in html that toggles the loop/zoom functionality.
- Retrieve references to all the elements we'll need to use in Javascript
- Use ''If-Else'' to invoke those functions (more details below).
- Add listeners to activate click functions.
- Change size and view box of favicons to fit with bar.
- I have created Loop and Zoomout icons by Figma and re-edit their size/viewbox as the same with avalable favicons in your files.
- Edit color buttons in css
- Add radical gradient background color in js.
*/

// the buttons for the controls.
let videoElement = document.getElementById("videoElement");
let playButton = document.getElementById("playButton");
let muteButton = document.getElementById("muteButton");
let stopButton = document.getElementById("stopButton");
// the progress element
let progressBar = document.getElementById("progressBar");
let loopButton = document.getElementById("loopButton");
let zoomButton = document.getElementById("zoomButton");
//Already added in class
videoElement.removeAttribute("controls");
document.getElementById("controlsWrapper").style.display = "flex";

videoElement.addEventListener('loadedmetadata', () => {
  progressBar.setAttribute('max', videoElement.duration);
});

//Already added in class
videoElement.addEventListener("playing", () => {
  
  if (!progressBar.getAttribute('max')){
    progressBar.setAttribute('max', videoElement.duration);
  }
});

videoElement.addEventListener("waiting", () => {
  progressBar.classList.add("timeline-loading");
});
videoElement.addEventListener("canplay", () => {
  progressBar.classList.remove("timeline-loading");
});

videoElement.addEventListener("ended", () => {
  playButton.style.backgroundImage = "url('./icons/play.svg')";
});

//Already added in class
function playPause(){
 
  if (videoElement.paused || videoElement.ended) {
    
    videoElement.play();
    
    playButton.style.backgroundImage = "url('./icons/pause.svg')";
    
  } else {
  
    videoElement.pause();
    
    playButton.style.backgroundImage = "url('./icons/play.svg')";
  }

}

//Already added in class
playButton.addEventListener('click', playPause);
videoElement.addEventListener('click', playPause);

//Already added in class
videoElement.addEventListener('timeupdate', () => {
  
  progressBar.value = videoElement.currentTime;
});

//Already added in class
function scrubToTime(e){

  let x = e.clientX - (progressBar.getBoundingClientRect().left + window.scrollX);
  videoElement.currentTime = clampZeroOne(x / progressBar.offsetWidth) * videoElement.duration;
}


//Already added in class
progressBar.addEventListener('mousedown', scrubToTime);
progressBar.addEventListener('mousedown', (e) => {
  
  window.addEventListener('mousemove', scrubToTime);
  window.addEventListener('mouseup', () => {
    window.removeEventListener('mousemove', scrubToTime);
  });
});


//Already added in class
function muteUnmute(){
  console.log("mute/unmute");


  if(videoElement.muted){
  
   videoElement.muted = false;
   muteButton.style.backgroundImage = "url('./icons/mute.svg')";

  } else {
    
    videoElement.muted = true;
    muteButton.style.backgroundImage = "url('./icons/unmute.svg')";
  }

}


 // * The `loop and Unloop` function is designed to provide a toggle mechanism for the looping feature of a video player.
 // Conceptually, the loop attribute of a video element determines whether the video will start over again from the beginning once it reaches its end. 
 // By default, the loop attribute is set to false, meaning the video will not automatically replay. 
 // If the loop attribute is set to true, the video will replay indefinitely until the user manually stops it.

//The function begins by logging "loop/unloop" to the console. 
//This is useful for debugging purposes, as it provides a clear indication in the browser's console every time the function is invoked. 

function loopunloop(){
  console.log("loop/unloop");

  // An if-else conditional statement checks the current status of the loop attribute of the videoElement.
  if(videoElement.loop){
  //The loop attribute is set to false. This icon is blurred half of color that visually signifies the loop feature is not prepared.
  videoElement.loop = false;
  loopButton.style.backgroundImage = "url('./icons/loop.svg')";

  } else {
    //Conversely, The loop attribute is set to true, enabling automatic replay of the video.
    // When people toggle loop icon, there will be unloop icon (full original black of icon). It means now your video is auto play repeat.                                                                                                                                                                                                                                                                                                                                                                           
    videoElement.loop = true;
    loopButton.style.backgroundImage = "url('./icons/unloop.svg')";
  }

}
/* This function is same with Loop. However, the function is toggle to zoom the video element. So, I need to add scale transform value to invoke this function.
  If the video is zoomed in, it will zoom out to its original scale.
  Otherwise, it will zoom in by 1.5 times. */
function zoomzoomout(){
  console.log("zoom/zoomout");

  if(videoElement.zoom){
  videoElement.zoom = false;
  videoElement.style.transform = "scale(1)"; 
  // Change the button icon to indicate 'zoom in' action
  zoomButton.style.backgroundImage = "url('./icons/zoom.svg')";

  /*If pressing zoom icons, the video will scale to 1.5 times its original size */
  
  } else {
  videoElement.zoom = true;
  videoElement.style.transform = "scale(1.5)";
  // Change the button icon to indicate 'zoom out' action
  zoomButton.style.backgroundImage = "url('./icons/zoomout.svg')";
  }
}

/*add eventliseners to run when button is clicked*/
muteButton.addEventListener('click', muteUnmute);
loopButton.addEventListener('click', loopunloop);
zoomButton.addEventListener('click', zoomzoomout);

/* HELPER FUNCTIONS */
function clampZeroOne(input){
  return Math.min(Math.max(input, 0), 1);
}
function logEvent(e){
  console.log(e);
}
document.addEventListener("DOMContentLoaded", function() {
document.body.style.background = "radial-gradient(circle, #EB85C7, #C7D0FF, #F7D0E9)";
});

