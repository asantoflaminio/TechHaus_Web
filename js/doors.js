
//accordion

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        /*this.classList.toggle("active");*/

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }

        /* Toggle between up and down arrow */
        var arrow = this.children[0].children[0];
        if (panel.style.display === "block") {
	        arrow.src = "Iconos/arrow_up.png";
        } else {
	        arrow.src = "Iconos/arrow_down.png";
        }
    });
}


//favorite

function fav(heart){
    if (heart.getAttribute('src') == "Iconos/heart.png") {
                    heart.src = "Iconos/heart_coloured4.png";
                } else {
                    heart.src = "Iconos/heart.png";
                }
}


//add door

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
    		 	var list = document.getElementById("doors_list");
			  	var button = document.createElement("BUTTON");
			  	button.setAttribute("class", "accordion");
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
			  	var div4 = document.createElement("div");
			  	var p1 = document.createElement("p");
			  	p1.innerHTML = "Info on";
			  	div4.setAttribute("class", "panel");
			  	div3.appendChild(p);
			  	button.appendChild(div1);
			  	button.appendChild(div2);
			  	button.appendChild(div3);
			  	list.appendChild(button);
			  	div4.appendChild(p1);
			  	list.appendChild(div4);

      			$(this).dialog('close');

    			}
    		}
		]
	})
});

});
