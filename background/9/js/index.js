console.clear();

var twoPI = 2 * Math.PI;

var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');


var width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

window.addEventListener('resize',function(){
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

document.body.appendChild(canvas);

/* ///////////////////////////////////////// */

function randomWiggle(wiggle) {
  return ( Math.random() * wiggle ) * ( Math.random() < 0.5 ? -1 : 1 )
}


var color = -25;
function randomColor(){
  color = Math.floor( ( color % 360 ) + 25 + 15 * Math.random() );
  return 'hsl(' + color + ', 50%, 55%)';
}


/* //////////////////////////////////////// */

function WaterColor(options) {
  if (!(this instanceof WaterColor)) { return new WaterColor(options); }

  for (var key in options) {
    if (options.hasOwnProperty(key)) { this[key] = options[key]; }
  }

  if ( !this.fill ) { this.fill = randomColor(); }
  this.c = Math.floor( Math.random() * 2 );
  this.render();
}

WaterColor.prototype = {
  sides: 6,
  x: 20,
  y: 20,
  ctx: false,

  speed: 0.3,

  maxPoints: 3000,
  maxRender: 5,

  scale: false,

  buildPoints(){

    var wiggle = this.size * 0.15,
        rotation = 0,
        x = -this.size,
        y = 0,
        horizontal = Math.random() > 0.5,
        start = [ x, y ];

    this.points = [ start ];

    for (; rotation < twoPI; rotation += this.speed) {

      x +=
        this.size
        * this.speed
        * Math.sin(rotation)
        * ( horizontal ? 1 : 0.7 )
        + randomWiggle( wiggle ); // * Math.cos( (rotation/twoPI) * twoPI ) );

      y +=
        this.size
        * this.speed
        * Math.cos(rotation)
        * ( horizontal ? 0.7 : 1 )
        + randomWiggle( wiggle );// * Math.cos( (rotation/twoPI) * twoPI) );

      this.points.push([ x, y ]);
    }


    this.points.push( start );

    this.originalPoints = this.points;
    return this.points;
  },

  expandPoints(){

    if ( !this.points ) { return this.buildPoints(); }

    if ( this.points.length > this.maxPoints ) { return false; }

    var wiggle = this.size * 0.05;

    var p = [],
        i = 0,
        len = this.points.length - 1,
        x, y, x2, y2;

    for ( ; i < len; i++) {
      y = this.points[i][1];
      x = this.points[i][0];
      y2 = this.points[i + 1][1];
      x2 = this.points[i + 1][0];
      p.push(
        [x, y],
        [
          (( x2 + x )/2) + randomWiggle(wiggle),
          (( y2 + y )/2) + randomWiggle(wiggle)
        ],
        [x2, y2]
      );
    }

    this.points = p;

    return true;

  },

  c: 0,

  render: function(){
    this.c++;
    if ( this.c < (this.maxRender * 3) ) { requestAnimationFrame(this.render.bind(this)); }
    if ( this.c % 3 == 0 ) { this.draw(this.c / 3); }
  },

  draw: function(c) {

    if (this.ctx) {

      while ( this.expandPoints() ){}

      var ctx = this.ctx;

      var itr = (c/this.maxRender);

      ctx.setTransform(1, 0, 0, 1, 0, 0);

      ctx.globalCompositeOperation = 'hard-light';// 'xor';
      ctx.globalAlpha = 0.25 - ( itr * 0.1 );

      ctx.translate( this.x, this.y );
      if ( this.scale ) { ctx.scale( 1 + itr * 0.2, 1 + itr * 0.2 ); }

      ctx.beginPath();
      ctx.moveTo(this.points[0][0], this.points[0][1]); //this.x + this.size, this.y);

      for (var i = 0, len = this.points.length; i < len; i++) {
        ctx.lineTo( this.points[i][0], this.points[i][1] );
      }

      ctx.closePath();
      ctx.fillStyle = this.fill;
      ctx.fill();

      this.points = this.originalPoints;

    }

    return this;
  }
};



var color = 0;
function makeWatercolor(e){

  var x = width * Math.random(),
      y = height * Math.random();

  if ( e ) {
    e = e.touches ? e.touches[0] : e;
    x = e.clientX || e.x;
    y = e.clientY || e.y;
  }

  ctx.globalAlpha = 0.02;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = '#FFF';
  ctx.fillRect(0, 0, width, height);

  new WaterColor({
    ctx: ctx,
    size: Math.min(width,height) * ( 0.2 + Math.random() * 0.1 ),
    x: x,
    y: y,
    scale: true
  })

}


document.addEventListener('click', makeWatercolor );
document.addEventListener('touchstart', makeWatercolor );


/* ////////////////////////////////////////////////////////////////////////// */


var halfWidth = width / 2,
    halfHeight = height / 2

for (var i = 0, len = 10; i < len; i++ ){

  new WaterColor({
    ctx: ctx,
    size: width * ( 0.7 + Math.random() * 0.1 ),
    x: halfWidth + ( Math.cos( (i / len) * twoPI ) * halfWidth ),
    y: halfHeight + ( Math.sin( (i / len) * twoPI ) * halfHeight )
  });

}

/* */