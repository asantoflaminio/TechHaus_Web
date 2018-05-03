function trash_display(event, title){

    var trash = title.closest('div').querySelector('.trash_icon');
    trash.style.visibility = "visible";
    
}

function trash_out(event, title){
    

   var trash = title.closest('div').querySelector('.trash_icon');
    trash.style.visibility = "hidden";
    
}