(function() {
  var leadInfo = game.lead.leadInfo;
  var canvas = window.canvas;
  var ctx = window.ctx;
  var leadInfo = game.lead.leadInfo;


  function Block() {
    var _this = this;

    this.blockInfo = {
      'minWidth': leadInfo.size.x * 3,
      'maxWidth': leadInfo.size.x * 6,
      'minHeight': canvas.height / 10 * 7.5,
      'maxHeight': canvas.height / 10 * 9,
      'color': randomColorNotWhite()
    };
    this.positionArr = [{
      'x1': canvas.width / 10 - leadInfo.size.x,
      'x2': canvas.width / 10 + leadInfo.size.x * 2,
      'y': Math.ceil(canvas.height / 10 * 9),
      'color': randomColorNotWhite()
    }];
    this.toMaxRandomScore = 6;
    this.totalBlockNum = 0;

    this.checkBlockIsEnough = checkBlockIsEnough;
    this.createBlock = createBlock;
    this.resetBlockInfo = resetBlockInfo;
    this.draw = draw;

    function checkBlockIsEnough() {
      var canvasWidth = canvas.width;
      var lastPointPosition = _this.positionArr[_this.positionArr.length - 1].x2;
      if (lastPointPosition < canvasWidth) {
        return false;
      } else {
        return true;
      }
    }

    function createBlock() {
      var toMaxRandomScore = _this.toMaxRandomScore;
      var totalBlockNum = _this.totalBlockNum;
      totalBlockNum = totalBlockNum > toMaxRandomScore ? toMaxRandomScore : totalBlockNum;

      var canvasWidth = canvas.width;
      var lastBlock = _this.positionArr[_this.positionArr.length - 1];
      var newBlockHeight = Math.ceil(_this.blockInfo.maxHeight - (_this.blockInfo.maxHeight - _this.blockInfo.minHeight) * Math.random() * totalBlockNum / toMaxRandomScore);
      var minDistance1 = Math.round(leadInfo.size.x * 1.5);
      var minDistance2 = Math.abs(_this.positionArr[_this.positionArr.length - 1].y - newBlockHeight);
      var minDistance = minDistance1 > minDistance2 ? minDistance1 : minDistance2;
      var maxDistance = minDistance * 5;
      var width = Math.ceil(_this.blockInfo.minWidth + (_this.blockInfo.maxWidth - _this.blockInfo.minWidth) * Math.random());
      var distance = Math.ceil(minDistance + (maxDistance - minDistance) * randomNoZero() * totalBlockNum / toMaxRandomScore);
      var newBlockPosition = {
        'x1': lastBlock.x2 + distance,
        'x2': lastBlock.x2 + distance + width,
        'y': newBlockHeight,
        'color': randomColorNotWhite()
      }
      _this.positionArr.push(newBlockPosition);
      _this.totalBlockNum ++;
    }

    function resetBlockInfo() {
      _this.totalBlockNum = 0;
      _this.positionArr = [{
        'x1': canvas.width / 10 - leadInfo.size.x,
        'x2': canvas.width / 10 + leadInfo.size.x * 2,
        'y': Math.ceil(canvas.height / 10 * 9),
        'color': randomColorNotWhite()
      }];
    }

    function draw() {
      var blockInfo = _this.blockInfo;
      var positionArr = _this.positionArr;

      positionArr.forEach(function(position) {
        var startX = position.x1;
        var startY = position.y;
        var width = position.x2 - position.x1;
        var height = canvas.height - position.y;
        ctx.beginPath();
        ctx.fillStyle = position.color;
        ctx.fillRect(startX, startY, width, height);
      })
    }
  }

  function randomNoZero() {
    var num = Math.random();
    while (num) {
      return num;
    }
    return randomNoZero();
  }

  function randomColorNotWhite () {
    var colorNum = randomColor();
    while (colorNum < 950) {
      return '#' + colorNum;
    }
    return randomColorNotWhite();
    function randomColor () {
      return '' + Math.round(Math.random() * 9) + Math.round(Math.random() * 9) + Math.round(Math.random() * 9);
    }
  }

  game.block = new Block();
})();