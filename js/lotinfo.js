
window.onload = function(){
    $.get("garageinfo.xml",{},function(xml){
    $('garage',xml).each(function(i){
      garageName= $(this).find("name").text();
      garageimg= $(this).find("img").text();
      //alert(garageimg);
     
      if(garageName.toLowerCase() == name.toLowerCase()){
        //alert(garageimg);
        totalspots=$(this).find("numberofspots").text();
        coveredstatus = $(this).find("covered").text();
        status = $(this).find("status").text();
        disabled = $(this).find("numberofdisabledspots").text();
        wheelchair = $(this).find("numberofwheelchairspots").text();
        garageimg= $(this).find("imgsrc").text();
        document.getElementById("lotname").innerHTML = name;
        document.getElementById("headerlotname").innerHTML = name;
        //garageimg= "img/"+garageimg;
        //alert("image src:"+garageimg);
        document.getElementById("lotpic").src="img/"+garageimg;
        //$("#lotpic").attr("src",""+garageimg);
        //document.getElementById("profpic").src="img/2276176.jpg"
        lng=$(this).find("Lng").text()
        ltd=$(this).find("Ltd").text();
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

  document.getElementById("back").onclick = function() {
          location.href = "garagelist.html";
      };
      document.getElementById("home").onclick = function() {
          location.href = "index.html";
      };
      document.getElementById("parkhere").onclick = function() {
          var url = "index.html?nav=true&lng="+lng+"&ltd="+ltd;
          location.href = url;
      };

	var name =getUrlParameter("lotname");
	searchXML(name);
  var lng;
  var ltd;


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
