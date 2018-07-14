const katherine = new Artyom();
katherine.ArtyomVoicesIdentifiers["en-GB"] = ["Google UK English Female", "Google UK English Male", "en-GB", "en_GB"];



$(document).ready(function(){
    setTimeout(function() {
        $("body").css("background", "linear-gradient(to top left,#190a05, #600000 35%, #190a05)");
    }, 500);
    navigator.geolocation.getCurrentPosition(
        function sucess(pos) {
           var lat = pos.coords.latitude;
           var long = pos.coords.longitude;
           dateObj = new Date();
           $("#userstats").text(`USER LOCATION {lat: ${lat} long: ${long}} DATE ACCESSED {${dateObj}}`);
           $("#userData").addClass("userDataLoaded");
        },
        function error(err) {
            dateObj = new Date();
            $("#userstats").text(`USER LOCATION {permission not granted} DATE ACCESSED {${dateObj}}`);
            $("#userData").addClass("userDataLoaded");
         }  
    );

});


$("#searchform").submit(function(event){
    event.preventDefault();


    

    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/" + $("#inputsearch").val().toLowerCase()
    }).done(
        function(result) {
            console.log(result);
            

            console.log(result.name + " is a " + result.types[0].type.name + "type pokemon.");
            katherine.say(result.name + " is a " + result.types[0].type.name + "type pokemon.");

        }
    );
   



});



