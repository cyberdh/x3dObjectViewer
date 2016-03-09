
/*******************************************
Panosphere Table of Contents
1. resizeCanvas
2. Movement functions
    a. incrementAndWait
    b. mouseClicks
    c. left
    d. right
    e. up
    f. down
    g. zoom
3.  Panorama navigation functions
    a. textureChange
    b. toRoomA
    c. toRoomB
    d. toRoomC
    e. toRoomD
    f. displayItem

*/

// Makes sure the canvas size matches the x3d size. Needed to ensure clicks work
function resizeCanvas(){
// Sets the desired dimensions from the x3d element
var desiredWidthInCSSPixels = $('#x3dElement').width();
var desiredHeightInCSSPixels = $('#x3dElement').height();;
// Gets the canvas element
var canvas = document.getElementById("x3dom-x3dElement-canvas");


// set the display size of the canvas.
canvas.style.width = desiredWidthInCSSPixels + "px";
canvas.style.height = desiredHeightInCSSPixels + "px";
canvas.width = desiredWidthInCSSPixels;
canvas.height = desiredHeightInCSSPixels;
}


// function makes click and hold work for directional buttons
$(document).ready(function(){
//Reruns function direction button 
function incrementAndWait(direction) {
  // Checks to see if mousedown is false. Used with mouseup to stop button press when button stops being pressed
  if (!mousedown) return;  
  // Reruns function after a variable time (timeoutInterval) 
  timeout = setTimeout(function(){incrementAndWait(direction)}, timeoutInterval);
  
  //This is for individual mouseclicks 
  if(timeoutInterval==150){
  //Sets timeout interval to .129 seconds
      timeoutInterval = 129;
      //moves in the direction .15 m
  window[direction](.15);    
  }
  //Delays a movement for .130 seconds for a total delay of .28 seconds
  else if(timeoutInterval>130)
  {timeoutInterval /= 1.1;  
  }
  //increasingly quickly make a small move while mouse is held down
  else {
  timeoutInterval /= 1.15;
  window[direction](.0075);  
  }
  //Reruns the function after the given amount of time
  setTimeout(direction,timeoutInterval);  
  
}});

// Catches a click on any individual direction button and moves that direction. Takes movement amount as an argument
$('.direction').mousedown(function() {
  // Reset to 150 to allow multiple mousedown/mouseup
  timeoutInterval = 150;
  //This allows the incrementAndWait function to run  
  mousedown = true;
  //Gets the direction of the button
  var direction=$(this).attr('id'); 
  // Runs the delay function that leads to movement
  window[incrementAndWait(direction)];
  


//When the mousekey is let up stops the increment function from firing
$(document).mouseup(function() {
  mousedown = false;
})
})
function left(move) {
// gets the camera rotation and splits it into individual numbers
    x = jQuery('#xcamera').attr('rotation').split(/[\s,]+/).map(Number);
// takes the 4th number and adds the movement to it     
    x[3] = x[3] + move;
// Makes the x axis the axis of rotation
    x[1] = 1;
// Sets the rotation    
    jQuery('#xcamera').attr('rotation', x);    
}
function right(move) {
    x = jQuery('#xcamera').attr('rotation').split(/[\s,]+/).map(Number);
    x[3] = x[3] - move;
    x[1] = 1;
    jQuery('#xcamera').attr('rotation', x);
    console.log(x);
}
function up(move) {
    y = jQuery('#ycamera').attr('rotation').split(/[\s,]+/).map(Number);
    y[3] = y[3] + move;
    y[0] = 1;
    jQuery('#ycamera').attr('rotation', y[0]+','+y[1]+','+y[2]+','+y[3]);
    console.log(y);
}
function down(move) {
    y = jQuery('#ycamera').attr('rotation').split(/[\s,]+/).map(Number);
    y[3] = y[3] - move;
    y[0] = 1;
    jQuery('#ycamera').attr('rotation', y);
    console.log(y);
}

