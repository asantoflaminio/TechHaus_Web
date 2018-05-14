
var api = class {
  static get baseUrl() {
    return "http://127.0.0.1:8080/api/";
  }

  static get timeout() {
    return 60 * 1000;
  }
}

api.routines = class {
  static get url() {
    return "http://127.0.0.1:8080/api/routines/";
  }

  static getRoutines() {
   return $.ajax({
      url: api.routines.url,
      method: "GET",
      dataType: "json",
      timeout: api.timeout,
       }).then(function(data) {
           return data.routines; 
        });  
  }
    
  static executeRoutine(id) {
   return $.ajax({
      url: api.routines.url + id + "/execute/",
      method: "PUT",
      dataType: "json",
      timeout: api.timeout,
       }).then(function(data) {
           return "done"; 
        }); 
  }
    
    static postRoutine(nombre, action) {
   return $.ajax({
      url: api.routines.url,
      method: "POST",
      dataType: "json",
      timeout: api.timeout,
       data: {'name': nombre, 'actions': action, 'meta': "{}"},
       })
  }
    
static updateRoutine(id, nombre, action) {
   return $.ajax({
      url: api.routines.url + id,
      method: "PUT",
      dataType: "json",
      timeout: api.timeout,
       data: {'name': nombre, 'actions': action, 'meta': "{}"},
       })
  }

    
    static getActionsNames(id) {
       return $.ajax({
          url: api.routines.url + id,
          method: "GET",
          dataType: "json",
          timeout: api.timeout,
           }).then(function(data) {
               return data.routine.actions; 
            });  
      }
    
    static deleteRoutine(id) {
       return $.ajax({
          url: api.routines.url + id,
          method: "DELETE",
          dataType: "json",
          timeout: api.timeout
           })
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


function onPageLoad(){
    //document.getElementById("routines_list")
    var myNode = document.getElementById("routines_list");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    api.routines.getRoutines().done(function(data) {
        $.each(data, function(i, item){
        
        var routine_name = item.name;
        var routine_id = item.id;
        var list = document.getElementById("routines_list");
        var acc = document.createElement("div");
        acc.setAttribute("class", "accordion");   
        var pnl = document.createElement("div");
        var p = document.createElement("p");
        pnl.setAttribute("class", "panel");
        var div = document.createElement("div");
        var img1 = document.createElement("img");
        img1.setAttribute("src", "Iconos/arrow_down.png");
        img1.setAttribute("alt", "Expand");
        img1.setAttribute("class", "arrow_icon");
        var img2 =  document.createElement("img");
        img2.setAttribute("src", "Iconos/play.png");
        img2.setAttribute("alt", "Play");
        img2.setAttribute("class", "play_icon");
        img2.setAttribute("onclick", "play(this,event);");
        var img3 = document.createElement("img");    
        img3.setAttribute("src", "Iconos/lapiz_routines.png");
        img3.setAttribute("alt", "Unlapiz");
        img3.setAttribute("class", "lapiz_icon");
        img3.setAttribute("onclick", "cargar_datos(this,event);"); //falta lo del modal que toglee y eso so varios attributes
        img3.setAttribute("data-toggle", "modal");
        img3.setAttribute("data-target", "#add_task_popup");
        var trash = document.createElement("img");
        trash.setAttribute("src", "Iconos/tacho.png");
        trash.setAttribute("alt", "Delete");
        trash.setAttribute("class", "delete_icon");
        trash.setAttribute("onclick", "trash(event,this);");
        var yes = document.createElement("img");
        var no = document.createElement("img");
        yes.setAttribute("src", "Iconos/yes.png");
        yes.setAttribute("alt", "Yes");
        yes.setAttribute("class", "yes_icon");
        yes.setAttribute("onclick", "yes(event,this);");
        no.setAttribute("src", "Iconos/no.png");
        no.setAttribute("alt", "No");
        no.setAttribute("class", "no_icon");
        no.setAttribute("onclick", "no(event,this);");
        var h4 = document.createElement("h4");
        h4.setAttribute("class", "trash_message");
        h4.innerHTML = "You are about to delete this routine. Continue? ";
        var h3 = document.createElement("h3");
        h3.setAttribute("class", "routine_name");
        h3.innerHTML = routine_name;
        

        
        api.routines.getActionsNames(routine_id).done(function(data) {
            $.each(data, function(j, item2){
                var action_name = item2.actionName;
                var device_id = item2.deviceId; 
                var device_name = "";
                api.devices.getDeviceName(device_id).done(function(data) {
                    $.each(data, function(k, item3){
                        device_name = item3.name;
                        p.innerHTML += device_name;
                    });
                    console.log(device_name);
                    console.log(action_name);       
                    p.innerHTML +=  ": " + action_name + "<br>" ;
                });
             
               
            });
            
        });
   
        pnl.appendChild(p);
        div.appendChild(img1);
        div.appendChild(img2);
        div.appendChild(img3);
        div.appendChild(trash);
        div.appendChild(no);
        div.appendChild(yes);
        div.appendChild(h4);
        
        div.appendChild(h3);
        acc.appendChild(div);
        list.appendChild(acc);
        list.appendChild(pnl);
        
        
        
        });
       

        addPanels();

    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log("Request failed: jqXHR.status=" + jqXHR.status + ", textStatus=" + textStatus + ", errorThrown=" + errorThrown);
    });
}

function trash(event, trashcan){
    event.stopPropagation();
    if (trashcan.getAttribute('src') == "Iconos/tacho.png")
                {
                    //trashcan.src = "Iconos/warning.png"; //this works ok
                    trashcan.style.visibility = "hidden";
                    var heart = trashcan.closest('div').parentNode.querySelector('.lapiz_icon');
                    heart.style.visibility = "hidden";
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
    var heart = noicon.closest('div').parentNode.querySelector('.lapiz_icon');
    heart.style.visibility = "visible";
    
    
}

function yes(event, yesicon){
    
    event.stopPropagation();
    yesicon.closest('div').parentNode.nextElementSibling.remove();
    yesicon.closest('div').parentNode.remove();
    api.routines.getRoutines().done(function(data){
         $.each(data, function(r, item3){
        if(yesicon.closest('div').parentNode.querySelector('h3').innerHTML == item3.name){
                api.routines.deleteRoutine(item3.id);
              }
       });
  });
    
}

$(document).ready(function() {
    onPageLoad();
    
    //addPanels();
    //
     
    //addPanels();
    
});


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


function play(name, event){
    event.stopPropagation();
    name = name.closest('div').querySelector('.routine_name').innerHTML; 
    var notice = document.getElementsByClassName('notice')[0];
    notice.style.display = 'block';
    document.getElementById('name').innerHTML = "Routine \"" + name + "\" was played";
    
    api.routines.getRoutines().done(function(data) {
        $.each(data, function(i, item){
            if(name == item.name){
                api.routines.executeRoutine(item.id);
            }
        });
    });

    this.setTimeout(function(){
        notice.style.display='none';
    }, 3000);
    
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

function cargar_datos(icono, event){
    var routinename = icono.closest('div').querySelector('h3').innerHTML;
    api.routines.getRoutines().done(function(data) {
        $.each(data, function(i, item){
            if(routinename == item.name){
                window.localStorage.clear();
                console.log("VOy a seteaer el id " + item.id)
                window.localStorage.setItem("routine_id", item.id);
                
            }
        });
    });
    
}

function activatetypeinput2(event, devinput){
   devinput.setAttribute("onclick","add_device_input2(event, this);");
}
function add_device_input2(event, devinput) {

    var devtype = $("#devicetype_input2").val();
    devinput.removeAttribute("onclick");
    $(devinput).children('option').remove();
    console.log(devtype);
    api.devices.getDevicesID().done(function(data){
                                    $.each(data, function(i, item){
                                        console.log(item.name);
                                        if(item.name.toUpperCase() == devtype.toUpperCase()){
                                            var typeid = item.id;
                                            api.devices.getDevicesForType(typeid).done(function(data){
                                                $.each(data, function(j, item2){
                                                    var option = document.createElement("option");
                                                    option.innerHTML = item2.name;
                                                    console.log(option.innerHTML);
                                                    devinput.appendChild(option);
                                                });
                                            });
                                        }
                                    });
        //
                                    });
    
}

function activateactioninput2(event, acinput){
   acinput.setAttribute("onclick","add_action_input2(event, this);");
}

function add_action_input2(event, acinput) {

    var devtype = $("#devicetype_input2").val();
    var prohibidos = ["getState", "changeSecurityCode", "setColor", "setBrightness", "setTemperature", "setGrill", "setHeat", "setConvection", "setMode", "setVerticalSwing", "setHorizontalSwing", "setFanSpeed", "setInterval", "setFreezerTemperature"];
    acinput.removeAttribute("onclick");
    $(acinput).children('option').remove();
    console.log(devtype);
    api.devices.getDevicesID().done(function(data){
                                    $.each(data, function(i, item){
                                        console.log(item.name);
                                        if(item.name.toUpperCase() == devtype.toUpperCase()){
                                            var typeid = item.id;
                                            api.devices.getDeviceActions(typeid).done(function(data){
                                                $.each(data, function(j, item2){
                                                    if(prohibidos.indexOf(item2.name) <= -1){
                                                        var option = document.createElement("option");
                                                        option.innerHTML = item2.name;
                                                        console.log(option.innerHTML);
                                                        acinput.appendChild(option);
                                                    }
                                                    
                                                });
                                            });
                                        }
                                    });
        //
                                    });
    
}

//add routine
function activatetypeinput(event, devinput){
   devinput.setAttribute("onclick","add_device_input(event, this);");
}

function edit_routine(event, addbtn){
  var rut_id = window.localStorage.getItem("routine_id");
    var device = $("#device_input2").val();
    var action = $("#action_input2").val();

    
    console.log("rutid es " + rut_id);
    //FALTA TOMAR TODAS LAS RUTINAS MATCHEAR POR ID, LUEGO PASARLE A UPDATE LE NOMRE Y LA NUEVA ACCION CONCATENADO
//CON LO ANTERIOR
    if(rut_id != "" && action != "--" && action != ""){
       api.devices.getAllDevices().done(function(data){
           $.each(data, function(i, item1){
               if(device == item1.name){
                   
                   api.routines.getRoutines().done(function(data){
                        $.each(data, function(j, item2){
                            if(item2.id == rut_id){
                                console.log("el size es " + item2.actions.length);
                                item2.actions[item2.actions.length] = {"deviceId": item1.id, "actionName": action, "params": [], "meta": "{}"};
                                var pp = JSON.stringify(item2.actions);
                                console.log(pp);
                                api.routines.updateRoutine(rut_id, item2.name, pp).done(function(data){
                                  onPageLoad();
                                 }); 
                            }
                                
                
               });
           });
        }
        });
       });
    }
}

function add_device_input(event, devinput) {

    var devtype = $("#devicetype_input").val()
    devinput.removeAttribute("onclick");
    $(devinput).children('option').remove();
    console.log(devtype);
    api.devices.getDevicesID().done(function(data){
                                    $.each(data, function(i, item){
                                        console.log(item.name);
                                        if(item.name.toUpperCase() == devtype.toUpperCase()){
                                            var typeid = item.id;
                                            api.devices.getDevicesForType(typeid).done(function(data){
                                                $.each(data, function(j, item2){
                                                    var option = document.createElement("option");
                                                    option.innerHTML = item2.name;
                                                    console.log(option.innerHTML);
                                                    devinput.appendChild(option);
                                                });
                                            });
                                        }
                                    });
        //
                                    });
    
}

function activateactioninput(event, acinput){
   acinput.setAttribute("onclick","add_action_input(event, this);");
}

function add_action_input(event, acinput) {
    var prohibidos = ["getState", "changeSecurityCode", "setColor", "setBrightness", "setTemperature", "setGrill", "setHeat", "setConvection", "setMode", "setVerticalSwing", "setHorizontalSwing", "setFanSpeed", "setInterval", "setFreezerTemperature"];
    var devtype = $("#devicetype_input").val();
    acinput.removeAttribute("onclick");
    $(acinput).children('option').remove();
    console.log(devtype);
    api.devices.getDevicesID().done(function(data){
                                    $.each(data, function(i, item){
                                        console.log(item.name);
                                        if(item.name.toUpperCase() == devtype.toUpperCase()){
                                            var typeid = item.id;
                                            api.devices.getDeviceActions(typeid).done(function(data){
                                                $.each(data, function(j, item2){
                                                    if(prohibidos.indexOf(item2.name) <= -1){
                                                        var option = document.createElement("option");
                                                        option.innerHTML = item2.name;
                                                        console.log(option.innerHTML);
                                                        acinput.appendChild(option);
                                                    }
                                                    
                                                });
                                            });
                                        }
                                    });
        //
                                    });
    
}

function add_routine(event, name) {
    var rut_name = $("#name_input").val();
    var device = $("#device_input").val();
    var action = $("#action_input").val();
    var no = 0;
    api.routines.getRoutines().done(function(data) {
        $.each(data, function(i, item){
            if(rut_name == item.name){
                no = 1;
                document.getElementById("name-tag").style.color = "#ff0000";
                document.getElementById("device-tag").style.color = "#000000";
                document.getElementById("action-tag").style.color = "#000000";
                $('#add_room_popup').modal('show');
                
            }
        });
        if(rut_name == ""){
                no = 1;
                document.getElementById("name-tag").style.color = "#ff0000";
                document.getElementById("device-tag").style.color = "#000000";
                document.getElementById("action-tag").style.color = "#000000";
                $('#add_room_popup').modal('show');
        }
        else if(device == "--" || device == ""){
                no = 1;
                console.log("UHUM???");
                document.getElementById("name-tag").style.color = "#000000";
                document.getElementById("device-tag").style.color = "#ff0000";
                document.getElementById("action-tag").style.color = "#000000";
                $('#add_room_popup').modal('show');
        }
        else if(action == "--" || action == ""){
                no = 1;
                document.getElementById("action-tag").style.color = "#ff0000";
                document.getElementById("name-tag").style.color = "#000000";
                document.getElementById("device-tag").style.color = "#000000";
                $('#add_room_popup').modal('show');
        }
        if(no != 1 && rut_name != "" && action != "--" && action != ""){
        
            api.devices.getAllDevices().done(function(data){
           $.each(data, function(i, item1){
               if(device == item1.name){
                   var prueba = [{"deviceId": item1.id, "actionName": action, "params": [], "meta": "{}"}];
                   var pp = JSON.stringify(prueba);
                   api.routines.postRoutine(rut_name, pp).done(function(data){
                                
                                  onPageLoad();
                                    $('#add_room_popup').modal('hide');
                                 });
                
               }
           });
       });
       }
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

                var list = document.getElementById("routines_list");
                var elem = document.createElement("div");
                elem.setAttribute("class", "accordion");
                var div = document.createElement("div");
                var img1 = document.createElement("img");
                var img2 = document.createElement("img");
                var h3 = document.createElement("h3");
                var pnl = document.createElement("div");
                var p = document.createElement("p");
                pnl.setAttribute("class", "panel");
                p.innerHTML = "This routine is empty!";
                pnl.appendChild(p);
                img1.setAttribute("src", "Iconos/arrow_down.png");
                img1.setAttribute("alt", "Expand");
                img1.setAttribute("class", "arrow_icon");

                img2.setAttribute("src", "Iconos/play.png");
                img2.setAttribute("alt", "Play");
                img2.setAttribute("class", "play_icon");
                img2.setAttribute("onclick", "play(this,event)");
                    

                h3.setAttribute("class", "routine_name");
                h3.innerHTML = $('#routine_input').val();

                div.appendChild(img1);
                div.appendChild(img2);
                div.appendChild(h3);
                elem.appendChild(div);
                list.appendChild(elem);
                list.appendChild(pnl);
                        elem.addEventListener("click", function() {
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
                $(this).dialog('close');

                }
            }
        ]
    })
})

});
