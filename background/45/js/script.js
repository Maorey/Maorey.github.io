Laro.register('JxHome', function (La) {
	var pkg = this;
	var bugBalls;
	this.initStage = function () {
		var canvas = document.getElementById('canvas');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		
		this.canvas = canvas;
		this.stage = new CVS.$stage(canvas);
		this.ctx = this.stage.ctx;
		this.vpx = canvas.width/2;
		this.vpy = canvas.height/2;
		this.normalN = 100;
		this.normalBalls = [];
		this.angleX = 0.001;
		this.angleY = 0.001;
		
		this.zstep = 1;
		this.zflag = 1;
	}
	
	this.range = function (a, b) 
	{
        return Math.floor(Math.random()*(b-a) + a);
    }
	
	this.tween = function (ball, t) 
	{
		if (!ball.end) 
		{
			var _x = ball.xpos, _y = ball.ypos, _z = ball.zpos;
			var _t = (+new Date) - ball.startAnimTime;
			ball.xpos = ball.f_xpos + (ball.t_xpos - ball.f_xpos)*Math.sin(Math.PI*_t/(2*t));
			ball.ypos = ball.f_ypos + (ball.t_ypos - ball.f_ypos)*Math.sin(Math.PI*_t/(2*t));
			ball.zpos = ball.f_zpos + (ball.t_zpos - ball.f_zpos)*Math.sin(Math.PI*_t/(2*t));
			
			if (_t >= t) 
			{
				ball.end = true;
			}
		}
	}
	
	this.addNormalBalls = function (n) 
	{
		var vpx = this.vpx, vpy = this.vpy, range = this.range, stage = this.stage,
			_this = this;
		if (n) {
			this.normalN = n;
		}
		for (var i=0; i< this.normalN; i++) {

			var ball = CVS.createPoint3D(this.stage.ctx, function () {
                var color = 'rgb('+range(200, 255)+', '+range(40, 255)+', '+range(80, 180)+')';

				this.xpos = range(-vpx, vpx);
				this.ypos = range(-vpy, vpy);
				this.zpos = range(-vpx, vpx);

				this.width = range(8, 15);
				this.w = this.width;
				this.draw = function () {
					this.ctx.beginPath();
					this.ctx.arc(0, 0, this.width/2, 0, Math.PI*2, true);
					this.ctx.closePath();
                    this.ctx.fillStyle = color;
					this.ctx.fill();
				}
			});
			ball.type = 'normal';
			ball.setVanishPoint(vpx, vpy);
			ball.setCenterPoint(0, 0, 0);
			stage.addChild(ball);
			this.normalBalls.push(ball);
		}
	}
	
	this.updateBalls = function (dt, name) 
	{
		var balls = this.particleHash[name];
		this._updateBalls(dt,balls);
	};
	
	this._updateBalls = function (dt,balls) 
	{
		for (var i = 0; i < balls.length; i ++) {
			var ball = balls[i];
			
			ball.zpos += JxHome.zstep;

			ball.rotateX(this.angleX);
			ball.rotateY(this.angleY);
			var scale = ball.getScale(),
			pos = ball.getScreenXY();
			ball.width = Math.max(10*scale, 2);
			ball.x = pos.x;
			ball.y = pos.y;
		}
	};

	this.pushBalls = function (name) 
	{
		var balls = this.particleHash[name];
		for (var i = 0; i < balls.length; i ++) {
			var ball = balls[i];
			JxHome.stage.addChild(ball);
			ball.end = false;
			ball.width = ball.logoPos.width;
			ball.color = 'rgb('+ball.logoPos.r+', '+ball.logoPos.g+', '+ball.logoPos.b+')';
			ball.startAnimTime = (+ new Date);
			
		}
	}
	
	this.bindStage = function () {
		var _this = this;
		this.stage.addEventListener('mousemove', function (x, y) {
			_this.angleY = (x - _this.vpx) * .00001;
            _this.angleX = (y - _this.vpy) * .00001;
		});
	}
	
	this.initParticles = function () 
	{
		this.qqParticles = this.getParticles('youtext',47,11);
		this.jxParticles = this.getParticles('designIco',29,5);
		this.qplusParticles = this.getParticles('h5ico',28,5);
		this.atParticles = this.getParticles('cs3',21,5);
		
		this.particleHash = 
		{
			'normal': this.normalBalls,
			'youtext': this.qqParticles,
			'designIco': this.jxParticles,
			'h5ico': this.qplusParticles,
			'cs3': this.atParticles
		}
	}
	
	this.getParticles = function (id, w, h, z) 
	{
		if (z == undefined) { z = 0; }
		//
		var image = document.getElementById(id);
		//
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		this.ctx.drawImage(image, 0, 0, w, h, Math.round(this.canvas.width/2-w/2), Math.round(this.canvas.height/2-h/2), w, h);
		
		var imageData = this.ctx.getImageData(Math.round(this.canvas.width/2-w/2), Math.round(this.canvas.height/2-h/2), w, h);
		//
		////////////////////////
		var ret = [];
		for (var x = 0; x < imageData.width; x++) 
		{
			for (var y = 0; y < imageData.height; y++) 
			{
				var i = 4*(y * imageData.width + x);
                if (imageData.data[i + 3] > 128) 
				{
					//------------------------
					var r = imageData.data[i],
						g = imageData.data[i + 1],
						b = imageData.data[i + 2];
					ret.push(new JxHome.Particle(this.stage, this.canvas, id, w, h, x, y, z, r, g, b));
				}
			}
		}
		return ret;
	}
	
	this.init = function () 
	{
		this.initStage();
		this.bindStage();
		this.initParticles();
		
		JxHome.$fsm.init();
		JxHome.$loop.init();
	}
});

