import '../styles/index.scss';
if (process.env.NODE_ENV === 'development') {
	require('../index.html');
}

window.addEventListener('DOMContentLoaded', function () {
	'use strict';
	
	var score = 0;
    var time = 30;
    var gameObjects = [];
    var maxObjects = 10;
    var gameBoard = document.getElementById("game-board");

    function updateScore() {
      document.getElementById("score").innerHTML = "Очки: " + score;
    }

    function startTimer() {
      var timer = setInterval(function() {
        time--;
        document.getElementById("timer").innerHTML = "Времени осталось: " + time;
        if (time === 0) {
          clearInterval(timer);
          alert("Time's up! Your final score is: " + score);
        }
      }, 1000);
    }

    function createGameObject() {
      var x = Math.floor(Math.random() * 700);
      var y = Math.floor(Math.random() * 664);
      var obj_img = 'game-object' + (Math.floor(Math.random() * 3) + '');
      var object = document.createElement("div");
      object.classList.add(obj_img);
      object.style.left = x + "px";
      object.style.top = y + "px";
      object.addEventListener("click", function() {
        score++;
        updateScore();
        gameBoard.removeChild(object);
        gameObjects.splice(gameObjects.indexOf(object), 1);
        createGameObject();
      });
      gameBoard.appendChild(object);
      gameObjects.push(object);
    }

    function startGame() {
      for (var i = 0; i < maxObjects; i++) {
        createGameObject();
      }
    }

	startTimer(); startGame()
});
