const indexPage = 'index.html';
const resultsPage = 'results.html';
const base_url = 'https://api.openweathermap.org/data/2.5/weather';
const keyVal = '8b28865f3daecbe7faa2d27f15dd45c9';
const key = 'appid=';
const key_and_val = key+keyVal;
var zip;
var city;
var state;
var weatherjson;
var lati;
var longi;

var phrefList = [
	'pcity', 
	'plat',
	'plng',
	'pdescription',
	'pvis',
	'pwind',
	'ptemp',
	'ptempHigh',
	'ptempLow',
	'phumidity',
	'psunRise',
	'psunSet',
	
];

var displaytext = [
	'City:',
	'Latitude:', 
	'Longitude:',
	'The weather will be:', 
	'Visibility:',
	'Wind Speed:',
	'The Temperature will be:', 
	'With a High of:', 
	'And a Low of:',
	'Humidity is:',
	'The Sun will rise at:',
	'The Sun will set at:'
];

let hrefList = [
	'city', 
	'lat',
	'lng',
	'description',
	'vis',
	'wind',
	'temp',
	'tempHigh',
	'tempLow',
	'humidity',
	'sunRise',
	'sunSet'
];

// Starting the app only showing the search "screen" and hiding the "result" screen
// even though they are just divs.  
// 


// searchbutton.onclick('click', get_input());
//Function that will retrieve the user's search input.
function get_input(){
	var input = document.getElementById("target").value;
	// Error checking to confirm that the search field is not and empty string. 
	if(input == ""){
		// A popup alert window telling the user that the search button only works
		// if a value is added. 
		alert("It doesn't work if you don't add a Zip Code or City,State...")
	}
	// Logic to confirm that search value is a zip code
	if(Number(input)){
		zip = Number(input);
		// testing the search zip code was added to the zip variable correctly
		// alert("zip: " + zip);
		// ajax API call method...because JQuery appears to hate everything I do.
		$.ajax({
			url: base_url, // giving meaningful names to the variables helps make the code easier to understand
			data:{
				appid: keyVal,
				'zip': zip,
				'units':'imperial'
			},
			success: function(result){
				console.log(result); // displaying the json value in console
				update(result); // calling the update function that updates the screen values.


			}
		});

		// error checking logic that confirms that alpha characters are used and not numbers
	} else if (isChar(input)) {
			cityState = isCity(input); // function that splits the a valid city state input into the city and state vars
			city = cityState[0];        
			state = cityState[1];
			// testing that values are added correctly
			// alert("city: " + city + "/state:" + state);
			// more ajax...because...you know...JQuery
			$.ajax({
				url: base_url,
				data:{
					appid: keyVal,
					'q': (city, state),
					'units':'imperial'
				},
				success: function(result){
					console.log(result);
					update(result);

				}
			});
	}else{ // displaying a polite message that a valid search criteria is needed
		alert("Please add a valid Zip code or City and State");
	}

}

// A toggle fucntion that alternates between displaying the 'search' and 'result' divs.
function toggle(){
	toggleResult();
	// toggleSearch();
}
// logic that switches the block and none css elements, so only one of the two shows at a time.
// This could be refactored out to abstract the code further but trying to get JQuery to work cost me
// way more time than was reasonable
function toggleResult() {
	var y = document.getElementById("result");
	var x = document.getElementById("search");
	if (y.style.display === "none") {
	y.style.display = "block";
	x.style.display = "none";
	} else {
	y.style.display = "none";
	x.style.display = "block";
	}

}
// Originally, a function that focuses on toggling the display of 'search' div.
// I does function, but only in conjection with a reciprocale function that does the
// same for the 'result' divs.  I used it to test 
function toggleSearch(){
	var x = document.getElementById("search");
	if (x.style.display === "none"){
		x.style.display = "block";
	}else{
		x.style.display = "none";
	}
}
// splitting the user's search into two variables using a comma as a descriminator
function isCity(a){
	let x = ',';
	if(a.indexOf(x)){
		var city, state = a.split(x);
		return city, state;
	}else{
		return 0; // returns a 0 that will trip the the conditional statement above 
	}
}
// error checking logic that confirms that there aren't any numbers in a user search.
// Returns true if no characters are numbers it over looks commas and spaces for city state
// writing conventions.  
function isChar(a){
	let i = 0; // increments letter for letter
	let charCheck = true; // a flag, because an error checking function without a flag is lame.
	while(charCheck && i <= a.length){
		if(isNaN(a[i]) || (a[i]==',') || (a[i] == ' ')){
			charCheck = true;
		}else{
			charCheck = false;
			return false;
		}
		i++;
	}
	return true;
}
// enableing and useing gps one of two version I used.  This works fine, but not as well as the second
// function getGPS(){
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(capturePosition);
//     } else {
//         x.innerHTML = "Geolocation is not supported by this browser.";
//     }

