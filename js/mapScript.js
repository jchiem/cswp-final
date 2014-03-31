    var map;
	var markers = []; 
	var toiletArray;
	var mapcanvas;
	var metropoliaLocation;
	
	var geocoder;
	var toggledMap =false;
	var toggledInfo = false;
	var infoWindow;

	var toiletsVisible=false;
	var foodVisible= false;
	var libraryVisible=false;
	var porterVisible=false;
	var mainEntranceVisible=false;
	
	/* Geocoding based on latitude and longitude */
	function codeLatLng(latlng, title, imageURL, description) {
		var latlngStr = latlng.split(',', 2);
		var lat = parseFloat(latlngStr[0]);
		var lng = parseFloat(latlngStr[1]);
		var latlng = new google.maps.LatLng(lat, lng);
		geocoder.geocode({ 'latLng': latlng }, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[1]) {
					map.setZoom(17);
					map.setCenter(new google.maps.LatLng(60.221194, 24.805220));
					var marker = new google.maps.Marker({position: latlng,map: map,icon: imageURL,title: title,content: title});
					marker.setVisible(false);//make the marker invisible from the start
					markers.push(marker);
					/* Set onclick popup event listener */
					marker.infowindow = new google.maps.InfoWindow({content: description});
					google.maps.event.addListener(marker, 'click', function() {marker.infowindow.open(marker.get('map'), marker);});
				} else {
					alert('No results found');
				}
			} else {
				alert('Geocoder failed due to: ' + status);
			}
		});
	}
		
	
	function initialize() {
		geocoder = new google.maps.Geocoder();
		var myLatlng = new google.maps.LatLng(60.221194, 24.805220);
		var mapOptions = {
		  center: myLatlng,
		  zoom: 17,
		  mapTypeId: google.maps.MapTypeId.ROADMAP //initializing the map with zoom 17 and myLatLng as the coordinates
		};
		mapcanvas =document.getElementById("mapCanvas");
		map = new google.maps.Map(mapcanvas,mapOptions);

		createMarkers();
	}
	
//Creates markers for the map, the geocode locations were done through trial and error
    function createMarkers()
    {
    	codeLatLng("60.220647,24.805065", "Toilet","images/toilet.jpg","1st Floor, A-Building");
    	//codeLatLng("60.221006,24.804713", "Toilet","images/toilet.jpg","1st Floor, A-Building");
    	//codeLatLng("60.221816,24.804205", "Toilet","images/toilet.jpg","2nd Floor, B-Building");
    	//codeLatLng("60.220647,24.804250", "Toilet","images/toilet.jpg","1st Floor, A-Building");
    	codeLatLng("60.221007,24.804050", "Cafeteria","images/food.gif","1st Floor, A-Building");
    	codeLatLng("60.221457,24.804050", "Library","images/book.jpg","1st Floor, A-Building");
    	codeLatLng("60.221000,24.805050", "Porter","images/porter.png","1st Floor, A-Building");
    	codeLatLng("60.221000,24.804650", "Entrance","images/entrance.png","1st Floor, A-Building");


    }

/*the toggling of the markers could probably have been called with a general function and switch cases but we decided to go with 
//this longer version where we have a function call per button instead.
It wouldnt be too difficult to change this implementation though and we understand that it is not perfect, 
since we are reiterating ourselves by not using a switch case statement and a generic function to be called upon being clicked.
If we were to implement a generic function, it would probably take the ids of the buttons to determine which button has been clicked and 
which markers to toggle, we would still need separate toggle booleans for each button in order to keep track of which buttons have been pressed
*/
//toggling of markers based on title
    function toggleEntranceMarkers()
    {
    	mainEntranceVisible= !mainEntranceVisible;
    	for(var i=0;i<markers.length;i++)
    	{
    		if(markers[i].title=="Entrance")
    		{
    			markers[i].setVisible(mainEntranceVisible);
    			markers[i].infowindow.close();
    		}
    	}

    }
//toggling of markers based on title
function togglePorterMarkers()
    {
    	porterVisible= !porterVisible;
    	for(var i=0;i<markers.length;i++)
    	{
    		if(markers[i].title=="Porter")
    		{
    			markers[i].setVisible(porterVisible);
    			markers[i].infowindow.close();
    		}
    	}

    }
//toggling of markers based on title
    function toggleFoodMarkers()
    {
    	foodVisible= !foodVisible;
    	for(var i=0;i<markers.length;i++)
    	{
    		if(markers[i].title=="Cafeteria")
    		{
    			markers[i].setVisible(foodVisible);
    			markers[i].infowindow.close();
    		}
    	}

    }

//toggling of markers based on title
    function toggleLibraryMarkers()
    {
    	libraryVisible= !libraryVisible;
    	for(var i=0;i<markers.length;i++)
    	{
    		if(markers[i].title=="Library")
    		{
    			markers[i].setVisible(libraryVisible);
    			markers[i].infowindow.close();
    		}
    	}

    }

//toggling of markers based on title
    function toggleToiletMarkers()
    {


    	toiletsVisible= !toiletsVisible;
    	for(var i=0;i<markers.length;i++)
    	{
    		if(markers[i].title=="Toilet")
    		{
    			markers[i].setVisible(toiletsVisible);
    			markers[i].infowindow.close();
    		}
    	}
    }

    //shows the map on the correct location
	function showLocation()
	{
		centerMap("60.221194,24.805220");
	}

	//this function is used to find the coordinates of the center position and set zoom. We didnt want to call this in the index.html because
	//it looks kind of ugly if the geocode coordinates are visible directly in the source code. (even though it is possible to find this js file as well)
	//plus it might be more useful if we decide to add more schools, in case we want to show another location as well, then we could implement a switch case statement which will find the button pressed
	//and take it to a location dependent on which button was pressed
	function centerMap(latlng)
	{
		var latlngStr = latlng.split(',', 2);
		var lat = parseFloat(latlngStr[0]);
		var lng = parseFloat(latlngStr[1]);
		var latlng = new google.maps.LatLng(lat, lng);
		geocoder.geocode({ 'latLng': latlng }, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[1]) {
					map.setZoom(17); //sets the zoom to the start zoom
					map.setCenter(latlng);
				} else {
					alert('No results found');
				}
			} else {
				alert('Geocoder failed due to: ' + status);
			}
		});
	}
	

    google.maps.event.addDomListener(window, 'load', initialize); // the function which initializes the map upon window loading


