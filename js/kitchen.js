
function add_device(event, name) {
    var name = $("#device_input").val();
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
                api.rooms.getRooms().done(function(data) {

                            $.each(data, function(i, item){
                                if(item.name.toUpperCase() == document.getElementById("title").innerHTML.toUpperCase()){
                                    console.log("encontre el room ");
                                    api.devicetypes.getDeviceTypes().done(function(data) {
                                        $.each(data, function(j, item2){
                                            if(item2.name.toUpperCase() == $('#room_input').val().toUpperCase()){
                                               api.devices.addDevice(item2.id,$('#device_input').val(),item.name).done(function(data) {
                                                   api.devices.getDevices().done(function(data){
                                                       $.each(data, function(r, item3){
                                                       if($('#device_input').val() == item3.name){
                                                           console.log("VOY A LINKEAR");
                                                           api.devices.link(item3.id, item.id).done(function(data){
                                                            onPageLoad();
                                                            $('#add_room_popup').modal('hide');

                                                           });
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
          });

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

    $(this).click( function()
        { change_nameRoom(event, document.getElementsByClassName("new_room_name")[0]); } );
    
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
    $(this).click( function()
        { change_nameRoom(event, name); } );
    
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

    $(this).click( function()
        { change_name(event, document.getElementsByClassName("new_device_name")[0]); } );
    
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
    $(this).click( function()
        { change_name(event, name); } );
    
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
                    
                    var dev_name = heart.closest('div').parentNode.parentNode.querySelector('h3').innerHTML;
                    console.log("Faved device: " + dev_name);
                    api.devices.getAllDevices().done(function(data){
                        $.each(data, function(i, item){
                            if(item.name == dev_name){
                                var room = item.meta.replace("{","").replace("}","").split(',')[0];
                                api.devices.updateDevice(item.id, item.typeId, item.name, room, ", faved").done(function(data){
                                    heart.src = "Iconos/heart_coloured4.png";
                                });
                            }
                            
                        });
                    });
                }
                else
                {
                    var dev_name = heart.closest('div').parentNode.parentNode.querySelector('h3').innerHTML;
                    console.log("unaved device: " + dev_name);
                    api.devices.getAllDevices().done(function(data){
                        $.each(data, function(i, item){
                            if(item.name == dev_name){
                                var room = item.meta.replace("{","").replace("}","").split(',')[0];
                                api.devices.updateDevice(item.id, item.typeId, item.name, room, "").done(function(data){
                                    heart.src = "Iconos/heart.png";
                                });
                            }
                            
                        });
                    });
                    
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

function stat(event, status){
    //event.stopPropagation();
     var dev_name = status.closest('div').parentNode.parentNode.previousElementSibling.querySelector('h3').innerHTML;
    if (status.getAttribute('src') == "Iconos/closed.png")
                {
                    api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  api.devices.open(item.id).done(function(data){
                                      status.src = "Iconos/open.png";
                                        status.nextElementSibling.innerHTML = 'Status: Open';
                                  });
                              }
                          });
                    });
                    
                }
                else
                {
                    
                    api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  api.devices.close(item.id).done(function(data){
                                      status.src = "Iconos/closed.png";
                                        status.nextElementSibling.innerHTML = 'Status: Closed';
                                  });
                              }
                          });
                    });
                    
                }
}

function toggle_alarm(event, toggling){
    event.stopPropagation();
    if (toggling.getAttribute('src') == "Iconos/alarm_wo_people_stat.png")
                {
                    toggling.src = "Iconos/disarm_stat.png";
                    toggling.closest('div').parentNode.querySelector('.lock_text').innerHTML = " Disarm...";
                    toggling.removeAttribute("class");
                    toggling.setAttribute("class","alarm_icon_stat_disarm");
                }
                else
                {
                    toggling.src = "Iconos/alarm_wo_people_stat.png";
                    toggling.closest('div').parentNode.querySelector('.lock_text').innerHTML = " ArmAway...";
                    toggling.class = "alarm_icon_stat_armaway";
                    toggling.removeAttribute("class");
                    toggling.setAttribute("class","alarm_icon_stat_armaway");}
}

function change_blind_status(event, status){
    event.stopPropagation();
    var dev_name = status.closest('div').parentNode.parentNode.previousElementSibling.querySelector('h3').innerHTML;
    if (status.getAttribute('src') == "Iconos/blind_down.png")
                {
                    
                    
                      
                      api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  var act = "/up";
                                 // arr[0]= nueva_temp;
                                  
                                  api.devices.upBlind(item.id).done(function(data){
                                      status.src = "Iconos/blind_up.png";
                                    status.parentNode.parentNode.parentNode.previousElementSibling.querySelector('.accordion2').children[0].src = "Iconos/blind_up_status.png";
                                    status.nextElementSibling.innerHTML = 'Status: Up';
                                      status.parentNode.parentNode.parentNode.previousElementSibling.querySelector('.accordion2').children[1].innerHTML = " Up";
                                  });
                              }
                          });
                          
                      });

                }
                else
                {
                    api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  var act = "/down";
                                  var pp = [];
                                 // arr[0]= nueva_temp;
                                  console.log("BASTA CHICOSS");
                                  
                                  api.devices.downBlind(item.id).done(function(data){
                                      status.src = "Iconos/blind_down.png";
                                        status.parentNode.parentNode.parentNode.previousElementSibling.querySelector('.accordion2').children[0].src = "Iconos/blind_down_status.png";
                                        status.nextElementSibling.innerHTML = 'Status: Down';
                                        status.parentNode.parentNode.parentNode.previousElementSibling.querySelector('.accordion2').children[1].innerHTML = " Down";
                                  });
                              }
                          });
                          
                      });
                    
                }
}

function change_blind_status_from_acc(event, status){
    event.stopPropagation();
    var dev_name = status.closest('div').parentNode.querySelector('h3').innerHTML;
    if (status.getAttribute('src') == "Iconos/blind_down_status.png")
                {
                    api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  var act = "/up";
                                 // arr[0]= nueva_temp;
                                  
                                  api.devices.upBlind(item.id).done(function(data){
                                      status.src = "Iconos/blind_up_status.png";
                                        status.parentNode.parentNode.nextElementSibling.querySelector('.panel1').children[0].children[0].src = "Iconos/blind_up.png";
                                        status.nextElementSibling.innerHTML = ' Up';
                                        status.parentNode.parentNode.nextElementSibling.querySelector('.panel1').children[0].children[1].innerHTML = "Status: Up";

                                  });
                              }
                          });
                          
                      });
                    
                }
                else
                {
                    
                    api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  var act = "/down";
                                 // arr[0]= nueva_temp;
                                  
                                  api.devices.downBlind(item.id).done(function(data){
                                      status.src = "Iconos/blind_down_status.png";
                    status.parentNode.parentNode.nextElementSibling.querySelector('.panel1').children[0].children[0].src = "Iconos/blind_down.png";
                    status.nextElementSibling.innerHTML = ' Down';
                    status.parentNode.parentNode.nextElementSibling.querySelector('.panel1').children[0].children[1].innerHTML = "Status: Down";

                                  });
                              }
                          });
                          
                      });
                    
                }
}

function change_lock_status(event, status){
    var dev_name = status.closest('div').parentNode.parentNode.previousElementSibling.querySelector('h3').innerHTML;
    event.stopPropagation();
    if (status.getAttribute('src') == "Iconos/locked_inside.png")
                {
                    api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  api.devices.unlock(item.id).done(function(data){
                                      
                                        status.src = "Iconos/unlocked_inside.png";
                                        status.parentNode.parentNode.parentNode.previousElementSibling.querySelector('.accordion2').children[0].src = "Iconos/unlocked.png";
                                        status.nextElementSibling.innerHTML = ' Status: Unlocked';
                                        status.parentNode.parentNode.parentNode.previousElementSibling.querySelector('.accordion2').children[1].innerHTML = " Unlocked";

                                  });
                              }
                          });
                    });
                    
                }
                else
                {
                    api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  api.devices.lock(item.id).done(function(data){
                                      
                                        status.src = "Iconos/locked_inside.png";
                                        status.parentNode.parentNode.parentNode.previousElementSibling.querySelector('.accordion2').children[0].src = "Iconos/locked.png";
                                        status.nextElementSibling.innerHTML = ' Status: Locked';
                                        status.parentNode.parentNode.parentNode.previousElementSibling.querySelector('.accordion2').children[1].innerHTML = " Locked";

                                  });
                              }
                          });
                    });
                    
                }
}

