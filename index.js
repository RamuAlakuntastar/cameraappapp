let video = document.querySelector("video");
let recorderdbtn = document.getElementById("recorderdbtn");
let capturebtn = document.getElementById("capturebtn");
let transparentColor = "transparent";

let recorder;
let recorderQuery = false
let chunk = []; 
let permission = {
    video: true,
    audio: true
}



navigator.mediaDevices.getUserMedia(permission)
.then((stream) => {
    video.srcObject = stream;
    recorder = new MediaRecorder(stream);
    recorder.addEventListener("start", (e) => {
        chunk = [];
    })
    recorder.addEventListener("dataavailable", (e) => {
        chunk.push(e.data);
    })
    recorder.addEventListener("stop", (e) => {
       let blob = new Blob(chunk, {type: "video/mp4"});
       let url = URL.createObjectURL(blob);
       let a = document.createElement("a");
       a.href = url;
       a.download = "stream.mp4";
       a.click();
    })
    recorderdbtn.addEventListener("click", (e) => {
        if(!recorder) return;
        recorderQuery = !recorderQuery;
        if(recorderQuery) {
            recorder.start();
            startTimer();
            
        }else {
            recorder.stop();
            stopTimer();
        }
    })

})  


capturebtn.addEventListener("click", (e) => {
    let canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    let tool = canvas.getContext("2d")
    tool.drawImage(video, 0, 0, canvas.width, canvas.height);
    tool.fillStyle = transparentColor;
    tool.fillRect(0, 0, canvas.width, canvas.height);
    let imageUrl = canvas.toDataURL("image/jpeg");
    
    let a = document.createElement("a");
    a.href = imageUrl;
    a.download = "image.jpeg";
    a.click();

})

let filter = document.querySelector(".filter-layout");

let filterAll = document.querySelectorAll(".filter")
filterAll.forEach((filterElem) => {
    filterElem.addEventListener("click", (e) => {
        transparentColor = getComputedStyle(filterElem).getPropertyValue("background-color");
        filter.style.backgroundColor = transparentColor;
    })
})













let timerId;
let timer = document.querySelector(".timer");
let counter = 0;
function startTimer(){
    timer.style.display = "block";

    function displayTimer(){
        let totalseconds = counter;
        let hours = Number.parseInt(totalseconds/3600);
        totalseconds = totalseconds % 3600;
        let minutes = Number.parseInt(totalseconds/60);
        totalseconds = totalseconds % 60; 
        let seconds = totalseconds;
        hours = (hours < 10 ) ? "0" + hours : hours; 
        minutes = (minutes < 10 ) ? "0" + minutes : minutes;
        seconds = (seconds < 10 ) ? "0" + seconds : seconds;
        timer.innerText = `${hours}:${minutes}:${seconds}`; counter++;
    }
     timerId = setInterval(displayTimer, 1000);
    
}
console.log(timerId);

function stopTimer(){
    clearInterval(timerId);
}




