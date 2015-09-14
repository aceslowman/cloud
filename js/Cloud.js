var cloudArray = [];
var grps = [];

var Cloud = function(point) {
	var originCenter = point;
	var initBound = new Size(200,200); 
	
	var color = '#'+Math.floor(Math.random()*16777215).toString(16); 
	var numsides = 6;
	var subLevel = 2;
	var scalingFactor = new Point(1,initBound.height/initBound.width);

	var cloud = new Path.RegularPolygon({
		center: originCenter,
		sides: numsides,
		radius: initBound.width/2,
		strokeColor: color
	});

	cloud.scaling = scalingFactor;

	for(var i=0;i<subLevel;i++){
		var RoM = cloud.curves[i].length/2;

		for(var j=0;j<cloud.segments.length-1;j++){
		    var px = cloud.segments[j].point.x;
		    var py = cloud.segments[j].point.y;
		    var x = Math.floor(Math.random()*( (px+RoM)-(px-RoM)+1 ) + (px-RoM) );
		    var y = Math.floor(Math.random()*( (py+RoM)-(py-RoM)+1 ) + (py-RoM) );

		    var tmpP = new Point(x,y);
		    cloud.segments[j].point = tmpP;
		}

		for(var j=0;j<cloud.segments.length;j+=2){
			cloud.curves[j].divide();
		}
	}

	//cloud.fullySelected = true;
	this.path = cloud;
}

Cloud.prototype.checkIntersection = function() {
	for(var i=0;i<cloudArray.length;i++){
		if(this.path !== cloudArray[i].path){
			if(this.path.intersects(cloudArray[i].path)){
				tmpGrp = [this.path,cloudArray[i].path];
				tmpGrp.sort(function(a,b){return a.id - b.id});
				groupClouds(tmpGrp);
			}
		}
	}
}

function groupClouds(tmpGrp){
	if(grps.length > 0){
		for(var i=0;i<grps.length;i++){
			if(tmpGrp !== grps[i]){
				grps.push(tmpGrp);
			}
		}
	}else{
		grps[0] = tmpGrp;
	}
}

//for(var i=0;i<5;i++){
//	cloud = new Cloud(new Point(view.size.width/2-200+(i*100),view.size.height/2));
//	cloudArray.push(cloud);
//}

cloud = new Cloud(new Point(150,150));
cloudArray.push(cloud);

cloud = new Cloud(new Point(250,250));
cloudArray.push(cloud);

cloud = new Cloud(new Point(500,500));
cloudArray.push(cloud);

cloud = new Cloud(new Point(700,700));
cloudArray.push(cloud);

cloud = new Cloud(new Point(800,800));
cloudArray.push(cloud);

for(var i=0;i<cloudArray.length;i++){
	cloudArray[i].checkIntersection();
}

for(var i=0;i<cloudArray.length;i++){
	var cloudID = new PointText({
		point: cloudArray[i].path.position,
		content: cloudArray[i].path.id,
		fillColor: 'black'
	});
}
	