Laro.register('JxHome', function (La) {
	var pkg = this,
		range = JxHome.range,
		vpx = JxHome.vpx,
		vpy = JxHome.vpy;
	
	this.Particle = function (stage, canvas, id, w, h, x, y, z, r, g, b) {
		this.canvas = canvas;
		
		var vpx = canvas.width/2,
			vpy = canvas.height/2;

		var ball =  CVS.createPoint3D(stage.ctx, function () 
		{
			var color = 'rgb('+ range(200, 255) +', '+ range(200, 255) +', '+ range(200, 255) +')';
			var a = Math.PI * 2 * Math.random();
            var b = Math.PI * 2 * Math.random();
			var r = range(vpx, vpy);

				this.xpos = Math.sin(a) * Math.sin(b) * r;
				this.ypos = Math.cos(a) * Math.sin(b) * r;
				this.zpos = -Math.abs(Math.cos(b) * r);
				
				this.width = range(3, 15);
				this.color = color;
				this.draw = function () 
				{
					this.ctx.beginPath();
					this.ctx.arc(0, 0, this.width/2, 0, Math.PI*2, true);
					this.ctx.closePath();
                    this.ctx.fillStyle = this.color;
					this.ctx.fill();
				}
		});

		ball.logoPos = 
		{//影响粒子密度
			x: (x-w/2)*11,
			y: (y-h/2)*11,
			z: Math.round((1100-this.canvas.width)/5),
			width: 10,
			r: r,
			g: g,
			b: b
		};
		
		ball.f_xpos = ball.xpos;
		ball.f_ypos = ball.ypos;
		ball.f_zpos = ball.zpos;
		ball.t_xpos = ball.logoPos.x;
		ball.t_ypos = ball.logoPos.y;
		ball.t_zpos = ball.logoPos.z;
		
		ball.startAnimTime = (+new Date);
		ball.end = true;
		ball.type = id;
		
		ball.setVanishPoint(canvas.width/2, canvas.height/2);
		ball.setCenterPoint(0, 0, z);
		
		ball.moveX = 1 - Math.random()*2;
		return ball;
	}
});

