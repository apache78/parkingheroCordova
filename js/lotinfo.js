
window.onload = function(){

	var name =getUrlParameter("lotname");
	alert(name.toString());
	searchXML(name);

	$.get("garageinfo.xml",{},function(xml){
	  $('garage',xml).each(function(i){
      

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
            alert(display);
        }
  });
}