// Creates the zoom function
function zoom (delta) {
    // id of the <x3d> element in the html
    var x3d = document.getElementById('x3dElement');
    // for this to work viewpoint needs to be in html not associated x3d file
    var vpt = x3d.getElementsByTagName("viewpoint")[0];
    
    // checks to see if zoomed in too close
    if (parseFloat(vpt.fieldOfView) + delta < .1) {
        
        vpt.fieldOfView = .1;
        // checks to see if zoomed out too much
    } else if (parseFloat(vpt.fieldOfView + delta) > 1.3) {
        
        vpt.fieldOfView = 1.3;
    } 
    // if not zoomed out too far/close changes the zoom 
    else {
        vpt.fieldOfView = parseFloat(vpt.fieldOfView) + delta;
    }
}

// Resets the rotation to default. Used when moving between panorama
function resetRotation() {
    $('#ycamera').attr('rotation','0 0 0 0');
    $('#xcamera').attr('rotation','0 1 0 1.65');
}


// Changes the panorama being viewed
function textureChange(url,extension)
{
    $('#front').find('imageTexture').attr('url',url+'_f'+'.'+extension);
    $('#back').find('imageTexture').attr('url',url+'_b'+'.'+extension);
    $('#left').find('imageTexture').attr('url',url+'_l'+'.'+extension);
    $('#right').find('imageTexture').attr('url',url+'_r'+'.'+extension);
    $('#up').find('imageTexture').attr('url',url+'_u'+'.'+extension);
    $('#down').find('imageTexture').attr('url',url+'_d'+'.'+extension);
}


//Moves to room B
function toRoomB()
{
// Calls textureChange with the url of the sides
textureChange('facultyShow/roomB/Grunwald-20160120-b-big','jpg');
// Makes currently rendered info/path buttons not rendered
$('group[render="true"]').not('#Cube').attr('render','false');
// Renders the room info/path buttons 
$('#B-click').attr('render','true');
// Resets the x/y roation and sets the rotation to start looking the desired way
resetRotation();
}
// Moves to room A
function toRoomA()
{
// Calls textureChange with the url of the sides
textureChange('facultyShow/roomB/Grunwald-20160120-b-big','jpg');
// Makes currently rendered info/path buttons not rendered
$('group[render="true"]').not('#Cube').attr('render','false');
// Renders the room B info/path buttons 
$('#A-click').attr('render','true');
// Resets the x/y roation
resetRotation();
// Sets the rotation to start looking the desired way
$('#xcamera').attr('rotation','0 1 0 .50');
}
// Moves to room C
function toRoomC()
{
// Calls textureChange with the url of the sides
textureChange('facultyShow/roomB/Grunwald-20160120-b-big','jpg');
// Makes currently rendered info/path buttons not rendered
$('group[render="true"]').not('#Cube').attr('render','false');
// Renders the room B info/path buttons 
$('#C-click').attr('render','true');
// Resets the x/y roation
resetRotation();
// Sets the rotation to start looking the desired way$('#xcamera').attr('rotation','0 1 0 .75');
}
//Moves to room D
function toRoomD(element)
    {
// Calls textureChange with the url of the sides
textureChange('facultyShow/roomB/Grunwald-20160120-b-big','jpg');
// Makes currently rendered info/path buttons not rendered
$('group[render="true"]').not('#Cube').attr('render','false');
// Renders the room B info/path buttons 
$('#A-click').attr('render','true');
// Resets the x/y roation
resetRotation();
// Sets the rotation to start looking the desired way
    $('#xcamera').attr('rotation','0 1 0 .75');        
    }


