var api = class {
  static get baseUrl() {
    return "http://127.0.0.1:8080/api/";
  }

  static get timeout() {
    return 60 * 1000;
  }
}

api.rooms = class {
  static get url() {
    return "http://127.0.0.1:8080/api/rooms/";
  }

  static getRooms() {
   return $.ajax({
      url: api.rooms.url,
      method: "GET",
      dataType: "json",
      timeout: api.timeout,
       }).then(function(data) {
           return data.rooms; //.map(item => item.name);
        });      
  }
    static getRoomDevices(id) {
       return $.ajax({
          url: api.rooms.url + id + "/devices/",
          method: "GET",
          dataType: "json",
          timeout: api.timeout,
           }).then(function(data) {
               return data.devices; //.map(item => item.name);
            });      
      }
    
    static getRoom(id) {
   return $.ajax({
      url: api.rooms.url + id,
      method: "GET",
      dataType: "json",
      timeout: api.timeout,
       }).then(function(data) {
           return data.room; //.map(item => item.name);
        });      
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

function lock(event, locking){
    event.stopPropagation();
    if (locking.getAttribute('src') == "Iconos/locked.png")
                {
                    locking.src = "Iconos/unlocked.png";
                    locking.closest('div').parentNode.querySelector('.lock_text').innerHTML = "  Unlocked";
                }
                else
                {
                    locking.src = "Iconos/locked.png";
                    locking.closest('div').parentNode.querySelector('.lock_text').innerHTML = "  Locked";
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
    api.devices.getDevices().done(function(data){
        $.each(data, function(r, item3){
        if(yesicon.closest('div').parentNode.parentNode.querySelector('.device_name').innerHTML == item3.name){
                api.devices.deleteDevice(item3.id);
              }
       });
  });
}



function add_device(event, name) {
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
                h3.innerHTML = $('#device_input').val();
                h3.setAttribute("onmouseover", "pencil2_display(event,this);");
                h3.setAttribute("onmouseout","pencil2_out(event,this);");   
                h3.setAttribute("onclick","edit_name(event,this);"); 
                pencil2.setAttribute("src", "Iconos/pencil.png");
                pencil2.setAttribute("alt", "Pencil;");
                pencil2.setAttribute("class", "pencil2_icon");
                input.setAttribute("type", "text");
                input.setAttribute("value", $('#device_input').val());
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

                p.setAttribute("class", "device_room");
                p.innerHTML = $('#room_input').val().toLowerCase();

                div3.appendChild(p);
                acc1.appendChild(div1);
                acc1.appendChild(div3);

                var lock_icon = document.createElement("img");
                var lock_text = document.createElement("p");
                var div4 = document.createElement("div");
                var h4 = document.createElement("h4");

                lock_icon.setAttribute("src", "Iconos/locked.png");
                lock_icon.setAttribute("alt", "Lock");
                lock_icon.setAttribute("class", "lock_icon");
                lock_icon.setAttribute("onclick", "lock(event,this);");
                lock_text.setAttribute("class", "lock_text");
                lock_text.innerHTML = "  Locked"
                h4.setAttribute("class", "trash_message");
                h4.innerHTML = "You are about to delete this device. Continue? ";

                div4.appendChild(h4);
                acc2.appendChild(lock_icon);
                acc2.appendChild(lock_text);
                acc2.appendChild(div4);

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
                    
                api.rooms.getRooms().done(function(data) {

                            $.each(data, function(i, item){
                                if(item.name.toUpperCase() == document.getElementById("title").innerHTML.toUpperCase()){
                                    api.devicetypes.getDeviceTypes().done(function(data) {
                                        $.each(data, function(j, item2){
                                            if(item2.name.toUpperCase() == $('#room_input').val().toUpperCase()){
                                               api.devices.addDevice(item2.id,$('#device_input').val(),item.name).done(function(data) {
                                                   api.devices.getDevices().done(function(data){
                                                       $.each(data, function(r, item3){
                                                       if($('#device_input').val() == item3.name){
                                                           console.log("VOY A LINKEAR");
                                                           api.devices.link(item3.id, item.id);
                                                       }
                                                       });
                                                   });
                                                   
                                               });
                                                
                                               }
                                            
                                        });
                                        
                                    });
                                    
                                }
                            });
                });
              //  document.getElementById("mymodal").modal('hide');
                //$(this).dialog('close');
}

api.devices = class {
  static get url() {
    return "http://127.0.0.1:8080/api/devices/";
  }

  static addDevice(typeid, name, room) {
   return $.ajax({
      url: api.devices.url,
      method: "POST",
      dataType: "json",
      timeout: api.timeout,
       data: {'typeId': typeid, 'name': name, 'meta': "{" + room + "}"},
       });     
  }
    
    static link(dev_id, room_id) {
       return $.ajax({
          url: api.devices.url + dev_id + "/rooms/" +room_id,
          method: "POST",
          dataType: "json",
          timeout: api.timeout
           });
      }
  static getDevices() {
    return $.ajax({
      url: api.devices.url ,
      method: "GET",
      dataType: "json",
      timeout: api.timeout,
       }).then(function(data) {
           return data.devices; //.map(item => item.name);
        });      
  }
    static deleteDevice(id) {
    return $.ajax({
      url: api.devices.url + id,
      method: "DELETE",
      dataType: "json",
      timeout: api.timeout
       })   
  }
}


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
            var arrow = this.children[0].children[0];
            if (panel.style.display === "block") {
                arrow.src = "Iconos/arrow_up.png";
            } else {
                arrow.src = "Iconos/arrow_down.png";
            }
        });
    }
}

