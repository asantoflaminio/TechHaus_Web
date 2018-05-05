function showFavorites() {
    // Declare variables
    var logo,  favs, gs, dl, ad;
    logo = document.getElementById("logogrande");
    logo.style.display = "none";
    gs = document.getElementById("gstarted");
    gs.style.display = "none";
    dl = document.getElementById("Delete");
    dl.style.display = "none";
    ad = document.getElementById("Adding");
    ad.style.display = "none";
    favs = document.getElementById("Favs");
    favs.style.display = "block";
}

function showGettingStarted() {
    // Declare variables
    var logo,  gs, favs, dl, ad;
    logo = document.getElementById("logogrande");
    logo.style.display = "none";
    favs = document.getElementById("Favs");
    favs.style.display = "none";
    dl = document.getElementById("Delete");
    dl.style.display = "none";
    ad = document.getElementById("Adding");
    ad.style.display = "none";
    gs = document.getElementById("gstarted");
    gs.style.display = "block";
    
}

function showDeleting() {
    // Declare variables
    var logo,  gs, favs, dl, ad;
    logo = document.getElementById("logogrande");
    logo.style.display = "none";
    favs = document.getElementById("Favs");
    favs.style.display = "none";
    gs = document.getElementById("gstarted");
    gs.style.display = "none";
    ad = document.getElementById("Adding");
    ad.style.display = "none";
    dl = document.getElementById("Delete");
    dl.style.display = "block";
}

function showAdding() {
    // Declare variables
    var logo,  gs, favs, dl, ad;
    logo = document.getElementById("logogrande");
    logo.style.display = "none";
    favs = document.getElementById("Favs");
    favs.style.display = "none";
    gs = document.getElementById("gstarted");
    gs.style.display = "none";
    dl = document.getElementById("Delete");
    dl.style.display = "none";
    ad = document.getElementById("Adding");
    ad.style.display = "block";
}