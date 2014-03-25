    var map;
	var markers = [];
	var mapcanvas;
	var metropoliaLocation;
	var description = "<p class='mapDescriptionBox'>Helsinki Metropolia University of Applied Science, Polytechnical University in Finland.</p";
	
	var geocoder;
	var toggledMap =false;
	var toggledInfo = false;
	var infoWindow;
	
		/* Geocoding based on address */
	function codeAddress(address, title, imageURL, content) {
		geocoder.geocode({ 'address': address }, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({map: map,position: results[0].geometry.location,icon: imageURL,title: title});
				markers.push(marker);
				/* Set onclick popup */
			//	var infowindow = new google.maps.InfoWindow({content: content});
			//	google.maps.event.addListener(marker, 'click', function() {infowindow.open(marker.get('map'), marker);});
			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
		});
		
	}
	
	/* Geocoding based on latitude and longitude */
	function codeLatLng(latlng, title, imageURL) {
		var latlngStr = latlng.split(',', 2);
		var lat = parseFloat(latlngStr[0]);
		var lng = parseFloat(latlngStr[1]);
		var latlng = new google.maps.LatLng(lat, lng);
		geocoder.geocode({ 'latLng': latlng }, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[1]) {
					map.setZoom(11);
					marker = new google.maps.Marker({position: latlng,map: map,icon: imageURL,title: title,content: title});
					/* Set onclick popup */
			//		var infowindow = new google.maps.InfoWindow({content: title});
			//		google.maps.event.addListener(marker, 'click', function() {infowindow.open(marker.get('map'), marker);});
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
		var myLatlng = new google.maps.LatLng(60.220794, 24.806120);
		var mapOptions = {
		  center: myLatlng,
		  zoom: 16,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		mapcanvas =document.getElementById("mapCanvas");
		map = new google.maps.Map(mapcanvas,mapOptions);
		infoWindow = new google.maps.InfoWindow({content: description});
	}
	
	// Deletes all markers in the array by removing references to them.
	function deleteMarkers() {
	  clearMarkers();
	  markers = [];
	}
	
	function clearMarkers() {
	  setAllMap(null);
	}
	
	// Sets the map on all markers in the array.
	function setAllMap(map) {
	  for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	  }
	}
	
    function toggleMarker()
    {
		toggledMap = !toggledMap;
		if(toggledMap)
		{
    		codeAddress('Vanha maantie 6, Espoo, Finland', 'Helsinki Metropolia UAS',"images/metropoliaLogo.gif", description);
		}
		else
		{
			toggledInfo = false;
			deleteMarkers();
		}
    }
	function showInfo()
	{
		if(!toggledMap){
			return;
		}
		toggledInfo = !toggledInfo;
		if(toggledInfo)
		{
			for (var i = 0; i < markers.length; i++) {
			 	infoWindow.open(map, markers[i]);
	  		}	
		}
		else{
			 toggledInfo=false;
			 infoWindow.close(map, markers[i]);
		}
	}
	
      google.maps.event.addDomListener(window, 'load', initialize);