Laro.register('JxHome.$states', function (La) {
	var pkg = this;
	
	this.No = La.BaseState.extend(function () {
	
	}).methods({
		enter: function (msg, fromState)
		{
			this._t = 0;
			JxHome.addNormalBalls();
		},
		leave: function () 
		{
			
		},
		update: function (dt) {
			this._t += dt;
			JxHome.updateBalls(dt, 'normal');
		},
		transition: function () { 
			if (this._t > 2) { 
				this.host.setState(1);
			} 
		},
		draw: function () {
			
		}
	});
	
	this.QQ = La.BaseState.extend(function () {
	
	}).methods({
		enter: function (msg, fromState) 
		{
			this.push = false;
			this._t = 0;
			this.explosion = false;
		},
		leave: function () 
		{
			for (var i = 0; i < JxHome.stage.children.length; i++) 
			{
				var ball = JxHome.stage.children[i];
				//ball.type == 'cs3' 在循环时清除最后一组粒子，非常重要!!!!
				if (ball.type == 'normal' || ball.type == 'cs3' ) 
				{
					JxHome.stage.children.splice(i, 1);
					i --;
				}
			}
		},
		update: function (dt) 
		{
			this._t += dt;
			JxHome.updateBalls(dt, 'normal');
			if(JxHome.bugBalls)JxHome._updateBalls(dt, JxHome.bugBalls);
			//最后一组动画停滞BUG
			
			//////////
			////////
			////
			if (this._t > 2 && !this.push)
			{
				JxHome.pushBalls('youtext');
				this.push = true;
			}
			//
			if (this.push) 
			{
			    for (var i = 0; i < JxHome.qqParticles.length; i ++) 
			    {
				    var ball = (JxHome.qqParticles[i]);
					
				    JxHome.tween(ball, 1000);
				    ball.zpos += JxHome.zstep;
				
				    ball.rotateX(JxHome.angleX);
				    ball.rotateY(JxHome.angleY);
				    var scale = ball.getScale(),
				    pos = ball.getScreenXY();
				
				    ball.width = Math.max(10*scale, 2);
				    ball.x = pos.x;
				    ball.y = pos.y;
			    }
			}
		},
		transition: function () 
		{
			var range = JxHome.range,
				vpx = JxHome.vpx,
				vpy = JxHome.vpy;
			if (this._t > 5 && !this.explosion) 
			{
				for (var i = 0; i < JxHome.qqParticles.length; i ++) 
				{
					var ball = JxHome.qqParticles[i];
					ball.f_xpos = ball.xpos;
					ball.f_ypos = ball.ypos;
					ball.f_zpos = ball.zpos;
					ball.t_xpos = range(-vpx, vpx);
					ball.t_ypos = range(-vpy, vpy);
					ball.t_zpos = range(-vpx, vpx);
					
					ball.end = false;
					ball.width = range(8, 15);
					ball.startAnimTime = (+ new Date);
				}
				this.explosion = true;
				this.explosionT = (+new Date);
			}
			if (this.explosion && (+new Date) - this.explosionT >= 1000) {
				this.host.setState(2);
			}
		},
		draw: function () {
		
		}
	});
	
	this.Jx = La.BaseState.extend(function () {
	
	}).methods({
		enter: function (msg, fromState) {
			//console.log('designIco')

			this.push = false;
			this._t = 0;
			this.explosion = false;
		},
		leave: function () {
			for (var i = 0; i < JxHome.stage.children.length; i ++) {
				var ball = JxHome.stage.children[i];
				if (ball.type == 'youtext') {
					JxHome.stage.children.splice(i, 1);
					i --;
				}
			}
		},
		update: function (dt) {
			this._t += dt;
			JxHome.updateBalls(dt, 'youtext');
			
			if (this._t > 2 && !this.push) {
				JxHome.pushBalls('designIco');
				this.push = true;
			}
			if (this.push) {
				for (var i = 0; i < JxHome.jxParticles.length; i ++) 
				{
					var ball = (JxHome.jxParticles[i]);

					JxHome.tween(ball, 1000);
					ball.zpos += JxHome.zstep;
					
					ball.rotateX(JxHome.angleX);
					ball.rotateY(JxHome.angleY);
					var scale = ball.getScale(),
					pos = ball.getScreenXY();
					
					ball.width = Math.max(10*scale, 2);
					ball.x = pos.x;
					ball.y = pos.y;
				}
			}
			
			// explosion
			//this.checkExplosion();
		},
		transition: function () 
		{
			var range = JxHome.range,
				vpx = JxHome.vpx,
				vpy = JxHome.vpy;
			if (this._t > 5 && !this.explosion) {
				for (var i = 0; i < JxHome.jxParticles.length; i ++) {
					var ball = JxHome.jxParticles[i];

					ball.f_xpos = ball.xpos;
					ball.f_ypos = ball.ypos;
					ball.f_zpos = ball.zpos;
					ball.t_xpos = range(-vpx, vpx);
					ball.t_ypos = range(-vpy, vpy);
					ball.t_zpos = range(-vpx, vpx);
					
					ball.end = false;
					ball.width = range(8, 15);
					ball.startAnimTime = (+ new Date);
				}
				this.explosion = true;
				this.explosionT = (+new Date);
			}
			if (this.explosion && (+new Date) - this.explosionT >= 1000) {
				this.host.setState(3);
			}
		},
		draw: function () {
		
		}
	});
	
	this.QPlus = La.BaseState.extend(function () {
		
	}).methods({
		enter: function (msg, fromState) {
			this.push = false;
			this._t = 0;
			this.explosion = false;
		},
		leave: function () {
			for (var i = 0; i < JxHome.stage.children.length; i ++) {
				var ball = JxHome.stage.children[i];
				if (ball.type == 'designIco') {
					JxHome.stage.children.splice(i, 1);
					i --;
				}
			}
		},
		update: function (dt) {
			this._t += dt;
			JxHome.updateBalls(dt, 'designIco');
			
			if (this._t > 2 && !this.push) {
				JxHome.pushBalls('h5ico');
				this.push = true;
			}
			
			if (this.push) {
				for (var i = 0; i < JxHome.qplusParticles.length; i ++) 
				{
					var ball = (JxHome.qplusParticles[i]);

					JxHome.tween(ball, 1000);
					ball.zpos += JxHome.zstep;
					
					ball.rotateX(JxHome.angleX);
					ball.rotateY(JxHome.angleY);
					var scale = ball.getScale(),
					pos = ball.getScreenXY();
					
					ball.width = Math.max(10*scale, 2);
					ball.x = pos.x;
					ball.y = pos.y;
				}
			}
			//this.checkExplosion();
		},
		transition: function () {
			var range = JxHome.range,
				vpx = JxHome.vpx,
				vpy = JxHome.vpy;
			if (this._t > 5 && !this.explosion) {
				for (var i = 0; i < JxHome.qplusParticles.length; i ++) {
					var ball = JxHome.qplusParticles[i];

					ball.f_xpos = ball.xpos;
					ball.f_ypos = ball.ypos;
					ball.f_zpos = ball.zpos;
					ball.t_xpos = range(-vpx, vpx);
					ball.t_ypos = range(-vpy, vpy);
					ball.t_zpos = range(-vpx, vpx);
					
					ball.end = false;
					ball.width = range(8, 15);
					ball.startAnimTime = (+ new Date);
				}
				this.explosion = true;
				this.explosionT = (+new Date);
			}
			if (this.explosion && (+new Date) - this.explosionT >= 1000) {
				this.host.setState(4);
			}
		},
		draw: function () {
		
		}
	});
	
	this.AT = La.BaseState.extend(function () {
	
	}).methods({
		enter: function (msg, fromState) 
		{
			this.push = false;
			this._t = 0;
			this.explosion = false;
		},

		leave: function () 
		{
		    for (var i = 0; i < JxHome.stage.children.length; i ++) {
				var ball = JxHome.stage.children[i];
				if (ball.type == 'h5ico') 
				{
					JxHome.stage.children.splice(i, 1);
					i --;
				}
			}
		},
		
		update: function (dt) 
		{
			this._t += dt;
			JxHome.updateBalls(dt, 'h5ico');
			
			if (this._t > 2 && !this.push) 
			{
				JxHome.pushBalls('cs3');
				this.push = true;
			}
			
			if (this.push) 
			{
				for (var i = 0; i < JxHome.atParticles.length; i ++) 
				{
					var ball = (JxHome.atParticles[i]);
					
					JxHome.tween(ball, 1000);
					ball.zpos += JxHome.zstep;
					
					ball.rotateX(JxHome.angleX);
					ball.rotateY(JxHome.angleY);
					var scale = ball.getScale(),
					pos = ball.getScreenXY();

					ball.width = Math.max(10*scale, 2);
					ball.x = pos.x;
					ball.y = pos.y;
				}
			}
			//this.checkExplosion();
		},
		transition: function() 
		{
			var range = JxHome.range,
				vpx = JxHome.vpx,
				vpy = JxHome.vpy;
			if(this._t > 5 && !this.explosion)
			{
				for (var i = 0; i < JxHome.atParticles.length; i ++) 
				{
					var ball = JxHome.atParticles[i];
					
					ball.f_xpos = ball.xpos;
					ball.f_ypos = ball.ypos;
					ball.f_zpos = ball.zpos;
					ball.t_xpos = range(-vpx, vpx);
					ball.t_ypos = range(-vpy, vpy);
					ball.t_zpos = range(-vpx, vpx);
					
					ball.end = false;
					ball.width = range(8, 15);
					ball.startAnimTime = (+ new Date);
				}
				this.explosion = true;
				this.explosionT = (+new Date);
			}
			if (this.explosion && (+new Date) - this.explosionT >= 1000) 
			{
				//
				if (this._t > 7) 
				{
					//解决最后一组动画停滞BUG
					JxHome.bugBalls = JxHome.particleHash['cs3'];
					//循环实现，重新获取粒子地图数据
					JxHome.initParticles();
					//回到第一组动画
					this.host.setState(1);
			    }
			}
		},
		draw: function () {
		
		}
	});
});

