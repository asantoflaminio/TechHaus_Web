
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

function fav(event, heart){
    event.stopPropagation();
    if (heart.getAttribute('src') == "Iconos/heart.png")
                {
                    heart.src = "Iconos/heart_coloured4.png";
                }
                else
                {
                    heart.src = "Iconos/heart.png";
                }
}

function trash(event, trashcan){
    event.stopPropagation();
    if (trashcan.getAttribute('src') == "Iconos/tacho.png")
                {
                    trashcan.src = "Iconos/warning.png"; //this works ok
                    var heart = trashcan.closest('button').querySelector('.fave_icon');
                    heart.style.visibility = "hidden";
                    var message = trashcan.closest('button').querySelector('.trash_message');
                    message.style.visibility = "visible";
                    var yes = trashcan.closest('button').querySelector('.yes_icon');
                    yes.style.visibility = "visible";
                    var no = trashcan.closest('button').querySelector('.no_icon');
                    no.style.visibility = "visible";
                    
                }
}

function no(event, noicon){
    event.stopPropagation();
    var trashcan = noicon.closest('button').querySelector('.delete_icon');
    trashcan.src = "Iconos/tacho.png";
    noicon.style.visibility = "hidden";
    var message = noicon.closest('button').querySelector('.trash_message');
    message.style.visibility = "hidden";
    var yes = noicon.closest('button').querySelector('.yes_icon');
    yes.style.visibility = "hidden";
    var heart = noicon.closest('button').querySelector('.fave_icon');
    heart.style.visibility = "visible";
    
    
}

function yes(event, yesicon){
    
    event.stopPropagation();
    yesicon.closest('button').remove();
    
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
                var div4 = document.createElement("div");
                var div5 = document.createElement("div");
                var div6 = document.createElement("div");
                var div7 = document.createElement("div");
                var div8 = document.createElement("div");
			  	var p = document.createElement("p");
			  	var h3 = document.createElement("h3");
			  	var img = document.createElement("img");
                var trash = document.createElement("img");
                var heart = document.createElement("img");
                var yes = document.createElement("img");
                var no = document.createElement("img");
                var h4 = document.createElement("h4");
			  	img.setAttribute("src", "Iconos/arrow_down.png");
			  	img.setAttribute("alt", "Expand");
			  	img.setAttribute("class", "arrow_icon");
                trash.setAttribute("src", "Iconos/tacho.png");
			  	trash.setAttribute("alt", "Delete");
			  	trash.setAttribute("class", "delete_icon");
                trash.setAttribute("onclick", "trash(event,this);");
                heart.setAttribute("src", "Iconos/heart.png");
			  	heart.setAttribute("alt", "Fave");
			  	heart.setAttribute("class", "fave_icon");
                heart.setAttribute("onclick", "fav(event,this);");
                yes.setAttribute("src", "Iconos/yes.png");
			  	yes.setAttribute("alt", "Yes");
			  	yes.setAttribute("class", "yes_icon");
                yes.setAttribute("onclick", "yes(event,this);");
                no.setAttribute("src", "Iconos/no.png");
			  	no.setAttribute("alt", "No");
			  	no.setAttribute("class", "no_icon");
                no.setAttribute("onclick", "no(event,this);");
                    
			  	div1.appendChild(img);
                div4.appendChild(trash);
                div5.appendChild(heart);
                div6.appendChild(yes);
                div7.appendChild(no);
                div8.appendChild(h4);
			  	h4.setAttribute("class", "trash_message");
			  	h4.innerHTML = "You are about to delete this device. Continue? ";
                h3.setAttribute("class", "door_name");
			  	h3.innerHTML = $('#door_input').val();
			  	div2.appendChild(h3);
			  	p.setAttribute("class", "door_room");
			  	p.innerHTML = $('#room_input').val();
			  	var div9 = document.createElement("div");
			  	var p1 = document.createElement("p");
			  	p1.innerHTML = "Info on";
			  	div9.setAttribute("class", "panel");
			  	div3.appendChild(p);
			  	button.appendChild(div1);
                button.appendChild(div5);
                button.appendChild(div4);
			  	button.appendChild(div2);
			  	button.appendChild(div3);
                button.appendChild(div6);
                button.appendChild(div7);
                button.appendChild(div8);
                button.appendChild(div9);
                
			  	list.appendChild(button);
			  	div9.appendChild(p1);
			  	list.appendChild(div9);

      			$(this).dialog('close');

    			}
    		}
		]
	})
});

});
