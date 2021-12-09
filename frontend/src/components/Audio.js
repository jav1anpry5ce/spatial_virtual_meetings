export default function Audio({ time }) {
  let voiceData;
  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    let mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();

    let audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", (event) => {
      audioChunks.push(event.data);
    });
    mediaRecorder.addEventListener("stop", () => {
      let audioBlob = new Blob(audioChunks);

      audioChunks = [];

      let fileReader = new FileReader();
      fileReader.readAsDataURL(audioBlob);
      fileReader.onloadend = () => {
        let base64String = fileReader.result;
        voiceData = base64String;
        //socket.emit("voice", base64String);
      };

      mediaRecorder.start();

      setTimeout(() => {
        mediaRecorder.stop();
      }, time);
    });
    setTimeout(() => {
      mediaRecorder.stop();
    }, time);
  });
  return voiceData;
}
