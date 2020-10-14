var mapDiv;

function getGPSForMap(mapDiv){
	navigator.geolocation.getCurrentPosition(onPositionSuccess,onPositionFail,
		{
            enableHighAccuracy:true, 
            maximumAge: 30000
        }
    );		
    
}

function onPositionSuccess(position){

    console.log('lat: '+ position.coords.latitude);
    console.log('longi: '+position.coords.longitude);
    let gkey = "key=AIzaSyAV84cMdnMtrWdRo6W6hwacbUz1DG0UBcY";
    let newMapElement = document.createElement('iframe');
    let newMapAttributes = {
        'id': "map",
        'width': '150%',
        'height':'150%',
        'frameborder':'0',
        'src':"https://maps.google.com/maps?"+gkey+"&q="+position.coords.latitude.toString()+','+position.coords.longitude.toString()+"&z=12&output=embed"
    };
    mapDiv = document.getElementById("content");
    setMapAttributes(mapDiv, newMapElement, newMapAttributes);
    
}
function onPositionFail(){
    alert("failed to get your coordinates, please try again.");
}
function setMapAttributes(parentNode,element, dictOfAttributes){
    for(var key in dictOfAttributes){
        element.setAttribute(key, dictOfAttributes[key]);
    }
    parentNode.appendChild(element);
}

var domap = function() { //This function should be used to build the map in the content element
    let workspace = document.getElementById("content");
    
    workspace.innerHTML = "";
    

    getGPSForMap();
    //TODO : ADD MAP CONTENT

    // getGPSForMap();
    
    // let newMapElement = document.createElement('iframe');
    // let newMapAttributes = {
    //     'id': "map",
    //     'width': 'auto',
    //     'height':'auto',
    //     'src': "https://www.google.com/maps/embed/v1/view?key=AIzaSyAV84cMdnMtrWdRo6W6hwacbUz1DG0UBcY&center="+latitude+','+longitude+'&zoom=12'
    // };
    // setAttributes(workspace, newMapElement, newMapAttributes);

    
    
}