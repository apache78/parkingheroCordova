
$(document).ready(function () {
    //adds MasterPage.html content into any "#MasterPage" element
    $("#MasterPage").load("MasterPage.html", function(){
          $(".search-bar").html("<p style=\"text-align: center\" class=\"navbar-text\">Carpool Finder</p>");
          $("#glyph").removeClass("glyphicon-list").addClass("glyphicon-home");
          document.getElementById("garagelist").onclick = function() {
        location.href = "index.html";
    };
        });
    var date = new Date();
    var day = date.getDay();
	var datString;
    //alert(day);
    if(day==1){
    	dayString='Monday';
    }else if(day==2){
    	dayString='Tuesday';
    }else if(day==3){
    	dayString='Wednesday';
    }else if(day==4){
    	dayString='Thursday';
    }else{
    	dayString='Friday';
    }


    var items =[];
	$.getJSON('user.json')
	  .done(function( data ) {
	    console.log( "worked" );
		$.each(data.users, function(index, element) {
			if(element.type =='rider'){
	        	$('.riderlist').append($('<li class="list-group-item lot" id="template"><a href="person.html" id="listlink"><span  class="glyphicon glyphicon-user" style="vertical-align:middle" aria-hidden="true"></span> <span id="fName">'+element.FirstName+'</span> <span id="lName">'+element.LastName+'</span> \
	        		-Trip Time: <span id = "starttime">'+element["TripTimes"][dayString]+'</span> -Location: <span id="location">'+element.Location+'</span>\
	                </a>\
	              </li>'));
       		}else{
        		$('.driverlist').append($('<li class="list-group-item lot" id="template"><a href="person.html" id="listlink"><span  class="glyphicon glyphicon-user" style="vertical-align:middle" aria-hidden="true"></span> <span id="fName">'+element.FirstName+'</span> <span id="lName">'+element.LastName+'</span> \
        			-Trip Time: <span id = "starttime">'+element["TripTimes"][dayString]+'</span> -Location: <span id="location">'+element.Location+'</span>\
                </a>\
                </li>'));
        	}
    	});

		// $( "<ul/>", {
		// 	"class": "my-new-list",
		// 	html: items.join( "" )
		// }).appendTo( "body" );
	  })
	  .fail(function( jqxhr, textStatus, error ) {
	    var err = textStatus + ", " + error;
	    console.log( "Request Failed: " + err );
	});

$.getJSON('/functions.php', { get_param: 'value' }, function(data) {
    $.each(data, function(index, element) {
        $('body').append($('<div>', {
            text: element.name
        }));
    });
});




});
// $('<li class="list-group-item lot" id="template"><a href="person.html" id="listlink"><span  class="glyphicon glyphicon-user" style="vertical-align:middle" aria-hidden="true"></span> <span id="fName"></span> <span id="lName"></span> Trip Time: <span id = "starttime"></span>\
//                 </a>\
//               </li>', {
				
// 			})
