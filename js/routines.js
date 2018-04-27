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