function change_lock_status_from_acc(event, status){
    event.stopPropagation();
    var dev_name = status.closest('div').parentNode.querySelector('h3').innerHTML;
    if (status.getAttribute('src') == "Iconos/locked.png")
                {
                    api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  api.devices.unlock(item.id).done(function(data){
                                      
                                        status.src = "Iconos/unlocked.png";
                                        status.parentNode.parentNode.nextElementSibling.querySelector('.panel1').children[0].children[0].src = "Iconos/unlocked_inside.png";
                                        status.nextElementSibling.innerHTML = ' Unlocked';
                                        status.parentNode.parentNode.nextElementSibling.querySelector('.panel1').children[0].children[1].innerHTML = " Status: Unlocked";

                                  });
                              }
                          });
                    });
                    

                }
                else
                {
                    api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  api.devices.lock(item.id).done(function(data){
                                      
                                        status.src = "Iconos/locked.png";
                                        status.parentNode.parentNode.nextElementSibling.querySelector('.panel1').children[0].children[0].src = "Iconos/locked_inside.png";
                                        status.nextElementSibling.innerHTML = ' Locked';
                                        status.parentNode.parentNode.nextElementSibling.querySelector('.panel1').children[0].children[1].innerHTML = " Status: Locked";

                                  });
                              }
                          });
                    });
                    
                }
}

function change_toggle_status(event, status){
    event.stopPropagation();
    var dev_name = status.closest('div').parentNode.parentNode.previousElementSibling.querySelector('h3').innerHTML;
    if (status.getAttribute('src') == "Iconos/toggle_inside_off.png")
                {
                    api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  api.devices.turnOn(item.id).done(function(data){
                                      
                                        status.src = "Iconos/toggle_on.png";
                    status.parentNode.parentNode.parentNode.previousElementSibling.querySelector('.accordion2').children[0].src = "Iconos/toggle_on.png";
                    status.nextElementSibling.innerHTML = ' Status: On';
                    status.parentNode.parentNode.parentNode.previousElementSibling.querySelector('.accordion2').children[1].innerHTML = " On";

                                  });
                              }
                          });
                    });
                    
                    

                }
                else
                {
                    api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  api.devices.turnOff(item.id).done(function(data){
                                      
                                        status.src = "Iconos/toggle_inside_off.png";
                    status.parentNode.parentNode.parentNode.previousElementSibling.querySelector('.accordion2').children[0].src = "Iconos/toggle_off.png";
                    status.nextElementSibling.innerHTML = ' Status: Off';
                    status.parentNode.parentNode.parentNode.previousElementSibling.querySelector('.accordion2').children[1].innerHTML = " Off";

                                  });
                              }
                          });
                    });
                    
                }
}

function change_toggle_status_from_acc(event, status){
    event.stopPropagation();
    var dev_name = status.closest('div').parentNode.querySelector('h3').innerHTML;;
    if (status.getAttribute('src') == "Iconos/toggle_on.png")
                {
                    api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  api.devices.turnOff(item.id).done(function(data){
                                      
                                        status.src = "Iconos/toggle_off.png";
                    status.parentNode.parentNode.nextElementSibling.querySelector('.panel1').children[0].children[0].src = "Iconos/toggle_inside_off.png";
                    status.nextElementSibling.innerHTML = ' Off';
                    status.parentNode.parentNode.nextElementSibling.querySelector('.panel1').children[0].children[1].innerHTML = " Status: Off";

                                  });
                              }
                          });
                    });
                    

                }
                else
                {
                    
                    api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  api.devices.turnOn(item.id).done(function(data){
                                      
                     status.src = "Iconos/toggle_on.png";
                    status.parentNode.parentNode.nextElementSibling.querySelector('.panel1').children[0].children[0].src = "Iconos/toggle_on.png";
                    status.nextElementSibling.innerHTML = ' On';
                    status.parentNode.parentNode.nextElementSibling.querySelector('.panel1').children[0].children[1].innerHTML = " Status: On";

                                  });
                              }
                          });
                    });
                    
                }
}

function change_air_temp_status(event, status){
    event.stopPropagation();
    
    if(status.getAttribute('src') == "Iconos/arrow_down.png")
                {
                  if(parseInt(status.nextElementSibling.innerHTML.substr(0,2)) > 18) {
                      var nueva_temp =(parseInt(status.nextElementSibling.innerHTML.substr(0,2))-1).toString()
                      status.nextElementSibling.innerHTML =  nueva_temp + "°C";
                      var dev_name = status.closest('div').parentNode.parentNode.previousElementSibling.querySelector('h3').innerHTML;
                      
                      api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  //var act = 
                                  
                                  //var pp = JSON.stringify(arr);
                                  
                                  api.devices.setTemp(item.id, nueva_temp).done(function(data){
                                      status.nextElementSibling.innerHTML = nueva_temp + "°C";
                                  });
                              }
                          });
                          
                      });
                  }
                  else 
                  {
                        var notice = document.getElementsByClassName('notice')[0];
                        notice.style.display = 'block';
                        document.getElementById('name').innerHTML = "Temperature can't go lower";

                        this.setTimeout(function(){
                            notice.style.display='none';
                        }, 3000);                  }
                }
                else
                {
                  if(parseInt(status.previousElementSibling.innerHTML.substr(0,2)) < 38) {
                      var nueva_temp = (parseInt(status.previousElementSibling.innerHTML.substr(0,2))+1).toString()
                     status.previousElementSibling.innerHTML = nueva_temp + "°C";
                      var dev_name = status.closest('div').parentNode.parentNode.previousElementSibling.querySelector('h3').innerHTML;
                      
                      api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  //var act = 
                                  
                                  //var pp = JSON.stringify(arr);
                                  
                                  api.devices.setTemp(item.id, nueva_temp).done(function(data){
                                      status.previousElementSibling.innerHTML = nueva_temp + "°C";
                                  });
                              }
                          });
                          
                      });
                  } 
                  else
                  {
                        var notice = document.getElementsByClassName('notice')[0];
                        notice.style.display = 'block';
                        document.getElementById('name').innerHTML = "Temperature can't go higher";

                        this.setTimeout(function(){
                            notice.style.display='none';
                        }, 3000);                  
                  }
                }
}

function change_air_mode(event, status){
    event.stopPropagation();
    var dev_name = status.closest('div').parentNode.parentNode.previousElementSibling.querySelector('h3').innerHTML;
    
    var act = "setMode";
    if(status.value == "Cool")
                {
                    api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  //var act = 
                                  
                                  //var pp = JSON.stringify(arr);
                                  var par = "cool";
                                  console.log(par);
                                  api.devices.setMode(item.id,JSON.stringify(["cool"])).done(function(data){
                                      status.previousElementSibling.previousElementSibling.setAttribute("src","Iconos/cool.png");
                                  });
                              }
                          });
                          
                      });
                }
                else if(status.value == "Heat")
                {
                 api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  //var act = 
                                  //var pp = JSON.stringify(arr);
                                  var par = "heat";
                                  console.log(par);
                                  api.devices.setMode(item.id,JSON.stringify(["heat"])).done(function(data){
                                      status.previousElementSibling.previousElementSibling.setAttribute("src","Iconos/heat.png");
                                  });
                              }
                          });
                          
                      });
                    
                }
                else
                {
                    api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  //var act = 
                                  
                                  //var pp = JSON.stringify(arr);
                                  var par = "fan";
                                  console.log(par);
                                  api.devices.setMode(item.id,JSON.stringify(["fan"])).done(function(data){
                                       status.previousElementSibling.previousElementSibling.setAttribute("src","Iconos/fan.png");
                                  });
                              }
                          });
                          
                      });
                 
                }
}

