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

$(document).ready(function() {
    api.rooms.getRooms().done(function(data) {
        $.each(data, function(i, item){
        
        var roomname = item.name.replace("\"","")//JSON.stringify(item.name.replace("\"",""));
        console.log(roomname);
        var roomtype = item.meta.replace("{","").replace("}","").split(',')[0]; //tomo el primer elemento de meta
        console.log(roomtype);
        var icons = document.getElementById("icons");
        var fig = document.createElement("figure");
        var a_elem = document.createElement("a"); 
        var div1 = document.createElement("div");
        var img1 = document.createElement("img");
        var img2 = document.createElement("img");   
        var fig_cap = document.createElement("figcaption");
        
        div1.setAttribute("onmouseover", "trash_display(event,this);");
        div1.setAttribute("onmouseout", "trash_out(event,this);");
        div1.setAttribute("class", "roomandtrash");     
        a_elem.setAttribute("href", "kitchen.html"); //despues va a cambiar
        if(roomtype == "bathroom"){
            img1.setAttribute("src", "Iconos/bathroom2.png"); 
        }else if(roomtype == "garage"){
            img1.setAttribute("src", "Iconos/garage2.png"); 
        }else if(roomtype == "kitchen"){
             img1.setAttribute("src", "Iconos/kitchen1.png");      
        }else if(roomtype == "garden"){
            img1.setAttribute("src", "Iconos/jardin4.png");   
        }else if(roomtype == "laundry"){
            img1.setAttribute("src", "Iconos/laundry2.png");      
        }else if(roomtype == "bedroom"){
            img1.setAttribute("src", "Iconos/Rooms6.png");       
        }else{
            img1.setAttribute("src", "Iconos/marta.png");     
        }
        img1.setAttribute("alt", roomname);
        img1.setAttribute("class", "icon");
        img2.setAttribute("src", "Iconos/tacho.png");
        img2.setAttribute("alt", "Trash");
        img2.setAttribute("class", "trash_icon");
        img2.setAttribute("onclick", "display_box(event,this);");
        fig_cap.innerHTML = roomname;
        
        div1.appendChild(img1);
        div1.appendChild(img2);
        a_elem.appendChild(div1);
        fig.appendChild(a_elem);
        fig.appendChild(fig_cap);
        icons.appendChild(fig);
        
       // console.log(item.meta);
        });

        //var rooms = JSON.stringify(data[0]);
       // console.log(rooms);
       // $("#title").text(rooms); // <<< sets the DOM element <<<
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log("Request failed: jqXHR.status=" + jqXHR.status + ", textStatus=" + textStatus + ", errorThrown=" + errorThrown);
    });
});

function trash_display(event, title){

    var trash = title.closest('div').querySelector('.trash_icon');
    trash.style.visibility = "visible";
    
}

function trash_out(event, title){
    

   var trash = title.closest('div').querySelector('.trash_icon');
    trash.style.visibility = "hidden";
    
}

function add_room(event, name) {
        var roomname = $('#name_input').val();//JSON.stringify(item.name.replace("\"",""));
        console.log(roomname);
        var roomtype = $('#room_input').val().toLowerCase();//tomo el primer elemento de meta
        console.log(roomtype);
        var icons = document.getElementById("icons");
        var fig = document.createElement("figure");
        var a_elem = document.createElement("a"); 
        var div1 = document.createElement("div");
        var img1 = document.createElement("img");
        var img2 = document.createElement("img");   
        var fig_cap = document.createElement("figcaption");
        
        div1.setAttribute("onmouseover", "trash_display(event,this);");
        div1.setAttribute("onmouseout", "trash_out(event,this);");
        div1.setAttribute("class", "roomandtrash");     
        a_elem.setAttribute("href", "kitchen.html"); //despues va a cambiar
        if(roomtype == "bathroom"){
            img1.setAttribute("src", "Iconos/bathroom2.png"); 
        }else if(roomtype == "garage"){
            img1.setAttribute("src", "Iconos/garage2.png"); 
        }else if(roomtype == "kitchen"){
             img1.setAttribute("src", "Iconos/kitchen1.png");      
        }else if(roomtype == "garden"){
            img1.setAttribute("src", "Iconos/jardin4.png");   
        }else if(roomtype == "laundry"){
            img1.setAttribute("src", "Iconos/laundry2.png");      
        }else if(roomtype == "bedroom"){
            img1.setAttribute("src", "Iconos/Rooms6.png");       
        }else{
            img1.setAttribute("src", "Iconos/marta.png");     
        }
        img1.setAttribute("alt", roomname);
        img1.setAttribute("class", "icon");
        img2.setAttribute("src", "Iconos/tacho.png");
        img2.setAttribute("alt", "Trash");
        img2.setAttribute("class", "trash_icon");
        img2.setAttribute("onclick", "display_box(event,this);");
        fig_cap.innerHTML = roomname;
        
        div1.appendChild(img1);
        div1.appendChild(img2);
        a_elem.appendChild(div1);
        fig.appendChild(a_elem);
        fig.appendChild(fig_cap);
        icons.appendChild(fig);
    
        api.rooms.postRoom(roomname,roomtype).done(function(data) {
                                                   
                                                           console.log("ROOM ADDED");
                                                       });

}