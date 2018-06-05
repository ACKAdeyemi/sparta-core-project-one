$(document).ready(function(){

  var interval;
  var timerRunning = false;

  var $container = $('#game-container');
  var $modal = $('#how-to-modal');

  var $ball = $('#ball');
  var ballPosX = 0;
  var ballPosY = 0;
  var ballDirectionX = '+';
  var ballDirectionY = '+';

  var $paddle = $('#paddle');
  var paddlePosX = 0;
  var stopLeft = false;
  var stopRight = false;

  var ballStartPos = $('#ball-start-pos').position();

  $('#start-btn').click(function(){

    $container.toggle();
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
          // paddlePosX = 0;
          console.log('Paddle hit left side!');
        }
      }
      if (event.keyCode === 68 && stopRight === false) {
        $paddle.css({'left' : `${paddlePosX}px`});
        paddlePosX+=20;

        if (event.keyCode === 68 && stopRight === true) {
          $paddle.css({'left' : '0px'});
          // paddlePosX = 0;
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

        var containerLeft = $container.offset().left;
        var containerTop = $container.offset().top;
        var containerRight = containerLeft + $container.width();
        var containerBottom = containerTop + $container.height();

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

        // When ballRight > containerRight
        if (ballRight > containerRight) {
          ballDirectionX = '-';
        }
        // When ballLeft < containerLeft
        if (ballLeft < containerLeft) {
          ballDirectionX = '+';
        }
        // When ballTop < containerTop
        if (ballTop < containerTop) {
          ballDirectionY = '+';
        }

        // When ballBottom hits containerBottom - remove when ready to add remove balls functionality
        // Temp functionality, alert (don't use in final) + ball reset
        if (ballBottom > containerBottom) {
          // ballDirectionY = '-';
          alert('GAME OVER - The ball has hit the bottom - position reset');
          ballDirectionX = '+';
          ballDirectionY = '+';
          $ball.css({
            'top': '0px',
            'left': '0px'
          });
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

        return stopLeft, stopRight;
      },10);
      timerRunning = !timerRunning;
    } // else end
  }); // START GAME click end

  $('#how-to-btn').click(function(){
    $modal.toggle();
  }); // HOW TO PLAY click end

}); // DOM end
