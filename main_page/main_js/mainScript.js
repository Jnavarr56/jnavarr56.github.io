const katherine = new Artyom();
katherine.ArtyomVoicesIdentifiers["en-GB"] = ["Google UK English Female", "Google UK English Male", "en-GB", "en_GB"];


let getPokeBio = (pokemonname) => {
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon-species/" + pokemonname
    }).done(function(result){
        console.log(result);

        var factHolder = [];

        result.flavor_text_entries.forEach(element=>{
            if (element.language.name === "en") {
                if (factHolder.includes(element.flavor_text) === false) {
                    factHolder.push(element.flavor_text);
                }
            }
        });

        factHolder.forEach(element => {
            katherine.say(
                element,
                {
                onStart:function(){
                    $(".soundwave").addClass("soundwaveWaving");
                },
                onEnd:function() {
                    $(".soundwave").removeClass("soundwaveWaving");
                }
                });

        });


    }).fail(function(result) {
        console.log("not working");
    });
}





$(document).ready(function(){
    katherine.shutUp();
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

let writeWeight;
let writeHeight;

let writingHeight = (pokeHeight) => {
    var x = 0;
    writeHeight = setInterval(()=>{
    $("#dimensions-display1").text(`HEIGHT: ${x}`);
    x++;
    if (x == pokeHeight + 1) {
        clearInterval(writeHeight);     
    }
}, 10);
}
let writingWeight = (pokeWeight) => {
    var y = 0;
    writeWeight = setInterval(()=>{
    $("#dimensions-display2").text(`WEIGHT: ${y}`);
    y++;
    if (y == pokeWeight + 1) {
        clearInterval(writeWeight);
        
    }
}, 10);
}

let stopWriting = () => {
    clearInterval(writeHeight);
    clearInterval(writeWeight);
}




class trainerJorge {
    constructor(pokemonName) {
        this.pokemonName = pokemonName;
        this.data = {};
  
        
    }
    retrievePokemon() {
        var self = this;
        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/" + this.pokemonName
        }).done(
            function(result) {


                


                katherine.shutUp();

                stopWriting();  
                       

                $("#dimensions-display1").text("");
                $("#dimensions-display2").text("");

                

                var pokeAbilities = [];
                var pokeOtherStats = [];

                var pokemon = result.species.name;               
                var pokeImage = result.sprites.front_default;
                var pokeType = result.types[0].type.name;
                var pokeWeight = result.weight;
                var pokeHeight = result.height;                
                var pokeDefense = result.stats[3].base_stat;                
                var pokeAttack = result.stats[4].base_stat;                
                var pokeHP = result.stats[5].base_stat;

                getPokeBio(pokemon);
                

                self.data["name"] = self.pokemonName;
                self.data["height"] = pokeHeight;
                self.data["weight"] = pokeWeight;
                self.data["hp"] = pokeHP;
                self.data["attack"] = pokeAttack;
                self.data["defense"] = pokeDefense;
                
                

                
                

                result.abilities.forEach(element => {
                    pokeAbilities.push(element.ability.name);
                });
                self.data["abilities"] = pokeAbilities;

                for (var i = 0; i < 3; i++) {
                    pokeOtherStats.push(`${result.stats[i].stat.name}: ${result.stats[i].base_stat}`);
                }
                
                self.data["otherStats"] = pokeOtherStats;
                
                $("#screen").css("background", `rgba(0,0,0,.2 ) url(${pokeImage}) no-repeat center`);
                $("#screen").css("background-size", "250px 250px");
                


                $("#hpMaxer").css("width", (pokeHP/260)*100 + "%");
                $("#hpbarText").text(pokeHP);
                if (pokeHP < (260*.33)) {
                    $("#hpbar").css("background-color", "red");
                    $("#hpbar").addClass("loading-stats");
                }
                else if (pokeHP >= (260*.33) && pokeHP < (260*.66)) {
                    $("#hpbar").css("background-color", "orange");
                    $("#hpbar").addClass("loading-stats");
                }
                else {
                    $("#hpbar").css("background-color", "green");
                    $("#hpbar").addClass("loading-stats");
                }


                $("#aMaxer").css("width", (pokeAttack/190)*100 + "%");
                $("#abarText").text(pokeAttack);
                if (pokeAttack < (190*.33)) {
                    $("#abar").css("background-color", "red");
                    $("#abar").addClass("loading-stats");
                    
                }
                else if (pokeAttack >= (190*.33) && pokeAttack < (190*.66)) {
                    $("#abar").css("background-color", "orange");
                    $("#abar").addClass("loading-stats");
                }
                else {
                    $("#abar").css("background-color", "green");
                    $("#abar").addClass("loading-stats");
                }



                $("#dMaxer").css("width", (pokeDefense/230)*100 + "%"); 
                $("#dbarText").text(pokeDefense);
                if (pokeDefense < (230*.33)) {
                    $("#dbar").css("background-color", "red");
                    $("#dbar").addClass("loading-stats");
                    
                }
                else if (pokeDefense >= (230*.33) && pokeDefense < (230*.66)) {
                    $("#dbar").css("background-color", "orange");
                    $("#dbar").addClass("loading-stats");
                }
                else {
                    $("#dbar").css("background-color", "green");
                    $("#dbar").addClass("loading-stats");
                }


                setTimeout(()=>{
                    $("#abar").removeClass("loading-stats");
                    $("#hpbar").removeClass("loading-stats");
                    $("#dbar").removeClass("loading-stats");
                },2500);

                
                
                $("#abilities-header").text(`${pokemon}'s Main Abilities [${pokeAbilities.length}]:`);
                $("#abilities-holder").html("");
                pokeAbilities.forEach(element => {
                    $("#abilities-holder").html($("#abilities-holder").html() + `<p>${element}</p>`);
                });


                $("#other-stats-header").text(`${pokemon}'s Other Stats [${pokeOtherStats.length}]:`);
                $("#other-stats-holder").html("");
                pokeOtherStats.forEach(element => {
                    $("#other-stats-holder").html($("#other-stats-holder").html() + `<p>${element}</p>`);
                });
                
                writingHeight(pokeHeight);
                writingWeight(pokeWeight);
            


                
              
                katherine.say(
                    
                    pokemon + " is a " + pokeType + " type pokemon. With a height of " + 
                    pokeHeight + " and a weight of " + pokeWeight + 
                    ", " + pokemon + " has a speed of " + pokeOtherStats[0].match(/\d+/g)   
                    
                
                , {
                    onStart:function(){
                        $(".soundwave").addClass("soundwaveWaving");
                    },
                    onEnd:function() {
                        $(".soundwave").removeClass("soundwaveWaving");
                    }
                });

                

            }
        ).fail(function(result){
            alert("Search failed. Not a known Pokemon, or servers are experiencing difficulties.");
        });
    }
}


let pokemonSearch;

$("#searchform").submit(function(event){
    event.preventDefault();

    pokemonSearch = new trainerJorge($("#inputsearch").val().toLowerCase());
    pokemonSearch.retrievePokemon();
    console.log(pokemonSearch);
    



    







});




$("#export").click(function(event){
   event.preventDefault();
   var data = [[],[]];
   for (x in pokemonSearch.data) {
       data[0].push(x);
   }
   var a = 0;
   for (y in pokemonSearch.data) {
        data[1].push(pokemonSearch.data[y]);
        a++;
   }


   var dataExport = "";
   
   for (var x = 0; x < data.length; x ++) {
       if (x === 1) {
           console.log(data[x][6] = String(data[x][6]).replace(/\,/g, " "));
           console.log(data[x][7] = String(data[x][7]).replace(/\,/g, " "));
           
       }
   }

   data.forEach(element=>{
       dataExport += element + "\n";
   });


   
   console.log(dataExport);

   

   var hiddenElement = document.createElement('a');
   hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(dataExport);
   hiddenElement.target = '_blank';
   hiddenElement.download = `${pokemonSearch.pokemonName}.csv`;
   hiddenElement.click();
   


   

});







