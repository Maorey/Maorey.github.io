(function(global) {
  var canvasId = 'canvas-game';
  var canvas = document.getElementById(canvasId);
  var ctx = canvas.getContext('2d');
  var imgMethod = new ImgMethod();
  var imgObject = {};
  var width = document.body.clientWidth;
  var height = document.body.clientHeight;

  var coverScreenTimer = null;
  var coverInterval = 5;    // 定时器间隔
  var coverColor = '#ddd';  // 覆盖层背景色
  var fontSize = 40;        // 字体大小

  canvas.width = width;
  canvas.height = height;

  function ImgMethod() {
    var _this = this;
    var imageNum = 0;
    var readyImageNum = 0;

    this.isAllImageReady = false;
    this.checkTimer = null;
    this.getImage = getImage;
    this.checkImageIsAllReady = checkImageIsAllReady;
    this.imgObj = {
      // 'background': 'assets/background.jpg',
      // 'background2': 'assets/background2.jpg'
    }

    function getImage() {
      for (var imgName in _this.imgObj) {
        imageNum ++;
      }

      for (var imgName in _this.imgObj) {
        var img = new Image();
        img.src = _this.imgObj[imgName];
        img.onload = function () {
          imgObject[imgName] = img;
          readyImageNum ++;
        }
      }
    }

    function checkImageIsAllReady(callback) {
      clearInterval(_this.checkTimer);
      _this.checkTimer = setInterval(function () {
        if (readyImageNum >= imageNum) {
          clearInterval(_this.checkTimer);
          _this.isAllImageReady = true;
          callback && callback();
        }
      }, 10)
    }
  }

  function Score() {
    var _this = this;
    this.score = 0;
    this.textColor = '#000';

    this.computeScore = computeScore;
    this.resetScore = resetScore;
    this.draw = draw;

    function computeScore(number) {
      if (number) {
        _this.score = _this.score + number;
      }
      return _this.score;
    }

    function resetScore(number) {
      _this.score = number || 0;
    }

    function draw() {
      var textWidth = ctx.measureText('当前得分:' + _this.score).width + 5;
      ctx.beginPath();
      ctx.fillStyle = _this.textColor;
      ctx.font = fontSize + 'px Arial';
      ctx.fillText('当前得分:' + _this.score, canvas.width - textWidth, 5);
    }
  }

  function coverFullScreen(isCover, callback) {
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var coverBlockNum = 15;
    var stepHeight = canvasHeight / coverBlockNum;
    var currentCover = 0;
    var coverTotalTime = 300;          //单位ms
    var perCoverHeight = stepHeight * coverInterval / coverTotalTime;
    var coverStartPointArr = [];
    for (var i = 0; i < coverBlockNum; i ++) {
      coverStartPointArr.push(stepHeight * i);
    }
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.beginPath();

    isCover ? coverAll() : cancelCoverAll();

    function coverAll() {
      coverScreenTimer = setInterval(function () {
        ctx.fillStyle = coverColor;
        if (currentCover >= stepHeight) {
          clearInterval(coverScreenTimer);
          coverScreenTimer = null;
        }
        coverStartPointArr.forEach(function (positionY) {
          ctx.fillRect(0, positionY, canvasWidth, currentCover);
        });
        currentCover += perCoverHeight;
        currentCover = currentCover > stepHeight ? stepHeight : currentCover;
        if (currentCover >= stepHeight) {
          callback && callback();
        }
      }, coverInterval);
    }

    function cancelCoverAll() {
      ctx.fillStyle = coverColor;
      currentCover = stepHeight;

      coverScreenTimer = setInterval(function() {
        ctx.beginPath();
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = coverColor;
        if (currentCover <= 0) {
          clearInterval(coverScreenTimer);
          coverScreenTimer = null;

        }
        coverStartPointArr.forEach(function (positionY) {
          ctx.fillRect(0, positionY, canvasWidth, currentCover);
        });
        currentCover -= perCoverHeight;
        currentCover = currentCover < 0 ? 0 : currentCover;
        if (currentCover <= 0) {
          callback && callback();
        }
      }, coverInterval);
    }
  }

  function Help () {
    _this = this;
    this.showState = false;
    this.element = document.getElementById('help');

    this.changeHelpShowState = changeHelpShowState;
    this.changeHelpContent = changeHelpContent;

    function changeHelpShowState(state) {
      _this.showState = state;
      _this.element.style.display = state === true ? 'block' : 'none';
    }

    function changeHelpContent(content) {
      _this.element.innerHTML = content;
    }
  }

  global.score = new Score();
  global.canvas = canvas;
  global.ctx = ctx;
  global.game = {
    'controller': {
      'coverFullScreen': coverFullScreen,
    },
    'help': new Help()
  };

  global.img = {
    'imgMethod': imgMethod,
    'imgObject': imgObject
  };
})(window);