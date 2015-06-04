$(document).ready(function () {
    //adds MasterPage.html content into any "#MasterPage" element
   $("#MasterPage").load("MasterPage.html", function(){
          $(".search-bar").html("<p class=\"navbar-text\">Add Carpool Trip</p>");
          $("#glyph").removeClass("glyphicon-list").addClass("glyphicon-home");
          document.getElementById("garagelist").onclick = function() {
        location.href = "index.html";
    };
        });
   	document.getElementById("btnSubmit").onclick = function() {
    	VerifyForm();
    	//convert form info to json
    	//write to jsonfile
	};


});

function VerifyForm(){

}