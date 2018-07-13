
$(document).ready(function(){
    setTimeout(function() {
        $("body").css("background", "linear-gradient(to left, #cb2d3e, #ef473a)");
    }, 500);

    navigator.geolocation.getCurrentPosition(
        function(position) {
           var lat = position.coords.latitude;
           var long = position.coords.longitude;
           dateObj = new Date();
           $("#userstats").text(`USER LOCATION {lat: ${lat} long: ${long}} DATE ACCESSED {${dateObj}}`);

           
           
           
        } 
    );
    
    

});

