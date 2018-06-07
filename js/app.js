$(document).ready(function(){

  var $gameContainer = $('#game-container');
  var $howToModal = $('#how-to-modal');
  var $gameOverModal = $('#game-over-modal');

  var lives = 5;

  var $ball1 = $('#ball1');
  var ball1PosX = 0;
  var ball1PosY = 0;
  var ball1DirectionX = '+';
  var ball1DirectionY = '+';
  var ball1HitBottom = false;

  var $ball2 = $('#ball2');
  var ball2PosX = 0;
  var ball2PosY = 0;
  var ball2DirectionX = '+';
  var ball2DirectionY = '+';
  var ball2HitBottom = false;

  var $ball3 = $('#ball3');
  var ball3PosX = 0;
  var ball3PosY = 0;
  var ball3DirectionX = '+';
  var ball3DirectionY = '+';
  var ball3HitBottom = false;

  var $ball4 = $('#ball4');
  var ball4PosX = 0;
  var ball4PosY = 0;
  var ball4DirectionX = '+';
  var ball4DirectionY = '+';
  var ball4HitBottom = false;

  var $ball5 = $('#ball5');
  var ball5PosX = 0;
  var ball5PosY = 0;
  var ball5DirectionX = '+';
  var ball5DirectionY = '+';
  var ball5HitBottom = false;

  var ballCounter = 0;

  var $paddle = $('#paddle');
  var paddlePosX = 300;
  var stopLeft = false;
  var stopRight = false;
  $paddle.css({'left': `${paddlePosX}px`});

  var score = 0;

  var ballHitTop = false;

  $('#start-btn').click(function(){
    startGame();
    setInterval(ball1, 8);
    setInterval(updateScore);
  }); // START button click function end

  function startGame() {
    $gameContainer.toggle();
    $('#start-btn').toggle();
    $('#how-to-btn').toggle();

    window.addEventListener("keydown", function (event){
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

  function ballCounterUpdate() {
    if (ballHitTop === true) {
      ballCounter++;
      console.log(`Ball counter is ${ballCounter}`);
    }
    if (ballCounter === 5) {
      setInterval(ball2,5);
    }
    if (ballCounter === 10) {
      setInterval(ball3,7);
    }
    if (ballCounter === 15) {
      setInterval(ball4,6);
    }
    if (ballCounter === 20) {
      setInterval(ball5,4);
    }
  }

  function updateScore () {
    if (ballHitTop === true) {
      ballHitTop = false;
      score++;
      console.log(`Player score is ${score}`);
      $('#game-score').text('Your Score: ' + score);
    }

    // ========== GAME OVER CONDITION ================
    if (lives === 0 || // all lives lost
        ballCounter === 0 && lives === 4 || // 1st ball dead
        ballCounter === 5 && lives === 3 || // 1st 2 balls dead
        ballCounter === 10 && lives === 2 || // 1st 3 balls dead
        ballCounter === 15 && lives === 1) { // 1st 4 balls dead
      $gameContainer.css({'display':'none'});
      $gameOverModal.css({'display':'block'});
      $('#end-score').text('YOUR SCORE: ' + score);
    }
  }

  // ============= BALL 1 ==============
  function ball1() {
    var paddleLeft = $paddle.offset().left;
    var paddleTop = $paddle.offset().top;
    var paddleRight = paddleLeft + $paddle.width();
    var paddleBottom = paddleTop + $paddle.height();

    var ball1Left = $ball1.offset().left;
    var ball1Top = $ball1.offset().top;
    var ball1Right = ball1Left + $ball1.width();
    var ball1Bottom = ball1Top + $ball1.height();

    var containerLeft = $gameContainer.offset().left;
    var containerTop = $gameContainer.offset().top;
    var containerRight = containerLeft + $gameContainer.width();
    var containerBottom = containerTop + $gameContainer.height();

    // Move ball along X-Axis
    if (ball1DirectionX === '+') {
      $ball1.css({
        'left': `${ball1PosX}px`
      });
      ball1PosX++;
    }
    if (ball1DirectionX === '-') {
      $ball1.css({
        'left': `${ball1PosX}px`
      });
      ball1PosX--;
    }
    // Move ball along Y-Axis
    if (ball1DirectionY === '+') {
      $ball1.css({
        'top': `${ball1PosY}px`
      });
      ball1PosY++;
    }
    if (ball1DirectionY === '-') {
      $ball1.css({
        'top': `${ball1PosY}px`
      });
      ball1PosY--;
    }

    // When ball hits right
    if (ball1Right > containerRight) {
      ball1DirectionX = '-';
    }
    // When ball hits left
    if (ball1Left < containerLeft) {
      ball1DirectionX = '+';
    }
    // When ball hits top
    if (ball1Top < containerTop) {
      ball1DirectionY = '+';
      if (ball1HitBottom === true) {
        ballHitTop = false;
      } else {
        ballHitTop = true;
        ballCounterUpdate();
      }
    }
    // When ball hits bottom - GAME OVER
    if (ball1Bottom === containerBottom) {
      ball1ballDirectionY = '-';
      $ball1.remove();

      ball1PosX = 0;
      ball1PosY = 0;
      ballHitTop = false;
      ball1HitBottom = true;

      lives--;
      console.log(`Lives = ${lives}`);
      return lives;
    }

    // ball and paddle collision
    if (ball1Bottom > paddleTop &&
      paddleLeft < ball1Right &&
      paddleRight > ball1Left) {
      ball1DirectionY = '-';
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

  // ============ BALL 2 =============
  function ball2() {
    var paddleLeft = $paddle.offset().left;
    var paddleTop = $paddle.offset().top;
    var paddleRight = paddleLeft + $paddle.width();
    var paddleBottom = paddleTop + $paddle.height();

    var ball2Left = $ball2.offset().left;
    var ball2Top = $ball2.offset().top;
    var ball2Right = ball2Left + $ball2.width();
    var ball2Bottom = ball2Top + $ball2.height();

    var containerLeft = $gameContainer.offset().left;
    var containerTop = $gameContainer.offset().top;
    var containerRight = containerLeft + $gameContainer.width();
    var containerBottom = containerTop + $gameContainer.height();

    // Move ball along X-Axis
    if (ball2DirectionX === '+') {
      $ball2.css({
        'left': `${ball2PosX}px`
      });
      ball2PosX+=1.06;
    }
    if (ball2DirectionX === '-') {
      $ball2.css({
        'left': `${ball2PosX}px`
      });
      ball2PosX-=1.02;
    }
    // Move ball along Y-Axis
    if (ball2DirectionY === '+') {
      $ball2.css({
        'top': `${ball2PosY}px`
      });
      ball2PosY+=1.06;
    }
    if (ball2DirectionY === '-') {
      $ball2.css({
        'top': `${ball2PosY}px`
      });
      ball2PosY-=1.02;
    }

    // When ball hits right
    if (ball2Right > containerRight) {
      ball2DirectionX = '-';
    }
    // When ball hits left
    if (ball2Left < containerLeft) {
      ball2DirectionX = '+';
    }
    // When ball hits top
    if (ball2Top < containerTop) {
      ball2DirectionY = '+';
      if (ball2HitBottom === true) {
        ballHitTop = false;
      } else {
        ballHitTop = true;
        ballCounterUpdate();
      }
    }
    // When ball hits bottom - GAME OVER
    if (ball2Bottom > containerBottom) {
      ball2ballDirectionY = '-';
      $ball2.remove();

      ball2PosX = 0;
      ball2PosY = 0;
      ballHitTop = false;
      ball2HitBottom = true;

      lives--;
      console.log(`Lives = ${lives}`);
      return lives;
    }

    // ball and paddle collision
    if (ball2Bottom > paddleTop &&
      paddleLeft < ball2Right &&
      paddleRight > ball2Left) {
      ball2DirectionY = '-';
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

  // ============ BALL 3 =============
  function ball3() {
    var paddleLeft = $paddle.offset().left;
    var paddleTop = $paddle.offset().top;
    var paddleRight = paddleLeft + $paddle.width();
    var paddleBottom = paddleTop + $paddle.height();

    var ball3Left = $ball3.offset().left;
    var ball3Top = $ball3.offset().top;
    var ball3Right = ball3Left + $ball3.width();
    var ball3Bottom = ball3Top + $ball3.height();

    var containerLeft = $gameContainer.offset().left;
    var containerTop = $gameContainer.offset().top;
    var containerRight = containerLeft + $gameContainer.width();
    var containerBottom = containerTop + $gameContainer.height();

    // Move ball along X-Axis
    if (ball3DirectionX === '+') {
      $ball3.css({
        'left': `${ball3PosX}px`
      });
      ball3PosX+=1.04;
    }
    if (ball3DirectionX === '-') {
      $ball3.css({
        'left': `${ball3PosX}px`
      });
      ball3PosX-=1.01;
    }
    // Move ball along Y-Axis
    if (ball3DirectionY === '+') {
      $ball3.css({
        'top': `${ball3PosY}px`
      });
      ball3PosY+=1.04;
    }
    if (ball3DirectionY === '-') {
      $ball3.css({
        'top': `${ball3PosY}px`
      });
      ball3PosY-=1.01;
    }

    // When ball hits right
    if (ball3Right > containerRight) {
      ball3DirectionX = '-';
    }
    // When ball hits left
    if (ball3Left < containerLeft) {
      ball3DirectionX = '+';
    }
    // When ball hits top
    if (ball3Top < containerTop) {
      ball3DirectionY = '+';
      if (ball3HitBottom === true) {
        ballHitTop = false;
      } else {
        ballHitTop = true;
        ballCounterUpdate();
      }
    }
    // When ball hits bottom - GAME OVER
    if (ball3Bottom > containerBottom) {
      ball3ballDirectionY = '-';
      $ball3.remove();

      ball3PosX = 0;
      ball3PosY = 0;
      ballHitTop = false;
      ball3HitBottom = true;

      lives--;
      console.log(`Lives = ${lives}`);
      return lives;
    }

    // ball and paddle collision
    if (ball3Bottom > paddleTop &&
      paddleLeft < ball3Right &&
      paddleRight > ball3Left) {
      ball3DirectionY = '-';
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

  // ============= BALL 4 ==============
  function ball4() {
    var paddleLeft = $paddle.offset().left;
    var paddleTop = $paddle.offset().top;
    var paddleRight = paddleLeft + $paddle.width();
    var paddleBottom = paddleTop + $paddle.height();

    var ball4Left = $ball4.offset().left;
    var ball4Top = $ball4.offset().top;
    var ball4Right = ball4Left + $ball4.width();
    var ball4Bottom = ball4Top + $ball4.height();

    var containerLeft = $gameContainer.offset().left;
    var containerTop = $gameContainer.offset().top;
    var containerRight = containerLeft + $gameContainer.width();
    var containerBottom = containerTop + $gameContainer.height();

    // Move ball along X-Axis
    if (ball4DirectionX === '+') {
      $ball4.css({
        'left': `${ball4PosX}px`
      });
      ball4PosX+=1.09;
    }
    if (ball4DirectionX === '-') {
      $ball4.css({
        'left': `${ball4PosX}px`
      });
      ball4PosX-=1.04;
    }
    // Move ball along Y-Axis
    if (ball4DirectionY === '+') {
      $ball4.css({
        'top': `${ball4PosY}px`
      });
      ball4PosY+=1.09;
    }
    if (ball4DirectionY === '-') {
      $ball4.css({
        'top': `${ball4PosY}px`
      });
      ball4PosY-=1.04;
    }

    // When ball hits right
    if (ball4Right > containerRight) {
      ball4DirectionX = '-';
    }
    // When ball hits left
    if (ball4Left < containerLeft) {
      ball4DirectionX = '+';
    }
    // When ball hits top
    if (ball4Top < containerTop) {
      ball4DirectionY = '+';
      if (ball4HitBottom === true) {
        ballHitTop = false;
      } else {
        ballHitTop = true;
        ballCounterUpdate();
      }
    }
    // When ball hits bottom - GAME OVER
    if (ball4Bottom > containerBottom) {
      ball4ballDirectionY = '-';
      $ball4.remove();

      ball4PosX = 0;
      ball4PosY = 0;
      ballHitTop = false;
      ball4HitBottom = true;

      lives--;
      console.log(`Lives = ${lives}`);
      return lives;
    }

    // ball and paddle collision
    if (ball4Bottom > paddleTop &&
      paddleLeft < ball4Right &&
      paddleRight > ball4Left) {
      ball4DirectionY = '-';
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

  // ============= BALL 5 ==============
  function ball5() {
    var paddleLeft = $paddle.offset().left;
    var paddleTop = $paddle.offset().top;
    var paddleRight = paddleLeft + $paddle.width();
    var paddleBottom = paddleTop + $paddle.height();

    var ball5Left = $ball5.offset().left;
    var ball5Top = $ball5.offset().top;
    var ball5Right = ball5Left + $ball5.width();
    var ball5Bottom = ball5Top + $ball5.height();

    var containerLeft = $gameContainer.offset().left;
    var containerTop = $gameContainer.offset().top;
    var containerRight = containerLeft + $gameContainer.width();
    var containerBottom = containerTop + $gameContainer.height();

    // Move ball along X-Axis
    if (ball5DirectionX === '+') {
      $ball5.css({
        'left': `${ball5PosX}px`
      });
      ball5PosX+=1.08;
    }
    if (ball5DirectionX === '-') {
      $ball5.css({
        'left': `${ball5PosX}px`
      });
      ball5PosX-=1.03;
    }
    // Move ball along Y-Axis
    if (ball5DirectionY === '+') {
      $ball5.css({
        'top': `${ball5PosY}px`
      });
      ball5PosY+=1.08;
    }
    if (ball5DirectionY === '-') {
      $ball5.css({
        'top': `${ball5PosY}px`
      });
      ball5PosY-=1.03;
    }

    // When ball hits right
    if (ball5Right > containerRight) {
      ball5DirectionX = '-';
    }
    // When ball hits left
    if (ball5Left < containerLeft) {
      ball5DirectionX = '+';
    }
    // When ball hits top
    if (ball5Top < containerTop) {
      ball5DirectionY = '+';
      if (ball5HitBottom === true) {
        ballHitTop = false;
      } else {
        ballHitTop = true;
        ballCounterUpdate();
      }
    }
    // When ball hits bottom - GAME OVER
    if (ball5Bottom > containerBottom) {
      ball5ballDirectionY = '-';
      $ball5.remove();

      ball5PosX = 0;
      ball5PosY = 0;
      ballHitTop = false;
      ball5HitBottom = true;

      lives--;
      console.log(`Lives = ${lives}`);
      return lives;
    }

    // ball and paddle collision
    if (ball5Bottom > paddleTop &&
      paddleLeft < ball5Right &&
      paddleRight > ball5Left) {
      ball5DirectionY = '-';
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
    ballCounter = 0;
    lives = 5;

    ballHitTop = false;
    ball1HitBottom = false;
    ball2HitBottom = false;
    ball3HitBottom = false;
    $('#game-score').text('Your Score: ' + score);
    $gameContainer.css({'display':'block'}); // turns on
    ball1PosX = 10;
    ball1PosY = 10;
    ball1DirectionX = '+';
    ball1DirectionY = '+';
    ball2PosX = 10;
    ball2PosY = 10;
    ball2DirectionX = '+';
    ball2DirectionY = '+';
    ball3PosX = 10;
    ball3PosY = 10;
    ball3DirectionX = '+';
    ball3DirectionY = '+';
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