// }

function getGPS(){
	navigator.geolocation.getCurrentPosition(capturePosition, 
		function(){x.innerHTML = "Geolocation is not supported by this browser.";}, 
		{enableHighAccuracy:true}
	);

		
}

// pulls the latitude and longitude coordinates from the JSON returned in the getGPS function
// and used it to call the openweather API. Again using Ajax...I can't express in words
// exactly little I care for Jquery...perhaps interpretive dance, but that is for another
// class.  Seriously though, I spent like 3 days trying to get JQuery to work. 
function capturePosition(position){
	lat = position.coords.latitude;
	longi = position.coords.longitude;
	$.ajax({
		url: base_url,
		data:{
			appid: keyVal,
			'lat': lat,
			'lon': longi,
			'units':'imperial'
		},
		success: function(result){
			console.log(result);
			update(result)
		}
	});
}

// After the json is returned from the API call, this maps the json information
// to the html tags and displays the result information in place of the inital search.
function update(result){
	toggle();
	var map;
	var weatherDescription=result.weather[0].description;
	var temp=result.main.temp;

	var tempHigh=String(result.main.temp_max);
	var tempLow=String(result.main.temp_min);
	var humidity=String(result.main.humidity)+'%'
	// Converting from Unix time stamp
	var sunRiseDate = new Date(result.sys.sunrise * 1000);
	var srHours = sunRiseDate.getHours();
	var srMin = sunRiseDate.getMinutes();
	var sunSetDate = new Date(result.sys.sunset * 1000);
	var ssHours = sunSetDate.getHours();
	var ssMin = sunSetDate.getMinutes();

	var sunSetTime = ssHours+':'+ssMin;
	var sunRiseTime = srHours+':'+srMin;
	lati = result.coord.lat;
	longi = result.coord.lon;
	// let centparam = lati+','+longi+'&zoom:8';
	let resultList = [
		result.name,
		lati,
		longi,
		weatherDescription,
		result.visibility+'feet',
		result.wind.speed+'mph',
		temp+'F',
		tempHigh+'F',
		tempLow+'F',
		humidity,
		sunRiseTime,
		sunSetTime,
	]

	for(let i = 0; i <= 11; i++){
		let newTextnode = document.createElement('h3');
		let newResult = document.createTextNode(resultList[i]);
		newTextnode.appendChild(newResult);
		let parentnode = document.getElementById('scrollResults');
		let oldNode = document.getElementById(phrefList[i]);
		parentnode.replaceChild(newTextnode,oldNode);
	}


	
	// embedding the map into the result divs by updating the iframe src attribute a valid
	// parameters in the APi
	let newSrc = "https://www.google.com/maps/embed/v1/view?key=AIzaSyAV84cMdnMtrWdRo6W6hwacbUz1DG0UBcY&center=";
	map = document.getElementById("map").src = newSrc+lati+','+longi+'&zoom=12';
	
}

