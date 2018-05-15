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
  static postRoom(name2, iconname) {
   return $.ajax({
      url: api.rooms.url,
      method: "POST",
      dataType: "json",
      timeout: api.timeout,
       data: {'name': name2,  'meta': "{" + iconname + "}"},
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
    }

    
}
         