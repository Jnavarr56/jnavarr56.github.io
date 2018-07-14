const katherine = new Artyom();
katherine.ArtyomVoicesIdentifiers["en-GB"] = ["Google UK English Female", "Google UK English Male", "en-GB", "en_GB"];


$(document).ready(function(){
    $("#inputsearch").focus();
    setTimeout(function() {
        $("body").css("background", " linear-gradient(152deg, rgba(2,0,36,1) 0%, rgba(0,53,64,1) 39%, rgba(121,9,9,1) 81%)");
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
    ).fail(function(result){
        alert("This is not a known Pokemon.");
    });
   



});



