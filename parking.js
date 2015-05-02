
    function initialize() {
    var latlng = new google.maps.LatLng(47.656836, -122.312041);
    var myOptions = {
        zoom: 15,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"),
            myOptions);
    getMarkers(map);
    google.maps.event.addListener(marker1, 'click', function() {window.location.href = marker1.url;});
    google.maps.event.addListener(marker2, 'click', function() {window.location.href = marker2.url;});
    }
    google.maps.event.addDomListener(window, "load", initialize);

function getMarkers(map){

var marker = new google.maps.Marker({
      position: new google.maps.LatLng( 47.656836,-122.312041),
      map: map,
      url: "lotinfo.html",
      title:"UW Central Plaza Parking Garage"
      });

}