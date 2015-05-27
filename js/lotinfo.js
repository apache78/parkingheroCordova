
window.onload = function(){

  document.getElementById("back").onclick = function() {
          location.href = "garagelist.html";
      };
      document.getElementById("home").onclick = function() {
          location.href = "index.html";
      };

	var name =getUrlParameter("lotname");
	//alert(name.toString());
	searchXML(name);

	$.get("garageinfo.xml",{},function(xml){
	  $('garage',xml).each(function(i){
      garageName= $(this).find("name").text();
      garageimg= $(this).find("img").text();
      totalspots=$(this).find("numberofspots").text();
      coveredstatus = $(this).find("covered").text();
      status = $(this).find("status").text();
      disabled = $(this).find("numberofdisabledspots").text();
      wheelchair = $(this).find("numberofwheelchairspots").text();
      if(garageName.toLowerCase() == name.toLowerCase()){
        document.getElementById("lotname").innerHTML = name;
        document.getElementById("headerlotname").innerHTML = name;
        document.getElementById("lotpic").src=garageimg;
        var total = document.getElementById("total");
        total.innerHTML = total.innerHTML + totalspots ;
        var covered = document.getElementById("covered");
        covered.innerHTML = covered.innerHTML + coveredstatus;
        var marker = document.getElementById("marker");
        marker.innerHTML = status;
        marker.className = marker.className + " " +status;
        var disabledspaces = document.getElementById("disabled");
        disabledspaces.innerHTML = disabledspaces.innerHTML + disabled;
        var wheelchairspaces = document.getElementById("wheelchair");
        wheelchairspaces.innerHTML = wheelchairspaces.innerHTML + wheelchair;
      }
	  })
	});
}


function getUrlParameter(sParam)
{
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


var myXML; 

function searchXML(name){
  $.ajax({
     type:"GET",
     url: "garageinfo.xml",
     dataType: "xml",
     success: function(xml){
              // Filter Evelyn out of the bunch
            myXML = $(xml).find("person").filter(function() {
                return $(this).find('name').text() == name;
            });

              // Store a string with Evelyn's info in the display variable
            var display = myXML.children().map(function() {
                return this.tagName + '=' + $(this).text();
            }).get().join(' ');

              // alert the result
            //alert(display);
        }
  });
}
