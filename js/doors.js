var api = class {
  static get baseUrl() {
    return "http://127.0.0.1:8080/api/";
  }

  static get timeout() {
    return 60 * 1000;
  }
}

api.devicetypes = class {
  static get url() {
    return "http://127.0.0.1:8080/api/devicetypes/";
  }

  static getDeviceType(id) {
   return $.ajax({
      url: api.devicetypes.url + id,
      method: "GET",
      dataType: "json",
      timeout: api.timeout,
       }).then(function(data) {
           return data.device; //.map(item => item.name);
        });      
  }
    static getDeviceTypes() {
   return $.ajax({
      url: api.devicetypes.url ,
      method: "GET",
      dataType: "json",
      timeout: api.timeout,
       }).then(function(data) {
           return data.devices; //.map(item => item.name);
        });      
  }
    
  
}

api.devices = class {
  static get url() {
    return "http://127.0.0.1:8080/api/devices/";
  }
    
    static getAllDevices() {
   return $.ajax({
      url: api.devices.url,
      method: "GET",
      dataType: "json",
      timeout: api.timeout,
       }).then(function(data) {
           return data.devices;
        });  
  } 
   static getDeviceName(id) {
   return $.ajax({
      url: api.devices.url + id,
      method: "GET",
      dataType: "json",
      timeout: api.timeout,
       }).then(function(data) {
           return data;
        });  
  } 
    
    static getDevices(id) {
   return $.ajax({
      url: api.devices.url + id,
      method: "GET",
      dataType: "json",
      timeout: api.timeout,
       }).then(function(data) {
           return data;
        });  
  } 
    
    
    static getDevicesID() {
   return $.ajax({
      url: "http://127.0.0.1:8080/api/devicetypes",
      method: "GET",
      dataType: "json",
      timeout: api.timeout,
       }).then(function(data) {
           return data.devices;
        });  
  } 
    
    static getDevicesForType(id) {
   return $.ajax({
      url: "http://127.0.0.1:8080/api/devices/devicetypes/" + id ,
      method: "GET",
      dataType: "json",
      timeout: api.timeout,
       }).then(function(data) {
           return data.devices;
        });  
  }
    
    static getDeviceActions(id) {
   return $.ajax({
      url: "http://127.0.0.1:8080/api/devicetypes/" + id ,
      method: "GET",
      dataType: "json",
      timeout: api.timeout,
       }).then(function(data) {
           return data.device.actions;
        });  
  } 
}

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
        var arrow = this.children[2].children[0].children[0];
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
                    locking.closest('div').parentNode.querySelector('.lock_text').innerHTML = " Unlocked";
                }
                else
                {
                    locking.src = "Iconos/locked.png";
                    locking.closest('div').parentNode.querySelector('.lock_text').innerHTML = " Locked";
                }
}

function toggle(event, toggling){
    event.stopPropagation();
    if (toggling.getAttribute('src') == "Iconos/toggle_off.png")
                {
                    toggling.src = "Iconos/toggle_on.png";
                    toggling.closest('div').parentNode.querySelector('.lock_text').innerHTML = " On";
                }
                else
                {
                    toggling.src = "Iconos/toggle_off.png";
                    toggling.closest('div').parentNode.querySelector('.lock_text').innerHTML = " Off";
                }
}

function change_blind_status(event, status){
    event.stopPropagation();
    if (status.getAttribute('src') == "Iconos/blind_down.png")
                {
                    status.src = "Iconos/blind_up.png";
                    status.parentNode.parentNode.parentNode.previousElementSibling.querySelector('.accordion2').children[0].src = "Iconos/blind_up_status.png";
                    status.nextElementSibling.innerHTML = ' Up';
                    status.parentNode.parentNode.parentNode.previousElementSibling.querySelector('.accordion2').children[1].innerHTML = " Up";

                }
                else
                {
                    status.src = "Iconos/blind_down.png";
                    status.parentNode.parentNode.parentNode.previousElementSibling.querySelector('.accordion2').children[0].src = "Iconos/blind_down_status.png";
                    status.nextElementSibling.innerHTML = ' Down';
                    status.parentNode.parentNode.parentNode.previousElementSibling.querySelector('.accordion2').children[1].innerHTML = " Down";
                }
}