Laro.register('JxHome.$fsm', function (La) 
{
	var pkg = this;
	
	this.init = function () 
	{
		this.getStatesList();
		this.$ = new La.AppFSM(this, this.statesList);
		this.$.setState(0);
	}
	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	this.getStatesList = function () 
	{
		this.statesList = [
			0, JxHome.$states.No,
			1, JxHome.$states.QQ,
			2, JxHome.$states.Jx,
			3, JxHome.$states.QPlus,
			4, JxHome.$states.AT
		];
	}
	
	this.setState = function (state, msg, suspendCurrent)
	{
		this.$.setState(state, msg, suspendCurrent);
	}
});

Laro.register('JxHome.$loop', function (La) 
{
	var pkg = this;
	
	this.init = function () {
		this.$ = new La.Loop(this.looper, this);
	}
	
	this.looper = function (dt) 
	{
		this.update(dt);
		this.draw();
	}
	this.update = function (dt) {
		JxHome.$fsm.$.update(dt);
		if (JxHome.zstep > 2 || JxHome.zstep < -2) 
		{
			JxHome.zflag *= -1;
		}
		JxHome.zstep += JxHome.zflag*0.01;
	}
	this.draw = function () 
	{
		JxHome.ctx.clearRect(0, 0, JxHome.canvas.width, JxHome.canvas.height);
		JxHome.stage.render();
		JxHome.$fsm.$.draw();
	}
});
///////////////////////////////////////////////////////////////////////////////
window.onload = function () 
{ 
	JxHome.init();
}
$(window).resize(function() {
window.location.href = "index.html";
});