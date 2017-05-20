//////////////////////////////////
//
//*********sphere.js**************
//
//////////////////////////////////

// It'll have more information than what is in the THREE.SphereGeometry

var G = 6.67 * Math.pow(10, -11);//  mmm/ kg / s / s

function sphere(geo, matter)
{
	
	var dense = Math.random()*50+0.5;
	this.size = [400];
	this.velVec = [ new THREE.Vector3(0, -65, 0) ];
	this.posGeo = [ new THREE.Mesh( geo, matter ) ];
	this.position = [ new THREE.Vector3(300, -120, -80) ];
	
	this.posGeo[0].position.copy(this.position[0]);
	this.mass = [];//[ 4/3*Math.PI*Math.pow( this.size[0]/2, 3 ) *dense ];
	
	this.size[1] = 400;
	this.velVec[1] = new THREE.Vector3(0, 65, 0);
	this.posGeo[1] = new THREE.Mesh( geo, matter );
	this.position[1] = new THREE.Vector3(-300, 120, 80);
	this.posGeo[1].position.copy(this.position[1]);
	//this.mass[1] = 4/3*Math.PI*Math.pow( this.size[1]/2, 3 )*dense;
	this.bounce = 0.5;
	this.count = 2; // I found that if count ends at 0 some objs get drawn
	console.log('vv' + this.velVec[0]);
}

sphere.prototype.add = function()
{
	var dense = Math.random()*50+0.5;
	this.size.push(Math.round(Math.random()*50+5));
	this.mass.push((4/3)*Math.PI*Math.pow(this.size[this.count]/2, 3)*dense);
	
	var geo = new THREE.SphereGeometry(this.size[this.count], 18, 18);
	var green = (this.mass[this.count]/Math.pow(this.size[this.count]/2, 3));
	
	if(green > 256){green = 256;}
	green = (256 - green)/256;
	
	var matter = new THREE.MeshBasicMaterial( { color : new THREE.Color(0, green, 0) } );
	
	this.velVec[this.count] = new THREE.Vector3();
	this.posGeo.push( new THREE.Mesh ( geo, matter ));
	
	var x = (Math.random()-0.5)*800, y = (Math.random()-0.5)*800, z = (Math.random()-0.5)*800;
	this.posGeo[this.count].position.copy(new THREE.Vector3(x, y, z));
	this.position.push(new THREE.Vector3(x, y, z));
	this.count+=1;
	
}

sphere.prototype.gravForce = function(mass1, mass2, d)
{
	return (G * mass1 * mass2 / Math.pow(d, 2));// force kg*m/s/s
}

sphere.prototype.ForceOfAcc = function(indexA, indexB)
{
	var deltaDist = new THREE.Vector3(this.position[indexA].x - this.position[indexB].x, this.position[indexA].y - this.position[indexB].y, this.position[indexA].z - this.position[indexB].z);
	//if(first < 4){console.log('Delta dist', deltaDist);}
	var d = this.position[indexA].distanceTo(this.position[indexB]);
	//if(first < 4){console.log('d', d);}
	var f = this.gravForce(this.mass[indexA], this.mass[indexB], d);
	//if(first < 4){console.log('m ', this.mass[indexA]);}
	if(first < 4){console.log('f ', f);}
	var accvec = new THREE.Vector3(deltaDist.x*f*deltaTime, deltaDist.y*f*deltaTime, deltaDist.z*f*deltaTime);
	var dmb = ( -d*this.mass[indexA] );
	var dma = (  d*this.mass[indexB] );
	this.velVec[indexA].add(new THREE.Vector3(accvec.x/dmb, accvec.y/dmb, accvec.z/dmb));
	this.velVec[indexB].add(new THREE.Vector3(accvec.x/dma, accvec.y/dma, accvec.z/dma));
	if(first < 4){console.log('av', accvec);}
	if(first < 4){console.log('dt', deltaTime);}
	if(first < 4){console.log('dd', deltaDist);}
}

sphere.prototype.newVect = function(elem1, elem2, d){
    var prcent = 0.89;
    var slop = 0.5;
    var inv_mass_sum = 1/this.mass[elem1] + 1/this.mass[elem2];
    // normal components at impact
    var norm = new THREE.Vector3(this.position[elem2].x - this.position[elem1].x, this.position[elem2].y - this.position[elem1].y, this.position[elem2].z - this.position[elem1].z);
    //    var d = sqrt(sq(norm[0])+sq(norm[1]));
    var depth = this.size[elem1]/2+this.size[elem2]/2-d;
    //Don't (a + b) / 2
    
    //the unit Norm
    var unitNorm = new THREE.Vector3(norm.divideScalar(d));
    
    //Relative velocity
    var relativel = new THREE.Vector3(this.velVec[elem2].x - this.velVec[elem1].x, this.velVec[elem2].y - this.velVec[elem1].y, this.velVec[elem2].z - this.velVec[elem1].z);
    
    // The speed
    var VelOnNorm = relativel.dot(unitNorm);
    
    //println(VelOnNorm);
    if(VelOnNorm > 0){return;}// if going in the same direction
    var e = this.bounce;
    var j = -(e)*VelOnNorm; // positive, big e big j
    
    var impulse = new THREE.Vector3(unitNorm.x*j, unitNorm.y*j, unitNorm.z*j);// each part less than j
    
    var ratio = this.mass[elem1]/(this.mass[elem1]+this.mass[elem2]);
    //println(this.mass[elem1] + ", " + this.mass[elem2] + ", " + ratio);
    // velocity is breaking or somthing with more than 2 objs.
    //println(b2.vertical + ", " + ratio + ", " + impulse[1]);
	this.velVec[elem2].add(new THREE.Vector3(impulse.x*ratio, impulse.y*ratio, impulse.z*ratio));
	
	
    //println(balls.pos.x[1]);
    ratio = this.mass[elem2]/(this.mass[elem1]+this.mass[elem2]);
    this.velVec[elem1].add(impulse.multiplyScalar(-ratio));
	
	
    //println(b2.vertical + ", " + ratio + ", " + impulse[0]);
    //println(ratio);
    var vari = Math.max(depth-slop, 0.0)/inv_mass_sum/prcent;
	var correct = new THREE.Vector3(unitNorm.x*vari, unitNorm.y*vari, unitNorm.z*vari);
	
//    println(b2.xPos + " " + b2.yPos);
	this.position[elem1].x += correct.x/-this.mass[elem1];
	this.position[elem1].y += correct.y/-this.mass[elem1];
	this.position[elem1].z += correct.z/-this.mass[elem1];
    
	this.position[elem2].x += correct.x/ this.mass[elem2];
	this.position[elem2].y += correct.y/ this.mass[elem2];
	this.position[elem2].z += correct.z/ this.mass[elem2];
};

sphere.prototype.velVecDistance = function(i)
{
	return Math.sqrt(Math.pow(this.velVec[i].x, 2) + Math.pow(this.velVec[i].y, 2) + Math.pow(this.velVec[i].z, 2));
}

sphere.prototype.positionUpdate = function(i, deltaTime){
	this.position[i].x += this.velVec[i].x*deltaTime;
	this.position[i].y += this.velVec[i].y*deltaTime;
	this.position[i].z += this.velVec[i].z*deltaTime;
	this.posGeo[i].position.copy(this.position[i]);
}












