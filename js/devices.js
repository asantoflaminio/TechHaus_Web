


function passId(event, devicea){
    
    var device_name = "";
    
    if(devicea.id == 'door_click'){
        device_name = "door";
    }else if(devicea.id == 'alarm_click'){
        device_name = "alarm";   
    }else if(devicea.id == 'refrigerator_click'){
        device_name = "refrigerator";
    }else if(devicea.id == 'oven_click'){
        device_name = "oven";
    }else if(devicea.id == 'blind_click'){
        device_name = "blind";
    }else if(devicea.id == 'air_click'){
        device_name = "ac";
    }else if(devicea.id == 'lamp_click'){
        device_name = "lamp";
    }else if(devicea.id == 'all_click'){
        device_name = "all";
    }else if(devicea.id == 'fave_click'){
        device_name = "favorites";
    }
    if(device_name != "favorites" && device_name != "all"){
        api.devicetypes.getDeviceTypes().done(function(data) {
        $.each(data, function(i, item){
            if(item.name == device_name){
                var type_id = item.id;
                window.localStorage.clear();
                console.log("desde devices.js voy a poner type_id = " + type_id);
                window.localStorage.setItem("type_id", type_id);
                window.localStorage.setItem("type_name", device_name);
                window.location.href = 'doors.html';
                
            }
    
        });
     });
    }else{
        window.localStorage.clear();
        window.localStorage.setItem("type_name", device_name);
        window.location.href = 'doors.html';
    }

    
}
         