//static latlng variables for gatehouses since never change.
var northGateHouselng=47.660750;
var northGateHouseltd=-122.309653;
var eastGateHouselng=47.658271;
var eastGateHouseltd=-122.302701;
var westGateHouselng=47.655330;
var westGateHouseltd=-122.311831;
var southGateHouselng=47.650735;
var southGateHouseltd=-122.311633;
var cplGateHouselng=47.656833;
var cplGateHouseltd=-122.311820;
var gatehouses= [northGateHouselng,northGateHouseltd,eastGateHouselng,eastGateHouseltd,westGateHouselng,westGateHouseltd,southGateHouselng,southGateHouseltd,cplGateHouselng,cplGateHouseltd];
var markerArr=[];
var nav = false;
var desLng;
var desLtd;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

    function initialize() {

    var latlng = new google.maps.LatLng(47.656836, -122.312041);
    var myOptions = {
        zoom: 15,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"),
            myOptions);
    getGateHouses(map);
    if(getUrlParameter("nav")=='true'){
      directionsDisplay = new google.maps.DirectionsRenderer();
      getroute(map);
      directionsDisplay.setMap(map);
      //directionsDisplay.setPanel(document.getElementById('directionsPanel'));
    // google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
    //   computeTotalDistance(directionsDisplay.directions);
    //});
    }else{
      getMarkers(map);
    }
    setupLegend(map);
    }
    google.maps.event.addDomListener(window, "load", initialize);


function search(){
  //alert(document.getElementById("srch-term").value);
  var term = document.getElementById("srch-term").value;
  $.each(markerArr, function(i, marker){
    if(marker.title.toLowerCase().indexOf(term.toLowerCase())>=0){
      var foundlatlng= new google.maps.LatLng(marker.position);
      alert(marker.position);
      map.setCenter(marker.position);
      map.setZoom(18);
      }
  });
  return false;
}

function getMarkers(map){
  $.get("garageinfo.xml",{},function(xml){
    $('garage',xml).each(function(i){
      garageName= $(this).find("name").text();
      garagelng= $(this).find("Lng").text();
      garageltd= $(this).find("Ltd").text();
      status = $(this).find("status").text();
      var icon = getColor(status);
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(garagelng,garageltd),
        map: map,
        icon:icon,
        url: "lotinfo.html",
        zIndex:1,
        title:garageName
      });
      markerArr.push(marker);
      google.maps.event.addListener(marker, 'click', function() {
        window.location.href = marker.url+"?lotname="+marker.title;
      });

    })

  });
}
  function handle(e){
    alert("FUCK YOU");
        if(e.keyCode === 13){
            alert("Enter was pressed was presses");
        }

        return false;
    }
function getGateHouses(map){
  var marker = new google.maps.Marker({
        position: new google.maps.LatLng(northGateHouselng,northGateHouseltd),
        map: map,
        icon:"http://google.com/mapfiles/kml/paddle/G-lv.png ",
        url:"#",
        title:"Gate House"
      });
  var marker = new google.maps.Marker({
        position: new google.maps.LatLng(southGateHouselng,southGateHouseltd),
        map: map,
        icon:"http://google.com/mapfiles/kml/paddle/G-lv.png ",
        url:"#",
        title:"Gate House"
      });
  var marker = new google.maps.Marker({
        position: new google.maps.LatLng(eastGateHouselng,eastGateHouseltd),
        map: map,
        icon:"http://google.com/mapfiles/kml/paddle/G-lv.png ",
        url:"#",
        title:"Gate House"
      });
  var marker = new google.maps.Marker({
        position: new google.maps.LatLng(westGateHouselng,westGateHouseltd),
        map: map,
        icon:"http://google.com/mapfiles/kml/paddle/G-lv.png",
        url:"#",
        title:"Gate House"
      });
  var marker = new google.maps.Marker({
        position: new google.maps.LatLng(cplGateHouselng,cplGateHouseltd),
        map: map,
        icon:"http://google.com/mapfiles/kml/paddle/G-lv.png ",
        url:"#",
        title:"Gate House"
      });
}

