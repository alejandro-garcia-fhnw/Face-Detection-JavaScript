const video = document.getElementById('video')
const expressions = document.getElementById('expressions')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  const detectionWithExpressions = faceapi.detectSingleFace(video).withFaceExpressions()
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    //faceapi.draw.drawDetections(canvas, resizedDetections)
    //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    //faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  

    // nonig grad d best Weg zum d Emotione uslese...
    
    if(resizedDetections[0].expressions.angry > 0.7) {
      console.log("😡")
      document.getElementById("expressions").innerHTML = "😡";
    }
    if (resizedDetections[0].expressions.sad > 0.7) {
      console.log("😢")
      document.getElementById("expressions").innerHTML = "😢";
    }
    if (resizedDetections[0].expressions.surprised > 0.7) {
      console.log("😲")
      document.getElementById("expressions").innerHTML = "😲";
    }
    if (resizedDetections[0].expressions.neutral > 0.7) {
      console.log("😶")
      document.getElementById("expressions").innerHTML = "😶";
    }
    if(resizedDetections[0].expressions.happy > 0.7) {
      console.log("😃")
      document.getElementById("expressions").innerHTML = "😃";
    }
  }, 100)
})

angry