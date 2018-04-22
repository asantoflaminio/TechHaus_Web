$(function() {

$("#addicon").click(function() {

	$("#popup").dialog({
		modal: true,
    	buttons: [ 
    		{	
    			text:'Cancel',
    			"class": "mybutton cancel-button",
    			click: function() {
    			
    			$(this).dialog('close');
    			}
    		},
    		{
    			text: 'Add',
    			"class": "mybutton",
    			click: function () {
    		 	var ul = document.getElementsByClassName("doors_list");
			  	var li = document.createElement("li");
			  	li.setAttribute("class", "a_door");
			  	var div1 = document.createElement("div");
			  	var div2 = document.createElement("div");
			  	var div3 = document.createElement("div");
			  	var p = document.createElement("p");
			  	var h3 = document.createElement("h3");
			  	var img = document.createElement("img");
			  	img.setAttribute("src", "Iconos/arrow_down.png");
			  	img.setAttribute("alt", "Expand");
			  	img.setAttribute("class", "arrow_icon");
			  	div1.appendChild(img);
			  	h3.setAttribute("class", "door_name");
			  	h3.innerHTML = $('#door_input').val();
			  	div2.appendChild(h3);
			  	p.setAttribute("class", "door_room");
			  	p.innerHTML = $('#room_input').val();
			  	div3.appendChild(p);
			  	li.appendChild(div1);
			  	li.appendChild(div2);
			  	li.appendChild(div3);
			  	ul[0].appendChild(li);
      			
      			$(this).dialog('close');

    			}
    		}
		]
	})
});
});
