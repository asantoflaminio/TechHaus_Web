
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
    
}

api.devices = class {
  static get url() {
    return "http://127.0.0.1:8080/api/devices/";
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
}




$(document).ready(function() {
    api.routines.getRoutines().done(function(data) {
        $.each(data, function(i, item){
        
        var routine_name = item.name;//JSON.stringify(item.name.replace("\"",""));
        var routine_id = item.id;
        console.log(routine_name);
        console.log(routine_id);
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
        div.appendChild(h3);
        acc.appendChild(div);
        list.appendChild(acc);
        list.appendChild(pnl);
        
        
        
        });
       

        addPanels();

    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log("Request failed: jqXHR.status=" + jqXHR.status + ", textStatus=" + textStatus + ", errorThrown=" + errorThrown);
    });
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

//add routine

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