function change_fan_speed(event, status){
    event.stopPropagation();
    var dev_name = status.closest('div').parentNode.parentNode.previousElementSibling.querySelector('h3').innerHTML;
    
    
                    api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  //var act = 
                                  
                                  //var pp = JSON.stringify(arr);
                                  var par = status.value.toLowerCase();
                                  console.log(par);
                                  api.devices.setFan(item.id,JSON.stringify([par])).done(function(data){
                                  });
                              }
                          });
                          
                      });

}

function change_vert(event, status){
    event.stopPropagation();
    var dev_name = status.closest('div').parentNode.parentNode.previousElementSibling.querySelector('h3').innerHTML;
    
    
                    api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  //var act = 
                                  
                                  //var pp = JSON.stringify(arr);
                                  var par = status.value.toLowerCase();
                                  console.log(par);
                                  api.devices.setVertical(item.id,JSON.stringify([par])).done(function(data){
                                  });
                              }
                          });
                          
                      });

}

function change_hoz(event, status){
    event.stopPropagation();
    var dev_name = status.closest('div').parentNode.parentNode.previousElementSibling.querySelector('h3').innerHTML;
    
    
                    api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  //var act = 
                                  
                                  //var pp = JSON.stringify(arr);
                                  var par = status.value.toLowerCase();
                                  console.log(par);
                                  api.devices.setHorizontal(item.id,JSON.stringify([par])).done(function(data){
                                  });
                              }
                          });
                          
                      });

}


function change_fridge_freezer_temp(event, status){
    event.stopPropagation();
    var val;
     var dev_name = status.closest('div').parentNode.parentNode.previousElementSibling.querySelector('h3').innerHTML;
    if(status.getAttribute('src') == "Iconos/arrow_up.png")
      val = status.previousElementSibling.innerHTML.substr(0,3);
    else
      val = status.nextElementSibling.innerHTML.substr(0,3);

    if(val.charAt(2) === '°') {
          if(status.getAttribute('src') == "Iconos/arrow_up.png") {
            if(val.substr(0,2) == "-9") {
              
             
                      var nueva_temp = "-8"
                      api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  //var act = 
                                  
                                  //var pp = JSON.stringify(arr);
                                  
                                  api.devices.setFTemp(item.id, nueva_temp).done(function(data){
                                      status.previousElementSibling.innerHTML = "-8°C";
                                  });
                              }
                          });
                          
                      });
            } 
            else
            {
                        var notice = document.getElementsByClassName('notice')[0];
                        notice.style.display = 'block';
                        document.getElementById('name').innerHTML = "Temperature can't go higher";

                        this.setTimeout(function(){
                            notice.style.display='none';
                        }, 3000);   
            }
          }
          else
          {
            if(val.substr(0,2) == "-8") {
                
                var nueva_temp = "-9"
                      api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  //var act = 
                                  
                                  //var pp = JSON.stringify(arr);
                                  
                                  api.devices.setFTemp(item.id, nueva_temp).done(function(data){
                                     status.nextElementSibling.innerHTML = "-9°C";
                                  });
                              }
                          });
                          
                      });
            }
            else if(val.substr(0,2) == "-9") {
                var nueva_temp = "-10"
                api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  //var act = 
                                  
                                  //var pp = JSON.stringify(arr);
                                  
                                  api.devices.setFTemp(item.id, nueva_temp).done(function(data){
                                     status.nextElementSibling.innerHTML = "-10°C";
                                  });
                              }
                          });
                          
                      });
            }
          }
    } else {
          if(status.getAttribute('src') == "Iconos/arrow_up.png") {    
           
              var nueva_temp = (parseInt(val)+1).toString();
              api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  //var act = 
                                  
                                  //var pp = JSON.stringify(arr);
                                  
                                  api.devices.setFTemp(item.id, nueva_temp).done(function(data){
                                      status.previousElementSibling.innerHTML = (parseInt(val)+1).toString() + "°C";
                                  });
                              }
                          });
                          
                      });
          }
          else {
            if(val != "-20"){
                var nueva_temp = (parseInt(val)-1).toString() ;
                
                 api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  //var act = 
                                  
                                  //var pp = JSON.stringify(arr);
                                  
                                  api.devices.setFTemp(item.id, nueva_temp).done(function(data){
                                     status.nextElementSibling.innerHTML = (parseInt(val)-1).toString() + "°C";
                                  });
                              }
                          });
                          
                      });
            }
            else
            {
                        var notice = document.getElementsByClassName('notice')[0];
                        notice.style.display = 'block';
                        document.getElementById('name').innerHTML = "Temperature can't go lower";

                        this.setTimeout(function(){
                            notice.style.display='none';
                        }, 3000);
              
            }
          }
    }
 
}

//  falta cambiar temperatura de accordion
function change_fridge_temp(event, status){
    event.stopPropagation();

    if(status.getAttribute('src') == "Iconos/arrow_down.png")
                {
                  if(parseInt(status.nextElementSibling.innerHTML.substr(0,1)) > 2) {
                    var nueva_temp = (parseInt(status.nextElementSibling.innerHTML.substr(0,1))-1).toString();
                    status.nextElementSibling.innerHTML =  nueva_temp + "°C";
                      var dev_name = status.closest('div').parentNode.parentNode.previousElementSibling.querySelector('h3').innerHTML;
                      
                      api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  //var act = 
                                  //var pp = JSON.stringify(arr);
                                  
                                  api.devices.setTemp(item.id, nueva_temp).done(function(data){
                                      status.nextElementSibling.innerHTML = nueva_temp + "°C";
                                     status.closest('div').parentNode.parentNode.previousElementSibling.querySelector('h3').parentNode.parentNode.parentNode.querySelector('.lock_text').innerHTML  = nueva_temp + "°C";
                                  });
                              }
                          });
                          
                      });
                  }
                  else
                  {
                        var notice = document.getElementsByClassName('notice')[0];
                        notice.style.display = 'block';
                        document.getElementById('name').innerHTML = "Temperature can't go lower";

                        this.setTimeout(function(){
                            notice.style.display='none';
                        }, 3000);
              
                  }

                }
                else
                {
                  if(parseInt(status.previousElementSibling.innerHTML.substr(0,1)) < 8) {
                    
                      var nueva_temp = (parseInt(status.previousElementSibling.innerHTML.substr(0,1))+1).toString()
                      status.previousElementSibling.innerHTML = nueva_temp + "°C";
                      api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){

                                  
                                  api.devices.setTemp(item.id, nueva_temp).done(function(data){
                                      status.previousElementSibling.innerHTML = nueva_temp + "°C";
                                     status.closest('div').parentNode.parentNode.previousElementSibling.querySelector('h3').parentNode.parentNode.parentNode.querySelector('.lock_text').innerHTML  = nueva_temp + "°C";
                                  });
                              
                          });
                          
                      });
                  }
                  else
                  {
                        var notice = document.getElementsByClassName('notice')[0];
                        notice.style.display = 'block';
                        document.getElementById('name').innerHTML = "Temperature can't go higher";

                        this.setTimeout(function(){
                            notice.style.display='none';
                        }, 3000);
              
                  }
                }
}

