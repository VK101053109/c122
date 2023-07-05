x = 0;
y = 0;
screen_width = 0;
screen_height = 0;
draw_apple = "";
apple = "";
speak_data = "";

SpeechRecognition = window.webkitSpeechRecognition;

recognition = new SpeechRecognition();

function start() {
  document.getElementById("status").innerHTML = "System is listening please speak";
  recognition.start();
}

recognition.onresult = function (event) {

  console.log(event);

  content = event.results[0][0].transcript;

  document.getElementById("status").innerHTML = "The speech has been recognized: " + content;
  to_number = Number(content);
  if (Number.isInteger(to_number)) {
    document.getElementById("status").innerHTML = "Started to Draw Apples";
    draw_apple = "set";
  } else {
    document.getElementById("status").innerHTML = "The speech was not recognized a number";

  }
}

function preload() {
  apple = loadImage("apple.png");
}

function setup() {
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;
  canvas = createCanvas(screen_width-100, screen_height - 150);
  canvas.position(0, 150);

}

function draw() {
  if (draw_apple == "set") {
    for (i = 1; i <= to_number; i++) {
      x = Math.ceil(Math.random() * (screen_width - 25));
      y = Math.ceil(Math.random() * (screen_height - 25));
      image(apple,x,y,50,50);

    }
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    speak_data=to_number+" apples drawn";
    speak();
    draw_apple = "";

  }
}

function speak() {
  synth = window.speechSynthesis;

  utterThis = new SpeechSynthesisUtterance(speak_data);

  synth.speak(utterThis);

  speak_data = "";
}