// For showing information about individual items. Takes as an argument the filename of the image associated with the item
function displayItem(file)
{
// Loads the JSON with the metadata
$.getJSON('metadata.json',function(data){
// Goes through the length of the JSON
for(i=0; i<data.length; i++){
// Finds the entry with the correct filename, gets the relevant metadata
if (data[i]["File"]==file){
    Artist=data[i]["Artist"];    
    Name=data[i]["Name"];
    Year=data[i]["Year"];
    Material=data[i]["Material"];
// One item is made up of multiple objects
    Name1=data[i]["Name1"];
    Material1=data[i]["Material1"];
    Year1=data[i]["Year1"];
// Attatches the image and metadata to the overlay    
    jQuery('#overlayContent').html('<a href="http://www.iub.edu/~cyberdh/x3d/objectviewer/'+file+'"><img src="'+file+'"/></a>');
    $('#overlayContent').append("<Span>"+Artist+"</Span>");
    $('#overlayContent').append("<Span>"+Name+", "+Year+"</Span>");
    // Tests to eliminate empty fields
    if(typeof(Material)!='undefined'){
        $('#overlayContent').append("<Span>"+Material+"</Span>");
    }
    // Tests to eliminate empty fields
    if(typeof(Material1)!='undefined'){    
    $('#overlayContent').append("<br/><br/><Span>"+Name1+", "+Year1+"</Spam>");
    $('#overlayContent').append("<Span>"+Material1+"</Span>");}
        // shows the overlay div
        jQuery('#overlay').css({'display':'inline'});
}    

}});}



      var runtime = null, clipScope = null, scene = null, clipPlanes = [],clipCount=0;

        initializeClip = function() {
            runtime = document.getElementById("x3dElement").runtime;
            scene = document.getElementById( "scene" );
            clipScope = document.getElementById( "clipScope" );
        };

        function changeAxis ( elm, id, axis )
        {
            clipPlanes[ id ].Axis( axis );
            document.getElementById( "slider_" + id ).value = "0.5";

            document.getElementById( "btnX_" + id ).className = "";
            document.getElementById( "btnY_" + id ).className = "";
            document.getElementById( "btnZ_" + id ).className = "";

            elm.className = "active";
        }

        function changeClipping ( elm, id, clipping )
        {
            clipPlanes[ id ].Clipping( clipping );

            document.getElementById( "btnNear_" + id ).className = "";
            document.getElementById( "btnFar_" + id ).className = "";

            elm.className = "active";
        }

        function moveClipPlane(id, value)
        {
            clipPlanes[ id ].Move( value );
        }
		
		function rotateClipPlane(id, value)
        {
            clipPlanes[ id ].Rotate( value );
        }

        function addClipPlane()
        {
            clipCount++;
            addMenu();
            clipPlanes.push( new ClipPlane(clipScope, scene, runtime) );
            
        }

       function removeClipPlane(event){
           clipTarget=event.target;
           clipTarget.nextElementSibling.remove();
           console.log(clipTarget.nextElementSibling);
           document.getElementById('clipPlane'+clipTarget.innerText.slice(-1)).remove();
           document.getElementById('clipPlaneLine'+clipTarget.innerText.slice(-1)).remove();
           clipTarget.remove();
           
           
           
       }
       
       function addMenu()
        {
            addClipBut=document.getElementsByClassName('addClip')[0].cloneNode(true);
            var removeClip=document.getElementsByClassName('addClip')[0];
            removeClip.innerText="REMOVE CLIPPLANE "+clipCount;
            removeClip.setAttribute('onClick', 'removeClipPlane(event);');
            removeClip.removeAttribute('class');
            
            var div = document.createElement("div");
            div.setAttribute("class", "clipPlaneMenu");

            var slider = document.createElement("input");
            slider.setAttribute("id", "slider_" +clipPlanes.length.toString());
            slider.setAttribute("data-id", clipPlanes.length.toString());
            slider.setAttribute("type", "range");
            slider.setAttribute("min", "0");
            slider.setAttribute("max", "1");
            slider.setAttribute("value", "0.5");
            slider.setAttribute("step", "0.01");
            slider.onchange = function() {
                moveClipPlane(this.dataset.id, this.value);
            };

            var btnX = document.createElement("button");
            btnX.setAttribute("id", "btnX_" +clipPlanes.length.toString());
            btnX.setAttribute("data-id", clipPlanes.length.toString());
            btnX.setAttribute("type", "button");
            btnX.setAttribute("class", "active");
            btnX.innerHTML = "X";
            btnX.onclick = function() {
                changeAxis(this, this.dataset.id, 'X');
            };

            var btnY = document.createElement("button");
            btnY.setAttribute("id", "btnY_" +clipPlanes.length.toString());
            btnY.setAttribute("data-id", clipPlanes.length.toString());
            btnY.setAttribute("type", "button");
            btnY.innerHTML = "Y";
            btnY.onclick = function() {
                changeAxis(this, this.dataset.id, 'Y');
            };

            var btnZ = document.createElement("button");
            btnZ.setAttribute("id", "btnZ_" +clipPlanes.length.toString());
            btnZ.setAttribute("data-id", clipPlanes.length.toString());
            btnZ.setAttribute("type", "button");
            btnZ.innerHTML = "Z";
            btnZ.onclick = function() {
                changeAxis(this, this.dataset.id, 'Z');
            };

            var btnNear = document.createElement("button");
            btnNear.setAttribute("id", "btnNear_" +clipPlanes.length.toString());
            btnNear.setAttribute("data-id", clipPlanes.length.toString());
            btnNear.setAttribute("type", "button");
            btnNear.setAttribute("class", "active");
            btnNear.innerHTML = "NEAR";
            btnNear.onclick = function() {
                changeClipping(this, this.dataset.id, -1);
            };

            var btnFar = document.createElement("button");
            btnFar.setAttribute("id", "btnFar_" +clipPlanes.length.toString());
            btnFar.setAttribute("data-id", clipPlanes.length.toString());
            btnFar.setAttribute("type", "button");
            btnFar.innerHTML = "FAR";
            btnFar.onclick = function() {
                changeClipping(this, this.dataset.id, 1);
            };
			
			var btnRotAdd = document.createElement("button");
            btnRotAdd.setAttribute("id", "btnRotAdd_" +clipPlanes.length.toString());
            btnRotAdd.setAttribute("data-id", clipPlanes.length.toString());
            btnRotAdd.setAttribute("type", "button");
            btnRotAdd.innerHTML = "+";
            btnRotAdd.onclick = function() {
                rotateClipPlane(this.dataset.id, 0.1);
            };
			
			var btnRotSub = document.createElement("button");
            btnRotSub.setAttribute("id", "btnRotSub_" +clipPlanes.length.toString());
            btnRotSub.setAttribute("data-id", clipPlanes.length.toString());
            btnRotSub.setAttribute("type", "button");
            btnRotSub.innerHTML = "-";
            btnRotSub.onclick = function() {
                rotateClipPlane(this.dataset.id, -0.1);
            };

            div.appendChild(slider);
            div.appendChild(btnX);
            div.appendChild(btnY);
            div.appendChild(btnZ);
            div.appendChild(btnNear);
            div.appendChild(btnFar);
			div.appendChild(btnRotAdd);
            div.appendChild(btnRotSub);

            document.getElementById("clipPlaneDiv").appendChild(div);
            document.getElementById("clipPlaneDiv").appendChild(addClipBut);
        }



