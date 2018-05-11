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
    return api.baseUrl + "rooms/";
  }

  static getRooms() {
   return $.ajax({
      url: api.room.url,
      method: "GET",
      dataType: "json",
      timeout: api.timeout
       .then(function(data) {
           return data.rooms.map(item => item.name);
        })
       
    }); 
  }
}