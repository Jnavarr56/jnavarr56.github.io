

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



class trainerJorge {
    constructor(pokemonName) {
        this.pokemonName = pokemonName;
    }
    retrievePokemon() {
        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/" + this.pokemonName
        }).done(
            function(result) {
                
                console.log(result);

                var pokeAbilities = [];

                var pokemon = result.species.name;               
                var pokeImage = result.sprites.front_default;
                var pokeType = result.types[0].type.name;
                var pokeDefense = result.stats[3].base_stat;
                var pokeAttack = result.stats[4].base_stat;
                var pokeHP = result.stats[5].base_stat;

                result.abilities.forEach(element => {
                    pokeAbilities.push(element.ability.name);
                    
                });
                
                $("#screen").css("background", `rgba(0,0,0,.2 ) url(${pokeImage}) no-repeat center`);
                $("#screen").css("background-size", "250px 250px");
                


                $("#hpbar").css("width", (pokeHP/260)*100 + "%");
                $("#hpbarText").text(pokeHP);
                if (pokeHP < (260*.33)) {
                    $("#hpbar").css("background-color", "red");
                }
                else if (pokeHP >= (260*.33) && pokeHP < (260*.66)) {
                    $("#hpbar").css("background-color", "orange");
                }
                else {
                    $("#hpbar").css("background-color", "green");
                }


                $("#abar").css("width", (pokeAttack/190)*100 + "%");
                $("#abarText").text(pokeAttack);
                if (pokeAttack < (190*.33)) {
                    $("#abar").css("background-color", "red");
                }
                else if (pokeAttack >= (190*.33) && pokeAttack < (190*.66)) {
                    $("#abar").css("background-color", "orange");
                }
                else {
                    $("#abar").css("background-color", "green");
                }


                $("#dbar").css("width", (pokeDefense/230)*100 + "%");
                
                $("#dbarText").text(pokeDefense);
                if (pokeDefense < (230*.33)) {
                    $("#dbar").css("background-color", "red");
                }
                else if (pokeDefense >= (230*.33) && pokeDefense < (230*.66)) {
                    $("#dbar").css("background-color", "orange");
                }
                else {
                    $("#dbar").css("background-color", "green");
                }



                $("#abilities-header").text(`${pokemon}'s  Abilities [${pokeAbilities.length}]:`);
                $("#abilities-holder").html("");
                pokeAbilities.forEach(element => {
                    $("#abilities-holder").html($("#abilities-holder").html() + `<p>${element}</p>`);
                    
                });

                console.log(pokeAbilities);



                katherine.say(pokemon + " is a " + pokeType + " type pokemon.", {
                    onStart:function(){
                        $(".soundwave").addClass("soundwaveWaving");
                    },
                    onEnd:function() {
                        $(".soundwave").removeClass("soundwaveWaving");
                    }
                });
            }
        ).fail(function(result){
            alert("Search failed. Not a known Pokemon, or servers experiencing difficulties.");
        });
    }

}



$("#searchform").submit(function(event){
    event.preventDefault();
    var pokemonSearch = new trainerJorge($("#inputsearch").val().toLowerCase());
    pokemonSearch.retrievePokemon();
});







