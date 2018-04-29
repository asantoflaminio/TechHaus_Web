function trash_display(event, title){

    var trash = title.closest('div').querySelector('.trash_icon');
    trash.style.visibility = "visible";
    
}

function trash_out(event, title){
    

   var trash = title.closest('div').querySelector('.trash_icon');
    trash.style.visibility = "hidden";
    
}

function display_box(event, trash){
    

    var icon = trash.closest('div').querySelector('.icon');
    icon.style.display= "none";
    trash.visibility = "hidden";
    var box = trash.closest('a').querySelector('.box');
    box.style.display= "block";
    
}