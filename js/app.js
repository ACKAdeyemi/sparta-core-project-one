$(document).ready(function(){

  var interval;
  var timerRunning = false;

  var $gameContainer = $('#game-container');
  var $howToModal = $('#how-to-modal');
  var $gameOverModal = $('#game-over-modal');

  var $ball = $('#ball');
  var ballPosX = 0;
  var ballPosY = 0;
  var ballDirectionX = '+';
  var ballDirectionY = '+';

  var $paddle = $('#paddle');
  var paddlePosX = 0;
  var stopLeft = false;
  var stopRight = false;

  $('#start-btn').click(function(){

    $gameContainer.toggle();
    $('#start-btn').toggle();
    $('#how-to-btn').toggle();

    window.addEventListener("keydown", function (event){
      console.log(event.keyCode);

      // keyCodes - 37 for left, 39 for right, 65 for A, 68 for D
      if (event.keyCode === 65 && stopLeft === false) {
        $paddle.css({'left' : `${paddlePosX}px`});
        paddlePosX-=20;

        if (event.keyCode === 65 && stopLeft === true) {
          $paddle.css({'left' : '0px'});
          console.log('Paddle hit left side!');
        }
      }
      if (event.keyCode === 68 && stopRight === false) {
        $paddle.css({'left' : `${paddlePosX}px`});
        paddlePosX+=20;

        if (event.keyCode === 68 && stopRight === true) {
          $paddle.css({'left' : '0px'});
          console.log('Paddle hit right side!');
        }
      }
    });

    if (timerRunning) {
      clearInterval(interval);
      timerRunning = !timerRunning;
    }
    else {
      interval = setInterval(function(){

        var paddleLeft = $paddle.offset().left;
        var paddleTop = $paddle.offset().top;
        var paddleRight = paddleLeft + $paddle.width();
        var paddleBottom = paddleTop + $paddle.height();

        var ballLeft = $ball.offset().left;
        var ballTop = $ball.offset().top;
        var ballRight = ballLeft + $ball.width();
        var ballBottom = ballTop + $ball.height();

        var containerLeft = $gameContainer.offset().left;
        var containerTop = $gameContainer.offset().top;
        var containerRight = containerLeft + $gameContainer.width();
        var containerBottom = containerTop + $gameContainer.height();

        // Move ball along X-Axis
        if (ballDirectionX === '+') {
          $ball.css({
            'left': `${ballPosX}px`
          });
          ballPosX++;
        }
        if (ballDirectionX === '-') {
          $ball.css({
            'left': `${ballPosX}px`
          });
          ballPosX--;
        }
        // Move ball along Y-Axis
        if (ballDirectionY === '+') {
          $ball.css({
            'top': `${ballPosY}px`
          });
          ballPosY++;
        }
        if (ballDirectionY === '-') {
          $ball.css({
            'top': `${ballPosY}px`
          });
          ballPosY--;
        }

        // When ballRight > containerRight - change direction to left
        if (ballRight > containerRight) {
          ballDirectionX = '-';
        }
        // When ballLeft < containerLeft - change direction to right
        if (ballLeft < containerLeft) {
          ballDirectionX = '+';
        }
        // When ballTop < containerTop - change direction to down
        if (ballTop < containerTop) {
          ballDirectionY = '+';
        }

        // When ballBottom hits containerBottom - game over (needs to change when multiple balls exist)
        if (ballBottom > containerBottom) {
          $gameContainer.toggle();
          $gameOverModal.toggle();
          clearInterval(interval);
          timerRunning = !timerRunning;
        }

        // ball and paddle collision
        if (ballBottom > paddleTop &&
          paddleLeft < ballRight &&
          paddleRight > ballLeft) {
          ballDirectionY = '-';
        }

        // check Paddle against Container
        if (paddleLeft < containerLeft + 20) {
          stopLeft = true;
        }
        if (paddleRight > containerRight - 20) {
          stopRight = true;
        }
        if (paddleLeft > containerLeft) {
          stopLeft = false;
        }
        if (paddleRight < containerRight) {
          stopRight = false;
        }
      },10);
      timerRunning = !timerRunning;
    } // else end
  }); // START GAME click end

  $('#restart-btn').click(function(){
    $gameContainer.toggle(); // turns on
    $gameOverModal.css({ // turn off
      'display': 'none'
    });
    $ball.css({ // repositions ball to top left position
      'top': '0px',
      'left': '0px'
    });
  }); // RESTART click end

  $('#main-menu-btn').click(function(){
    $('#start-btn').toggle();
    $('#how-to-btn').toggle();
    $gameOverModal.css({
      'display': 'none'
    });
    $gameContainer.css({
      'display': 'none'
    });
  }); // MAIN MENU click end

  $('#how-to-btn').click(function(){
    $howToModal.toggle();
  }); // HOW TO PLAY click end

}); // DOM end
