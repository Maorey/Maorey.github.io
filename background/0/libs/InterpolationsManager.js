function InterpolationsManager(){
	this.speed = VIEW.interpolationSpeed;
	
	this.x = 0;
	
	this.interpolating = false;
	this.from0To1 = true;
	
	this.nextFrameStops = false;
	
	////zoom
	
	this.kZoomF0 = 0.8;
	this.kZoomF1 = 0.8;
	
}



InterpolationsManager.prototype.start = function(){
	if(this.x>0 && this.x<1) this.from0To1 = !this.from0To1;
	
	this.interpolating = true;
	this.nextFrameStops = false;
	
	if(VIEW.magnitudesInterpolation){
		if(selectedV){
			fromVToVA = true;
			fromAVToA = false;
			fromAToAV = false;
			fromVAToV = false;
		} else {
			fromAToAV = true;
			fromVToVA = false;
			fromAVToA = false;
			fromVAToV = false;
		}
	}
}


InterpolationsManager.prototype.cycle = function(){
	if(!this.interpolating) return;
	
	if(this.nextFrameStops){
		this.nextFrameStops = false;
		this.interpolating=false;
	} else {
		if(this.from0To1){
			this.x+=this.speed;
			if(this.x>=1){
				this.nextFrameStops = true;
				this.x=1;
				this.from0To1 = false;
			}
		} else {
			this.x-=this.speed;
			if(this.x<=0){
				this.nextFrameStops = true;
				this.x=0;
				this.from0To1 = true;
			}
		}
	}
}
 

InterpolationsManager.prototype.radius = function(){
	var t;
	var antit;
	
	if(fromVToVA){
		t=this.x*2;
		antit = 1-t;
		
		if(this.x>=0.5){
			fromVToVA = false;
			fromAVToA = true;
			//t=0;
			radius = radiusAV.clone();
			coordinates = coordinatesA;
			distances = distancesA;
			normalizedDistances = distances.getNormalizedToMax();
		} else {
			for(i=0; radiusV[i]!=null; i++){
				radius[i] = radiusV[i]*antit+radiusVA[i]*t;
			}
		}
	} else if(fromAVToA){
		t=(this.x-0.5)*2;
		antit = 1-t;
		
		if(this.x>=1){
			fromAVToA = false;
			selectedV = false;
			radius = radiusA.clone();
		} else {
			for(i=0; radiusA[i]!=null; i++){
				radius[i] = radiusAV[i]*antit+radiusA[i]*t;
			}
		}
	} else if(fromAToAV){
		t=(this.x-0.5)*2;
		antit = 1-t;
		
		if(this.x<=0.5){
			fromAToAV = false;
			fromVAToV = true;
			//t=0;
			radius = radiusVA.clone();
			coordinates = coordinatesV;
			distances = distancesV;
			normalizedDistances = distances.getNormalizedToMax();
		} else {
			for(i=0; radiusA[i]!=null; i++){
				radius[i] = radiusA[i]*t+radiusAV[i]*antit;
			}
		}
	} else if(fromVAToV){
		t=this.x*2;
		antit = 1-t;
		
		if(this.x<=0){
			fromVAToV = false;
			selectedV = true;
			radius = radiusV.clone();
		} else {
			for(i=0; radiusV[i]!=null; i++){
				radius[i] = radiusVA[i]*t+radiusV[i]*antit;
			}
		}
	}
}


InterpolationsManager.prototype.zoom = function(){
	return this.kZoomF0 + (this.kZoomF1-this.kZoomF0)*((Math.pow(1000, this.x)-1)/999);
}

InterpolationsManager.prototype.distances = function(){
	var interpolated = new NumberList();
	var antix = 1-this.x;
	var i;
	
	for(i=0; normalizedDistances[i]!=null; i++){
		interpolated[i] = this.x*normalizedDistances[i]*5 + antix;
	}
	return interpolated;
}