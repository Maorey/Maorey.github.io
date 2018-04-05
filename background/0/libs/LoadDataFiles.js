LoadDataFiles.URL_CONST = "./resources/constellationsSimple.txt";
LoadDataFiles.URL_STARS = "./resources/stars.txt";
LoadDataFiles.URL_CONSTELLATION = "http://en.wikipedia.org/wiki/List_of_stars_in_Orion";//"http://en.wikipedia.org/wiki/List_of_stars_in_Gemini";//"http://en.wikipedia.org/wiki/List_of_stars_in_Vulpecula";//"http://en.wikipedia.org/wiki/List_of_stars_in_Andromeda";//"http://en.wikipedia.org/wiki/List_of_stars_in_Scorpius";//
LoadDataFiles.URL_JSON = "./resources/stars.json";
	
	
function LoadDataFiles(){
	
	
	
	var constNames = "Andromeda,Antlia,Apus,Aquarius,Aquila,Ara,Aries,Auriga,Boötes,Caelum,Camelopardalis,Cancer,Canes_Venatici,Canis_Major,Canis_Minor,Capricornus,Carina,Cassiopeia,Centaurus,Cepheus,Cetus,Chamaeleon,Circinus,Columba,Coma_Berenices,Corona_Australis,Corona_Borealis,Corvus,Crater,Crux,Cygnus,Delphinus,Dorado,Draco,Equuleus,Eridanus,Fornax,Gemini,Grus,Hercules,Horologium,Hydra,Hydrus,Indus,Lacerta,Leo,Leo_Minor,Lepus,Libra,Lupus,Lynx,Lyra,Mensa,Microscopium,Monoceros,Musca,Norma,Octans,Ophiuchus,Orion,Pavo,Pegasus,Perseus,Phoenix,Pictor,Pisces,Piscis_Austrinus,Puppis,Pyxis,Reticulum,Sagitta,Sagittarius,Scorpius,Sculptor,Scutum,Serpens,Sextans,Taurus,Telescopium,Triangulum,Triangulum_Australe,Tucana,Ursa_Major,Ursa_Minor,Vela,Virgo,Volans,Vulpecula";
	this.wikipediaUrls = StringOperators.splitString(constNames, ",").append("http://en.wikipedia.org/wiki/List_of_stars_in_", false);
	
	
	Loader.loadData(LoadDataFiles.URL_CONST, this.onLoadData, this);
	
	//Loader.loadData(this.wikipediaUrls[0], this.onLoadData, this);
	//Loader.loadData('http://en.wikipedia.org/wiki/List_of_stars_in_Sagittarius', this.onLoadData, this);
	
	//Loader.loadData(LoadDataFiles.URL_STARS, this.onLoadData, this);
	//Loader.loadData(LoadDataFiles.URL_CONSTELLATION, this.onLoadData, this);
	
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
	
	c.log('total stars:', allCoordinates.length);
	c.log('abs filtered', distancesA.length);
	c.log('vis filtered', distancesV.length);
	c.log('maxDistance', maxDistance);
	
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
			
			c.log("stars.length", stars.length);
			
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
		case LoadDataFiles.URL_STARS:
			var lines = StringOperators.splitByEnter(e.result);
			var line;
			
			for(i=0;lines[i]!=null;i++){
				line = lines[i];
				line = StringOperators.placeString(line, ',', 4);
				line = StringOperators.placeString(line, ',', 30);
				line = StringOperators.placeString(line, ',', 48);
				line = StringOperators.placeString(line, ',', 51);
				
				line = StringOperators.placeString(line, ',', 54);
				line = StringOperators.placeString(line, ',', 61);
				line = StringOperators.placeString(line, ',', 68);
				line = StringOperators.placeString(line, ',', 73);
				line = StringOperators.placeString(line, ',', 80);
				line = StringOperators.placeString(line, ',', 87);
				line = StringOperators.placeString(line, ',', 94);
				line = StringOperators.placeString(line, ',', 100);
				
				line = line.replace(/ +,/g, ",");
				line = line.replace(/, +/g, ",");
				line = line.replace(/v,/g, ",");
				line = line.replace(/\+/g, "");
				
				lines[i] = line;
				
				c.log(line);
			}
			
			var starsTable = TableEncodings.CSVtoTable(lines.join('\n'), false);
			
			visMagnitudes = starsTable[9];
			distances = starsTable[12];
			
			c.log('visMagnitudes:', visMagnitudes);
			c.log('distances:', distances);
			maxDistance = distances.getMax();
			c.log('maxDistance:', maxDistance);
			
			coordinates = new Polygon();
			
			for(i=0; visMagnitudes[i]!=null; i++){
				coordinates[i] = new Point(starsTable[5][i], starsTable[3][i]+starsTable[4][i]/60);
				c.log(coordinates[i].x, coordinates[i].y);
			}
			
			this.dataLoaded();
			
			break;
		default:
			var tableBlock = StringOperators.firstTextBetweenStrings(e.result, "<table class=\"wikitable sortable\">", "</table");
			
			//c.log(tableBlock);
			
			var rowsBlocks = StringOperators.allTextsBetweenStrings(tableBlock, "<tr>", "</tr>");
			var cells;
			
			var j;
			
			var RAText;
			var DECText;
			var absMagText;
			var magText;
			var disText;
			var supIndex;
			var coordBlocks
			var ra;
			var dec;
			var hd;
			var d;
			
			var nameIndex;
			var hdIndex;
			var raIndex;
			var decIndex;
			var visMagIndex;
			var absMagIndex;
			var dIndex;
			
			var sign;
			
			if(visMagnitudes==null){
				names = new StringList();
				hds = new StringList();
				absMagnitudes = new NumberList();
				visMagnitudes = new NumberList();
				distances = new NumberList();
				coordinates = new Polygon();
				allDistances = new NumberList();
				allCoordinates = new NumberList();
			}
			
			cells = StringOperators.allTextsBetweenStrings(rowsBlocks[0], "<th", "</th>");
			var cell;
			for(i=0; cells[i]!=null; i++){
				cell = StringOperators.removeHtmlTags(cells[i]).replace(/\>/g, "").toLowerCase();
				//c.log(i, cell);
				if(cell.indexOf('name')!=-1) nameIndex = i;
				if(cell.indexOf('hd')!=-1) hdIndex = i;
				if(cell.indexOf('ra')!=-1) raIndex = i;
				if(cell.indexOf('dec')!=-1) decIndex = i;
				if(cell.indexOf('vis')!=-1 || cell.indexOf('app')!=-1) visMagIndex = i;
				if(cell.indexOf('abs')!=-1) absMagIndex = i;
				if(cell.indexOf('dis')!=-1) dIndex = i;
			}
			
			c.log("raIndex,decIndex,visMagIndex,dIndex", raIndex,decIndex,visMagIndex,dIndex);
			
			for(i=1; rowsBlocks[i]!=null; i++){
				//c.log(i);
				//c.log(rowsBlocks[i]);
				cells = StringOperators.allTextsBetweenStrings(rowsBlocks[i], "<td>", "</td>");
				if(cells!=null){
					
					
					magText = cells[visMagIndex].replace(/−/g, "-");
					//c.log(magText);
					supIndex = magText.search(/\<|\?|–|\(/g);
					magText = supIndex==-1?magText:magText.substr(0, supIndex);
					supIndex = magText.search(/-/g);
					magText = supIndex<1?magText:magText.substr(0, supIndex);
					
					absMagText = cells[absMagIndex].replace(/−/g, "-");
					//c.log(magText);
					supIndex = absMagText.search(/\<|\?|–|\(/g);
					absMagText = supIndex==-1?absMagText:absMagText.substr(0, supIndex);
					supIndex = absMagText.search(/-/g);
					absMagText = supIndex<1?absMagText:absMagText.substr(0, supIndex);
					
					//c.log("magText ["+magText+"]");
					
					disText = cells[dIndex].replace(/\>/g, "").replace(/&gt;/g, "").replace(/~/g, "").replace(/,/g, "").replace(/–/g, "-");
					supIndex = disText.search(/\<|\?|–|\(/g);
					disText = supIndex==-1?disText:disText.substr(0, supIndex);
					d = Number(disText);
					
					
					//c.log(cells[5]);
					RAText = cells[raIndex].replace(/\<sup\>h\<\/sup>&#160/g, "");
					RAText = RAText.replace(/\<sup\>m\<\/sup>&#160/g, "");
					RAText = RAText.replace(/\<sup\>s\<\/sup>/g, "");
					RAText = RAText.replace(/ /g, "");
					RAText = RAText.replace(/\t/g, "");
					RAText = RAText.replace(/−/g, "-");
					
					
					DECText = cells[decIndex];
					DECText = DECText.replace(/\+/g, "");
					DECText = DECText.replace(/&#160/g, "");
					DECText = DECText.replace(/°/g, "");
					DECText = DECText.replace(/″/g, "");
					DECText = DECText.replace(/′/g, "");
					DECText = DECText.replace(/ /g, "");
					DECText = DECText.replace(/\t/g, "");
					DECText = DECText.replace(/−/g, "-");
					
					//c.log(RAText+"|"+DECText+"|");
					coordBlocks = RAText.split(";");
					sign = Number(coordBlocks[0])>=0?1:-1;
					ra =  Number(coordBlocks[0]) +  sign*Number(coordBlocks[1])/60 +  sign*Number(coordBlocks[2])/3600;
					
					//c.log(cells[raIndex]+"----->"+RAText+"   sign:", sign, " ra:", ra);
					
					coordBlocks = DECText.split(";");
					//c.log(coordBlocks[0], coordBlocks[1], coordBlocks[2]);
					sign = Number(coordBlocks[0])>=0?1:-1;
					dec =  Number(coordBlocks[0]) +  sign*Number(coordBlocks[1])/60 +  sign*Number(coordBlocks[2])/3600;
					//c.log(coordBlocks[0]+"|"+Number(coordBlocks[0]));
					
					
					hd = cells[hdIndex];
					
					
					
					if(!(d>20000 || d==0 || disText.indexOf('e3')!=-1 || magText=='' || magText==' ' || magText.indexOf('n/a')!=-1 || Number(absMagText)<-9.4)){
						names.push(StringOperators.removeHtmlTags(cells[nameIndex]));
						allDistances.push(d);
						visMagnitudes.push(Number(magText));
						absMagnitudes.push(Number(absMagText));
						allCoordinates.push(new Point(dec, ra));
						hds.push(hd);
						//c.log(names[names.length-1], dec, ra);
					}
					
					//c.log(coordinates[i-1].y, coordinates[i-1].x);
				}
			}
			
			maxDistance = distances.getMax();
			c.log('maxDistance:', maxDistance);
			if(isNaN(maxDistance)){
				c.log('distances:', distances);
				e();
			}
			
			minVisMagnitude = visMagnitudes.getMin();
			maxVisMagnitude = visMagnitudes.getMax();
			c.log('minVisMagnitude:', minVisMagnitude);
			c.log('maxVisMagnitude:', maxVisMagnitude);
			
			minAbsMagnitude = absMagnitudes.getMin();
			maxAbsMagnitude = absMagnitudes.getMax();
			
			c.log('minAbsMagnitude:', minAbsMagnitude);
			c.log('maxAbsMagnitude:', maxAbsMagnitude);
			
			c.log('n stars:', distances.length);
			if(isNaN(maxAbsMagnitude) || isNaN(minAbsMagnitude) || isNaN(maxVisMagnitude) || isNaN(minVisMagnitude) || minVisMagnitude<-1.46 || minAbsMagnitude<-9.4){
				c.log('visMagnitudes:', visMagnitudes);
				c.log('absMagnitudes:', absMagnitudes);
				e();
			}
			
			var indexWP = this.wikipediaUrls.indexOf(e.url);
			
			if(indexWP>-1 && indexWP<this.wikipediaUrls.length-1){
			//if(indexWP<5){
				Loader.loadData(this.wikipediaUrls[indexWP+1], this.onLoadData, this);
			} else {
				var dataObject = new Object();
				var star;
				
				dataObject.stars = new Array();
				
				coordinates = allCoordinates;
				
				for(i=0; allDistances[i]!=null; i++){
					dataObject.stars[i] = {'name':names[i], 'absM':absMagnitudes[i], 'visM':visMagnitudes[i], 'hd':hds[i], 'd':allDistances[i], 'ra':Math.floor(100*allCoordinates[i].y)/100, 'dec':Math.floor(100*allCoordinates[i].x)/100};
				}
				
				var jsonString = JSON.stringify(dataObject);
				
				c.log("-------------JSON---------------");
				c.log(jsonString);
				c.log("--------------------------------");
			}
			
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

