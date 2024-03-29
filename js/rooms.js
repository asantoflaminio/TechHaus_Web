
function onLoad(){
     
    //para que ande el popover
    $("[data-toggle=popover]").popover();
  
    var myNode = document.getElementById("icons");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    api.rooms.getRooms().done(function(data) {
        $.each(data, function(i, item){
        
        var roomname = item.name.replace("\"","")//JSON.stringify(item.name.replace("\"",""));
        var roomtype = item.meta.replace("{","").replace("}","").split(',')[0]; //tomo el primer elemento de meta
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
       // a_elem.setAttribute("href", "kitchen.html"); //despues va a cambiar
        //a_elem.setAttribute("onclick", "passId(event, this)");
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
        }else if(roomtype == "dining room"){
            img1.setAttribute("src", "Iconos/diningroom.png");                   
        }else if(roomtype == "living room"){
            img1.setAttribute("src", "Iconos/living.png");
        }else if(roomtype == "office"){
            img1.setAttribute("src", "Iconos/office.png");
        }else if(roomtype == "tv room"){
            img1.setAttribute("src", "Iconos/tv_room.png");
        }else{
            img1.setAttribute("src", "Iconos/other.png");     
        }
        img1.setAttribute("alt", roomname);
        img1.setAttribute("class", "icon");
        img1.setAttribute("onclick", "passId(event, this)");
        img2.setAttribute("src", "Iconos/tacho.png");
        img2.setAttribute("alt", "Trash");
        img2.setAttribute("class", "trash_icon");
        img2.setAttribute("onclick", "display_box(event,this);");
        img2.setAttribute("data-toggle", "modal");
        img2.setAttribute("data-target", "#delete_popup");
        fig_cap.innerHTML = roomname;
        
        div1.appendChild(img1);
        div1.appendChild(img2);
        a_elem.appendChild(div1);
        fig.appendChild(a_elem);
        fig.appendChild(fig_cap);
        icons.appendChild(fig);
        
       // console.log(item.meta);
        });
        
        
        //AGREGA EL UNGROUPED
        api.devices.getAllDevices().done(function(data){
            var hayungrouped =0;
            $.each(data, function(i, item){
                if(item.meta.replace("{","").replace("}","").split(',')[0] == 'Ungrouped'){
                    
                    hayungrouped = 1;
                }
            });
            if(hayungrouped == 1){
                var roomname = "Ungrouped"//JSON.stringify(item.name.replace("\"",""));
                var roomtype = "Ungrouped"; //tomo el primer elemento de meta
                var icons = document.getElementById("icons");
                var fig = document.createElement("figure");
                var a_elem = document.createElement("a"); 
                var div1 = document.createElement("div");
                var img1 = document.createElement("img");  
                var fig_cap = document.createElement("figcaption");


               // a_elem.setAttribute("href", "kitchen.html"); //despues va a cambiar
                //a_elem.setAttribute("onclick", "passId(event, this)");
                img1.setAttribute("src", "Iconos/ungrouped2.png"); 
                img1.setAttribute("alt", roomname);
                img1.setAttribute("class", "icon");
                img1.setAttribute("onclick", "passUngrouped(event, this)");
                fig_cap.innerHTML = roomname;

                div1.appendChild(img1);
                a_elem.appendChild(div1);
                fig.appendChild(a_elem);
                fig.appendChild(fig_cap);
                icons.appendChild(fig);
            }
        }) ;
        

        //var rooms = JSON.stringify(data[0]);
       // console.log(rooms);
       // $("#title").text(rooms); // <<< sets the DOM element <<<
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log("Request failed: jqXHR.status=" + jqXHR.status + ", textStatus=" + textStatus + ", errorThrown=" + errorThrown);
    });
}