/**
 * Created by Timo on 16.06.2014.
 */
var ClipPlane = function ( scope, proxyParent, runtime )
{
    var _axis = "X";

    var _scope = scope;

    var _clipPlane = null;

    var _color = "1 1 1";

    var _volume = null;

    var _clipping = -1;
	
	var _normal = new x3dom.fields.SFVec3f(_clipping, 0, 0);
	
	var _angle = 0;
	
	var _distance = 0;

    var _proxyTransform = null;

    var _proxyCoordinates = null;

    var _proxyParent = proxyParent;

    var _runtime = runtime;

    var initialize = function ()
    {
        updateVolume();
        createProxy();
        createClipPlane();
    };

    this.Move = function ( value )
    {
        if ( _axis == "X" )
        {
            _distance = ((_volume.max.x - _volume.min.x) * value) + _volume.min.x;
        }
        else if ( _axis == "Y" )
        {
            _distance = ((_volume.max.y - _volume.min.y) * value) + _volume.min.y;
        }
        else if ( _axis == "Z" )
        {
            _distance = ((_volume.max.z - _volume.min.z) * value) + _volume.min.z;
        }
		
		updateClipPlane();
		updateProxy();
    };
	
	this.Rotate = function ( value )
    {
		var rotMat;
		
		_angle += value;
		
        if ( _axis == "X" )
        {
            // Convert the value to a rotation Matrix
			rotMat = x3dom.fields.SFMatrix4f.rotationY( value );

			// Rotate the normal
			_normal = rotMat.multMatrixPnt( _normal );
        }
        else if ( _axis == "Y" )
        {
            // Convert the value to a rotation Matrix
			rotMat = x3dom.fields.SFMatrix4f.rotationZ( value );

			// Rotate the normal
			_normal = rotMat.multMatrixPnt( _normal );
        }
        else if ( _axis == "Z" )
        {
            // Convert the value to a rotation Matrix
			rotMat = x3dom.fields.SFMatrix4f.rotationX( value );

			// Rotate the normal
			_normal = rotMat.multMatrixPnt( _normal );
        }
		
		updateClipPlane();
		updateProxy();
		
    };

    this.Axis = function ( axis )
    {
        _axis = axis;
			
		_angle = 0;
		
		_distance = 0;
		
		if ( _axis == "X" )
        {
            _normal = new x3dom.fields.SFVec3f(_clipping, 0, 0);
        }
        else if ( _axis == "Y" )
        {
            _normal = new x3dom.fields.SFVec3f(0, _clipping, 0);
			
        }
        else if ( _axis == "Z" )
        {
            _normal = new x3dom.fields.SFVec3f(0, 0, _clipping);
        }

		updateProxy();
        updateClipPlane();
        updateProxyCoordinates();
    };

    this.Clipping = function ( clipping )
    {
        _clipping = clipping;

		_angle = 0;
		
		_distance = 0;
		
		if ( _axis == "X" )
        {
            _normal = new x3dom.fields.SFVec3f(_clipping, 0, 0);
        }
        else if ( _axis == "Y" )
        {
            _normal = new x3dom.fields.SFVec3f(0, _clipping, 0);
			
        }
        else if ( _axis == "Z" )
        {
            _normal = new x3dom.fields.SFVec3f(0, 0, _clipping);
        }
		
		updateProxy();
        updateClipPlane();
    };

    var updateVolume = function ()
    {
        _volume = _runtime.getBBox( clipScope );
    };

    var updateClipPlane = function ()
    {
        if ( _axis == "X" )
        {
            //_clipPlane.setAttribute("plane", _clipping + " 0 0 0");
			_clipPlane.setAttribute("plane", _normal.x + " " + _normal.y + " " + _normal.z + " " + _distance);
        }
        else if ( _axis == "Y" )
        {
            //_clipPlane.setAttribute("plane", "0 " + _clipping + " 0 0");
			_clipPlane.setAttribute("plane", _normal.x + " " + _normal.y + " " + _normal.z + " " + _distance);
			
        }
        else if ( _axis == "Z" )
        {
            //_clipPlane.setAttribute("plane", "0 0 " + _clipping + " 0");
			_clipPlane.setAttribute("plane", _normal.x + " " + _normal.y + " " + _normal.z + " " + _distance);
        }
    };
	
	var updateProxy = function ()
    {
		
		if ( _axis == "X" )
        {
            _proxyTransform.setAttribute("translation", -_distance * _clipping + " 0 0");
			_proxyTransform.setAttribute("rotation", "0 1 0 " + _angle );
        }
        else if ( _axis == "Y" )
        {
			_proxyTransform.setAttribute("translation", "0 " + -_distance  * _clipping + " 0");
			_proxyTransform.setAttribute("rotation", "0 0 1 " + _angle );
        }
        else if ( _axis == "Z" )
        {
            _proxyTransform.setAttribute("translation", "0 0 " + -_distance * _clipping);
			_proxyTransform.setAttribute("rotation", "1 0 0 " + _angle );
        }
		
    };

    var updateProxyCoordinates = function ()
    {
        var p0, p1, p2, p3, p4;

        if ( _axis == "X")
        {
            p0 = "0 " + _volume.max.y + " " + _volume.min.z + ", ";
            p1 = "0 " + _volume.min.y + " " + _volume.min.z + ", ";
            p2 = "0 " + _volume.min.y + " " + _volume.max.z + ", ";
            p3 = "0 " + _volume.max.y + " " + _volume.max.z + ", ";
            p4 = "0 " + _volume.max.y + " " + _volume.min.z;

            _proxyCoordinates.setAttribute("point", p0 + p1 + p2 + p3 + p4);
        }
        else if ( _axis == "Y" )
        {
            p0 = _volume.min.x + " 0 " + _volume.max.z + ", ";
            p1 = _volume.min.x + " 0 " + _volume.min.z + ", ";
            p2 = _volume.max.x + " 0 " + _volume.min.z + ", ";
            p3 = _volume.max.x + " 0 " + _volume.max.z + ", ";
            p4 = _volume.min.x + " 0 " + _volume.max.z;

            _proxyCoordinates.setAttribute("point", p0 + p1 + p2 + p3 + p4);
        }
        else if ( _axis == "Z" )
        {
            p0 = _volume.min.x + " " + _volume.max.y + " 0, ";
            p1 = _volume.min.x + " " + _volume.min.y + " 0, ";
            p2 = _volume.max.x + " " + _volume.min.y + " 0, ";
            p3 = _volume.max.x + " " + _volume.max.y + " 0, ";
            p4 = _volume.min.x + " " + _volume.max.y + " 0";

            _proxyCoordinates.setAttribute("point", p0 + p1 + p2 + p3 + p4);
        }
    };

    var createClipPlane = function()
    {
        _clipPlane = document.createElement("ClipPlane");
        _clipPlane.setAttribute('id','clipPlane'+clipCount);
        _clipPlane.setAttribute("plane", _clipping + " 0 0 0");
        _clipPlane.setAttribute("cappingStrength", "0.003");
        _clipPlane.setAttribute("cappingColor", _color);

        _scope.appendChild( _clipPlane );
    };

    var createProxy = function()
    {
        _proxyTransform = document.createElement("Transform");
        _proxyTransform.setAttribute('id','clipPlaneLine'+clipCount);
        var shape = document.createElement("Shape");
        
        var app = document.createElement("Appearance");

        var mat = document.createElement("Material");
        mat.setAttribute("emissiveColor", _color);

        var line = document.createElement("LineSet");
        line.setAttribute("vertexCount", "5");

        _proxyCoordinates = document.createElement("Coordinate");

        updateProxyCoordinates( _axis );

        _proxyTransform.appendChild( shape );

        shape.appendChild( app );

        app.appendChild( mat );

        shape.appendChild( line );

        line.appendChild( _proxyCoordinates );

        _proxyParent.appendChild( _proxyTransform );
    };

    initialize();
};