function change_fridge_mode(event, status){
    var dev_name = status.closest('div').parentNode.parentNode.previousElementSibling.querySelector('h3').innerHTML;
    event.stopPropagation();
    if(status.value == "Default")
                {
                  
                    api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  api.devices.setMode(item.id, JSON.stringify(["default"])).done(function(data){
                                  status.previousElementSibling.previousElementSibling.setAttribute("src","Iconos/fridge_default.png");
                              });
                              }
                              
                          });
                    });
                }
                else if(status.value == "Vacation")
                {
                  
                    api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                              api.devices.setMode(item.id, JSON.stringify(["vacation"])).done(function(data){
                                  status.previousElementSibling.previousElementSibling.setAttribute("src","Iconos/vacation.png");
                              });
                              }
                          });
                    });
                }
                else
                {
                  
                     api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  api.devices.setMode(item.id, JSON.stringify(["party"])).done(function(data){
                                  status.previousElementSibling.previousElementSibling.setAttribute("src","Iconos/party.png");
                                });
                              }
                              
                          });
                    });
                }
}

function change_oven_temp(event, status){
    var dev_name = status.closest('div').parentNode.parentNode.previousElementSibling.querySelector('h3').innerHTML;
    event.stopPropagation();
    var val;

    if(status.getAttribute('src') == "Iconos/arrow_up.png")
      val = status.previousElementSibling.innerHTML.substr(0,3);
    else
      val = status.nextElementSibling.innerHTML.substr(0,3);

    if(val.charAt(2) === '°') {
          if(status.getAttribute('src') == "Iconos/arrow_up.png") {
              
              var nueva_temp = "100";
              api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  //var act = 
                                  //var pp = JSON.stringify(arr);
                                  
                                  api.devices.setTemp(item.id, nueva_temp).done(function(data){
                                  status.previousElementSibling.innerHTML = "100°C";
                                  });
                              }
                          });
                          
                      });
          } else {
                        var notice = document.getElementsByClassName('notice')[0];
                        notice.style.display = 'block';
                        document.getElementById('name').innerHTML = "Temperature can't go lower";

                        this.setTimeout(function(){
                            notice.style.display='none';
                        }, 3000);
          }
    }
    else if(val.charAt(1) == '°') {
              if(status.getAttribute('src') == "Iconos/arrow_up.png") {
              
              var nueva_temp = "90";
              api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  //var act = 
                                  //var pp = JSON.stringify(arr);
                                  
                                  api.devices.setTemp(item.id, nueva_temp).done(function(data){
                                  status.previousElementSibling.innerHTML = "90°C";
                                  });
                              }
                          });
                          
                      });
          } else {
                        var notice = document.getElementsByClassName('notice')[0];
                        notice.style.display = 'block';
                        document.getElementById('name').innerHTML = "Temperature can't go lower";

                        this.setTimeout(function(){
                            notice.style.display='none';
                        }, 3000);
          }
    }
     else {
          if(status.getAttribute('src') == "Iconos/arrow_up.png") {   
            if(val != "230") {
              
              var nueva_temp = (parseInt(val)+10).toString();
              api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  //var act = 
                                  //var pp = JSON.stringify(arr);
                                  
                                  api.devices.setTemp(item.id, nueva_temp).done(function(data){
                                  status.previousElementSibling.innerHTML = (parseInt(val)+10).toString() + "°C";
                                  });
                              }
                          });
                          
                      });
            } 
            else
            {
                        var notice = document.getElementsByClassName('notice')[0];
                        notice.style.display = 'block';
                        document.getElementById('name').innerHTML = "Temperature can't go higher";

                        this.setTimeout(function(){
                            notice.style.display='none';
                        }, 3000);
            }
          }
          else {
              
              var nueva_temp = (parseInt(val)-10).toString();
              api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  //var act = 
                                  //var pp = JSON.stringify(arr);
                                  
                                  api.devices.setTemp(item.id, nueva_temp).done(function(data){
                                  status.nextElementSibling.innerHTML = (parseInt(val)-10).toString() + "°C";
                                  });
                              }
                          });
                          
                      });
          }
    }
}

function choose_brightness(event, slid){
    var dev_name = slid.closest('div').parentNode.parentNode.parentNode.previousElementSibling.querySelector('h3').innerHTML;
    var val = slid.value;
    api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  console.log("found it");
                                  api.devices.setBrightness(item.id, val).done(function(data){
                                  slid.value = val;
                              });
                              }
                              
                          });
                    });
}
//FALTA LAMP (MOSTRAR VALUE DE SLIDE), ALARM


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
    onPageLoad();
});


