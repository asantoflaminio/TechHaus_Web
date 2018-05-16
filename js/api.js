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
    return api.baseUrl + "routines/";
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

api.rooms = class {
  static get url() {
    return api.baseUrl + "rooms/";
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
    
    static updateRoomName(id, name, meta) {
   return $.ajax({
      url: api.rooms.url + id,
      method: "PUT",
      dataType: "json",
      timeout: api.timeout,
       data: {'name': name, 'meta': meta}
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
    
    static postRoom(name2, iconname) {
   return $.ajax({
      url: api.rooms.url,
      method: "POST",
      dataType: "json",
      timeout: api.timeout,
       data: {'name': name2,  'meta': "{" + iconname + "}"},
       });
       
     
  }
    
    static deleteRoom(id){
      return $.ajax({
      url: api.rooms.url +id,
      method: "DELETE",
      dataType: "json",
      timeout: api.timeout
       
       });
  }
    
    static getDevicesForRoom(roomid){
        return $.ajax({
      url: api.rooms.url + roomid + "/devices",
      method: "GET",
      dataType: "json",
      timeout: api.timeout,
       }).then(function(data) {
           return data.devices; 
        });
    }
}

api.devicetypes = class {
  static get url() {
    return api.baseUrl + "devicetypes/";
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
    return api.baseUrl + "devices/";
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
    
    static setMode(id, param) {
   return $.ajax({
      url: api.devices.url + id + "/setMode",
      method: "PUT",
      dataType: "json",
     contentType: "application/json; charset=utf-8",
      timeout: api.timeout,
      data: "["+param+"]",
   }).then(function(data) {
           return data; 
        });  
  }
    
    static turnOff(id) {
   return $.ajax({
      url: api.devices.url + id + "/turnOff",
      method: "PUT",
      dataType: "json",
     contentType: "application/json; charset=utf-8",
      timeout: api.timeout,
      
   });
  }
    
    static turnOn(id) {
   return $.ajax({
      url: api.devices.url + id + "/turnOn",
      method: "PUT",
      dataType: "json",
     contentType: "application/json; charset=utf-8",
      timeout: api.timeout,
      
   });
  }
    
    static setTemp(id, param) {
   return $.ajax({
      url: api.devices.url + id + "/setTemperature",
      method: "PUT",
      dataType: "json",
       contentType: "application/json; charset=utf-8",
      timeout: api.timeout,
      data: "["+param+"]",
   });
  }
    
    static setBrightness(id, param) {
   return $.ajax({
      url: api.devices.url + id + "/setBrightness",
      method: "PUT",
      dataType: "json",
       contentType: "application/json; charset=utf-8",
      timeout: api.timeout,
      data: "["+param+"]",
   });
  }
    
    static setFTemp(id, param) {
   return $.ajax({
      url: api.devices.url + id + "/setFreezerTemperature",
      method: "PUT",
      dataType: "json",
       contentType: "application/json; charset=utf-8",
      timeout: api.timeout,
      data: "["+param+"]",
   });
  }
    
    static setHeat(id, param) {
   return $.ajax({
      url: api.devices.url + id + "/setHeat",
      method: "PUT",
      dataType: "json",
       contentType: "application/json; charset=utf-8",
      timeout: api.timeout,
      data: "["+param+"]",
   });
  }
    
    static setConvection(id, param) {
   return $.ajax({
      url: api.devices.url + id + "/setConvection",
      method: "PUT",
      dataType: "json",
       contentType: "application/json; charset=utf-8",
      timeout: api.timeout,
      data: "["+param+"]",
   });
  }
    
    static setGrill(id, param) {
   return $.ajax({
      url: api.devices.url + id + "/setGrill",
      method: "PUT",
      dataType: "json",
       contentType: "application/json; charset=utf-8",
      timeout: api.timeout,
      data: "["+param+"]",
   });
  }
    
    static setFan(id, param) {
   return $.ajax({
      url: api.devices.url + id + "/setFanSpeed",
      method: "PUT",
      dataType: "json",
       contentType: "application/json; charset=utf-8",
      timeout: api.timeout,
      data: "["+param+"]",
   });
  }
    
    static setVertical(id, param) {
   return $.ajax({
      url: api.devices.url + id + "/setVerticalSwing",
      method: "PUT",
      dataType: "json",
       contentType: "application/json; charset=utf-8",
      timeout: api.timeout,
      data: "["+param+"]",
   });
  }
    
    static setHorizontal(id, param) {
   return $.ajax({
      url: api.devices.url + id + "/setHorizontalSwing",
      method: "PUT",
      dataType: "json",
       contentType: "application/json; charset=utf-8",
      timeout: api.timeout,
      data: "["+param+"]",
   });
  }
    
    static open(id) {
   return $.ajax({
      url: api.devices.url + id + "/open",
      method: "PUT",
      dataType: "json",
      timeout: api.timeout,
   });
  }
    
    static close(id) {
   return $.ajax({
      url: api.devices.url + id + "/close",
      method: "PUT",
      dataType: "json",
      timeout: api.timeout,
   });
  }
    
    static lock(id) {
   return $.ajax({
      url: api.devices.url + id + "/lock",
      method: "PUT",
      dataType: "json",
      timeout: api.timeout,
   });
  }
    
    static unlock(id) {
   return $.ajax({
      url: api.devices.url + id + "/unlock",
      method: "PUT",
      dataType: "json",
      timeout: api.timeout,
   });
  }
    
    static upBlind(id) {
   return $.ajax({
      url: api.devices.url + id + "/up",
      method: "PUT",
      dataType: "json",
      timeout: api.timeout,
   });
  }
    
    static downBlind(id) {
   return $.ajax({
      url: api.devices.url + id + "/down",
      method: "PUT",
      dataType: "json",
      timeout: api.timeout,
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
      url: api.devicetypes.url,
      method: "GET",
      dataType: "json",
      timeout: api.timeout,
       }).then(function(data) {
           return data.devices;
        });  
  } 
    
    static getDevicesForType(id) {
   return $.ajax({
      url: api.devices.url + "devicetypes/" + id ,
      method: "GET",
      dataType: "json",
      timeout: api.timeout,
       }).then(function(data) {
           return data.devices;
        });  
  }
    
    static getDeviceActions(id) {
   return $.ajax({
      url: api.devicetypes.url + id ,
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
    static updateName(id, typeid, name, meta) {
   return $.ajax({
      url: api.devices.url + id,
      method: "PUT",
      dataType: "json",
      timeout: api.timeout,
       data: {'typeId': typeid, 'name': name, 'meta': meta}
       });     
  }
    
    static updateDevice(id, typeid, name, room, favState) {
   return $.ajax({
      url: api.devices.url + id,
      method: "PUT",
      dataType: "json",
      timeout: api.timeout,
       data: {'typeId': typeid, 'name': name, 'meta': "{" + room + favState + "}"},
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
    
    static deleteFromRoom(deviceId) {
   return $.ajax({
      url: api.devices.url + deviceId + "/rooms",
      method: "DELETE",
      dataType: "json",
      timeout: api.timeout,
       })
       
     
  }
}