$(document).ready(function(){$('[type="checkbox"]').change(function(){
x=document.getElementById('x3dFile');

function wireFrame(){
newShape=document.createElement('Shape');
newShape.setAttribute('class','wireframe');
face=x.getElementsByTagName('IndexedFaceSet');
face0=face[0];
line=document.createElement('IndexedLineSet');
face0.children.length;

for (i=0;i<face[0].attributes.length;i++){
    var a=face0.attributes[i]
    line.setAttribute(a.name,a.value);
}

for (i=0;i<face[0].children.length;i++){
    var a=face0.children[i].cloneNode();
    line.appendChild(a);
}
newShape.appendChild(line);
document.getElementById('testtrans').appendChild(newShape);
}

    name=this.name;
    
    if(name=='object'){

    Shapes=x.getElementsByTagName('Shape');
        for(i=0;i<Shapes.length;i++){
        
            Shapes[i].setAttribute('render', $(this).prop('checked'));
            
        }
    }
    if(name=="wireframe"){
    wireFrame();
        Shapes=$('Shape.wireframe');
        for(i=0;i<Shapes.length;i++){
            Shapes[i].setAttribute('render', $(this).prop('checked'));
    }
    if(name=="points"){
     document.getElementById("x3dElement").runtime.togglePoints();
    }
  }   if(name=="points"){
     document.getElementById("x3dElement").runtime.togglePoints();
    }
})
});
$(window).bind("load", function(){
inlineX3d=document.getElementById('x3dFile');

vol=inlineX3d._x3domNode.getVolume();
ran=0;

function translateCheck(){
if(vol.max.x==0 && vol.min.x==0){
setTimeout(translateStart,500);

}
}


//moves object to 0 0 0
function translateStart(){
// seems to make the shadows better

xtrans=-1*vol.getCenter().x;
ytrans=-1*vol.getCenter().y;
ztrans=-1*vol.getCenter().z;
document.getElementById('testtrans').setAttribute('translation', xtrans+" "+ytrans+" "+ztrans);
document.getElementById('start').setAttribute('position', '0 0 '+(vol.max.z-vol.min.z)*3.5);
var zTotVol=vol.max.z-vol.min.z;
var yTotVol=vol.max.y-vol.min.y;
var xTotVol=vol.max.x-vol.min.x;
var greatestVol = Math.max(Math.abs(xTotVol), Math.abs(yTotVol),Math.abs(zTotVol));
scale = greatestVol*1.75/16
var floor = document.getElementById('floor')._x3domNode.getVolume();
floory=vol.min.y-(vol.min.y*.4)
$('#floor').attr('scale', scale+' '+scale+' '+scale);
$('#floor').attr('translation', '0 '+greatestVol/-1.75+' 0');
//$('#light').attr('translation', xtrans*-1+' '+(ytrans*-1+10)+' '+ztrans*-1);
translateCheck();    

}


translateCheck();
translateStart();
}

);


