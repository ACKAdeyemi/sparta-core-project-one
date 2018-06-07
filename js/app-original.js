$(document).ready(function(){

  var $gameContainer = $('#game-container');
  var $howToModal = $('#how-to-modal');
  var $gameOverModal = $('#game-over-modal');

  var $ball = $('.ball');
  var ballPosX = 0;
  var ballPosY = 0;
  var ballDirectionX = '+';
  var ballDirectionY = '+';

  var $paddle = $('#paddle');
  var paddlePosX = 300;
  var stopLeft = false;
  var stopRight = false;
  $paddle.css({'left' : `${paddlePosX}px`});

  var score = 0;

  var ballHitTop = false;

  $('#start-btn').click(function(){
    startGame();
    setInterval(moveBall, 10);
  }); // START button click function end

  function startGame() {
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
  }; // START GAME function end

  function updateScore () {
    if (ballHitTop === true) {
      ballHitTop = false;
      score++;
      console.log(score);
      $('#game-score').text('Your Score: ' + score);
    }
  }

  function moveBall() {
    updateScore();

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

    // When ball hits right
    if (ballRight > containerRight) {
      ballDirectionX = '-';
    }
    // When ball hits left
    if (ballLeft < containerLeft) {
      ballDirectionX = '+';
    }
    // When ball hits top
    if (ballTop < containerTop) {
      ballDirectionY = '+';
      ballHitTop = true;
    }
    // When ball hits bottom - GAME OVER
    if (ballBottom > containerBottom) {
      $gameContainer.toggle();
      $gameOverModal.toggle();
      $('#end-score').text('YOUR SCORE: ' + score);
    }

    // ball and paddle collision
    if (ballBottom > paddleTop &&
      paddleLeft < ballRight &&
      paddleRight > ballLeft) {
      ballDirectionY = '-';
      console.log('collision top');
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
  }

  $('#restart-btn').click(function(){
    score = 0;
    $('#game-score').text('Your Score: ' + score);
    $gameContainer.toggle(); // turns on
    ballPosX = 10;
    ballPosY = 10;
    ballDirectionX = '+';
    ballDirectionY = '+';
    paddlePosX = 300;
    $paddle.css({'left' : `${paddlePosX}px`});
    $gameOverModal.css({ // turn off
      'display': 'none'
    });
  }); // RESTART click end

  $('#main-menu-btn').click(function(){
    // STATEMENT BELOW REFRESHES THE WHOLE PAGE - Back to Initial screen
    location.reload();
  }); // MAIN MENU click end

  $('#how-to-btn').click(function(){
    $howToModal.toggle();
  }); // HOW TO PLAY click end
}); // DOM end
