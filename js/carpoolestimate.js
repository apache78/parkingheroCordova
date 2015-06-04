var start="1029 NE 103rd St, Seattle, WA 98125"
var stops = ["1699 NE 94th St, Seattle, WA 98115","301 NE 56th St, Seattle, WA 98105"]
var destination ="University of Washington, Seattle, WA"

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

var renderOptions = { draggable: true };
var directionDisplay = new google.maps.DirectionsRenderer(renderOptions);



//set the directions display panel
//panel is usually just and empty div.  
//This is where the turn by turn directions appear.
//build the waypoints
//free api allows a max of 9 total stops including the start and end address
//premier allows a total of 25 stops. 

var waypoints = [];

    function initialize() {

for (var i = 0; i < stops.length; i++) {
    var address = stops[i];
    if (address !== "") {
        waypoints.push({
            location: address,
            stopover: true
        });
    }
}

    var latlng = new google.maps.LatLng(47.656836, -122.312041);
    var myOptions = {
        zoom: 15,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"),
            myOptions);

      directionsDisplay = new google.maps.DirectionsRenderer();
      getroute(map);
      directionsDisplay.setMap(map);

    setupLegend(map);
    }
    google.maps.event.addDomListener(window, "load", initialize);

function getroute(map){
  navigator.geolocation.getCurrentPosition(function (position){
    var latitude = position.coords.latitude;                    //users current
    var longitude = position.coords.longitude;                 //location
    var coords = new google.maps.LatLng(latitude, longitude); //Creates variable for map coordinates
    
    var request = {
      origin:start,
      destination:destination,
      waypoints: waypoints,
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
      }
    });
  });
}


function setupLegend(map){
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
    document.getElementById('legend'));

    }






$(document).ready(function () {
        //adds MasterPage.html content into any "#MasterPage" element
        $("#MasterPage").load("MasterPage.html", function(){
          $(".search-bar").html("<p class=\"navbar-text\" style=\"text-align:center;\">Carpool Estimate(in Test)</p>");
        });


    });

