
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
function getColor(status){
  if(status =="full"){
    return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
  }else if(status =="empty"){
    return "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
  }else{
    return "http://maps.google.com/mapfiles/ms/icons/orange-dot.png"
  }

}

$(document).ready(function () {
        //adds MasterPage.html content into any "#MasterPage" element
        $("#MasterPage").load("MasterPage.html");
    });