/**
 * Created by shuding on 3/29/16.
 * <ds303077135@gmail.com>
 */

(function (window, document) {
  var CIRCLE_NUM = 5;

  var container = document.getElementById('container');
  var circles   = [];

  var x = 0, y = 0; // position of current mouse cursor
  var v = 0; // speed

  var timestamp = 0;

  var sqr = function (x) { return x * x };
  var sqrt = Math.sqrt;

  function create() {
    for (var i = 0; i < CIRCLE_NUM; ++i) {
      var circle       = document.createElement('div');
      circle.className = 'circle';
      container.appendChild(circle);
      circles.push({
        element:  circle,
        position: [0, 0]
      });
    }
  }

  function tick() {
    for (var i = CIRCLE_NUM - 1; i >= 0; --i) {
      if (i == 0) {
        circles[0].position = [x, y];
        circles[0].element.style.left = x + 'px';
        circles[0].element.style.top = y + 'px';
      } else {
        var dx = (x + circles[i - 1].position[0] * 3) / 4;
        var dy = (y + circles[i - 1].position[1] * 3) / 4;
        circles[i].position = [dx, dy];
        circles[i].element.style.left = dx + 'px';
        circles[i].element.style.top = dy + 'px';
      }
      circles[i].element.style.backgroundColor = 'hsla(' + v + ', 100%, 50%, 1)';
    }
    requestAnimationFrame(tick);
  }

  function mouseMove(event) {
    var dx = event.pageX || event.targetTouches[0].pageX;
    var dy = event.pageY || event.targetTouches[0].pageY;

    var period = event.timeStamp - timestamp; // ms
    var dv = sqrt(sqr(x - dx) + sqr(y - dy)) * 2000 / period;

    x = dx;
    y = dy;
    v += dv;
  }

  document.body.addEventListener('mousemove', mouseMove);
  document.body.addEventListener('touchmove', mouseMove);

  create();
  tick();
})(window, document);