function change_blind_status_from_acc(event, status){
    event.stopPropagation();
    if (status.getAttribute('src') == "Iconos/blind_down_status.png")
                {
                    status.src = "Iconos/blind_up_status.png";
                    status.parentNode.parentNode.nextElementSibling.querySelector('.panel1').children[0].children[0].src = "Iconos/blind_up.png";
                    status.nextElementSibling.innerHTML = ' Up';
                    status.parentNode.parentNode.nextElementSibling.querySelector('.panel1').children[0].children[1].innerHTML = " Up";

                }
                else
                {
                    status.src = "Iconos/blind_down_status.png";
                    status.parentNode.parentNode.nextElementSibling.querySelector('.panel1').children[0].children[0].src = "Iconos/blind_down.png";
                    status.nextElementSibling.innerHTML = ' Down';
                    status.parentNode.parentNode.nextElementSibling.querySelector('.panel1').children[0].children[1].innerHTML = " Down";
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
                    var lck_icon = trashcan.closest('div').parentNode.parentNode.querySelector('.lock_icon');
                    var lck = trashcan.closest('div').parentNode.parentNode.querySelector('.lock_text');
                    lck_icon.style.visibility = "hidden";
                    lck.style.visibility = "hidden";
                    var message = trashcan.closest('div').parentNode.parentNode.querySelector('.trash_message');
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
    var message = noicon.closest('div').parentNode.parentNode.querySelector('.trash_message');
    message.style.visibility = "hidden";
    var yes = noicon.closest('div').parentNode.querySelector('.yes_icon');
    yes.style.visibility = "hidden";
    var heart = noicon.closest('div').parentNode.parentNode.querySelector('.fave_icon');
    heart.style.visibility = "visible";
    var lck_icon = trashcan.closest('div').parentNode.parentNode.querySelector('.lock_icon');
    var lck = trashcan.closest('div').parentNode.parentNode.querySelector('.lock_text');
    lck_icon.style.visibility = "visible";
    lck.style.visibility = "visible";
    
    
}

function yes(event, yesicon){
    
    event.stopPropagation();
    yesicon.closest('div').parentNode.parentNode.nextElementSibling.remove();
    yesicon.closest('div').parentNode.parentNode.remove();

}

//edit device name

function pencil2_display(event, title){

    var pencil = title.closest('div').querySelector('.pencil2_icon');
    pencil.style.visibility = "visible";
    
}

function pencil2_out(event, title){
    

   var pencil = title.closest('div').querySelector('.pencil2_icon');
    pencil.style.visibility = "hidden";
    
}

function edit_name(event, name) {
    event.stopPropagation();
    var pencil = name.nextElementSibling.nextElementSibling;
    pencil.style.visibility = "hidden";
    name.style.visibility = "hidden";
    var input_new_name = name.nextElementSibling.nextElementSibling.children[0].children[0];
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

//edit room name

function pencil2_displayRoom(event, title){
    var pencil = title.closest('div').querySelector('.pencil2_iconRoom');
    pencil.style.visibility = "visible";
    
}

function pencil2_outRoom(event, title){
    var pencil = title.closest('div').querySelector('.pencil2_iconRoom');
    pencil.style.visibility = "hidden";
    
}

function edit_room(event, room) {
    event.stopPropagation();
    var pencil = room.nextElementSibling;
    pencil.style.visibility = "hidden";
    room.style.visibility = "hidden";
    var select_new_room = room.nextElementSibling.nextElementSibling.children[0].children[0];
    select_new_room.style.visibility = "visible";
    
}

function select_room(event, new_room){
    event.stopPropagation();
    var room = new_room;
    var room_name = room.parentNode.parentNode.previousElementSibling.previousElementSibling;
    room_name.innerHTML = room.value;
    room.style.visibility = "hidden";
    room_name.style.visibility = "visible";
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

$(document).ready(function() {
    onPageLoad();
});
function onPageLoad(){
    var typeid = window.localStorage.getItem("type_id");
    console.log("desde doors.js tengo typeid = " + typeid);
    var typename = window.localStorage.getItem("type_name");
    var logo = document.getElementById("deviceicon");
    var brd = document.getElementById("breadcrumbfinal");
    var ttl = document.getElementById("title");
    if(typename == 'door'){ //esto es para el logo y el titulo

    }else if(typename =='ac'){
        logo.setAttribute("src","Iconos/AirConditioners2.png");
        brd.innerHTML = "Air Conditioners";
        ttl.innerHTML = "Air Conditioners";
    }else if(typename == 'oven'){
        logo.setAttribute("src","Iconos/Ovens3.png");
        brd.innerHTML = "Ovens";
        ttl.innerHTML = "Ovens";
    }else if(typename == 'alarm'){
        logo.setAttribute("src","Iconos/Alarms.png");
        brd.innerHTML = "Alarms";
        ttl.innerHTML = "Alarms";
    }else if(typename == 'blind'){
        logo.setAttribute("src","Iconos/Curtains.png");
        brd.innerHTML = "Curtains";
        ttl.innerHTML = "Curtains";
    }else if(typename == 'refrigerator'){
        logo.setAttribute("src","Iconos/Fridges2.png");
        brd.innerHTML = "Fridges";
        ttl.innerHTML = "Fridges";
    }else if(typename == 'lamp'){
        logo.setAttribute("src","Iconos/Lights2.png");
        brd.innerHTML = "Lights";
        ttl.innerHTML = "Lights";
    }
    api.devices.getDevicesForType(typeid).done(function(data) {
        $.each(data, function(i, item){ //estoy iterando por cada elemento
             var list = document.getElementById("devices_list");
             var elem = document.createElement("div");
             elem.setAttribute("class", "accordion");
             var acc1 = document.createElement("div");
             var acc2 = document.createElement("div");
             var acc3 = document.createElement("div");
             acc1.setAttribute("class", "accordion1");
             acc2.setAttribute("class", "accordion2");
             acc3.setAttribute("class", "accordion3");
            
            var div1 = document.createElement("div");
            var div2 = document.createElement("div");
            var h3 = document.createElement("h3");
            var pencil2 = document.createElement("img");
            var span = document.createElement("span");
            var input = document.createElement("input");

            h3.setAttribute("class", "device_name");
            h3.innerHTML = item.name;
            h3.setAttribute("onmouseover", "pencil2_display(event,this);");
            h3.setAttribute("onmouseout","pencil2_out(event,this);");   
            h3.setAttribute("onclick","edit_name(event,this);"); 
            pencil2.setAttribute("src", "Iconos/pencil.png");
            pencil2.setAttribute("alt", "Pencil;");
            pencil2.setAttribute("class", "pencil2_icon");
            input.setAttribute("type", "text");
            input.setAttribute("value", item.name);
            input.setAttribute("class", "new_device_name");
            input.setAttribute("onclick", "input_name(event, this);");
            div1.setAttribute("class", "name_device");  
            span.appendChild(input);
            div2.appendChild(span);
            div1.appendChild(h3);
            div1.appendChild(pencil2);
            div1.appendChild(div2);

            var div3 = document.createElement("div");
            var p = document.createElement("p");
            var img_pen = document.createElement("img");
            img_pen.setAttribute("src", "Iconos/pencil.png");
            img_pen.setAttribute("alt", "Pencil");
            img_pen.setAttribute("class", "pencil2_iconRoom");
            var divRo = document.createElement("div");
            var spanRo = document.createElement("span");
            var selRo = document.createElement("select");
            selRo.setAttribute("type", "text");
            selRo.setAttribute("value", "Door 1");
            selRo.setAttribute("class", "new_room");
            selRo.setAttribute("onclick", "event.stopPropagation();");
            selRo.setAttribute("onchange", "select_room(event,this)");
            //ESTO DEBERIA SER UNA OPCION POR CADA HABITACION MAS TENER UNA FUNCION Q 
            // SI HACEN CLICK CAMBIE LA HABITACION EN LA BD
            //SI HAY TIEMPO SE HACE SINO ES A MODO ILUSTRATIVO
            // BORRAR ESTE COMENTARIO ANTES DE ENTREGAR
            var opt1 = document.createElement("option");
            var opt2 = document.createElement("option");
            opt1.setAttribute("value", "Kitchen");
            opt1.innerHTML = "Kitchen";
            opt2.setAttribute("value", "Garage");
            opt2.innerHTML = "Garage";
            selRo.appendChild(opt1);
            selRo.appendChild(opt2);
            spanRo.appendChild(selRo);
            divRo.appendChild(spanRo);

            p.setAttribute("class", "door_room");
            p.setAttribute("onmouseover", "pencil2_displayRoom(event,this);");
            p.setAttribute("onmouseout", "pencil2_outRoom(event,this);");
            p.setAttribute("onclick", "edit_room(event,this)");
            p.innerHTML = item.meta.replace("{","").replace("}","").split(',')[0]; //tomo el nombre de la habitacion

            div3.appendChild(p);
            div3.appendChild(img_pen);
            div3.appendChild(divRo);
            acc1.appendChild(div1);
            acc1.appendChild(div3);
            //A partir de aca viene lo q pertenece al acc2 que es en kitchen donde empieza con lock_icon
            if(typename == 'door'){ //para crear 'var divX' usar X mayor a 10

            }else if(typename =='ac'){

            }else if(typename == 'oven'){

            }else if(typename == 'alarm'){

            }else if(typename == 'blind'){

            }else if(typename == 'refrigerator'){

            }else if(typename == 'lamp'){

            }
            var div5 = document.createElement("div");
            var div6 = document.createElement("div");
            var div7 = document.createElement("div");
            var div8 = document.createElement("div");
            var div9 = document.createElement("div");
            var arrow = document.createElement("img");
            var heart = document.createElement("img");
            var trash = document.createElement("img");
            var yes = document.createElement("img");
            var no = document.createElement("img");

            arrow.setAttribute("src", "Iconos/arrow_down.png");
            arrow.setAttribute("alt", "Expand");
            arrow.setAttribute("class", "arrow_icon");  
            heart.setAttribute("src", "Iconos/heart.png");
            heart.setAttribute("alt", "Fave");
            heart.setAttribute("class", "fave_icon");
            heart.setAttribute("onclick", "fav(event,this);");
            trash.setAttribute("src", "Iconos/tacho.png");
            trash.setAttribute("alt", "Delete");
            trash.setAttribute("class", "delete_icon");
            trash.setAttribute("onclick", "trash(event,this);");
            yes.setAttribute("src", "Iconos/yes.png");
            yes.setAttribute("alt", "Yes");
            yes.setAttribute("class", "yes_icon");
            yes.setAttribute("onclick", "yes(event,this);");
            no.setAttribute("src", "Iconos/no.png");
            no.setAttribute("alt", "No");
            no.setAttribute("class", "no_icon");
            no.setAttribute("onclick", "no(event,this);");

            div5.appendChild(arrow);
            div6.appendChild(heart);
            div7.appendChild(trash);
            div8.appendChild(yes);
            div9.appendChild(no);
            acc3.appendChild(div5);
            acc3.appendChild(div6);
            acc3.appendChild(div7);
            acc3.appendChild(div8);
            acc3.appendChild(div9);

            elem.appendChild(acc1);
            elem.appendChild(acc2);
            elem.appendChild(acc3);

            var div10 = document.createElement("div");
            var p1 = document.createElement("p");
            
            //ACA ESTA EL PANEL!!!
            //
            //
            
            p1.innerHTML = "Info on";
            p1.setAttribute("class", "panel_info");
            div10.setAttribute("class", "panel");
            div10.appendChild(p1);

            list.appendChild(elem);
            list.appendChild(div10);

            elem.addEventListener("click", function() {
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                  panel.style.display = "block";
            }
            var arrow = this.children[2].children[0];
            if (panel.style.display === "block") {
               arrow.src = "Iconos/arrow_up.png";
             } else {
                 arrow.src = "Iconos/arrow_down.png";
            }
        });
        });
    });
}

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