var doweather = function() { //This function should be used to build your weather information in the content element
	//TODO : ADD WEATHER CONTENT

	let workspace = document.getElementById("content");
	workspace.innerHTML = "";
	
	let h1Title = document.createElement('h1');
	let titleText = document.createTextNode('Search for WeatherConditions');
	h1Title.appendChild(titleText);
	workspace.append(h1Title);

	let divSearch = document.createElement('div');
	let divSearchAttributes = {
		'id':'search'
	}
	setAttributes(workspace, divSearch, divSearchAttributes);


	let weatherInput = document.createElement('input');
	let weatherInputAttributes = {
		'type': "text",
		'id':"target",
		'placeholder':"Enter Zip / City and State",
		'width':'auto'
	};
	setAttributes(divSearch, weatherInput, weatherInputAttributes);


	let qbutton = document.createElement('button');
	let qbuttonAttributes = {
		'id':'get_target',
		'onclick':'get_input()'
	};
	qbutton.innerHTML='Search';
	setAttributes(divSearch, qbutton, qbuttonAttributes);
	let updateSearchStyle = document.getElementById("search");
	let searchbutton=document.getElementById('target');
	updateSearchStyle.style.display="block";

	let gpsButton = document.createElement('button');
	gpsButton.innerHTML='Get GPS';
	let gpsButtonAttributes = {
		'id':"get_geo_loc",
		'onclick':"getGPS()"
	}
	setAttributes(divSearch, gpsButton, gpsButtonAttributes);

	let divResults = document.createElement('div');
	let divResultsAttributes = {
		'id':"result",
		'class': "container"
			
	}
	setAttributes(workspace, divResults,divResultsAttributes);

	let updateResultStyle = document.getElementById("result");
	updateResultStyle.style.display="none";


	let divResultsContainer = document.createElement('div');
	let divResultsContainerAttributes = {
		'class':"row"
	}
	setAttributes(divResults,divResultsContainer,divResultsContainerAttributes);

	let divResultsContainerCol4 = document.createElement('div')
	let divResultsContainerCol4Attributes = {
		'class': 'col-4'
	}
	setAttributes(divResultsContainer,divResultsContainerCol4,divResultsContainerCol4Attributes);

	let divResultsList = document.createElement('div');
	let divResultsListAttributes = {
		'id':"list-topics",
		'class':"list-group"
	}
	setAttributes(divResultsContainerCol4, divResultsList, divResultsListAttributes);


	for(let i=0; i <= 11; i++){
		let addA = document.createElement('a');
		let addAAttributes = {
			'class':'list-group-item list-group-item-action',
			'href': '#'+hrefList[i],
		}
		let addAtext = document.createTextNode(displaytext[i]);
		addA.appendChild(addAtext)
		setAttributes(divResultsList, addA, addAAttributes);
	}

	let divResultsContainerCol8 = document.createElement('div');
	divResultsContainerCol8.setAttribute('class', 'col-8')
	divResultsContainer.appendChild(divResultsContainerCol8);

	let divResultsScroll = document.createElement('div');
	let divResultsScrollAttributes = {
		'data-spy':"scroll",
		'id': 'scrollResults',
		'class':"scroll-spy",
		'data-target':"#list-topics",
		'data-offset':"0"
	}
	setAttributes(divResultsContainerCol8, divResultsScroll,divResultsScrollAttributes);
	
	
	
	for(let i=0; i <= 11; i++){
	// for(let each in hrefList){
		let b =document.createElement('h3');
		b.setAttribute('id', hrefList[i]);
		let btext = document.createTextNode(displaytext[i]);
		b.appendChild(btext);
		// b.innerHTML=displaytext[i];
		let c = document.createElement('h5');
		
		c.setAttribute('id', phrefList[i]);
		let ctext  =document.createTextNode('...');
		c.appendChild(ctext);
		divResultsScroll.appendChild(b);
		divResultsScroll.appendChild(c);
	}
	

	
	function setAttributes(parentNode, element, dictOfAttributes){
		for(var key in dictOfAttributes){
			element.setAttribute(key, dictOfAttributes[key]);
		}
		parentNode.appendChild(element);
	}
	
	
	
}



	// my attempt to add a marker to the map, but I struggled with the method I used to embed the map.
	// new google.maps.Marker({
	//     position:{lat: lati, lng:longi}, map
	// });

