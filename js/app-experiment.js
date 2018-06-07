$(document).ready(function(){

  var $gameContainer = $('#game-container');

  var ballPosX = 0;
  var ballPosY = 0;
  var ballDirectionX = '+';
  var ballDirectionY = '+';

  function moveBall() {
    var $ball = $('.ball');
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
      console.log('Ball hit top');
    }
    // When ball hits bottom
    if (ballBottom > containerBottom) {
      ballDirectionY = '-';
    }
  }


  var ballArr = [];

  var addBall = function(id,top,left) {
    this.id = id,
    this.top = top,
    this.left = left
  }

  for (var i = 0; i < 5; i++) {
    var id = i;
    var top = 0;
    var left = i * 10;
    var ball = new addBall(id,top,left);
    ballArr.push(ball);
  }

  for (var i = 0; i < ballArr.length; i++) {
    var left = 10;
    var newBall = $(`<div class="ball" id="${ballArr[i].id}">`);
    $('.game-container').append(newBall);

    $(`#${ballArr[i].id}`).css({
      'left': `${left}px`,
      'height': '15px',
      'width': '15px',
      'background': 'white',
      'border-radius': '50%',
      'display':'inline-block',
      'position':'absolute'
    });
    setInterval(function(){
      left++;
    },10)
  }

  setInterval(moveBall, 10);
  // setInterval(function(){
  //   moveBall();
  // },10)

  console.log(ballArr);

  // function addBall() {
  //   // ATTEMPT 1 ---------------
  //   // $('.ball').clone().appendTo('#game-container');
  //   // ATTEMPT 4 ---------------
  //   $('.game-container').append('<div class="ball"></div>');
  // }



  // Have a ball maker function
  // For x number of iterations, create a new ball with same top but random left properties
  // Store each one in an array
  // At game start, get first ball in array, and append to board
  // Apply ballMove mechanics to ball
  // When ball hits top, get next ball in array and append to board

}); // DOM end