function onPageLoad(){
  
      //para que ande el popover
    $("[data-toggle=popover]").popover();

      var myNode = document.getElementById("devices_list");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
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
                        }else if(roomtype == "dining room"){
                            img.setAttribute("src", "Iconos/diningroom.png");                   
                        }else if(roomtype == "living room"){
                            img.setAttribute("src", "Iconos/living.png");
                        }else if(roomtype == "office"){
                            img.setAttribute("src", "Iconos/office.png");
                        }else if(roomtype == "tv room"){
                            img.setAttribute("src", "Iconos/tv_room.png");
                        }else{
                            img1.setAttribute("src", "Iconos/other.png");     
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
                p.innerHTML = dev_type;

                div3.appendChild(p);
                div3.appendChild(divRo);
                acc1.appendChild(div1);
                acc1.appendChild(div3);
                           
            if(dev_type == 'door'){
                
                api.devices.getState(item2.id).done(function(data){
                   console.log("Mi state de door es: " + data.status); 
                    console.log("Mi lock de door es: " + data.lock); 
                    var lock_icon2 = document.createElement("img");
                    var lock_info = document.createElement("p");
                    var div_trash = document.createElement("div");
                    var h4_trash = document.createElement("h4");
                    if(data.lock == "locked"){
                        lock_icon2.setAttribute("src", "Iconos/locked.png"); 
                        lock_icon2.setAttribute("class", "lock_icon"); 
                        lock_icon2.setAttribute("alt", "Locked");
                        lock_info.innerHTML = "Locked";
                    }else{
                        lock_icon2.setAttribute("src", "Iconos/unlocked.png"); 
                        lock_icon2.setAttribute("class", "lock_icon");
                        lock_icon2.setAttribute("alt", "Unlocked");
                        lock_info.innerHTML = "Unlocked"; 
                    }
                    
                    lock_icon2.setAttribute("onclick", "change_lock_status_from_acc(event,this);");

                    lock_info.setAttribute("class", "lock_text");
                    

                    h4_trash.setAttribute("class", "trash_message");
                    h4_trash.innerHTML = "You are about to delete this device. Continue? ";

                    div_trash.appendChild(h4_trash);

                    acc2.appendChild(lock_icon2);
                    acc2.appendChild(lock_info);
                    acc2.appendChild(div_trash);
                });

                

            }else if(dev_type =='ac'){
                api.devices.getState(item2.id).done(function(data2){
 
                    var toggle_img = document.createElement("img");
                    var toggle_info = document.createElement("p");
                    var div_trash = document.createElement("div");
                    var h4_trash = document.createElement("h4");
                    if(data.status == 'off'){
                         toggle_img.setAttribute("src", "Iconos/toggle_off.png"); //debería depender de getstate
                         toggle_img.setAttribute("alt", "Off"); //debería depender de getstate
                         toggle_info.setAttribute("class", "lock_text");
                         toggle_info.innerHTML = "Off"; //debería depender de getstate
                    }else{
                         toggle_img.setAttribute("src", "Iconos/toggle_on.png"); //debería depender de getstate
                         toggle_img.setAttribute("alt", "On"); //debería depender de getstate
                         toggle_info.setAttribute("class", "lock_text");
                         toggle_info.innerHTML = "On"; //debería depender de getstate
                    }
                   
                    toggle_img.setAttribute("class", "toggle_icon");
                    toggle_img.setAttribute("onclick", "change_toggle_status_from_acc(event,this);");

                    

                    h4_trash.setAttribute("class", "trash_message");
                    h4_trash.innerHTML = "You are about to delete this device. Continue? ";

                    div_trash.appendChild(h4_trash);

                    acc2.appendChild(toggle_img);
                    acc2.appendChild(toggle_info);
                    acc2.appendChild(div_trash);
                });
                

            }else if(dev_type == 'oven'){
                api.devices.getState(item2.id).done(function(data){

                    var toggle_img = document.createElement("img");
                    var toggle_info = document.createElement("p");
                    var div_trash = document.createElement("div");
                    var h4_trash = document.createElement("h4");
                    if(data.status == 'off'){
                        toggle_img.setAttribute("src", "Iconos/toggle_off.png"); //debería depender de getstate
                        toggle_img.setAttribute("alt", "Off"); //debería depender de getstate
                        toggle_info.innerHTML = "Off"; //debería depender de getstate
                    }else{
                        toggle_img.setAttribute("src", "Iconos/toggle_on.png"); //debería depender de getstate
                        toggle_img.setAttribute("alt", "On"); //debería depender de getstate
                        toggle_info.innerHTML = "On"; //debería depender de getstate
                    }
                    
                    toggle_img.setAttribute("class", "toggle_icon");
                    toggle_img.setAttribute("onclick", "change_toggle_status_from_acc(event,this);");

                    toggle_info.setAttribute("class", "lock_text");
                    

                    h4_trash.setAttribute("class", "trash_message");
                    h4_trash.innerHTML = "You are about to delete this device. Continue? ";

                    div_trash.appendChild(h4_trash);

                    acc2.appendChild(toggle_img);
                    acc2.appendChild(toggle_info);
                    acc2.appendChild(div_trash);
                });
                

            }else if(dev_type == 'alarm'){
                api.devices.getState(item2.id).done(function(data){
                    var alarm_icon = document.createElement("img");
                    var alarm_info = document.createElement("p");
                    var div_trash = document.createElement("div");
                    var h4_trash = document.createElement("h4");
                    
                    if(data.status == 'disarmed'){
                        alarm_icon.setAttribute("src", "Iconos/alarm_wo_people_stat.png");
                        alarm_icon.setAttribute("class", "alarm_icon_stat_armaway"); 
                        alarm_info.innerHTML = "ArmAway...";
                    }else{
                        alarm_icon.setAttribute("src", "Iconos/disarm_stat.png"); 
                        alarm_icon.setAttribute("class", "alarm_icon_stat_disarm"); 
                        alarm_info.innerHTML = "Disarm..."; 
                    }
                        
                    
                    alarm_icon.setAttribute("alt", "Alarm Status");
                    alarm_icon.setAttribute("onclick", "toggle_alarm(event,this);");

                    alarm_info.setAttribute("class", "lock_text");
                    

                    h4_trash.setAttribute("class", "trash_message");
                    h4_trash.innerHTML = "You are about to delete this device. Continue? ";

                    div_trash.appendChild(h4_trash);

                    acc2.appendChild(alarm_icon);
                    acc2.appendChild(alarm_info);
                    acc2.appendChild(div_trash); 
                });
                             

            }else if(dev_type == 'blind'){
                api.devices.getState(item2.id).done(function(data){
                    var blind_icon2 = document.createElement("img");
                    var blind_info = document.createElement("p");
                    var div_trash = document.createElement("div");
                    var h4_trash = document.createElement("h4");
                    if(data.status == 'opened' || data.status == 'opening'){
                        blind_icon2.setAttribute("src", "Iconos/blind_up_status.png"); //debería depender de getstate
                        blind_info.innerHTML = " Up"; //debería depender de getstate
                    }else{
                        blind_icon2.setAttribute("src", "Iconos/blind_down_status.png"); //debería depender de getstate
                        blind_info.innerHTML = " Down"; //debería depender de getstate
                    }
                    
                    blind_icon2.setAttribute("alt", "Up"); //debería depender de getstate
                    blind_icon2.setAttribute("class", "lock_icon");
                    blind_icon2.setAttribute("onclick", "change_blind_status_from_acc(event,this);");

                    blind_info.setAttribute("class", "lock_text");
                    

                    h4_trash.setAttribute("class", "trash_message");
                    h4_trash.innerHTML = "You are about to delete this device. Continue? ";

                    div_trash.appendChild(h4_trash);

                    acc2.appendChild(blind_icon2);
                    acc2.appendChild(blind_info);
                    acc2.appendChild(div_trash);
                });
                

            }else if(dev_type == 'refrigerator'){
                api.devices.getState(item2.id).done(function(data){
                    var temp_icon = document.createElement("img");
                    var temp_info = document.createElement("p");
                    var div_trash = document.createElement("div");
                    var h4_trash = document.createElement("h4");

                    temp_icon.setAttribute("src", "Iconos/temperature.png");
                    temp_icon.setAttribute("alt", "Temperature");
                    temp_icon.setAttribute("class", "temperature_icon_status");

                    temp_info.setAttribute("class", "lock_text");
                    temp_info.innerHTML = data.temperature + "°C"; //debería depender de getstate

                    h4_trash.setAttribute("class", "trash_message");
                    h4_trash.innerHTML = "You are about to delete this device. Continue? ";

                    div_trash.appendChild(h4_trash);

                    acc2.appendChild(temp_icon);
                    acc2.appendChild(temp_info);
                    acc2.appendChild(div_trash);
                });
                

            }else if(dev_type == 'lamp'){
                api.devices.getState(item2.id).done(function(data){
                    var toggle_img = document.createElement("img");
                    var toggle_info = document.createElement("p");
                    var div_trash = document.createElement("div");
                    var h4_trash = document.createElement("h4");
                    if(data.status == 'off'){
                        toggle_img.setAttribute("src", "Iconos/toggle_off.png"); //debería depender de getstate
                        toggle_img.setAttribute("alt", "Off"); //debería depender de getstate
                        toggle_info.innerHTML = "Off"; //debería depender de getstate
                    }else{
                        toggle_img.setAttribute("src", "Iconos/toggle_on.png"); //debería depender de getstate
                        toggle_img.setAttribute("alt", "On"); //debería depender de getstate
                        toggle_info.innerHTML = "On"; //debería depender de getstate
                    }
                    
                    toggle_img.setAttribute("class", "toggle_icon");
                    toggle_img.setAttribute("onclick", "change_toggle_status_from_acc(event,this);");

                    toggle_info.setAttribute("class", "lock_text");
                    

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
                if(item2.meta.replace("{","").replace("}","").split(',')[1] == ' faved'){
                    heart.setAttribute("src", "Iconos/heart_coloured4.png");
               }else{
                    heart.setAttribute("src", "Iconos/heart.png");
            }
                heart.setAttribute("alt", "Fave");
                heart.setAttribute("class", "fave_icon");
                heart.setAttribute("onclick", "fav(event,this);");
                trash.setAttribute("src", "Iconos/tacho.png");
                trash.setAttribute("alt", "Delete");
                trash.setAttribute("class", "delete_icon");
                trash.setAttribute("onclick", "trash(event,this);");
                trash.setAttribute("onclick", "trash(event,this);");
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

            if(dev_type == 'door'){
                api.devices.getState(item2.id).done(function(data){
                    
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
                    if(data.lock == "locked"){
                        lock_icon.setAttribute("src", "Iconos/locked_inside.png"); //debería depender de getstatus
                        lock_icon.setAttribute("alt", "Locked"); //debería depender de getstatus
                         p1.innerHTML = "Status: Locked"; //debería depender de getstatus
                    }else{
                        lock_icon.setAttribute("src", "Iconos/unlocked_inside.png"); //debería depender de getstatus
                        lock_icon.setAttribute("alt", "Unlocked"); //debería depender de getstatus
                        p1.innerHTML = "Status: Unlocked"; //debería depender de getstatus
                    }
                    
                    lock_icon.setAttribute("class", "status_icon");
                    lock_icon.setAttribute("onclick", "change_lock_status(event,this);");

                    p1.setAttribute("class", "stat_text");
                   

                    status1.appendChild(lock_icon);
                    status1.appendChild(p1);

                    //create panel 1

                    panel1.appendChild(status1);

                    //close/open

                    var stat = document.createElement("img");
                    var p2 = document.createElement("p");
                    if(data.status == "closed"){
                        stat.setAttribute("src", "Iconos/closed.png"); //debería depender de getstatus
                        stat.setAttribute("alt", "Closed"); //debería depender de getstatus 
                        p2.innerHTML = "Status: Closed"; //debería depender de getstatus
                    }else{
                        stat.setAttribute("src", "Iconos/open.png"); //debería depender de getstatus
                        stat.setAttribute("alt", "Open"); //debería depender de getstatus 
                        p2.innerHTML = "Status: Open"; //debería depender de getstatus
                    }
                    
                    
                    stat.setAttribute("class", "status_icon"); //debería depender de getstatus
                    stat.setAttribute("onclick", "stat(event,this);");

                    p2.setAttribute("class", "stat_text");
                    

                    status2.appendChild(stat);
                    status2.appendChild(p2);

                    //create panel 2

                    panel2.appendChild(status2);

                    //create panel

                    panel.appendChild(panel1);
                    panel.appendChild(panel2);
                });
                

            }else if(dev_type =='ac'){
                api.devices.getState(item2.id).done(function(data){

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
                    if(data.status == 'Off'){
                        toggle_icon.setAttribute("src", "Iconos/toggle_inside_off.png");  //gettearlo con get status
                        toggle_icon.setAttribute("alt", "Off");   //idem
                        toggle_icon.setAttribute("class", "toggle_inside_icon");
                        toggle_icon.setAttribute("onclick", "change_toggle_status(event,this);");

                        stat.setAttribute("class", "stat_text");
                        stat.innerHTML = "Status: Off"; //gettearlo con get status
                    }else{
                        toggle_icon.setAttribute("src", "Iconos/toggle_on.png");  //gettearlo con get status
                        toggle_icon.setAttribute("alt", "Off");   //idem
                        toggle_icon.setAttribute("class", "toggle_inside_icon");
                        toggle_icon.setAttribute("onclick", "change_toggle_status(event,this);");

                        stat.setAttribute("class", "stat_text");
                        stat.innerHTML = "Status: On"; //gettearlo con get status
                    }
                    

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
                    arrow_down.setAttribute("onclick", "change_air_temp_status(event, this);");

                    p2.setAttribute("class", "stat_text");
                    p2.setAttribute("class", "number_info");
                    p2.innerHTML = data.temperature + "°C ";

                    arrow_up.setAttribute("src", "Iconos/arrow_up.png");
                    arrow_up.setAttribute("alt", "Temperature Up");
                    arrow_up.setAttribute("class", "arrow_change_up_icon");
                    arrow_up.setAttribute("onclick", "change_air_temp_status(event, this);");

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

                    if(data.mode == 'cool'){
                        mode_icon.setAttribute("src", "Iconos/cool.png");
                        mode_icon.setAttribute("alt", "Cool");
                    }else if(data.mode == 'fan'){
                        mode_icon.setAttribute("src", "Iconos/fan.png"); 
                        mode_icon.setAttribute("alt", "Fan");
                    }else{
                        mode_icon.setAttribute("src", "Iconos/heat.png");
                        mode_icon.setAttribute("alt", "Cool"); 
                    }

                    mode_icon.setAttribute("class", "ac_mode_icon");

                    p3.setAttribute("class", "stat_text");
                    p3.innerHTML = "Mode: ";

                    select.setAttribute("class", "panel_selector");
                    select.setAttribute("onChange", "change_air_mode(event, this);");

                    if(data.mode == 'cool'){
                        option1.innerHTML = "Cool"; //debería ponerse la que esté en el getstatus primera
                        option2.innerHTML = "Heat";
                        option3.innerHTML = "Fan";
                    }else if(data.mode == 'heat'){
                        option1.innerHTML = "Heat"; //debería ponerse la que esté en el getstatus primera
                        option2.innerHTML = "Cool";
                        option3.innerHTML = "Fan";
                    }else{
                        option1.innerHTML = "Fan"; //debería ponerse la que esté en el getstatus primera
                        option2.innerHTML = "Heat";
                        option3.innerHTML = "Cool";
                    }

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

                    if(data.fanSpeed == 'auto'){
                        option4.innerHTML = "Auto"; 
                        option5.innerHTML = "25";
                        option6.innerHTML = "50";
                        option7.innerHTML = "75";
                        option8.innerHTML = "100";
                    }else if(data.fanSpeed == '25'){
                        option4.innerHTML = "25"; 
                        option5.innerHTML = "50";
                        option6.innerHTML = "75";
                        option7.innerHTML = "100";
                        option8.innerHTML = "Auto";    
                    }else if(data.fanSpeed == '50'){
                        option4.innerHTML = "50"; 
                        option5.innerHTML = "25";
                        option6.innerHTML = "75";
                        option7.innerHTML = "100";
                        option8.innerHTML = "Auto"; 
                    }else if(data.fanSpeed == '75'){
                        option4.innerHTML = "75"; 
                        option5.innerHTML = "25";
                        option6.innerHTML = "50";
                        option7.innerHTML = "100";
                        option8.innerHTML = "Auto";       
                    }else{
                        option4.innerHTML = "100"; 
                        option5.innerHTML = "25";
                        option6.innerHTML = "50";
                        option7.innerHTML = "75";
                        option8.innerHTML = "Auto";  
                    }

                    select2.appendChild(option4);
                    select2.appendChild(option5);
                    select2.appendChild(option6);
                    select2.appendChild(option7);
                    select2.appendChild(option8);
                    select2.setAttribute("onchange", "change_fan_speed(event,this);");

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
                    if(data.verticalSwing == "auto"){
                        option9.innerHTML = "Auto"; //debería ponerse la que esté en el getstatus primera
                        option10.innerHTML = "22";
                        option11.innerHTML = "45";
                        option12.innerHTML = "67";
                        option13.innerHTML = "90";
                    }else if(data.verticalSwing == "22"){
                        option9.innerHTML = "22"; //debería ponerse la que esté en el getstatus primera
                        option10.innerHTML = "45";
                        option10.innerHTML = "67";
                        option11.innerHTML = "90";
                        option13.innerHTML = "Auto";    
                    }else if(data.verticalSwing == "45"){
                        option9.innerHTML = "45"; //debería ponerse la que esté en el getstatus primera
                        option10.innerHTML = "22";
                        option10.innerHTML = "67";
                        option11.innerHTML = "90";
                        option13.innerHTML = "Auto";   
                    }else if(data.verticalSwing == "67"){
                        option9.innerHTML = "67"; //debería ponerse la que esté en el getstatus primera
                        option10.innerHTML = "22";
                        option10.innerHTML = "45";
                        option11.innerHTML = "90";
                        option13.innerHTML = "Auto";        
                    }else{
                        option9.innerHTML = "90"; //debería ponerse la que esté en el getstatus primera
                        option10.innerHTML = "22";
                        option10.innerHTML = "45";
                        option11.innerHTML = "67";
                        option13.innerHTML = "Auto";        
                     }

                    select3.appendChild(option9);
                    select3.appendChild(option10);
                    select3.appendChild(option11);
                    select3.appendChild(option12);
                    select3.appendChild(option13);
                    select3.setAttribute("onchange", "change_vert(event,this);");

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

                    if(data.horizontalSwing == 'auto'){
                        option14.innerHTML = "Auto"; //debería ponerse la que esté en el getstatus primera
                        option15.innerHTML = "-90";
                        option16.innerHTML = "-45";
                        option17.innerHTML = "0";
                        option18.innerHTML = "45";
                        option19.innerHTML = "90";
                    }else if(data.horizontalSwing == '-90'){
                        option14.innerHTML = "-90"; //debería ponerse la que esté en el getstatus primera
                        option15.innerHTML = "-45";
                        option16.innerHTML = "0";
                        option17.innerHTML = "45";
                        option18.innerHTML = "90";
                        option19.innerHTML = "Auto";    
                    }else if(data.horizontalSwing == '-45'){
                        option14.innerHTML = "-45"; //debería ponerse la que esté en el getstatus primera
                        option15.innerHTML = "-90";
                        option16.innerHTML = "0";
                        option17.innerHTML = "45";
                        option18.innerHTML = "90";
                        option19.innerHTML = "Auto";  
                    }else if(data.horizontalSwing == '0'){
                        option14.innerHTML = "0"; 
                        option15.innerHTML = "-90";
                        option16.innerHTML = "-45";
                        option17.innerHTML = "45";
                        option18.innerHTML = "90";
                        option19.innerHTML = "Auto";      
                    }else if(data.horizontalSwing == '45'){
                        option14.innerHTML = "45"; 
                        option15.innerHTML = "-90";
                        option16.innerHTML = "-45";
                        option17.innerHTML = "0";
                        option18.innerHTML = "90";
                        option19.innerHTML = "Auto";   
                    }else{
                        option14.innerHTML = "90"; 
                        option15.innerHTML = "-90";
                        option16.innerHTML = "-45";
                        option17.innerHTML = "0";
                        option18.innerHTML = "45";
                        option19.innerHTML = "Auto"; 
                    }

                    select4.appendChild(option14);
                    select4.appendChild(option15);
                    select4.appendChild(option16);
                    select4.appendChild(option17);
                    select4.appendChild(option18);
                    select4.appendChild(option19);
                    select4.setAttribute("onchange", "change_hoz(event,this);");

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
                });
                

            }else if(dev_type == 'oven'){
                api.devices.getState(item2.id).done(function(data){
                    
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
                    if(data.status == 'off'){
                         toggle_icon.setAttribute("src", "Iconos/toggle_inside_off.png");  //gettearlo con get status
                         toggle_icon.setAttribute("alt", "Off");   //idem
                         stat.innerHTML = "Status: Off"; //gettearlo con get status
                    }else{
                        toggle_icon.setAttribute("src", "Iconos/toggle_on.png");  //gettearlo con get status
                         toggle_icon.setAttribute("alt", "On");   //idem
                         stat.innerHTML = "Status: On"; //gettearlo con get status
                    }
                   
                    toggle_icon.setAttribute("class", "toggle_inside_icon");
                    toggle_icon.setAttribute("onclick", "change_toggle_status(event,this);");

                    stat.setAttribute("class", "stat_text");
                    

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
                    arrow_down.setAttribute("onclick", "change_oven_temp(event, this);");

                    p2.setAttribute("class", "stat_text");
                    p2.setAttribute("class", "number_info");
                    p2.innerHTML = data.temperature + "°C "; //esto debería ser un getstatus

                    arrow_up.setAttribute("src", "Iconos/arrow_up.png");
                    arrow_up.setAttribute("alt", "Temperature Up");
                    arrow_up.setAttribute("class", "arrow_change_up_icon");
                    arrow_up.setAttribute("onclick", "change_oven_temp(event, this);");

                    status2.appendChild(temp);
                    status2.appendChild(p1);
                    status2.appendChild(arrow_down);
                    status2.appendChild(p2);
                    status2.appendChild(arrow_up);

                    //heat

                    var heat_icon = document.createElement("img");
                    var p3 = document.createElement("p");
                    var select = document.createElement("select");
                    select.setAttribute("onchange", "change_heat(event, this)");
                    var option1 = document.createElement("option");
                    var option2 = document.createElement("option");
                    var option3 = document.createElement("option");

                    heat_icon.setAttribute("src", "Iconos/heat_icon.png");
                    heat_icon.setAttribute("alt", "Heat");
                    heat_icon.setAttribute("class", "heat_icon");

                    p3.setAttribute("class", "stat_text");
                    p3.innerHTML = "Heat: ";
                    
                    select.setAttribute("class", "panel_selector");
                    if(data.heat == 'conventional'){
                        option1.innerHTML = "Conventional"; //debería ponerse la que esté en el getstatus primera
                        option2.innerHTML = "Bottom";
                        option3.innerHTML = "Top";
                    }else if(data.heat == 'bottom'){
                        option1.innerHTML = "Bottom"; //debería ponerse la que esté en el getstatus primera
                        option2.innerHTML = "Conventional";
                        option3.innerHTML = "Top";    
                    }else{
                        option1.innerHTML = "Top"; //debería ponerse la que esté en el getstatus primera
                        option2.innerHTML = "Bottom";
                        option3.innerHTML = "Conventional";     
                    }
                    

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
                    select2.setAttribute("onchange", "change_grill(event, this)");
                    var option4 = document.createElement("option");
                    var option5 = document.createElement("option");
                    var option6 = document.createElement("option");

                    grill_icon.setAttribute("src", "Iconos/grill_icon.png");
                    grill_icon.setAttribute("alt", "Grill");
                    grill_icon.setAttribute("class", "grill_icon");

                    p4.setAttribute("class", "stat_text");
                    p4.innerHTML = "Grill: ";

                    select2.setAttribute("class", "panel_selector");
                    if(data.grill == 'large'){
                        option4.innerHTML = "Large"; //debería ponerse la que esté en el getstatus primera
                        option5.innerHTML = "Eco";
                        option6.innerHTML = "Off";
                    }else if(data.grill == 'eco'){
                        option4.innerHTML = "Eco"; //debería ponerse la que esté en el getstatus primera
                        option5.innerHTML = "Large";
                        option6.innerHTML = "Off";   
                    }else{
                        option4.innerHTML = "Off"; //debería ponerse la que esté en el getstatus primera
                        option5.innerHTML = "Large";
                        option6.innerHTML = "Eco";        
                    }
                    

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
                    select3.setAttribute("onchange", "change_convection(event, this)");
                    var option7 = document.createElement("option");
                    var option8 = document.createElement("option");
                    var option9 = document.createElement("option");

                    convection_icon.setAttribute("src", "Iconos/convection_icon.png");
                    convection_icon.setAttribute("alt", "Convection");
                    convection_icon.setAttribute("class", "convection_icon");

                    p5.setAttribute("class", "stat_text");
                    p5.innerHTML = "Convection: ";

                    select3.setAttribute("class", "panel_selector");
                    if(data.convection == 'normal'){
                        option7.innerHTML = "Normal"; //debería ponerse la que esté en el getstatus primera
                        option8.innerHTML = "Eco";
                        option9.innerHTML = "Off";
                    }else if(data.convection == 'eco'){
                         option7.innerHTML = "Eco"; //debería ponerse la que esté en el getstatus primera
                         option8.innerHTML = "Normal";
                         option9.innerHTML = "Off";    
                    }else{
                         option7.innerHTML = "Off"; //debería ponerse la que esté en el getstatus primera
                         option8.innerHTML = "Normal";
                         option9.innerHTML = "Eco"; 
                    }
                    

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
                    });
                

            }else if(dev_type == 'alarm'){
                api.devices.getState(item2.id).done(function(data){
                    
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
                    });
                

            }else if(dev_type == 'blind'){
                 api.devices.getState(item2.id).done(function(data){
                        var panel1 = document.createElement("div");
                        panel1.setAttribute("class", "panel1");
                        var status1 = document.createElement("div");
                        status1.setAttribute("class", "status");

                        var panel2 = document.createElement("div");
                        panel2.setAttribute("class", "panel2");

                        //up/down

                        var blind_icon = document.createElement("img");
                        var p1 = document.createElement("p");
                        if(data.status == 'opened' || data.status == 'opening'){
                            blind_icon.setAttribute("src", "Iconos/blind_up.png"); //debería depender de getstatus
                            blind_icon.setAttribute("alt", "Up"); //debería depender de getstatus
                            p1.setAttribute("class", "stat_text");
                            p1.innerHTML = "Status: Up"; //debería depender de getstatus

                        }else{
                            blind_icon.setAttribute("src", "Iconos/blind_down.png"); //debería depender de getstatus
                            blind_icon.setAttribute("alt", "Down"); //debería depender de getstatus
                            p1.setAttribute("class", "stat_text");
                            p1.innerHTML = "Status: Down"; //debería depender de getstatus
                        }
                        
                        blind_icon.setAttribute("class", "status_icon");
                        blind_icon.setAttribute("onclick", "change_blind_status(event,this);");

                        
                        status1.appendChild(blind_icon);
                        status1.appendChild(p1);

                        //create panel 1

                        panel1.appendChild(status1);

                        //create panel

                        panel.appendChild(panel1);
                        panel.appendChild(panel2);
                 });
                

            }else if(dev_type == 'refrigerator'){
                api.devices.getState(item2.id).done(function(data){
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
                    arrow_down.setAttribute("onclick", "change_fridge_temp(event,this);");

                    p2.setAttribute("class", "stat_text");
                    p2.setAttribute("class", "number_info");
                    p2.innerHTML = data.temperature + "°C ";

                    arrow_up.setAttribute("src", "Iconos/arrow_up.png");
                    arrow_up.setAttribute("alt", "Temperature Up");
                    arrow_up.setAttribute("class", "arrow_change_up_icon");
                    arrow_up.setAttribute("onclick", "change_fridge_temp(event,this);");

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
                    arrow_down1.setAttribute("onclick", "change_fridge_freezer_temp(event,this);");

                    p4.setAttribute("class", "stat_text");
                    p4.setAttribute("class", "number_info");
                    p4.innerHTML = data.freezerTemperature + "°C ";

                    arrow_up1.setAttribute("src", "Iconos/arrow_up.png");
                    arrow_up1.setAttribute("alt", "Temperature Up");
                    arrow_up1.setAttribute("class", "arrow_change_up_icon");
                    arrow_up1.setAttribute("onclick", "change_fridge_freezer_temp(event,this);");

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

                    
                    mode_icon.setAttribute("class", "fridge_default_icon");

                    p5.setAttribute("class", "stat_text");
                    p5.innerHTML = "Mode: ";

                    select.setAttribute("class", "panel_selector");
                    select.setAttribute("onchange", "change_fridge_mode(event,this);");
                    if(data.mode == 'default'){
                        mode_icon.setAttribute("src", "Iconos/fridge_default.png");
                        mode_icon.setAttribute("alt", "Fridge");
                        option1.innerHTML = "Default"; 
                        option2.innerHTML = "Vacation";
                        option3.innerHTML = "Party";
                    }else if(data.mode == 'vacation'){
                        mode_icon.setAttribute("src", "Iconos/vacation.png");
                        mode_icon.setAttribute("alt", "Vacation");
                        option1.innerHTML = "Vacation";
                        option2.innerHTML = "Default";
                        option3.innerHTML = "Party";    
                    }else{
                        mode_icon.setAttribute("src", "Iconos/party.png");
                        mode_icon.setAttribute("alt", "Party");
                        option1.innerHTML = "Party";
                        option2.innerHTML = "Vacation";
                        option3.innerHTML = "Default";     
                    }
                    
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
                });
                

            }else if(dev_type == 'lamp'){
                api.devices.getState(item2.id).done(function(data){
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
                if(data.status == 'off'){
                    toggle_icon.setAttribute("src", "Iconos/toggle_inside_off.png");  //gettearlo con get status
                    toggle_icon.setAttribute("alt", "Off");   //idem
                    stat.innerHTML = "Status: Off"; //gettearlo con get status
                }else{
                    toggle_icon.setAttribute("src", "Iconos/toggle_on.png");  //gettearlo con get status
                    toggle_icon.setAttribute("alt", "On");   //idem
                    stat.innerHTML = "Status: On"; //gettearlo con get status
                }
                
                toggle_icon.setAttribute("class", "toggle_inside_icon");
                toggle_icon.setAttribute("onclick", "change_toggle_status(event,this);");

                stat.setAttribute("class", "stat_text");
                

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
                    console.log("color es "+data.color);
                input1.setAttribute("value", data.color);
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
                input2.setAttribute("value", JSON.stringify(data.brightness)); //debería gettearlo con getstate
                input2.setAttribute("class", "slider");
                input2.setAttribute("id", "myRange");
                input2.setAttribute("onclick", "choose_brightness(event, this)");

                div_slide.appendChild(input2);

                status3.appendChild(brightness_icon);
                status3.appendChild(p2);
                status3.appendChild(div_slide);

                //create panel 2

                panel2.appendChild(status3);

                //create panel

                panel.appendChild(panel1);
                panel.appendChild(panel2);
            });
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
                });
            }
        });
        
        
    
        
        
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log("Request failed: jqXHR.status=" + jqXHR.status + ", textStatus=" + textStatus + ", errorThrown=" + errorThrown);
    });
    
};

