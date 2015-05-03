
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

    
    
    }
    google.maps.event.addDomListener(window, "load", initialize);

function getMarkers(map){
$.get("garageinfo.xml",{},function(xml){
  $('garage',xml).each(function(i){
    garageName= $(this).find("name").text();
    garagelng= $(this).find("Lng").text();
    garageltd= $(this).find("Ltd").text();
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(garagelng,garageltd),
      map: map,
      url: "lotinfo.html",
      title:garageName
      });

    // $("#list ul").append('<li class=\"list-group-item lot\"><a href=\"lotinfo.html\" id=\"listlink\"><span  class=\"glyphicon glyphicon-map-marker listmarker full\" style=\"vertical-align:middle\" aria-hidden=\"true\"></span>\
    //   </a> UW Parking Garage\
    // </li>');
    google.maps.event.addListener(marker, 'click', function() {
      window.location.href = marker.url+"?lotname="+garageName;
    });


  })
});


}