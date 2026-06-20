(function () {
  // List every processed flower filename here. Update this array whenever
  // you run process_flowers.py on a new batch — the script's output
  // filenames (flower-01-..., flower-02-..., etc.) go straight in.
  // FLOWER_LIST_START
  var FLOWER_IMAGE_SOURCES = [
    'assets/images/flowers/processed/flower-01-IMG_0514.png',
    'assets/images/flowers/processed/flower-02-IMG_0515.png',
    'assets/images/flowers/processed/flower-03-IMG_0516.png',
    'assets/images/flowers/processed/flower-04-IMG_0521.png',
    'assets/images/flowers/processed/flower-05-IMG_0522.png',
    'assets/images/flowers/processed/flower-06-IMG_0523.png',
    'assets/images/flowers/processed/flower-07-IMG_0524.png',
    'assets/images/flowers/processed/flower-08-IMG_0525.png',
    'assets/images/flowers/processed/flower-09-tester.png',
    'assets/images/flowers/processed/flower-10-IMG_8996.png',
  ];
  // FLOWER_LIST_END

  var PIECE_COUNT = 100;
  var MIN_RADIUS = 13;
  var MAX_RADIUS = 20;
  var HOVER_RADIUS = 150;
  var HOVER_STRENGTH = 0.012;
  var PUNCH_RADIUS = 200;
  var PUNCH_STRENGTH = 0.5;

  function initFlowerJar(canvas) {
    var container = canvas.parentElement;
    var W = container.clientWidth;
    var H = canvas.clientHeight || canvas.height;
    canvas.width = W;
    canvas.height = H;

    var Engine = Matter.Engine, World = Matter.World, Bodies = Matter.Bodies,
        Body = Matter.Body, Runner = Matter.Runner;

    var engine = Engine.create();
    engine.gravity.y = 1;

    var images = FLOWER_IMAGE_SOURCES.map(function (src) {
      var img = new Image();
      img.src = src;
      return img;
    });

    var bodies = [];
    for (var i = 0; i < PIECE_COUNT; i++) {
      var r = MIN_RADIUS + Math.random() * (MAX_RADIUS - MIN_RADIUS);
      var x = 20 + Math.random() * (W - 40);
      var y = -Math.random() * 400 - 20;
      var body = Bodies.circle(x, y, r, {
        restitution: 0.45,
        friction: 0.2,
        frictionAir: 0.015,
        density: 0.0012,
      });
      body.plugin = { img: images[i % images.length], r: r };
      bodies.push(body);
    }

    var wallOpts = { isStatic: true };
    var ground = Bodies.rectangle(W / 2, H + 10, W + 40, 20, wallOpts);
    var leftWall = Bodies.rectangle(-10, H / 2, 20, H + 40, wallOpts);
    var rightWall = Bodies.rectangle(W + 10, H / 2, 20, H + 40, wallOpts);
    World.add(engine.world, bodies.concat([ground, leftWall, rightWall]));

    var runner = Runner.create();
    Runner.run(runner, engine);

    // Clamp bodies to the canvas area, so they don't fly off-screen, so we don't lose flowers
    Matter.Events.on(engine, 'afterUpdate', function () {
      var margin = 0;
      bodies.forEach(function (b) {
        var p = b.position;
        var clampedX = Math.min(Math.max(p.x, -margin), W + margin);
        var clampedY = Math.min(Math.max(p.y, -margin), H + margin);
        if (clampedX !== p.x || clampedY !== p.y) {
          Body.setPosition(b, { x: clampedX, y: clampedY });
          Body.setVelocity(b, { x: 0, y: 0 });
        }
      });
    });

    var ctx = canvas.getContext('2d');
    function drawFrame() {
      ctx.clearRect(0, 0, W, H);
      for (var j = 0; j < bodies.length; j++) {
        var b = bodies[j];
        var p = b.position;
        var ang = b.angle;
        var d = b.plugin;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(ang);
        if (d.img.complete && d.img.naturalWidth > 0) {
          ctx.drawImage(d.img, -d.r, -d.r, d.r * 2, d.r * 2);
        }
        ctx.restore();
      }
      requestAnimationFrame(drawFrame);
    }
    drawFrame();

    var hoverPos = null;
    canvas.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      hoverPos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    });
    canvas.addEventListener('mouseleave', function () {
      hoverPos = null;
    });
    canvas.addEventListener('click', function (e) {
      var rect = canvas.getBoundingClientRect();
      var clickX = e.clientX - rect.left;
      var clickY = e.clientY - rect.top;
      bodies.forEach(function (b) {
        var dx = b.position.x - clickX;
        var dy = b.position.y - clickY;
        var dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
        if (dist < PUNCH_RADIUS) {
          var falloff = 1 - dist / PUNCH_RADIUS;
          var mag = PUNCH_STRENGTH * falloff * falloff;
          Body.applyForce(b, b.position, {
            x: (dx / dist) * mag,
            y: (dy / dist) * mag - mag * 0.3,
          });
          Body.setAngularVelocity(b, b.angularVelocity + (Math.random() - 0.5) * 0.4 * falloff);
        }
      });
    });

    Matter.Events.on(engine, 'beforeUpdate', function () {
      if (!hoverPos) return;
      bodies.forEach(function (b) {
        var dx = b.position.x - hoverPos.x;
        var dy = b.position.y - hoverPos.y;
        var dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
        if (dist < HOVER_RADIUS) {
          var mag = HOVER_STRENGTH * (1 - dist / HOVER_RADIUS);
          Body.applyForce(b, b.position, {
            x: (dx / dist) * mag,
            y: (dy / dist) * mag,
          });
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var canvases = document.querySelectorAll('.flower-jar-canvas');
    canvases.forEach(initFlowerJar);
  });
})();
