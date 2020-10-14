document.addEventListener("DOMContentLoaded", function(){
    //Do this when DOM is loaded

    //Set event listeners/handlers for buttons
    document.getElementById('home').onclick = dohome;
    document.getElementById('weather').onclick = doweather;
    document.getElementById('map').onclick = domap;
    document.getElementById('currency').onclick = docurrency;
    
    dohome();
});
