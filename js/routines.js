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

function play(name, event){
    event.stopPropagation();
    name = name.nextSibling.nextSibling.innerHTML;
    var notice = document.getElementsByClassName('notice')[0];
    notice.style.display = 'block';
    document.getElementById('name').innerHTML = "Routine \"" + name + "\" was played";

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

                $(this).dialog('close');

                }
            }
        ]
    })
})

});
