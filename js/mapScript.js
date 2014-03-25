    var map;
	var markers = []; //1 = toilets 2 = computer labs //3 = cafeteria //4 = library //
	var toiletArray;
	var mapcanvas;
	var metropoliaLocation;
	
	var geocoder;
	var toggledMap =false;
	var toggledInfo = false;
	var infoWindow;

	var toiletsVisible=false;
	
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
					marker.setVisible(false);
					markers.push(marker);
					/* Set onclick popup */
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
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		mapcanvas =document.getElementById("mapCanvas");
		map = new google.maps.Map(mapcanvas,mapOptions);

		createToiletMarkers();
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

//old toggle function that didnt work, is actually deleting markers
    function toggleMarker()
    {
		toggledMap = !toggledMap;
		if(toggledMap)
		{
    		codeAddress('Vanha maantie 6, Espoo, Finland', 'Helsinki Metropolia UAS',"images/toilet.jpeg", description);
		}
		else
		{
			toggledInfo = false;
			deleteMarkers();
		}
    }

    function createToiletMarkers()
    {
    	codeLatLng("60.220647,24.805065", "Toilet","images/toilet.jpg","1st Floor, A-Building");
    	codeLatLng("60.221006,24.804713", "Toilet","images/toilet.jpg","1st Floor, A-Building");
    	codeLatLng("60.221816,24.804205", "Toilet","images/toilet.jpg","2nd Floor, B-Building");
    	codeLatLng("60.220647,24.804250", "Toilet","images/toilet.jpg","1st Floor, A-Building");
    }


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

	function showLocation()
	{
		centerMap("60.221194,24.805220");
	}

	function centerMap(latlng)
	{
		var latlngStr = latlng.split(',', 2);
		var lat = parseFloat(latlngStr[0]);
		var lng = parseFloat(latlngStr[1]);
		var latlng = new google.maps.LatLng(lat, lng);
		geocoder.geocode({ 'latLng': latlng }, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[1]) {
					map.setZoom(17);
					map.setCenter(latlng);
				} else {
					alert('No results found');
				}
			} else {
				alert('Geocoder failed due to: ' + status);
			}
		});
	}
	
    google.maps.event.addDomListener(window, 'load', initialize);