$(document).ready(function() {
    onLoad();
    
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
        var no = 0;
        console.log(no);
        api.rooms.getRooms().done(function(data){
            $.each(data, function(i, item){
                if(item.name == roomname){
                    no = 1;
                }
            });
        if(roomname == "" || roomname.length < 3){
            document.getElementById("name-tag").innerHTML = "Name is required";
            document.getElementById("name-tag").style.color = "#ff0000";
            $('#add_room_popup').modal('show');
        }
        else if(no == 1){
            document.getElementById("name-tag").innerHTML = "Name already in use";
            document.getElementById("name-tag").style.color = "#ff0000";
            $('#add_room_popup').modal('show');
        }else{
            var roomtype = $('#room_input').val().toLowerCase();//tomo el primer elemento de meta
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
            //a_elem.setAttribute("href", "kitchen.html"); //despues va a cambiar
           // a_elem.setAttribute("onclick", "passId(event, this)");
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
            }else if(roomtype == "dining room"){
                img1.setAttribute("src", "Iconos/diningroom.png");                   
            }else if(roomtype == "living room"){
                img1.setAttribute("src", "Iconos/living.png");
            }else if(roomtype == "office"){
                img1.setAttribute("src", "Iconos/office.png");
            }else if(roomtype == "tv room"){
                img1.setAttribute("src", "Iconos/tv_room.png");
            }else{
                img1.setAttribute("src", "Iconos/other.png");     
            }
            img1.setAttribute("alt", roomname);
            img1.setAttribute("class", "icon");
            img1.setAttribute("onclick", "passId(event, this)");
            img2.setAttribute("src", "Iconos/tacho.png");
            img2.setAttribute("alt", "Trash");
            img2.setAttribute("class", "trash_icon");
            img2.setAttribute("onclick", "display_box(event,this);");
            img2.setAttribute("data-toggle", "modal");
            img2.setAttribute("data-target", "#delete_popup");
            fig_cap.innerHTML = roomname;

            div1.appendChild(img1);
            div1.appendChild(img2);
            a_elem.appendChild(div1);
            fig.appendChild(a_elem);
            fig.appendChild(fig_cap);
            icons.appendChild(fig);

            api.rooms.postRoom(roomname,roomtype).done(function(data) {

                                                               console.log("ROOM ADDED");
                                                                $('#add_room_popup').modal('hide');
                                                                document.getElementById("name-tag").innerHTML = "Name*";
                                                                document.getElementById("room-tag").innerHTML = "Type*";
                                                                document.getElementById("name_input").value = "";
                                                                document.getElementById("name-tag").style.color = "#000000";
                                                                document.getElementById("room-tag").style.color = "#000000";

                                                           });
            }  
            });
        

}

function cancel_add(event, sth) {
    document.getElementById("name-tag").innerHTML = "Name*";
    document.getElementById("room-tag").innerHTML = "Type*";
    document.getElementById("name_input").value = "";
    document.getElementById("name-tag").style.color = "#000000";
    document.getElementById("room-tag").style.color = "#000000";
}

function display_box(event, tacho){
    var roomname = tacho.closest('div').parentNode.parentNode.querySelector('figcaption').innerHTML;
    var roomid = "";
    window.localStorage.clear();
    window.localStorage.setItem("roomname", roomname);
    api.rooms.getRooms().done(function(data){
        $.each(data, function(i, item){
            if(item.name == roomname){
                roomid = item.id;
                document.getElementById("msg-tag").innerHTML = "You are about to delete room \'"+roomname+ "\' and all its associated devices"
                window.localStorage.setItem("room_id2", roomid);
            }
        });
    });
    

    
}

function delete_room(event, confirm){
    var roomid = window.localStorage.getItem("room_id2");
    var roomname = window.localStorage.getItem("roomname");
    api.rooms.getDevicesForRoom(roomid).done(function(data){
        $.each(data, function(i, item){
            api.devices.deleteFromRoom(item.id).done(function(data){
                api.devices.deleteDevice(item.id).done(function(data){
                                                       
                                                       });
            });
            });
            api.rooms.deleteRoom(roomid).done(function(data){
                 onLoad();
            });
           
            
        });
    
       
    
    
    
}

function passUngrouped(event, aelem){
                
     window.localStorage.clear();
     window.localStorage.setItem("room_id", "Ungrouped");
     window.location.href = 'room_list.html';
                
        
}

function passId(event, aelem){

    var roomname = aelem.closest("figure").querySelector("figcaption").innerHTML;
  
     api.rooms.getRooms().done(function(data) {
        $.each(data, function(i, item){
            if(item.name == roomname){
                var room_id = item.id;
                
                window.localStorage.clear();
                window.localStorage.setItem("room_id", room_id);
                window.location.href = 'room_list.html';
                
            }
    
        });
     });
}
         
