$(document).ready(function () {
        //adds MasterPage.html content into any "#MasterPage" element
        $("#MasterPage").load("MasterPage.html");
        $.ajax({
		  dataType: "json",
		  url: url,
		  data: data,
		  success: success
		});
    });