(function() {
  function Lead() {
    var canvas = window.canvas;
    var ctx = window.ctx;
    var _this = this;

    this.leadInfo = {
      'bodyColor': 'orange',
      'eyeOuterColor': '#fff',
      'eyeInnerColor': '#000',
      'mouseColor': '#fff',
      'aureoleColor': 'red',
      'moveDirection': null,
      'position': {
        'x': canvas.width / 10,
        'y': canvas.height / 10 * 9 - 48,
      },
      'size': {
        'x': 24,
        'y': 24
      }
    }
    this.state = {
      'isAccunulate': false
    }
    this.eyeOuterRadius = this.leadInfo.size.x / 12 * 2;
    this.eyeOuterPosition = {
      'left': {
        'x': this.leadInfo.position.x + this.leadInfo.size.x / 12 + this.eyeOuterRadius,
        'y': this.leadInfo.position.y + this.leadInfo.size.y / 12 + this.eyeOuterRadius
      },
      'right': {
        'x': this.leadInfo.position.x + this.leadInfo.size.x / 12 * 3 + this.eyeOuterRadius * 3,
        'y': this.leadInfo.position.y + this.leadInfo.size.y / 12 + this.eyeOuterRadius
      }
    }
    this.eyeInnerDirection = 'center';
    this.eyeInnerRadius = this.eyeOuterRadius / 2;
    this.eyeInnerPosition = {
      'left': {
        'center': {
          'x': this.eyeOuterPosition.left.x,
          'y': this.eyeOuterPosition.left.y
        },
        'top': {
          'x': this.eyeOuterPosition.left.x,
          'y': this.eyeOuterPosition.left.y - this.eyeInnerRadius
        },
        'bottom': {
          'x': this.eyeOuterPosition.left.x,
          'y': this.eyeOuterPosition.left.y + this.eyeInnerRadius
        },
        'left': {
          'x': this.eyeOuterPosition.left.x - this.eyeInnerRadius,
          'y': this.eyeOuterPosition.left.y
        },
        'right': {
          'x': this.eyeOuterPosition.left.x + this.eyeInnerRadius,
          'y': this.eyeOuterPosition.left.y
        }
      },
      'right': {
        'center': {
          'x': this.eyeOuterPosition.right.x,
          'y': this.eyeOuterPosition.right.y
        },
        'top': {
          'x': this.eyeOuterPosition.right.x,
          'y': this.eyeOuterPosition.right.y - this.eyeInnerRadius
        },
        'bottom': {
          'x': this.eyeOuterPosition.right.x,
          'y': this.eyeOuterPosition.right.y + this.eyeInnerRadius
        },
        'left': {
          'x': this.eyeOuterPosition.right.x - this.eyeInnerRadius,
          'y': this.eyeOuterPosition.right.y
        },
        'right': {
          'x': this.eyeOuterPosition.right.x + this.eyeInnerRadius,
          'y': this.eyeOuterPosition.right.y
        }
      }
    };
    this.eyeInnerCurrentPosition = {
      'left': this.eyeInnerPosition.left.center,
      'right': this.eyeInnerPosition.right.center
    }
    this.mouseSize = {
      'x': this.leadInfo.size.x / 12 * 10,
      'y': this.leadInfo.size.y / 12 * 4,
      'radius': this.leadInfo.size.y / 12 * 2
    };
    this.mouseIsRect = false;
    this.mousePosition = {
      'x': this.leadInfo.position.x + this.leadInfo.size.x / 12,
      'y': this.leadInfo.position.y + this.leadInfo.size.x / 12 + this.eyeOuterRadius * 3,
      'cx': this.leadInfo.position.x + this.leadInfo.size.x / 2,
      'cy': this.leadInfo.position.y + this.leadInfo.size.y / 12 * 3 + this.eyeOuterRadius * 2 + this.mouseSize.radius
    };
    this.aureoleRadius = {
      'min': this.leadInfo.size.x * 0.4,
      'max': this.leadInfo.size.x,
      'current': this.leadInfo.size.x,
      'step': 10 / 1000 * 5
    }
    this.aureolePosition = {
      'x': this.leadInfo.position.x + this.leadInfo.size.x / 2,
      'y': this.leadInfo.position.y + this.leadInfo.size.y / 2
    };
    this.sportInfo = {
      'needAddSpeed': {
        'x': false,
        'y': true
      },
      'addSpeed': {
        'x': 300,
        'y': 600
      },
      'maxSpeed': {
        'x': 240,
        'y': 1200
      },
      'speed': {
        'x': 0,
        'y': 0
      }
    }

    this.draw = draw;
    this.changeMouseState = changeMouseState;
    this.changeEyeState = changeEyeState;
    this.move = move;
    this.updateLeadAllPosition = updateLeadAllPosition;
    this.accunulateJump = accunulateJump;
    this.computeLeadPosition = computeLeadPosition;
    this.updateLeadPositionAndSpeed = updateLeadPositionAndSpeed;
    this.changeAddSpeed = changeAddSpeed;
    this.changeSpeed = changeSpeed;
    this.changeAureoleShrinkSpeed = changeAureoleShrinkSpeed;
    this.changeAureoleIsShow = changeAureoleIsShow;

    function draw() {
      _this.updateLeadAllPosition();

      var pi2 = 2 * Math.PI;
      var leadInfo = _this.leadInfo;
      var eyeOuterRadius = _this.eyeOuterRadius;
      var eyeOuterPosition = _this.eyeOuterPosition;
      var eyeInnerCurrentPosition = _this.eyeInnerCurrentPosition;
      var eyeInnerRadius = _this.eyeInnerRadius;
      var eyeInnerPosition = _this.eyeInnerPosition;
      var mouseIsRect = _this.mouseIsRect;
      var mouseSize = _this.mouseSize;
      var mousePosition = _this.mousePosition;
      var aureoleRadius = _this.aureoleRadius;
      var aureolePosition = _this.aureolePosition;

      // drawAureole
      if (_this.state.isAccunulate) {
        ctx.beginPath();
        ctx.strokeStyle = _this.leadInfo.aureoleColor;
        ctx.arc(aureolePosition.x, aureolePosition.y, aureoleRadius.current, 0, pi2);
        ctx.stroke();
      }
      // draw body
      ctx.beginPath();
      ctx.fillStyle = leadInfo.bodyColor;
      ctx.fillRect(leadInfo.position.x, leadInfo.position.y, leadInfo.size.x, leadInfo.size.y);
      // draw eyeOuter
      ctx.beginPath();
      ctx.fillStyle = leadInfo.eyeOuterColor;
      ctx.arc(eyeOuterPosition.left.x, eyeOuterPosition.left.y, eyeOuterRadius, 0, pi2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(eyeOuterPosition.right.x, eyeOuterPosition.right.y, eyeOuterRadius, 0, pi2);
      ctx.fill();
      // draw eyeInner
      ctx.beginPath();
      ctx.fillStyle = leadInfo.eyeInnerColor;
      ctx.arc(eyeInnerCurrentPosition.left.x, eyeInnerCurrentPosition.left.y, eyeInnerRadius, 0, pi2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(eyeInnerCurrentPosition.right.x, eyeInnerCurrentPosition.right.y, eyeInnerRadius, 0, pi2);
      ctx.fill();
      // draw mouse
      ctx.beginPath();
      ctx.fillStyle = leadInfo.mouseColor;
      if (mouseIsRect) {
        ctx.fillRect(mousePosition.x, mousePosition.y, mouseSize.x, mouseSize.y);
      } else {
        ctx.arc(mousePosition.cx, mousePosition.cy, mouseSize.radius, 0, pi2);
        ctx.fill();
      }
    }

    function changeMouseState(state) {
      if (state === 'circle') {
        _this.mouseIsRect = false;
      } else if (state === 'square') {
        _this.mouseIsRect = true;
      }
    }

    function changeEyeState(position) {
      if (position === 'top' || position === 'bottom' || position === 'left' || position === 'right' || position === 'center') {
        _this.eyeInnerDirection = position;
        _this.eyeInnerCurrentPosition.left = _this.eyeInnerPosition.left[position];
        _this.eyeInnerCurrentPosition.right = _this.eyeInnerPosition.right[position];
      }
    }

    function updateLeadAllPosition() {
      computeEyeOuterPosition();
      computeEyeInnerPosition();
      computeMousePosition();
      computeAureolePosition();

      function computeEyeOuterPosition() {
        _this.eyeOuterPosition = {
          'left': {
            'x': _this.leadInfo.position.x + _this.leadInfo.size.x / 12 + _this.eyeOuterRadius,
            'y': _this.leadInfo.position.y + _this.leadInfo.size.y / 12 + _this.eyeOuterRadius
          },
          'right': {
            'x': _this.leadInfo.position.x + _this.leadInfo.size.x / 12 * 3 + _this.eyeOuterRadius * 3,
            'y': _this.leadInfo.position.y + _this.leadInfo.size.y / 12 + _this.eyeOuterRadius
          }
        };
      }

      function computeEyeInnerPosition() {
        _this.eyeInnerPosition = {
          'left': {
            'center': {
              'x': _this.eyeOuterPosition.left.x,
              'y': _this.eyeOuterPosition.left.y
            },
            'top': {
              'x': _this.eyeOuterPosition.left.x,
              'y': _this.eyeOuterPosition.left.y - _this.eyeInnerRadius
            },
            'bottom': {
              'x': _this.eyeOuterPosition.left.x,
              'y': _this.eyeOuterPosition.left.y + _this.eyeInnerRadius
            },
            'left': {
              'x': _this.eyeOuterPosition.left.x - _this.eyeInnerRadius,
              'y': _this.eyeOuterPosition.left.y
            },
            'right': {
              'x': _this.eyeOuterPosition.left.x + _this.eyeInnerRadius,
              'y': _this.eyeOuterPosition.left.y
            }
          },
          'right': {
            'center': {
              'x': _this.eyeOuterPosition.right.x,
              'y': _this.eyeOuterPosition.right.y
            },
            'top': {
              'x': _this.eyeOuterPosition.right.x,
              'y': _this.eyeOuterPosition.right.y - _this.eyeInnerRadius
            },
            'bottom': {
              'x': _this.eyeOuterPosition.right.x,
              'y': _this.eyeOuterPosition.right.y + _this.eyeInnerRadius
            },
            'left': {
              'x': _this.eyeOuterPosition.right.x - _this.eyeInnerRadius,
              'y': _this.eyeOuterPosition.right.y
            },
            'right': {
              'x': _this.eyeOuterPosition.right.x + _this.eyeInnerRadius,
              'y': _this.eyeOuterPosition.right.y
            }
          }
        };
        _this.eyeInnerCurrentPosition.left = _this.eyeInnerPosition.left[_this.eyeInnerDirection];
        _this.eyeInnerCurrentPosition.right = _this.eyeInnerPosition.right[_this.eyeInnerDirection];
      }

      function computeMousePosition() {
        _this.mousePosition = {
          'x': _this.leadInfo.position.x + _this.leadInfo.size.x / 12,
          'y': _this.leadInfo.position.y + _this.leadInfo.size.x / 12 + _this.eyeOuterRadius * 3,
          'cx': _this.leadInfo.position.x + _this.leadInfo.size.x / 2,
          'cy': _this.leadInfo.position.y + _this.leadInfo.size.y / 12 * 3 + _this.eyeOuterRadius * 2 + _this.mouseSize.radius
        };
      }

      function computeAureolePosition() {
        var aureoleRadius = _this.aureoleRadius;
        _this.aureolePosition.x = _this.leadInfo.position.x + _this.leadInfo.size.x / 2;
        _this.aureolePosition.y = _this.leadInfo.position.y + _this.leadInfo.size.y / 2;
        aureoleRadius.current = aureoleRadius.current - aureoleRadius.step;
        if (aureoleRadius.current < aureoleRadius.min) {
          aureoleRadius.current = aureoleRadius.max;
        }
        _this.aureoleRadius.current = aureoleRadius.current;
      }
    }

    function move(direction) {
      if (direction === 'left' || direction === 'right' || direction === 'top' || direction === 'bottom') {
        _this.leadInfo.moveDirection = direction;
      }
    }

    function accunulateJump(accunulateTime) {
      var accunulateSpeedPerTime = - 1200;

      if (_this.sportInfo.needAddSpeed.y) {
        var accunulateSpeed = accunulateSpeedPerTime * accunulateTime;
        _this.sportInfo.speed.y = accunulateSpeed;
      }
    }

    function computeLeadPosition(intervalTime) {
      var addSpeed = _this.sportInfo.addSpeed;
      var maxSpeed = _this.sportInfo.maxSpeed;
      var position = _this.leadInfo.position;
      var speed = _this.sportInfo.speed;
      var moveDirection = _this.leadInfo.moveDirection;

      if (moveDirection === 'left' || moveDirection === 'right' || moveDirection === 'top' || moveDirection === 'bottom' || moveDirection === null) {
        var xResult = computeXYPosition('x');
        var yResult = computeXYPosition('y');
        return {
          'x': xResult,
          'y': yResult
        }
      }

      function computeXYPosition(direction) {
        if (_this.sportInfo.needAddSpeed[direction]) {
          var currentSpeed = speed[direction] + addSpeed[direction] * (intervalTime / 1000);
          var computedSpeed = currentSpeed > maxSpeed[direction] ? maxSpeed[direction] : currentSpeed;
          return {
            'before': position[direction],
            'after': position[direction] + computedSpeed * (intervalTime / 1000),
            'speed': computedSpeed
          };
        } else {
          return {
            'before': position[direction],
            'after': position[direction] + speed[direction] * (intervalTime / 1000),
            'speed': speed[direction]
          };
        }
      }
    }

    function updateLeadPositionAndSpeed (position) {
      updateXYPositionAndSpeed('x');
      updateXYPositionAndSpeed('y');

      function updateXYPositionAndSpeed(direction) {
        _this.sportInfo.speed[direction] = position[direction].speed;
        _this.leadInfo.position[direction] = position[direction].after;
      }
    }

    function changeAddSpeed (direction, addSpeed) {
      _this.sportInfo.addSpeed[direction] = addSpeed;
    }

    function changeSpeed(direction, speed) {
      _this.sportInfo.speed[direction] = speed;
    }

    function changeAureoleShrinkSpeed(speed, intervalTime) {
      var speed = speed || 5;
      var intervalTime = intervalTime || 5;
      _this.aureoleRadius.step = speed / 1000 * intervalTime;
    }

    function changeAureoleIsShow(state) {
      if (state === true || state === false) {
        _this.state.isAccunulate = state;
      }
    };
  }

  game.lead = new Lead();
})();