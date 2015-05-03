function getMarkers(){

}

window.onload = function(){

$.get("garageinfo.xml",{},function(xml){
  $('garage',xml).each(function(i){
    garageName= $(this).find("name").text();
    garagelng= $(this).find("Lng").text();
    garageltd= $(this).find("Ltd").text();


    $("#list ul").append('<li class=\"list-group-item lot\"><a href=\"lotinfo.html\" id=\"listlink\"><span  class=\"glyphicon glyphicon-map-marker listmarker empty\" style=\"vertical-align:middle\" aria-hidden=\"true\"></span>\
    '+garageName+'</a> \
    </li>');



  })
});
}