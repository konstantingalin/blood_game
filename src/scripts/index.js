import '../styles/index.scss';
if (process.env.NODE_ENV === 'development') {
	require('../index.html');
}

window.addEventListener('DOMContentLoaded', function () {
	'use strict';
	
	var score = 0;
    var time = 30;
    var gameObjects = [];
    var maxObjects = 25;
    var gameBoard = document.getElementById("game-board");

    function updateScore() {
      document.getElementById("score").innerHTML = score;
    }

    function startTimer() {
      var timer = setInterval(function() {
        time--;
        document.getElementById("timer").innerHTML = time;
        if (time === 0) {
          clearInterval(timer);
          
          document.querySelector('._2').style.display = 'none';
          document.querySelector('._3').style.display = 'block';
          document.querySelector('#score_result').textContent = score;
          
        }
      }, 1000);
    }

    function createGameObject() {
      var x = Math.floor(Math.random() * (document.querySelector('#game-board').offsetWidth));
      var y = Math.floor(Math.random() * window.innerHeight);
      console.log(document.querySelector('.game_content').offsetWidth);
      var obj_img = 'game-object' + (Math.floor(Math.random() * 3) + '');
      var obj_anm = 'animation_' + (Math.floor(Math.random() * 8) + '');
      var object = document.createElement("div");
      object.classList.add(obj_img);
      object.classList.add(obj_anm);
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

  this.document.querySelector('.button_start').addEventListener('click', (e) => {
    e.preventDefault();

    this.document.querySelector('._1').style.display = 'none';
    this.document.querySelector('._2').style.display = 'block';

    startTimer(); startGame()
  })

  this.document.querySelector('.button_reset').addEventListener('click', (e) => {
    e.preventDefault();

    document.location.reload();
  })
});
