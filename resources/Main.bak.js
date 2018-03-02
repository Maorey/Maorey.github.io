var loadData;
var pairs;
var pairsIndexes;
var names;
var hds;
var visMagnitudes;
var absMagnitudes;
var allCoordinates;
var allDistances;
var distances;
var coordinates;
var radius;
var normalizedDistances;
var normalizedDistancesA;
var normalizedDistancesV;
var interpolatedDistances;
var radiusV;
var radiusVA;
var radiusAV;
var radiusA;
var coordinatesV;
var coordinatesVA;
var coordinatesAV;
var coordinatesA;
var maxDistance;
var maxVisMagnitude;
var minVisMagnitude;
var maxAbsMagnitude;
var minAbsMagnitude;
var filter_by_constellations = true;
var selectedV = true;
var fromAToAV = false;
var fromVAToV = false;
var fromVToVA = false;
var fromAVToA = false;
var loading = true;
var interpolatingDistances=true;
var t=0;
var tInterpolationDistances=1;
var tInterpolationDistancesFinal=1;
var cX;
var cY;
var rSphere = 300;
var engine3D;
var dragging;
var rotationVector = new Point(0.0016,0.0012);
///////VIEWS
var view1 = {
	'n':1,
	'linesColor':'rgb(255,255,255)',
	'starsColor':'rgb(0,255,255)',
	'backgroundColor':'#000000',
	'textsColor':'WHITE',
	'maxStarArea':60,
	'vMagProportion':0.14,
	'aMagProportion':0.02,
	'interpolationSpeed':0.02,
	'filterByConstellations':false,
	'magnitudesInterpolation':true,
	'distancesInterpolation':false,
	'lens3D':600,
	'initZoom':2.1
};
var view2 = {
	'n':2,
	'linesColor':'rgb(150,150,150)',
	'starsColor':'rgb(100,100,100)',
	'starsDepthColor':'rgb(180,180,180)',
	'backgroundColor':'#FFFFFF',
	'textsColor':'DARKGRAY',
	'maxStarArea':60,
	'vMagProportion':0.1,
	'aMagProportion':0.02,
	'interpolationSpeed':0.01,
	'filterByConstellations':true,
	'magnitudesInterpolation':true,
	'distancesInterpolation':true,
	'lens3D':400,
	'initZoom':1.23
};
var VIEW = view2;
///////PARAMS
var linesColor;
var starsColor;
var starsDepthColor;
var backgroundColor;
var maxStarArea;
var zoom = VIEW.initZoom;
var finalZoom;
var kZoom;
var inter;
init=function(){
	linesColor = VIEW.linesColor;
	starsColor = VIEW.starsColor;
	starsDepthColor = VIEW.starsDepthColor;
	backgroundColor = VIEW.backgroundColor;
	maxStarArea = VIEW.maxStarArea;
	loadData = new LoadDataFiles();
	engine3D = new Engine3D();
	engine3D.lens = VIEW.lens3D;
	dragging = new DragDetection(0, draggingListener, this);
	dragging.factor = 0.01;
	addInteractionEventListener('mousewheel', onWheelListener, this);
	setBackgroundColor(backgroundColor);
	inter = new InterpolationsManager();
}
allDataLoaded=function(){
	kZoom = inter.zoom();
	coordinates = coordinatesV;
	distances = distancesV;
	normalizedDistances = distances.getNormalizedToMax();
	interpolatedDistances = inter.distances();
	radius = radiusV.clone();
	loading = false;
}
onWheelListener=function(e){
	zoom -= e.value*zoom*0.001;
	zoom = Math.min(Math.max(zoom, 0.001), 50000);
}
resizeWindow = function(){
	cX = canvasWidth*0.5;
	cY = canvasHeight*0.5;
}
draggingListener=function(draggingVector){
	rotationVector = draggingVector;
}
cycle=function(){
	canvas.style.cursor = 'default';
	if(pairs==null || normalizedDistances==null) return;
	inter.cycle();
	if(VIEW.magnitudesInterpolation){
		inter.radius();
	}
	if(inter.interpolating && VIEW.distancesInterpolation){
		interpolatedDistances = inter.distances();
	}
	/////constellation lines
	context.strokeStyle = linesColor;
	engine3D.applyRotation(rotationVector);
	rSphere = 300;
	finalZoom = zoom;
	var i;
	var i0;
	var i1;
	if(VIEW.filterByConstellations){
		for(i=0; pairsIndexes[i]!=null; i++){
			i0 = pairsIndexes[i][0];
			i1 = pairsIndexes[i][1];
			line(coordinates[i0], finalZoom*interpolatedDistances[i0], coordinates[i1], finalZoom*interpolatedDistances[i1]);
		}
	} else {
		for(i=0; pairs[i]!=null; i++){
			lineOnSphere(pairs[i][0], pairs[i][1]);
		}
	}
	/////stars
	if(starsDepthColor==null){
		context.fillStyle = starsColor;
		for(i=0;coordinates[i]!=null;i++){
			spot(coordinates[i], radius[i], finalZoom*interpolatedDistances[i]);
		}
	} else {
		var p;
		var starsArray = new Array();
		for(i=0;coordinates[i]!=null;i++){
			p = transformation(coordinates[i], finalZoom*interpolatedDistances[i]);
			starsArray.push({
					'p':p,
					's':p.z,
					'r':radius[i]
			});
		}
		starsArray.sort(function(star0, star1){
			return star0.s - star1.s;
		});
		var star;
		for(i=0;starsArray[i]!=null;i++){
			star = starsArray[i];
			if(star.s>0){
				context.fillStyle = ColorOperators.interpolateColors(starsDepthColor, starsColor, Math.min(Math.max(star.s*0.5, 0), 1));
				context.beginPath();
				context.arc(star.p.x, star.p.y, star.r*star.s, 0, TwoPi);
				context.fill();
			}
		}
	}
}
line=function(p0, d0, p1, d1){
	p0 = sphericTransformation(p0, d0);
	p1 = sphericTransformation(p1, d1);
	var line = engine3D.line3D(p0, p1);
	if(line!=null){
		context.beginPath();
		context.moveTo(line[0].x + this.cX, line[0].y + this.cY);
		context.lineTo(line[1].x + this.cX, line[1].y + this.cY);
		context.stroke();
	}
}
lineOnSphere=function(p0, p1){
	p0 = sphericTransformation(p0, finalZoom);
	p1 = sphericTransformation(p1, finalZoom);
	var line = engine3D.line3D(p0, p1);
	if(line!=null){
		context.beginPath();
		context.moveTo(line[0].x + this.cX, line[0].y + this.cY);
		context.lineTo(line[1].x + this.cX, line[1].y + this.cY);
		context.stroke();
	}
}
spot=function(p, r, d){
	p = transformation(p, d);
	if(p.z<0) return;
	context.beginPath();
	context.arc(p.x, p.y, r*p.z, 0, TwoPi);
	context.fill();
}
transformation = function(point, d){
	var newPoint3D = engine3D.projection3D(sphericTransformation(point, d));
	return new Point3D(newPoint3D.x + this.cX, newPoint3D.y + this.cY, newPoint3D.z);
}
sphericTransformation = function(point, d){
	var r0 = d*rSphere*Math.cos(point.y);
	return new Point3D(r0*Math.cos(point.x), -r0*Math.tan(point.y), r0*Math.sin(point.x));
}