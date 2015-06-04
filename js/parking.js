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
var nav = false;
var desLng;
var desLtd;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

    function initialize() {

    var latlng = new google.maps.LatLng(47.656836, -122.312041);
    var myOptions = {
        zoom: 15,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"),
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
        title:garageName
      });
      google.maps.event.addListener(marker, 'click', function() {
        window.location.href = marker.url+"?lotname="+marker.title;
      });

    })

  });
}

function getGateHouses(map){
  var marker = new google.maps.Marker({
        position: new google.maps.LatLng(northGateHouselng,northGateHouseltd),
        map: map,
        icon:"http://labs.google.com/ridefinder/images/mm_20_black.png",
        url:"#",
        title:"Gate House"
      });
  var marker = new google.maps.Marker({
        position: new google.maps.LatLng(southGateHouselng,southGateHouseltd),
        map: map,
        icon:"http://labs.google.com/ridefinder/images/mm_20_black.png",
        url:"#",
        title:"Gate House"
      });
  var marker = new google.maps.Marker({
        position: new google.maps.LatLng(eastGateHouselng,eastGateHouseltd),
        map: map,
        icon:"http://labs.google.com/ridefinder/images/mm_20_black.png",
        url:"#",
        title:"Gate House"
      });
  var marker = new google.maps.Marker({
        position: new google.maps.LatLng(westGateHouselng,westGateHouseltd),
        map: map,
        icon:"http://labs.google.com/ridefinder/images/mm_20_black.png",
        url:"#",
        title:"Gate House"
      });
  var marker = new google.maps.Marker({
        position: new google.maps.LatLng(cplGateHouselng,cplGateHouseltd),
        map: map,
        icon:"http://labs.google.com/ridefinder/images/mm_20_black.png",
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
// function computeTotalDistance(result) {
//   var total = 0;
//   var time= 0;
//   var from=0;
//   var to=0;
//   var myroute = result.routes[0];
//   for (var i = 0; i < myroute.legs.length; i++) {
//     total += myroute.legs[i].distance.value;
//     time +=myroute.legs[i].duration.text;
//     from =myroute.legs[i].start_address;
//     to =myroute.legs[i].end_address;


//   }
//   time = time.replace('hours','H');
//   time = time.replace('mins','M');
//   total = total / 1000.
//   // document.getElementById('from').innerHTML = from + '-'+to;
//   // document.getElementById('duration').innerHTML = time ;
//   // document.getElementById('total').innerHTML =Math.round( total)+"KM" ;
// }

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
            icon: 'http://labs.google.com/ridefinder/images/mm_20_black.png'
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
        
        // if(getUrlParameter("nav")){
        //   nav=true;
        // }
    });