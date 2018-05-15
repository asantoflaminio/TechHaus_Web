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
    static getState(id) {
   return $.ajax({
      url: api.devices.url + id + "/getState",
      method: "PUT",
      dataType: "json",
      timeout: api.timeout,
       }).then(function(data) {
           return data.result;
        });  
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

      static deleteDevice(deviceId) {
   return $.ajax({
      url: api.devices.url + deviceId,
      method: "DELETE",
      dataType: "json",
      timeout: api.timeout,
       })
       
     
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

/*function trash(event, trashcan){
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
}*/

function trash(event, tacho){
    var devicename = tacho.closest('div').parentNode.parentNode.querySelector('.device_name').innerHTML;
    var deviceid = "";
    //window.localStorage.clear();
    window.localStorage.setItem("devicename", devicename);
    api.devices.getAllDevices().done(function(data){
        $.each(data, function(i, item){
            if(item.name == devicename){
                deviceid = item.id;
                document.getElementById("msg-tag").innerHTML = "You are about to delete device \'"+devicename+ "\'"
                window.localStorage.setItem("device_id2", deviceid);
            }
        });
    });  
}

function delete_device(event, confirm){
    var deviceid = window.localStorage.getItem("device_id2");
    console.log("estoy aca" + deviceid);
    api.devices.deleteDevice(deviceid).done(function(data){
        onPageLoad(); 
        $('#delete_device_popup').modal('hide');
    });
};


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
    var myNode = document.getElementById("devices_list");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    var typeid = window.localStorage.getItem("type_id");
//    console.log("desde doors.js tengo typeid = " + typeid);
    var typename = window.localStorage.getItem("type_name");
    var logo = document.getElementById("deviceicon");
    var brd = document.getElementById("breadcrumbfinal");
    var ttl = document.getElementById("title");
    if(typename == 'door'){ //esto es para el logo y el titulo
        logo.setAttribute("src","Iconos/Doors.png");
        brd.innerHTML = "Doors";
        ttl.innerHTML = "Doors";
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

            if(typename == 'door'){
                
                api.devices.getState(item.id).done(function(data){
                   console.log("Mi state de door es: " + data.status); 
                    console.log("Mi lock de door es: " + data.lock); 
                    var lock_icon2 = document.createElement("img");
                    var lock_info = document.createElement("p");
                    var div_trash = document.createElement("div");
                    var h4_trash = document.createElement("h4");

                    lock_icon2.setAttribute("src", "Iconos/locked.png"); //debería depender de getstate
                    lock_icon2.setAttribute("class", "lock_icon"); //debería depender de getstate
                    lock_icon2.setAttribute("alt", "Locked");
                    lock_icon2.setAttribute("onclick", "lock(event,this);");

                    lock_info.setAttribute("class", "lock_text");
                    lock_info.innerHTML = "Locked"; //debería depender de getstate

                    h4_trash.setAttribute("class", "trash_message");
                    h4_trash.innerHTML = "You are about to delete this device. Continue? ";

                    div_trash.appendChild(h4_trash);

                    acc2.appendChild(lock_icon2);
                    acc2.appendChild(lock_info);
                    acc2.appendChild(div_trash);
                });

                

            }else if(typename =='ac'){
                api.devices.getState(item.id).done(function(data){
                    console.log("Mi status de ac es: " + data.status); 
                console.log("Mi tempearatura de ac es: " + data.temperature); 
                    console.log("Mi mode de ac es: " + data.mode); 
                    console.log("Mi vertical swing  de ac es: " + data.verticalSwing); 
                    console.log("Mi horizontal swing de ac es: " + data.horizontalSwing); 
                    console.log("Mi fan speed de ac es: " + data.fanSpeed); 
                    var toggle_img = document.createElement("img");
                    var toggle_info = document.createElement("p");
                    var div_trash = document.createElement("div");
                    var h4_trash = document.createElement("h4");

                    toggle_img.setAttribute("src", "Iconos/toggle_off.png"); //debería depender de getstate
                    toggle_img.setAttribute("alt", "Off"); //debería depender de getstate
                    toggle_img.setAttribute("class", "toggle_icon");
                    toggle_img.setAttribute("onclick", "toggle(event,this);");

                    toggle_info.setAttribute("class", "lock_text");
                    toggle_info.innerHTML = "Off"; //debería depender de getstate

                    h4_trash.setAttribute("class", "trash_message");
                    h4_trash.innerHTML = "You are about to delete this device. Continue? ";

                    div_trash.appendChild(h4_trash);

                    acc2.appendChild(toggle_img);
                    acc2.appendChild(toggle_info);
                    acc2.appendChild(div_trash);
                });
                

            }else if(typename == 'oven'){
                api.devices.getState(item.id).done(function(data){
                    console.log("Mi status es: " + data.status); 
                    console.log("Mi tempearatura es: " + data.temperature); 
                    console.log("Mi heat  es: " + data.heat); 
                    console.log("Mi grill   es: " + data.grill); 
                    console.log("Mi convection  es: " + data.convection); 
                    var toggle_img = document.createElement("img");
                    var toggle_info = document.createElement("p");
                    var div_trash = document.createElement("div");
                    var h4_trash = document.createElement("h4");

                    toggle_img.setAttribute("src", "Iconos/toggle_off.png"); //debería depender de getstate
                    toggle_img.setAttribute("alt", "Off"); //debería depender de getstate
                    toggle_img.setAttribute("class", "toggle_icon");
                    toggle_img.setAttribute("onclick", "toggle(event,this);");

                    toggle_info.setAttribute("class", "lock_text");
                    toggle_info.innerHTML = "Off"; //debería depender de getstate

                    h4_trash.setAttribute("class", "trash_message");
                    h4_trash.innerHTML = "You are about to delete this device. Continue? ";

                    div_trash.appendChild(h4_trash);

                    acc2.appendChild(toggle_img);
                    acc2.appendChild(toggle_info);
                    acc2.appendChild(div_trash);
                });
                

            }else if(typename == 'alarm'){
                api.devices.getState(item.id).done(function(data){
                    console.log("Mi status es: " + data.status); 
                    var alarm_icon = document.createElement("img");
                    var alarm_info = document.createElement("p");
                    var div_trash = document.createElement("div");
                    var h4_trash = document.createElement("h4");

                    alarm_icon.setAttribute("src", "Iconos/alarm_stat_off.png"); //debería depender de getstate
                    alarm_icon.setAttribute("class", "alarm_icon"); //debería depender de getstate
                    alarm_icon.setAttribute("alt", "Alarm Status");
                    alarm_icon.setAttribute("onclick", "toggle(event,this);");

                    alarm_info.setAttribute("class", "lock_text");
                    alarm_info.innerHTML = "Disarmed"; //debería depender de getstate

                    h4_trash.setAttribute("class", "trash_message");
                    h4_trash.innerHTML = "You are about to delete this device. Continue? ";

                    div_trash.appendChild(h4_trash);

                    acc2.appendChild(alarm_icon);
                    acc2.appendChild(alarm_info);
                    acc2.appendChild(div_trash); 
                });
                             

            }else if(typename == 'blind'){
                api.devices.getState(item.id).done(function(data){
                    console.log("Mi status es: " + data.status); 
                    var blind_icon2 = document.createElement("img");
                    var blind_info = document.createElement("p");
                    var div_trash = document.createElement("div");
                    var h4_trash = document.createElement("h4");

                    blind_icon2.setAttribute("src", "Iconos/blind_up_status.png"); //debería depender de getstate
                    blind_icon2.setAttribute("alt", "Up"); //debería depender de getstate
                    blind_icon2.setAttribute("class", "lock_icon");
                    blind_icon2.setAttribute("onclick", "change_blind_status_from_acc(event,this);");

                    blind_info.setAttribute("class", "lock_text");
                    blind_info.innerHTML = " Up"; //debería depender de getstate

                    h4_trash.setAttribute("class", "trash_message");
                    h4_trash.innerHTML = "You are about to delete this device. Continue? ";

                    div_trash.appendChild(h4_trash);

                    acc2.appendChild(blind_icon2);
                    acc2.appendChild(blind_info);
                    acc2.appendChild(div_trash);
                });
                

            }else if(typename == 'refrigerator'){
                api.devices.getState(item.id).done(function(data){
                    console.log("Mi mode es: " + data.mode); 
                    console.log("Mi temperature es: " + data.temperature); 
                    console.log("Mi freezerTemp es: " + data.freezerTemperature); 
                    var temp_icon = document.createElement("img");
                    var temp_info = document.createElement("p");
                    var div_trash = document.createElement("div");
                    var h4_trash = document.createElement("h4");

                    temp_icon.setAttribute("src", "Iconos/temperature.png");
                    temp_icon.setAttribute("alt", "Temperature");
                    temp_icon.setAttribute("class", "temperature_icon_status");

                    temp_info.setAttribute("class", "lock_text");
                    temp_info.innerHTML = "5°C"; //debería depender de getstate

                    h4_trash.setAttribute("class", "trash_message");
                    h4_trash.innerHTML = "You are about to delete this device. Continue? ";

                    div_trash.appendChild(h4_trash);

                    acc2.appendChild(temp_icon);
                    acc2.appendChild(temp_info);
                    acc2.appendChild(div_trash);
                });
                

            }else if(typename == 'lamp'){
                api.devices.getState(item.id).done(function(data){
                    console.log("Mi status es: " + data.status); 
                    console.log("Mi color es: " + data.color); 
                    console.log("Mi brightness es: " + data.brightness); 
                    var toggle_img = document.createElement("img");
                    var toggle_info = document.createElement("p");
                    var div_trash = document.createElement("div");
                    var h4_trash = document.createElement("h4");

                    toggle_img.setAttribute("src", "Iconos/toggle_off.png"); //debería depender de getstate
                    toggle_img.setAttribute("alt", "Off"); //debería depender de getstate
                    toggle_img.setAttribute("class", "toggle_icon");
                    toggle_img.setAttribute("onclick", "toggle(event,this);");

                    toggle_info.setAttribute("class", "lock_text");
                    toggle_info.innerHTML = "Off"; //debería depender de getstate

                    h4_trash.setAttribute("class", "trash_message");
                    h4_trash.innerHTML = "You are about to delete this device. Continue? ";

                    div_trash.appendChild(h4_trash);

                    acc2.appendChild(toggle_img);
                    acc2.appendChild(toggle_info);
                    acc2.appendChild(div_trash);
                });
                
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
            trash.setAttribute("data-toggle", "modal");
            trash.setAttribute("data-target", "#delete_device_popup");
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

            var panel = document.createElement("div");
            panel.setAttribute("class", "panel");
            
            if(typename == 'door'){

                var panel1 = document.createElement("div");
                panel1.setAttribute("class", "panel1");
                var status1 = document.createElement("div");
                status1.setAttribute("class", "status");

                var panel2 = document.createElement("div");
                panel2.setAttribute("class", "panel2");
                var status2 = document.createElement("div");
                status2.setAttribute("class", "status");

                //lock/unlock

                var lock_icon = document.createElement("img");
                var p1 = document.createElement("p");

                lock_icon.setAttribute("src", "Iconos/locked_inside.png"); //debería depender de getstatus
                lock_icon.setAttribute("alt", "Locked"); //debería depender de getstatus
                lock_icon.setAttribute("class", "status_icon");

                p1.setAttribute("class", "stat_text");
                p1.innerHTML = "Lock: Locked"; //debería depender de getstatus

                status1.appendChild(lock_icon);
                status1.appendChild(p1);

                //create panel 1

                panel1.appendChild(status1);

                //close/open

                var stat = document.createElement("img");
                var p2 = document.createElement("p");

                stat.setAttribute("src", "Iconos/closed.png"); //debería depender de getstatus
                stat.setAttribute("alt", "Closed"); //debería depender de getstatus
                stat.setAttribute("class", "status_icon"); //debería depender de getstatus
                stat.setAttribute("onclick", "stat(event,this);");

                p2.setAttribute("class", "stat_text");
                p2.innerHTML = "Status: Closed"; //debería depender de getstatus

                status2.appendChild(stat);
                status2.appendChild(p2);

                //create panel 2

                panel2.appendChild(status2);

                //create panel

                panel.appendChild(panel1);
                panel.appendChild(panel2);

            }else if(typename =='ac'){

                var panel1 = document.createElement("div");
                panel1.setAttribute("class", "panel1");
                var status1 = document.createElement("div");
                var status2 = document.createElement("div");
                var status6 = document.createElement("div");
                status1.setAttribute("class", "status");
                status2.setAttribute("class", "status");
                status6.setAttribute("class", "status");

                var panel2 = document.createElement("div");
                panel2.setAttribute("class", "panel2");
                var status3 = document.createElement("div");
                var status4 = document.createElement("div");
                var status5 = document.createElement("div");
                status3.setAttribute("class", "status");
                status4.setAttribute("class", "status");
                status5.setAttribute("class", "status");

                //on/off

                var toggle_icon = document.createElement("img");
                var stat = document.createElement("p");

                toggle_icon.setAttribute("src", "Iconos/toggle_inside_off.png");  //gettearlo con get status
                toggle_icon.setAttribute("alt", "Off");   //idem
                toggle_icon.setAttribute("class", "toggle_inside_icon");

                stat.setAttribute("class", "stat_text");
                stat.innerHTML = "Status: Off"; //gettearlo con get status

                status6.appendChild(toggle_icon);
                status6.appendChild(stat);

                //temperature

                var temp = document.createElement("img");
                var arrow_up = document.createElement("img");
                var arrow_down = document.createElement("img");
                var p1 = document.createElement("p");
                var p2 = document.createElement("p");

                temp.setAttribute("src", "Iconos/temperature2.png");
                temp.setAttribute("alt", "Temperature");
                temp.setAttribute("class", "temperature_icon");

                p1.setAttribute("class", "stat_text");
                p1.innerHTML = "Temperature: ";

                arrow_down.setAttribute("src", "Iconos/arrow_down.png");
                arrow_down.setAttribute("alt", "Temperature Down");
                arrow_down.setAttribute("class", "arrow_change_down_icon_with_text");

                p2.setAttribute("class", "stat_text");
                p2.setAttribute("class", "number_info");
                p2.innerHTML = "20°C "; //esto debería ser un getstatus

                arrow_up.setAttribute("src", "Iconos/arrow_up.png");
                arrow_up.setAttribute("alt", "Temperature Up");
                arrow_up.setAttribute("class", "arrow_change_up_icon");

                status1.appendChild(temp);
                status1.appendChild(p1);
                status1.appendChild(arrow_down);
                status1.appendChild(p2);
                status1.appendChild(arrow_up);

                //mode

                var mode_icon = document.createElement("img");
                var p3 = document.createElement("p");
                var select = document.createElement("select");
                var option1 = document.createElement("option");
                var option2 = document.createElement("option");
                var option3 = document.createElement("option");
                var option4 = document.createElement("option");
                var option5 = document.createElement("option");

                mode_icon.setAttribute("src", "Iconos/cool.png"); //debería ponerse el ícono correspondiente según getstatus
                mode_icon.setAttribute("alt", "Cool"); //debería ponerse el alt correspondiente segun getstatus
                mode_icon.setAttribute("class", "ac_mode_icon");

                p3.setAttribute("class", "stat_text");
                p3.innerHTML = "Mode: ";

                select.setAttribute("class", "panel_selector");
                option1.innerHTML = "Cool"; //debería ponerse la que esté en el getstatus primera
                option2.innerHTML = "Heat";
                option3.innerHTML = "Fan";

                //quizás conviene variar el orden acá según getstatus
                select.appendChild(option1);
                select.appendChild(option2);
                select.appendChild(option3);

                status2.appendChild(mode_icon);
                status2.appendChild(p3);
                status2.appendChild(select);

                //create panel 1

                panel1.appendChild(status6);
                panel1.appendChild(status1);
                panel1.appendChild(status2);

                //fan speed

                var fan_icon = document.createElement("img");
                var p4 = document.createElement("p");
                var select2 = document.createElement("select");
                var option4 = document.createElement("option");
                var option5 = document.createElement("option");
                var option6 = document.createElement("option");
                var option7 = document.createElement("option");
                var option8 = document.createElement("option");

                fan_icon.setAttribute("src", "Iconos/fan_speed.png");
                fan_icon.setAttribute("alt", "Fan");
                fan_icon.setAttribute("class", "fan_icon");

                p4.setAttribute("class", "stat_text");
                p4.innerHTML = "Fan speed: ";

                select2.setAttribute("class", "panel_selector");
                option4.innerHTML = "Auto"; //debería ponerse la que esté en el getstatus primera
                option5.innerHTML = "25";
                option6.innerHTML = "50";
                option7.innerHTML = "75";
                option8.innerHTML = "100";

                //quizás conviene variar el orden acá según getstatus
                select2.appendChild(option4);
                select2.appendChild(option5);
                select2.appendChild(option6);
                select2.appendChild(option7);
                select2.appendChild(option8);

                status3.appendChild(fan_icon);
                status3.appendChild(p4);
                status3.appendChild(select2);

                //vertical swing

                var vertical_swing = document.createElement("img");
                var p5 = document.createElement("p");
                var select3 = document.createElement("select");
                var option9 = document.createElement("option");
                var option10 = document.createElement("option");
                var option11 = document.createElement("option");
                var option12 = document.createElement("option");
                var option13 = document.createElement("option");

                vertical_swing.setAttribute("src", "Iconos/vertical_swing.png");
                vertical_swing.setAttribute("alt", "Vertical Swing");
                vertical_swing.setAttribute("class", "swing_icon");

                p5.setAttribute("class", "stat_text");
                p5.innerHTML = "Vertical swing: ";

                select3.setAttribute("class", "panel_selector");
                option9.innerHTML = "Auto"; //debería ponerse la que esté en el getstatus primera
                option10.innerHTML = "22";
                option11.innerHTML = "45";
                option12.innerHTML = "67";
                option13.innerHTML = "90";

                //quizás conviene variar el orden acá según getstatus
                select3.appendChild(option9);
                select3.appendChild(option10);
                select3.appendChild(option11);
                select3.appendChild(option12);
                select3.appendChild(option13);

                status4.appendChild(vertical_swing);
                status4.appendChild(p5);
                status4.appendChild(select3);

                //horizontal swing

                var horizontal_swing = document.createElement("img");
                var p6 = document.createElement("p");
                var select4 = document.createElement("select");
                var option14 = document.createElement("option");
                var option15 = document.createElement("option");
                var option16 = document.createElement("option");
                var option17 = document.createElement("option");
                var option18 = document.createElement("option");
                var option19 = document.createElement("option");

                horizontal_swing.setAttribute("src", "Iconos/horizontal_swing.png");
                horizontal_swing.setAttribute("alt", "Horizontal Swing");
                horizontal_swing.setAttribute("class", "swing_icon");

                p6.setAttribute("class", "stat_text");
                p6.innerHTML = "Horizontal swing: ";

                select4.setAttribute("class", "panel_selector");
                option14.innerHTML = "Auto"; //debería ponerse la que esté en el getstatus primera
                option15.innerHTML = "-90";
                option16.innerHTML = "-45";
                option17.innerHTML = "0";
                option18.innerHTML = "45";
                option19.innerHTML = "90";

                //quizás conviene variar el orden acá según getstatus
                select4.appendChild(option14);
                select4.appendChild(option15);
                select4.appendChild(option16);
                select4.appendChild(option17);
                select4.appendChild(option18);
                select4.appendChild(option19);

                status5.appendChild(horizontal_swing);
                status5.appendChild(p6);
                status5.appendChild(select4);

                //create panel 2

                panel2.appendChild(status3);
                panel2.appendChild(status4);
                panel2.appendChild(status5);

                //create panel

                panel.appendChild(panel1);
                panel.appendChild(panel2);

            }else if(typename == 'oven'){

                var panel1 = document.createElement("div");
                panel1.setAttribute("class", "panel1");
                var status1 = document.createElement("div");
                var status2 = document.createElement("div");
                var status3 = document.createElement("div");
                status1.setAttribute("class", "status");
                status2.setAttribute("class", "status");
                status3.setAttribute("class", "status");

                var panel2 = document.createElement("div");
                panel2.setAttribute("class", "panel2");
                var status4 = document.createElement("div");
                var status5 = document.createElement("div");
                var status6 = document.createElement("div");
                status4.setAttribute("class", "status");
                status5.setAttribute("class", "status");
                status6.setAttribute("class", "status");

                //on/off

                var toggle_icon = document.createElement("img");
                var stat = document.createElement("p");

                toggle_icon.setAttribute("src", "Iconos/toggle_inside_off.png");  //gettearlo con get status
                toggle_icon.setAttribute("alt", "Off");   //idem
                toggle_icon.setAttribute("class", "toggle_inside_icon");

                stat.setAttribute("class", "stat_text");
                stat.innerHTML = "Status: Off"; //gettearlo con get status

                status1.appendChild(toggle_icon);
                status1.appendChild(stat);

                //temperature

                var temp = document.createElement("img");
                var arrow_up = document.createElement("img");
                var arrow_down = document.createElement("img");
                var p1 = document.createElement("p");
                var p2 = document.createElement("p");

                temp.setAttribute("src", "Iconos/temperature2.png");
                temp.setAttribute("alt", "Temperature");
                temp.setAttribute("class", "temperature_icon");

                p1.setAttribute("class", "stat_text");
                p1.innerHTML = "Temperature: ";

                arrow_down.setAttribute("src", "Iconos/arrow_down.png");
                arrow_down.setAttribute("alt", "Temperature Down");
                arrow_down.setAttribute("class", "arrow_change_down_icon_with_text");

                p2.setAttribute("class", "stat_text");
                p2.setAttribute("class", "number_info");
                p2.innerHTML = "20°C "; //esto debería ser un getstatus

                arrow_up.setAttribute("src", "Iconos/arrow_up.png");
                arrow_up.setAttribute("alt", "Temperature Up");
                arrow_up.setAttribute("class", "arrow_change_up_icon");

                status2.appendChild(temp);
                status2.appendChild(p1);
                status2.appendChild(arrow_down);
                status2.appendChild(p2);
                status2.appendChild(arrow_up);

                //heat

                var heat_icon = document.createElement("img");
                var p3 = document.createElement("p");
                var select = document.createElement("select");
                var option1 = document.createElement("option");
                var option2 = document.createElement("option");
                var option3 = document.createElement("option");

                heat_icon.setAttribute("src", "Iconos/heat_icon.png");
                heat_icon.setAttribute("alt", "Heat");
                heat_icon.setAttribute("class", "heat_icon");

                p3.setAttribute("class", "stat_text");
                p3.innerHTML = "Heat: ";

                select.setAttribute("class", "panel_selector");
                option1.innerHTML = "Conventional"; //debería ponerse la que esté en el getstatus primera
                option2.innerHTML = "Bottom";
                option3.innerHTML = "Top";

                //quizás conviene variar el orden acá según getstatus
                select.appendChild(option1);
                select.appendChild(option2);
                select.appendChild(option3);

                status3.appendChild(heat_icon);
                status3.appendChild(p3);
                status3.appendChild(select);

                //create panel 1

                panel1.appendChild(status1);
                panel1.appendChild(status2);
                panel1.appendChild(status3);
        
                //grill

                var grill_icon = document.createElement("img");
                var p4 = document.createElement("p");
                var select2 = document.createElement("select");
                var option4 = document.createElement("option");
                var option5 = document.createElement("option");
                var option6 = document.createElement("option");

                grill_icon.setAttribute("src", "Iconos/grill_icon.png");
                grill_icon.setAttribute("alt", "Grill");
                grill_icon.setAttribute("class", "grill_icon");

                p4.setAttribute("class", "stat_text");
                p4.innerHTML = "Grill: ";

                select2.setAttribute("class", "panel_selector");
                option4.innerHTML = "Large"; //debería ponerse la que esté en el getstatus primera
                option5.innerHTML = "Eco";
                option6.innerHTML = "Off";

                //quizás conviene variar el orden acá según getstatus
                select2.appendChild(option4);
                select2.appendChild(option5);
                select2.appendChild(option6);

                status4.appendChild(grill_icon);
                status4.appendChild(p4);
                status4.appendChild(select2);

                //convection

                var convection_icon = document.createElement("img");
                var p5 = document.createElement("p");
                var select3 = document.createElement("select");
                var option7 = document.createElement("option");
                var option8 = document.createElement("option");
                var option9 = document.createElement("option");

                convection_icon.setAttribute("src", "Iconos/convection_icon.png");
                convection_icon.setAttribute("alt", "Convection");
                convection_icon.setAttribute("class", "convection_icon");

                p5.setAttribute("class", "stat_text");
                p5.innerHTML = "Convection: ";

                select3.setAttribute("class", "panel_selector");
                option7.innerHTML = "Normal"; //debería ponerse la que esté en el getstatus primera
                option8.innerHTML = "Eco";
                option9.innerHTML = "Off";

                //quizás conviene variar el orden acá según getstatus
                select3.appendChild(option7);
                select3.appendChild(option8);
                select3.appendChild(option9);

                status5.appendChild(convection_icon);
                status5.appendChild(p5);
                status5.appendChild(select3);

                //create panel 2

                panel2.appendChild(status4);
                panel2.appendChild(status5);

                //create panel

                panel.appendChild(panel1);
                panel.appendChild(panel2);

            }else if(typename == 'alarm'){

                var panel1 = document.createElement("div");
                panel1.setAttribute("class", "panel1");
                var status1 = document.createElement("div");
                var status2 = document.createElement("div");
                status1.setAttribute("class", "status");
                status2.setAttribute("class", "status");

                var panel2 = document.createElement("div");
                panel2.setAttribute("class", "panel2");
                var status3 = document.createElement("div");
                var status4 = document.createElement("div");
                status3.setAttribute("class", "status");
                status4.setAttribute("class", "status");

                //change password

                var changepass = document.createElement("img");
                var p1 = document.createElement("p");

                changepass.setAttribute("src", "Iconos/changepass.png");
                changepass.setAttribute("alt", "Change Password");
                changepass.setAttribute("class", "changepass_icon");
                changepass.setAttribute("data-toggle", "modal");
                changepass.setAttribute("data-target", "#change_pass_popup");

                p1.setAttribute("class", "stat_text");
                p1.innerHTML = "Change password...";

                status1.appendChild(changepass);
                status1.appendChild(p1);

                //disarm

                var disarm = document.createElement("img");
                var p2 = document.createElement("p");

                disarm.setAttribute("src", "Iconos/disarm.png");
                disarm.setAttribute("alt", "Disarm");
                disarm.setAttribute("class", "disarm_icon");
                disarm.setAttribute("data-toggle", "modal");
                disarm.setAttribute("data-target", "#ask_pass_disarm_popup");

                p2.setAttribute("class", "stat_text");
                p2.innerHTML = "Disarm...";

                status2.appendChild(disarm);
                status2.appendChild(p2);

                //create panel 1

                panel1.appendChild(status1);
                panel1.appendChild(status2);

                //armStay

                var armStay = document.createElement("img");
                var p3 = document.createElement("p");

                armStay.setAttribute("src", "Iconos/alarm_w_people.png");
                armStay.setAttribute("alt", "ArmStay");
                armStay.setAttribute("class", "stay_away_icon");
                armStay.setAttribute("data-toggle", "modal");
                armStay.setAttribute("data-target", "#ask_pass_armstay_popup");

                p3.setAttribute("class", "stat_text");
                p3.innerHTML = "ArmStay...";

                status3.appendChild(armStay);
                status3.appendChild(p3);

                //armAway

                var armAway = document.createElement("img");
                var p4 = document.createElement("p");

                armAway.setAttribute("src", "Iconos/alarm_wo_people.png");
                armAway.setAttribute("alt", "ArmAway");
                armAway.setAttribute("class", "stay_away_icon");
                armAway.setAttribute("data-toggle", "modal");
                armAway.setAttribute("data-target", "#ask_pass_armaway_popup");

                p4.setAttribute("class", "stat_text");
                p4.innerHTML = "ArmAway...";

                status4.appendChild(armAway);
                status4.appendChild(p4);

                //create panel 2

                panel2.appendChild(status3);
                panel2.appendChild(status4);

                //create panel

                panel.appendChild(panel1);
                panel.appendChild(panel2);

            }else if(typename == 'blind'){
                
                var panel1 = document.createElement("div");
                panel1.setAttribute("class", "panel1");
                var status1 = document.createElement("div");
                status1.setAttribute("class", "status");

                var panel2 = document.createElement("div");
                panel2.setAttribute("class", "panel2");

                //up/down

                var blind_icon = document.createElement("img");
                var p1 = document.createElement("p");

                blind_icon.setAttribute("src", "Iconos/blind_up.png"); //debería depender de getstatus
                blind_icon.setAttribute("alt", "Up"); //debería depender de getstatus
                blind_icon.setAttribute("class", "status_icon");
                blind_icon.setAttribute("onclick", "change_blind_status(event,this);");

                p1.setAttribute("class", "stat_text");
                p1.innerHTML = "Status: Up"; //debería depender de getstatus

                status1.appendChild(blind_icon);
                status1.appendChild(p1);

                //create panel 1

                panel1.appendChild(status1);

                //create panel

                panel.appendChild(panel1);
                panel.appendChild(panel2);

            }else if(typename == 'refrigerator'){

                var panel1 = document.createElement("div");
                panel1.setAttribute("class", "panel1");
                var status1 = document.createElement("div");
                var status2 = document.createElement("div");
                status1.setAttribute("class", "status");
                status2.setAttribute("class", "status");

                var panel2 = document.createElement("div");
                panel2.setAttribute("class", "panel2");
                var status3 = document.createElement("div");
                status3.setAttribute("class", "status");

                //temperature

                var temp = document.createElement("img");
                var arrow_up = document.createElement("img");
                var arrow_down = document.createElement("img");
                var p1 = document.createElement("p");
                var p2 = document.createElement("p");

                temp.setAttribute("src", "Iconos/temperature2.png");
                temp.setAttribute("alt", "Temperature");
                temp.setAttribute("class", "temperature_icon");

                p1.setAttribute("class", "stat_text");
                p1.innerHTML = "Temperature: ";

                arrow_down.setAttribute("src", "Iconos/arrow_down.png");
                arrow_down.setAttribute("alt", "Temperature Down");
                arrow_down.setAttribute("class", "arrow_change_down_icon_with_text");

                p2.setAttribute("class", "stat_text");
                p2.setAttribute("class", "number_info");
                p2.innerHTML = "5°C "; //esto debería ser un getstatus

                arrow_up.setAttribute("src", "Iconos/arrow_up.png");
                arrow_up.setAttribute("alt", "Temperature Up");
                arrow_up.setAttribute("class", "arrow_change_up_icon");

                status1.appendChild(temp);
                status1.appendChild(p1);
                status1.appendChild(arrow_down);
                status1.appendChild(p2);
                status1.appendChild(arrow_up);

                //freezer temperature

                var temp1 = document.createElement("img");
                var arrow_up1 = document.createElement("img");
                var arrow_down1 = document.createElement("img");
                var p3 = document.createElement("p");
                var p4 = document.createElement("p");

                temp1.setAttribute("src", "Iconos/freezer_temperature.png");
                temp1.setAttribute("alt", "Freezer temperature");
                temp1.setAttribute("class", "temperature_icon");

                p3.setAttribute("class", "stat_text");
                p3.innerHTML = "Freezer temperature: ";

                arrow_down1.setAttribute("src", "Iconos/arrow_down.png");
                arrow_down1.setAttribute("alt", "Temperature Down");
                arrow_down1.setAttribute("class", "arrow_change_down_icon_with_text");

                p4.setAttribute("class", "stat_text");
                p4.setAttribute("class", "number_info");
                p4.innerHTML = "-4°C "; //esto debería ser un getstatus

                arrow_up1.setAttribute("src", "Iconos/arrow_up.png");
                arrow_up1.setAttribute("alt", "Temperature Up");
                arrow_up1.setAttribute("class", "arrow_change_up_icon");

                status2.appendChild(temp1);
                status2.appendChild(p3);
                status2.appendChild(arrow_down1);
                status2.appendChild(p4);
                status2.appendChild(arrow_up1);

                //create panel 1

                panel1.appendChild(status1);
                panel1.appendChild(status2);

                //fridge mode

                var mode_icon = document.createElement("img");
                var p5 = document.createElement("p");
                var select = document.createElement("select");
                var option1 = document.createElement("option");
                var option2 = document.createElement("option");
                var option3 = document.createElement("option");

                mode_icon.setAttribute("src", "Iconos/fridge_default.png"); //debería ponerse el ícono correspondiente según getstatus
                mode_icon.setAttribute("alt", "Fridge"); //debería ponerse el alt correspondiente segun getstatus
                mode_icon.setAttribute("class", "fridge_default_icon"); //idem

                p5.setAttribute("class", "stat_text");
                p5.innerHTML = "Mode: ";

                select.setAttribute("class", "panel_selector");
                option1.innerHTML = "Default"; //debería ponerse la que esté en el getstatus primera
                option2.innerHTML = "Vacation";
                option3.innerHTML = "Party";

                //quizás conviene variar el orden acá según getstatus
                select.appendChild(option1);
                select.appendChild(option2);
                select.appendChild(option3);

                status3.appendChild(mode_icon);
                status3.appendChild(p5);
                status3.appendChild(select);

                //create panel 2

                panel2.appendChild(status3);

                //create panel

                panel.appendChild(panel1);
                panel.appendChild(panel2);

            }else if(typename == 'lamp'){

                var panel1 = document.createElement("div");
                panel1.setAttribute("class", "panel1");
                var status1 = document.createElement("div");
                var status2 = document.createElement("div");
                status1.setAttribute("class", "status");
                status2.setAttribute("class", "status");

                var panel2 = document.createElement("div");
                panel2.setAttribute("class", "panel2");
                var status3 = document.createElement("div");
                status3.setAttribute("class", "status");

                //on/off

                var toggle_icon = document.createElement("img");
                var stat = document.createElement("p");

                toggle_icon.setAttribute("src", "Iconos/toggle_inside_off.png");  //gettearlo con get status
                toggle_icon.setAttribute("alt", "Off");   //idem
                toggle_icon.setAttribute("class", "toggle_inside_icon");

                stat.setAttribute("class", "stat_text");
                stat.innerHTML = "Status: Off"; //gettearlo con get status

                status1.appendChild(toggle_icon);
                status1.appendChild(stat);

                //color

                var palette = document.createElement("img");
                var p1 = document.createElement("p");
                var input1 = document.createElement("input");

                palette.setAttribute("src", "Iconos/color_icon.png"); 
                palette.setAttribute("alt", "Color");
                palette.setAttribute("class", "color_icon");

                p1.setAttribute("class", "stat_text");
                p1.innerHTML = "Color: ";

                input1.setAttribute("type", "color"); 
                input1.setAttribute("value", "#ffffff");
                input1.setAttribute("class", "color_input");

                status2.appendChild(palette);
                status2.appendChild(p1);
                status2.appendChild(input1);

                //create panel 1

                panel1.appendChild(status1);
                panel1.appendChild(status2);

                //brightness

                var brightness_icon = document.createElement("img");
                var p2 = document.createElement("p");
                var div_slide = document.createElement("div");
                var input2 = document.createElement("input");

                brightness_icon.setAttribute("src", "Iconos/brightness_icon.png"); 
                brightness_icon.setAttribute("alt", "Brightness");
                brightness_icon.setAttribute("class", "brightness_icon");

                p2.setAttribute("class", "stat_text");
                p2.innerHTML = "Brightness: ";

                div_slide.setAttribute("class", "slidecontainer");

                input2.setAttribute("type", "range");
                input2.setAttribute("min", "1");
                input2.setAttribute("max", "100");
                input2.setAttribute("value", "50"); //debería gettearlo con getstate
                input2.setAttribute("class", "slider");
                input2.setAttribute("id", "myRange");

                div_slide.appendChild(input2);

                status3.appendChild(brightness_icon);
                status3.appendChild(p2);
                status3.appendChild(div_slide);

                //create panel 2

                panel2.appendChild(status3);

                //create panel

                panel.appendChild(panel1);
                panel.appendChild(panel2);

            }
          
            list.appendChild(elem);
            list.appendChild(panel);

            elem.addEventListener("click", function() {
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                  panel.style.display = "block";
            }
            var arrow = this.children[2].children[0].children[0];
            if (panel.style.display === "block") {
               arrow.src = "Iconos/arrow_up.png";
             } else {
                 arrow.src = "Iconos/arrow_down.png";
            }
        });
        });
    });
}