//edit room name
function pencil_display(event, title){

    var pencil = title.closest('div').querySelector('.pencil_icon');
    pencil.style.visibility = "visible";
    
}

function pencil_out(event, title){
    

   var pencil = title.closest('div').querySelector('.pencil_icon');
    pencil.style.visibility = "hidden";
    
}

function edit_nameRoom(event, name) {
    event.stopPropagation();
    var pencil = name.nextElementSibling;
    pencil.style.visibility = "hidden";    
    var add = name.nextElementSibling.nextElementSibling.nextElementSibling;
    add.style.visibility = "hidden";
    name.style.visibility = "hidden";
    var input_new_name = name.nextElementSibling.nextElementSibling.children[0].children[0];
    input_new_name.style.visibility = "visible";
    
}

function change_nameRoom(event, element) {
    event.stopPropagation();
    var name_input = element;
    var name = name_input.value;
    var new_name = element.parentNode.parentNode.previousElementSibling.previousElementSibling;;
    new_name.innerHTML = name;
    var add = element.parentNode.parentNode.nextElementSibling;
    add.style.visibility = "visible";
    name_input.style.visibility = "hidden";
    new_name.style.visibility = "visible";
    name_input.style.backgroundColor = "#bbb"
}

function input_nameRoom(event, name) {
    event.stopPropagation();
    name.style.backgroundColor = "transparent";
    $(name).keydown(function(event){
        if(event.keyCode == 13){
            change_nameRoom(event, name);
        }
    }); 
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
      api.devices.getDevices().done(function(data){
         $.each(data, function(r, item3){
        if(yesicon.closest('div').parentNode.parentNode.querySelector('h3').innerHTML == item3.name){
                api.devices.deleteDevice(item3.id);
              }
       });
  });

}

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