function change_heat(event, heatbox){
    var dev_name = heatbox.closest('div').parentNode.parentNode.previousElementSibling.querySelector('h3').innerHTML;
    if(heatbox.value == 'Conventional'){
        api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  api.devices.setHeat(item.id, JSON.stringify(["conventional"])).done(function(data){
                                    console.log("heat seteaado como conv " + data.result);
                                  });
                              }
                          });
                    });
    }else if(heatbox.value == 'Bottom'){
         api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  api.devices.setHeat(item.id, JSON.stringify(["bottom"])).done(function(data){
                                    console.log("heat seteaado como bottom " + data.result);
                                  });
                              }
                          });
                    });    
    }else{
        api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  api.devices.setHeat(item.id, JSON.stringify(["top"])).done(function(data){
                                    console.log("heat seteaado como top " + data.result);
                                  });
                              }
                          });
                    });     
    }
}

function change_grill(event, heatbox){
    var dev_name = heatbox.closest('div').parentNode.parentNode.previousElementSibling.querySelector('h3').innerHTML;
    if(heatbox.value == 'Off'){
        api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  api.devices.setGrill(item.id, JSON.stringify(["off"])).done(function(data){
                                    console.log("heat seteaado como conv " + data.result);
                                  });
                              }
                          });
                    });
    }else if(heatbox.value == 'Large'){
         api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  api.devices.setGrill(item.id, JSON.stringify(["large"])).done(function(data){
                                    console.log("heat seteaado como bottom " + data.result);
                                  });
                              }
                          });
                    });    
    }else{
        api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  api.devices.setGrill(item.id, JSON.stringify(["eco"])).done(function(data){
                                    console.log("heat seteaado como top " + data.result);
                                  });
                              }
                          });
                    });     
    }
}

function change_convection(event, heatbox){
    var dev_name = heatbox.closest('div').parentNode.parentNode.previousElementSibling.querySelector('h3').innerHTML;
    if(heatbox.value == 'Off'){
        api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  api.devices.setConvection(item.id, JSON.stringify(["off"])).done(function(data){
                                    console.log("heat seteaado como conv " + data.result);
                                  });
                              }
                          });
                    });
    }else if(heatbox.value == 'Normal'){
         api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  api.devices.setConvection(item.id, JSON.stringify(["normal"])).done(function(data){
                                    console.log("heat seteaado como bottom " + data.result);
                                  });
                              }
                          });
                    });    
    }else{
        api.devices.getAllDevices().done(function(data){
                          
                          $.each(data, function(i, item){
                              if(item.name == dev_name){
                                  api.devices.setConvection(item.id, JSON.stringify(["eco"])).done(function(data){
                                    console.log("heat seteaado como top " + data.result);
                                  });
                              }
                          });
                    });     
    }
}

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

function trash(event, tacho){
    event.stopPropagation();
    $('#delete_device_popup').modal('toggle');

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
    api.devices.deleteDevice(deviceid).done(function(data){
        onPageLoad();                                           
    });
};