function lighting(){
var zTotVol=vol.max.z-vol.min.z;
var yTotVol=vol.max.y-vol.min.y;
var xTotVol=vol.max.x-vol.min.x;
var greatestVol = Math.max(Math.abs(xTotVol), Math.abs(yTotVol),Math.abs(zTotVol));

$('#light').attr('translation', '0 '+greatestVol+' 0');
$('#light').find('Material').attr('transparency','0');
$('#lightingInt').toggle()    
}


function overhead(el){
if (!el.checked){

    $('#light').attr('render','false');
    $('pointlight').attr('on','false');
    
}
else {

    $('#light').attr('render','true');
    $('pointlight').attr('on','true');
    
}

    
}

function headlight(el){
    if (!el.checked){

        $('#navInfo').attr('headlight', 'false');
    }
    else {

        $('#navInfo').attr('headlight', 'true');
    }
    
    
}

function showFloor(el){
    if (!el.checked){

        $('#floor').attr('render', 'false');
    }
    else {

        $('#floor').attr('render', 'true');
    }
    
    
}


function toggleAnnotation(el){


    an=$('.annotationPoint');
    if (an.length==0){
        alert('No Annotations');
    }
    else if (an.attr('render')=='true'){
        $(el).text('Show Annotations');
        an.attr('render','false');
        
    }
    else {
        $(el).text('Hide Annotations');
        an.attr('render','true');
        
    }
    
    
}