$(document).ready(function() {
    var roomid = window.localStorage.getItem("room_id");
    api.rooms.getRoom(roomid).done(function(data){
        console.log(data.name);
        console.log("THIS IS A " + data.meta.replace("{","").replace("}","").split(',')[0]);
        document.getElementById("title").innerHTML = data.name;
        var roomtype = data.meta.replace("{","").replace("}","").split(',')[0];
        var img = document.getElementById("deviceicon");
        if(roomtype == "bathroom"){
                        img.setAttribute("src", "Iconos/bathroom2.png"); 
                        }else if(roomtype == "garage"){
                            img.setAttribute("src", "Iconos/garage2.png"); 
                        }else if(roomtype == "kitchen"){
                             img.setAttribute("src", "Iconos/kitchen1.png");      
                        }else if(roomtype == "garden"){
                            img.setAttribute("src", "Iconos/jardin4.png");   
                        }else if(roomtype == "laundry"){
                            img.setAttribute("src", "Iconos/laundry2.png");      
                        }else if(roomtype == "bedroom"){
                            img.setAttribute("src", "Iconos/Rooms6.png");       
                        }else{
                            img.setAttribute("src", "Iconos/marta.png");     
                        }
    });

    
   
    
    api.rooms.getRooms().done(function(data) {
        
        $.each(data, function(i, item){
            
            if(item.name == document.getElementById("title").innerHTML){
                console.log(item.id);
                api.rooms.getRoomDevices(item.id).done(function(data) {
                   $.each(data, function(j, item2){
                       
                       var dev_name = item2.name;
                       var dev_type = "";
                       api.devicetypes.getDeviceType(item2.typeId).done(function(data) {
                           dev_type = data.name; 
                           
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
                h3.innerHTML = dev_name;
                h3.setAttribute("onmouseover", "pencil2_display(event,this);");
                h3.setAttribute("onmouseout","pencil2_out(event,this);");   
                h3.setAttribute("onclick","edit_name(event,this);"); 
                pencil2.setAttribute("src", "Iconos/pencil.png");
                pencil2.setAttribute("alt", "Pencil;");
                pencil2.setAttribute("class", "pencil2_icon");
                input.setAttribute("type", "text");
                input.setAttribute("value", dev_name);
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
                p.innerHTML = dev_type;

                div3.appendChild(p);
                div3.appendChild(img_pen);
                div3.appendChild(divRo);
                acc1.appendChild(div1);
                acc1.appendChild(div3);
                           
                ////accordion 2 igual que en doors.js!!!
                var lock_icon = document.createElement("img");
                var lock_text = document.createElement("p");
                var div4 = document.createElement("div");
                var h4 = document.createElement("h4");

                lock_icon.setAttribute("src", "Iconos/locked.png");
                lock_icon.setAttribute("alt", "Lock");
                lock_icon.setAttribute("class", "lock_icon");
                lock_icon.setAttribute("onclick", "lock(event,this);");
                lock_text.setAttribute("class", "lock_text");
                lock_text.innerHTML = "  Locked"
                h4.setAttribute("class", "trash_message");
                h4.innerHTML = "You are about to delete this device. Continue? ";

                div4.appendChild(h4);
                acc2.appendChild(lock_icon);
                acc2.appendChild(lock_text);
                acc2.appendChild(div4);

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
                });
            }
        });
        
        
    
        
        
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log("Request failed: jqXHR.status=" + jqXHR.status + ", textStatus=" + textStatus + ", errorThrown=" + errorThrown);
    });
    
});

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
                var list = document.getElementById("devices_list");
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
                h3.setAttribute("class", "device_name");
                h3.innerHTML = $('#device_input').val();
                div2.appendChild(h3);
                div2.appendChild(pencil2);
                div2.setAttribute("onmouseover", "pencil2_display(event,this);");
                div2.setAttribute("onmouseout","pencil2_out(event,this);");   
                p.setAttribute("class", "device_room");
                p.innerHTML = $('#room_input').val();
                var div9 = document.createElement("div");
                var p1 = document.createElement("p");
                p1.innerHTML = "Info on";
                div9.setAttribute("class", "panel");
                div3.appendChild(p);
                elem.appendChild(div1);
                
                elem.appendChild(div5);
                elem.appendChild(div4);
                elem.appendChild(div6);
                elem.appendChild(div7);
                elem.appendChild(div2);
                elem.appendChild(div3);
                elem.appendChild(div8);
                elem.appendChild(div9);
                
                list.appendChild(elem);
                div9.appendChild(p1);
                list.appendChild(div9);

                elem.addEventListener("click", function() {
                var panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
                var arrow = this.children[0].children[0];
                if (panel.style.display === "block") {
                    arrow.src = "Iconos/arrow_up.png";
                } else {
                    arrow.src = "Iconos/arrow_down.png";
                }
                });
                    
                api.rooms.getRooms().done(function(data) {

                            $.each(data, function(i, item){
                                if(item.name.toUpperCase() == document.getElementById("title").innerHTML.toUpperCase()){
                                    api.devicetypes.getDeviceTypes().done(function(data) {
                                        $.each(data, function(j, item2){
                                            if(item2.name.toUpperCase() == $('#room_input').val().toUpperCase()){
                                               api.devices.addDevice(item2.id,$('#device_input').val(),item.name).done(function(data) {
                                                   api.devices.getDevices().done(function(data){
                                                       $.each(data, function(r, item3){
                                                       if($('#device_input').val() == item3.name){
                                                           console.log("VOY A LINKEAR");
                                                           api.devices.link(item3.id, item.id);
                                                       }
                                                       });
                                                   });
                                                   
                                               });
                                                
                                               }
                                            
                                        });
                                        
                                    });
                                    
                                }
                            });
                });
                
                $(this).dialog('close');

                }
            }
        ]
    });
});

function pencil2_displayRoom(event, title){
    var pencil = title.closest('div').querySelector('.pencil2_iconRoom');
    pencil.style.visibility = "visible";
    
}

function edit_room(event, room) {
    event.stopPropagation();
    var pencil = room.nextElementSibling;
    pencil.style.visibility = "hidden";
    room.style.visibility = "hidden";
    var select_new_room = room.nextElementSibling.nextElementSibling.children[0].children[0];
    select_new_room.style.visibility = "visible";
    
}

function pencil2_outRoom(event, title){
    var pencil = title.closest('div').querySelector('.pencil2_iconRoom');
    pencil.style.visibility = "hidden";
    
}
