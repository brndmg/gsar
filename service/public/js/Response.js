$(document).ready(function(){

	$.getJSON('/status', populateTable);

});

var positive_responses = 0;


function populateTable(data){

	var table = $("#responseTable tbody");

	
	for(var i = 0; i < data.length; i++){
		var row_string = "<tr>";
		//Name
		row_string += "<td>"+ data[i].fullname + "</td>";
		//Phone Number
		row_string +="<td><a href='tel:" + data[i].phone + "'>" + data[i].phone + "</a></td>"
		//Reply
		
		if(data[i].response.toLowerCase() == "yes"){
			row_string += "<td><i class='icon-ok'/></td>";
			positive_responses++;
		}
		else if (data[i].response.toLowerCase() == "no")
			row_string += "<td><i class='icon-remove'/></td>";	
		else
			row_string += "<td><i class='icon-ellipsis-horizontal'/></td>"
		
		table.append(row_string);
		
		
		//table.append("<tr><td>" + data.Searchers[i].Name + "</td><td>" + data.Searchers[i].Phone + "</td><td>" + data.Searchers[i].Reply + "</td></tr>");	
	}
	
	$("#eventTitle").append(" (" + positive_responses + ")");
	
	
	
}