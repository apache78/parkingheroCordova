// function getMarkers(){

// }

window.onload = function(){

	$("#MasterPage").load("MasterPage.html", function(){
		document.getElementById('navlist').remove();
		document.getElementById('map').style.display='';
		document.getElementById("map").onclick = function() {
            location.href = "index.html";
        };

	});

	// document.getElementById("map").onclick = function() {
 //            location.href = "index.html";
 //        };


$.get("garageinfo.xml",{},function(xml){
  $('garage',xml).each(function(i){
    garageName= $(this).find("name").text();
    garagelng= $(this).find("Lng").text();
    garageltd= $(this).find("Ltd").text();
    status= $(this).find("status").text();


    $("#list ul").append('<li class=\"list-group-item lot\"><a href=\"lotinfo.html?lotname='+garageName+'\" id=\"listlink\"><span  class=\"glyphicon glyphicon-map-marker listmarker '+status+'\" style=\"vertical-align:middle\" aria-hidden=\"true\"></span>\
    '+garageName+'</a> \
    </li>');



  })
});
	//document.getElementById('template').style.display='none';
	// document.getElementById('navlist').style.display='none';
}
function search(){
    //alert(document.getElementById("srch-term").value);
    var term = document.getElementById("srch-term").value;
    $.get("garageinfo.xml",{},function(xml){
        $('garage',xml).each(function(i){
            garageName= $(this).find("name").text();
            if(garageName.toLowerCase().indexOf(term.toLowerCase())>=0){
                alert("FOUND "+garageName);
                location.href = "lotinfo.html?lotname="+garageName
            }
        }) 
    });
    return false;
}
//calls the MasterPage.html
    // $(document).ready(function () {
    //     //adds MasterPage.html content into any "#MasterPage" element
    //     $("#MasterPage").load("MasterPage.html");
    // });

