LoadDataFiles.URL_CONST = "./resources/constellationsSimple.txt";
LoadDataFiles.URL_JSON = "./resources/stars.json";
function LoadDataFiles(){
	Loader.loadData(LoadDataFiles.URL_CONST, this.onLoadData, this);
	Loader.loadData(LoadDataFiles.URL_JSON, this.onLoadData, this);
}
LoadDataFiles.prototype.dataLoaded=function(){
	distances = new NumberList();
	coordinates = new Polygon();
	radius = new NumberList();
	radiusA = new NumberList();
	radiusAV = new NumberList();
	radiusVA = new NumberList();
	radiusV = new NumberList();
	coordinatesA = new Polygon();
	coordinatesAV = new Polygon();
	coordinatesVA = new Polygon();
	coordinatesV = new Polygon();
	distancesA = new NumberList();
	distancesAV = new NumberList();
	distancesVA = new NumberList();
	distancesV = new NumberList();
	for(var i=0; visMagnitudes[i]!=null; i++){
		if(absMagnitudes[i]<0){
			radiusA.push(this.radiusFromMagntiude(absMagnitudes[i], false));
			coordinatesA.push(allCoordinates[i]);
			distancesA.push(allDistances[i]);
		}
		if(visMagnitudes[i]<6){
			radiusV.push(this.radiusFromMagntiude(visMagnitudes[i], true));
			coordinatesV.push(allCoordinates[i]);
			distancesV.push(allDistances[i]);
		}
		if(absMagnitudes[i]<0 || visMagnitudes[i]<6){
			if(absMagnitudes[i]<0 && visMagnitudes[i]<6){
				r = 0.5*(this.radiusFromMagntiude(visMagnitudes[i], true) + this.radiusFromMagntiude(absMagnitudes[i], false));
				radiusAV.push(r);
				radiusVA.push(r);
			} else if(absMagnitudes[i]<0){
				radiusAV.push(0);
			} else {
				radiusVA.push(0);
			}
		}
	}
	radius = radiusV.clone();
	coordinates = coordinatesV;
	distances = distancesV;
	normalizedDistancesA = distancesA.getNormalizedToMax();
	normalizedDistancesV = distancesV.getNormalizedToMax();
	normalizedDistances = normalizedDistancesV.clone();
	interpolatedDistances = normalizedDistances.clone();
	maxDistance = distances.getMax();
	minVisMagnitude = visMagnitudes.getMin();
	maxVisMagnitude = visMagnitudes.getMax();
	minAbsMagnitude = absMagnitudes.getMin();
	maxAbsMagnitude = absMagnitudes.getMax();
	resizeWindow();
}
LoadDataFiles.prototype.onLoadData = function(e){
	var i;
	switch(e.url){
		case LoadDataFiles.URL_CONST:
			var coordinatesTexts = StringOperators.allTextsBetweenStrings(e.result, "\",", ")");
			pairs = new Array();
			var numbers;
			var p0;
			var p1;
			for(i=0; coordinatesTexts[i]!=null; i++){
				numbers = coordinatesTexts[i].split(',');
				p0 = new Point((Number(numbers[1])*(360/24)-180)*gradToRad, Number(numbers[0])*gradToRad);
				p1 = new Point((Number(numbers[3])*(360/24)-180)*gradToRad, Number(numbers[2])*gradToRad);
				pairs[i] = [p0,  p1];
			}
			break;
		case LoadDataFiles.URL_JSON:
			var stars = JSON.parse(e.result).stars;
			var r;
			visMagnitudes = new NumberList();
			absMagnitudes = new NumberList();
			allCoordinates = new Polygon();
			allDistances = new NumberList();
			for(i=0; stars[i]!=null; i++){
				visMagnitudes.push(stars[i].visM);
				absMagnitudes.push(stars[i].absM);
				allCoordinates.push(new Point((stars[i].ra*(360/24)-180)*gradToRad, stars[i].dec*gradToRad));
				allDistances.push(stars[i].d);
			}
			this.dataLoaded();
			break;
	}
	if(coordinates!=null && pairs!=null){
		this.searchForStarsInConstellations();
		allDataLoaded();
	}
}
LoadDataFiles.prototype.searchForStarsInConstellations = function(){
	if(!VIEW.filterByConstellations) return;
	var i;
	var iStar0;
	var iStar1;
	pairsIndexes = new Array();
	var allIndexes = new List();
	for(i=0; pairs[i]!=null; i++){
		iStar0 = this.closerStar(pairs[i][0]);
		iStar1 = this.closerStar(pairs[i][1]);
		pairsIndexes[i] = [iStar0, iStar1];
		if(VIEW.filterByConstellations){
			allIndexes.pushIfUnique(iStar0);
			allIndexes.pushIfUnique(iStar1);
		}
	}
	if(VIEW.filterByConstellations){
		coordinates = new Polygon();
		distances = new NumberList();
		radiusA = new NumberList();
		radiusAV = new NumberList();
		radiusVA = new NumberList();
		radiusV = new NumberList();
		var index;
		var r;
		var pair;
		for(i=0; allIndexes[i]!=null; i++){
			index = allIndexes[i];
			coordinates[i] = allCoordinates[index];
			distances[i] = allDistances[index];
			radiusA[i] = this.radiusFromMagntiude(absMagnitudes[index], false);
			radiusV[i] =  this.radiusFromMagntiude(visMagnitudes[index], true);
			r = 0.5*(radiusA[i]+radiusV[i]);
			radiusAV[i] = r;
			radiusVA[i] = r;
			for(j=0; pairsIndexes[j]!=null; j++){
				pair = pairsIndexes[j];
				if(pair[0]==index) pair[0]=i;
				if(pair[1]==index) pair[1]=i;
			}
		}
		coordinatesA = coordinates.clone();
		coordinatesAV = coordinates.clone();
		coordinatesVA = coordinates.clone();
		coordinatesV = coordinates.clone();
		interpolatedDistances = distances.clone();
		distancesA = distances.clone();
		distancesAV = distances.clone();
		distancesVA = distances.clone();
		distancesV = distances.clone();
	}
}
LoadDataFiles.prototype.closerStar = function(point){
	var i;
	var minD2 = 10000000;
	var d2;
	var iClosest;
	for(i=0; allCoordinates[i]!=null; i++){
		d2 = Math.pow(allCoordinates[i].x-point.x, 2)+Math.pow(allCoordinates[i].y-point.y, 2);
		if(d2<minD2){
			iClosest=i;
			minD2=d2;
		}
	}
	return iClosest;
}
LoadDataFiles.prototype.radiusFromMagntiude = function(magnitude, visible){
	var k = visible?VIEW.vMagProportion:VIEW.aMagProportion;
	return maxStarArea*Math.sqrt(Math.pow(2, 1-magnitude))*k;
}