function add_room_input(event, room){
    room.removeAttribute("onclick");
    $(room).children('option').remove();
    api.rooms.getRooms().done(function(data){
                                    $.each(data, function(i, item){
                                                    var option = document.createElement("option");
                                                    option.innerHTML = item.name;
                                                    room.appendChild(option);
                                                });
                                            });
                                        
                                   
        //
                                 
}

function add_device(event, addbtn){
    var typeid = window.localStorage.getItem("type_id");
    var name = $("#door_input").val();
    var room = $("#room_input").val();
    var no = 0;
    
    api.devices.getAllDevices().done(function(data){
        $.each(data, function(i, item){
                                        if(name == item.name){
                                            no = 1;
                                        }
                                         });
        if(name == ""){
            no = 2;
        }
        if(no == 2){
            document.getElementById("name-tag").style.color = "#ff0000";
            document.getElementById("name-tag").innerHTML = "Choose a name";
            $('#add_room_popup').modal('show');
        }
        else if(no == 1){
            document.getElementById("name-tag").style.color = "#ff0000";
            document.getElementById("name-tag").innerHTML = "Name already in use";
            $('#add_room_popup').modal('show');
        }else{
            //agrego y linkeo
            api.rooms.getRooms().done(function(data) {
                            
                            $.each(data, function(i, item){
                                if(item.name.toUpperCase() == room.toUpperCase()){
                                               api.devices.addDevice(typeid,name,item.name).done(function(data) {
                                                   api.devices.getDevices().done(function(data){
                                                       $.each(data, function(r, item3){
                                                       if(name == item3.name){
                                                           console.log("VOY A LINKEAR");
                                                           api.devices.link(item3.id, item.id);
                                                           onPageLoad();
                                                            $('#add_room_popup').modal('hide');
                                                       }
                                                       });
                                                   });
                                                   
                                               });
                                                
                                               
                                            
                                        
                                        
                                    
                                    
                                }
                            });
                });
            
        }
    });
    
}

function activateroominput(event, roominput){
   roominput.setAttribute("onclick","add_room_input(event, this);");
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

});