function toggle_visibility(id) {
    var e = document.getElementById(id);
    if (e.style.display == 'block') e.style.display = 'none';
    else e.style.display = 'block';
}


function getColor(status){
  if(status =="full"){
    return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
  }else if(status =="empty"){
    return "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
  }else{
    return "http://maps.google.com/mapfiles/ms/icons/orange-dot.png"
  }

}

function getroute(map){


  navigator.geolocation.getCurrentPosition(function (position){
    var latitude = position.coords.latitude;                    //users current
    var longitude = position.coords.longitude;                 //location
    var coords = new google.maps.LatLng(latitude, longitude); //Creates variable for map coordinates
    desLng = getUrlParameter("lng");
    desLtd = getUrlParameter("ltd");
    var des= new google.maps.LatLng(desLng,desLtd);
    var request = {
      origin:coords,
      destination:des,
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
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
    document.getElementById('togglelegend'));
    var iconBase = 'http://maps.google.com/mapfiles/ms/icons/';
        var icons = {
          lotfull: {
            name: 'Parking lot full',
            icon: iconBase + 'red-dot.png'
          },
          lotempty: {
            name: 'Parking lot empty',
            icon: iconBase + 'green-dot.png'
          },
          lothalffull: {
            name: 'Parkign Lot half full',
            icon: iconBase + 'orange-dot.png'
          },
          GateHouse: {
            name: 'Gate House',
            icon: 'http://google.com/mapfiles/kml/paddle/G-lv.png '
          }
        };
        var legend = document.getElementById('legend');
        for (var key in icons) {
          var type = icons[key];
          var name = type.name;
          var icon = type.icon;
          var div = document.createElement('div');
          div.innerHTML = '<img src="' + icon + '"> ' + name;
          legend.appendChild(div);
        }
    }


function getUrlParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return decodeURIComponent(sParameterName[1]);
        }
    }
}    



$(document).ready(function () {
        //adds MasterPage.html content into any "#MasterPage" element
        $("#MasterPage").load("MasterPage.html");


    });


// Create the search box and link it to the UI element.
  // var input = /** @type {HTMLInputElement} */(
  //     document.getElementById('pac-input'));
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // var searchBox = new google.maps.places.SearchBox(
  //   /** @type {HTMLInputElement} */(input));

  // // Listen for the event fired when the user selects an item from the
  // // pick list. Retrieve the matching places for that item.
  // google.maps.event.addListener(searchBox, 'places_changed', function() {
  //   var places = searchBox.getPlaces();

  //   if (places.length == 0) {
  //     return;
  //   }
  //   for (var i = 0, marker; marker = markers[i]; i++) {
  //     marker.setMap(null);
  //   }

  //   // For each place, get the icon, place name, and location.
  //   markers = [];
  //   var bounds = new google.maps.LatLngBounds();
  //   for (var i = 0, place; place = places[i]; i++) {
  //     var image = {
  //       url: place.icon,
  //       size: new google.maps.Size(71, 71),
  //       origin: new google.maps.Point(0, 0),
  //       anchor: new google.maps.Point(17, 34),
  //       scaledSize: new google.maps.Size(25, 25)
  //     };

  //     // Create a marker for each place.
  //     var marker = new google.maps.Marker({
  //       map: map,
  //       icon: image,
  //       title: place.name,
  //       position: place.geometry.location
  //     });

  //     markers.push(marker);

  //     bounds.extend(place.geometry.location);
  //   }

  //   map.fitBounds(bounds);
  // });

  // // Bias the SearchBox results towards places that are within the bounds of the
  // // current map's viewport.
  // google.maps.event.addListener(map, 'bounds_changed', function() {
  //   var bounds = map.getBounds();
  //   searchBox.setBounds(bounds);
  // });