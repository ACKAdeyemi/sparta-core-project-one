$(document).ready(function(){

  var interval;
  var timerRunning = false;
  var $container = $('#game-container');
  var $ball = $('#ball');
  var posX = 0;
  var posY = 0;

  var directionX = '+';
  var directionY = '+';

  $('#start-btn').click(function(){
    $container.css('display','block');
    if (timerRunning) {
      clearInterval(interval);
      timerRunning = !timerRunning;
    } else {
      interval = setInterval(function(){

        // Check ball position
        var ballLeft = $ball.offset().left;
        var ballTop = $ball.offset().top;
        var ballRight = ballLeft + $ball.width();
        var ballBottom = ballTop + $ball.height();

        // Check container position
        var containerLeft = $container.offset().left;
        var containerTop = $container.offset().top;
        var containerRight = containerLeft + $container.width();
        var containerBottom = containerTop + $container.height();

        // Move ball along X-Axis
        if (directionX === '+') {
          $ball.css({
            'left': `${posX}px`
          });
          posX++;
        }
        if (directionX === '-') {
          $ball.css({
            'left': `${posX}px`
          });
          posX--;
        }
        // Move ball along Y-Axis
        if (directionY === '+') {
          $ball.css({
            'top': `${posY}px`
          });
          posY++;
        }
        if (directionY === '-') {
          $ball.css({
            'top': `${posY}px`
          });
          posY--;
        }

        // When ballRight > containerRight
        if (ballRight > containerRight) {
          directionX = '-';
        }
        // When ballLeft < containerLeft
        if (ballLeft < containerLeft) {
          directionX = '+';
        }
        // When ballBottom > containerBottom
        if (ballBottom > containerBottom) {
          directionY = '-';
        }
        // When ballLeft < containerLeft
        if (ballTop < containerTop) {
          directionY = '+';
        }

      },1);
      timerRunning = !timerRunning;
    }
  });



}); // DOM end
