var latitude;
var longitude;


function getGPS(){
	navigator.geolocation.getCurrentPosition(capePosi(this), 
		function(){x.innerHTML = "Geolocation is not supported by this browser.";}, 
		{enableHighAccuracy:true, maximumAge: 3600000}
	);		
}

function capePosi(position){
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
    console.log('lat: '+latitude);
    console.log('longi: '+longitude);
}


function setAttributes(parentNode, element, dictOfAttributes){
    for(var key in dictOfAttributes){
        element.setAttribute(key, dictOfAttributes[key]);
    }
    parentNode.appendChild(element);
}


function createMap(){
    getGPS();

}

var domap = function() { //This function should be used to build the map in the content element
    let workspace = document.getElementById("content");
    
    workspace.innerHTML = "";
    //TODO : ADD MAP CONTENT

    addEventListener('onload',createMap);
    // addEventListener('click',createMap);
    let newMapElement = document.createElement('iframe');
    let newMapAttributes = {
        'id': "map",
        'width': 'auto',
        'height':'auto',
        'src': "https://www.google.com/maps/embed/v1/view?key=AIzaSyAV84cMdnMtrWdRo6W6hwacbUz1DG0UBcY&center="+latitude+','+longitude+'&zoom=12'
    };
    setAttributes(workspace, newMapElement, newMapAttributes);

    
    
}