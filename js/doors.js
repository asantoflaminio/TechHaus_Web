//accordion

addPanels();

function addPanels(){
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

function stat(event, status){
    //event.stopPropagation();
    if (status.getAttribute('src') == "Iconos/closed.png")
                {
                    status.src = "Iconos/open.png";
                     status.nextElementSibling.innerHTML = 'Status: Open';
                }
                else
                {
                    status.src = "Iconos/closed.png";
                    status.nextElementSibling.innerHTML = 'Status: Closed';
                }
}

function lock(event, locking){
    event.stopPropagation();
    if (locking.getAttribute('src') == "Iconos/locked.png")
                {
                    locking.src = "Iconos/unlocked.png";
                    locking.closest('div').parentNode.querySelector('.lock_text').innerHTML = 'Lock: Unlocked';
                }
                else
                {
                    locking.src = "Iconos/locked.png";
                    locking.closest('div').parentNode.querySelector('.lock_text').innerHTML = "Lock: Locked";
                }
}


function trash(event, trashcan){
    event.stopPropagation();
    if (trashcan.getAttribute('src') == "Iconos/tacho.png")
                {
                    //trashcan.src = "Iconos/warning.png"; //this works ok
                    trashcan.style.visibility = "hidden";
                    var heart = trashcan.closest('div').parentNode.querySelector('.fave_icon');
                    heart.style.visibility = "hidden";
                    //var lck = trashcan.closest('div').parentNode.querySelector('.lock');
                    //lck.style.display = "none";
                    var message = trashcan.closest('div').parentNode.querySelector('.trash_message');
                    message.style.visibility = "visible";
                    var yes = trashcan.closest('div').parentNode.querySelector('.yes_icon');
                    yes.style.visibility = "visible";
                    var no = trashcan.closest('div').parentNode.querySelector('.no_icon');
                    no.style.visibility = "visible";
                    
                }
}

function no(event, noicon){
    event.stopPropagation();
    var trashcan = noicon.closest('div').parentNode.querySelector('.delete_icon');
    trashcan.src = "Iconos/tacho.png";
    trashcan.style.visibility = "visible";
    noicon.style.visibility = "hidden";
    var message = noicon.closest('div').parentNode.querySelector('.trash_message');
    message.style.visibility = "hidden";
    var yes = noicon.closest('div').parentNode.querySelector('.yes_icon');
    yes.style.visibility = "hidden";
    var heart = noicon.closest('div').parentNode.querySelector('.fave_icon');
    heart.style.visibility = "visible";
    var lck = trashcan.closest('div').parentNode.querySelector('.lock');
    lck.style.display = "";
    
    
}

function yes(event, yesicon){
    
    event.stopPropagation();
    yesicon.closest('div').parentNode.nextElementSibling.remove();
    yesicon.closest('div').parentNode.remove();

}

//modify

function pencil2_display(event, title){

    var pencil = title.closest('div').querySelector('.pencil2_icon');
    pencil.style.visibility = "visible";
    
}

function pencil2_out(event, title){
    

   var pencil = title.closest('div').querySelector('.pencil2_icon');
    pencil.style.visibility = "hidden";
    
}

//edit device name
var id_enter;

function edit_name(event, name) {
    event.stopPropagation();
    name.style.visibility = "hidden";
    var input_new_name = name.nextElementSibling.nextElementSibling.children[0].children[0];
    var pencil = name.nextElementSibling.nextElementSibling;
    pencil.style.visibility = "hidden";
    input_new_name.style.visibility = "visible";
    
}

function change_name(event, element) {
    event.stopPropagation();
    var name_input = element;
    var name = name_input.value;
    var new_name = element.parentNode.parentNode.previousElementSibling.previousElementSibling;;
    new_name.innerHTML = name;
    name_input.style.visibility = "hidden";
    new_name.style.visibility = "visible";
    name_input.style.backgroundColor = "#bbb"
}

function input_name(event, name) {
    event.stopPropagation();
    name.style.backgroundColor = "transparent";
    $(name).keydown(function(event){
        if(event.keyCode == 13){
            change_name(event, name);
        }
    }); 
}

//search bar

function searching() {
    // Declare variables
    var input, filter, accordions_list, i, panels;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    accordions_list = document.getElementsByClassName("accordion");
    panels = document.getElementsByClassName("panel");

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < accordions_list.length; i++) {
        if (accordions_list[i].getElementsByTagName("h3")[0].innerHTML.toUpperCase().indexOf(filter) > -1) {
            accordions_list[i].style.display = "";
            panels[i].style.display = "";
        } else {
            accordions_list[i].style.display = "none";
            panels[i].style.display = "none";
        }
    }
}

//add door

$(function() {
    
    function edit(event, title){
    var divHtml = title.html();
    var editableText = $("<textarea />");
    editableText.val(divHtml);
    title.replaceWith(editableText);
    editableText.focus();
    // setup the blur event for this new textarea
    editableText.blur(editableTextBlurred(title));
    }

    function editableTextBlurred(title) {
    var html = title.val();
    var viewableText = $("<div>");
    viewableText.html(html);
    title.replaceWith(viewableText);
    // setup the click event for this new div
    $(viewableText).click(divClicked);
    }
    
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
			  	var elem = document.createElement("div");
			  	elem.setAttribute("class", "accordion");
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
                var pencil2 = document.createElement("img");
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
                pencil2.setAttribute("src", "Iconos/pencil.png");
                pencil2.setAttribute("alt", "Pencil;");
                pencil2.setAttribute("class", "pencil2_icon");
                    
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
                div2.appendChild(pencil2);
                div2.setAttribute("onmouseover", "pencil2_display(event,this);");
                div2.setAttribute("onmouseout","pencil2_out(event,this);");   
			  	p.setAttribute("class", "door_room");
			  	p.innerHTML = $('#room_input').val();
			  	var div9 = document.createElement("div");
			  	var p1 = document.createElement("p");
			  	p1.innerHTML = "Info on";
			  	div9.setAttribute("class", "panel");
                div9.appendChild(p1);
			  	div3.appendChild(p);
			  	elem.appendChild(div1);
                
                elem.appendChild(div5);
                elem.appendChild(div4);
                elem.appendChild(div6);
                elem.appendChild(div7);
                elem.appendChild(div2);
                elem.appendChild(div3);
                elem.appendChild(div8);
               // elem.appendChild(div9);
                
			  	list.appendChild(elem);
			  	list.appendChild(div9);
                addPanels();

      			$(this).dialog('close');

    			}
    		}
		]
	})
});

});
