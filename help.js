function showGettingStarted() {
    // Declare variables
    var logo, gs, dv, rm, rt;
    var curr = document.getElementsByClassName("current")[0];
    if(curr === undefined);else{curr.removeAttribute("class", "current");}

    
    logo = document.getElementById("logogrande");
    logo.style.display = "none";
    
    rm = document.getElementById("Rooms");
    rm.style.display = "none";
    
    dv = document.getElementById("Devices");
    dv.style.display = "none";
    
    rt = document.getElementById("Routines");
    rt.style.display = "none";
    
    gs = document.getElementById("gstarted");
    gs.style.display = "block";
    document.getElementById("gs").setAttribute("class", "current");
    
}

function showRooms() {
    // Declare variables
    var logo, gs, dv, rm, rt; 
    var curr = document.getElementsByClassName("current")[0];
    if(curr === undefined);else{curr.removeAttribute("class", "current");}

    logo = document.getElementById("logogrande");
    logo.style.display = "none";
    
    rm = document.getElementById("Rooms");
    rm.style.display = "block";
    document.getElementById("rm").setAttribute("class", "current");
   
    dv = document.getElementById("Devices");
    dv.style.display = "none";

    gs = document.getElementById("gstarted");
    gs.style.display = "none";
   
    rt = document.getElementById("Routines");
    rt.style.display = "none";
    
}


function showDevices() {
    // Declare variables
    var logo, gs, dv, rm, rt; 
   var curr = document.getElementsByClassName("current")[0];
    if(curr === undefined);else{curr.removeAttribute("class", "current");}

    logo = document.getElementById("logogrande");
    logo.style.display = "none";
    
    rm = document.getElementById("Rooms");
    rm.style.display = "none";
    
    dv = document.getElementById("Devices");
    dv.style.display = "block";
    document.getElementById("dv").setAttribute("class", "current");
    
    gs = document.getElementById("gstarted");
    gs.style.display = "none";
    
    rt = document.getElementById("Routines");
    rt.style.display = "none";
    
}

function showRoutines() {
    // Declare variables
    var logo, gs, dv, rm, rt; 
    var curr = document.getElementsByClassName("current")[0];
    if(curr === undefined);else{curr.removeAttribute("class", "current");}

    logo = document.getElementById("logogrande");
    logo.style.display = "none";
    
    rm = document.getElementById("Rooms");
    rm.style.display = "none";
    
    dv = document.getElementById("Devices");
    dv.style.display = "none";
   
    gs = document.getElementById("gstarted");
    gs.style.display = "none";

    rt = document.getElementById("Routines");
    rt.style.display = "block";
    document.getElementById("rt").setAttribute("class", "current");
}

