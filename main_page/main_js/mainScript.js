/*-----------------------------------------------------CREATE ARTYOM.JS TEXT TO SPEECH OBJECT------------------------------------------------------------------*/
const katherine = new Artyom();
katherine.ArtyomVoicesIdentifiers["en-GB"] = ["Google UK English Female", "Google UK English Male", "en-GB", "en_GB"];
/*------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------STOP SPEAKING IF NEW PAGE OR REFRESH-------------------------------------------------------------------*/
katherine.shutUp(); 
/*------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------GLOBAL ARRAY TO HOLD POKEMON OBJECTS-------------------------------------------------------------------*/
let pokeArray = [];
/*------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------DEFINE GLOBAL TRAINER CLASS THAT TAKES POKEMON OBJECTS ARRAY AS PARAMETER-------------------------------*/
class TrainerClass {
    constructor(arrayofPokemonObjects) {
        this.array = arrayofPokemonObjects;
    }
    all() {
        return(this.array);
    }
    add(nameOfPokemonObjToAdd) {
        pokeArray.push(nameOfPokemonObjToAdd);
        this.array = pokeArray;
        return(this.array)
    }
    removePokemonObj(nameOfPokemonObjtoRemove){
        /*this.array = pokeArray;
        return(this.array);*/
        var indexedname = nameOfPokemonObjtoRemove.text().replace(" [x]", "");
        pokeArray.forEach(element=>{
            if(indexedname === element.name) {
                pokeArray.splice(pokeArray.indexOf(element), 1);
                $("#count").text(`Count: ${pokeArray.length}`);
            }
        });
        this.array = pokeArray;
    }
    get(pokemonObjToGet){
        this.array.forEach(element=>{
            if(element.name === pokemonObjToGet) {
                console.log(`${element.name.charAt(0).toUpperCase() + element.name.slice(1)} Pokemon Object Retrieved from Array in Trainer Object with 'Trainer Obj'.get('${element.name.charAt(0).toUpperCase() + element.name.slice(1)} Pokemon Obj') method:`);
                console.log(element);
            }
        });
    }
    reset() {
        pokeArray = [];
        this.array = pokeArray;
        return(this.array);
        
    }
}
let trainerObj = new TrainerClass(pokeArray);
/*------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------GLOBAL AJAX FUNCTION TO RETRIEVE AND SPEAK POKEMON FACTS-----------------------------------------------*/
let getPokeBio = (pokemonname) => {
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon-species/" + pokemonname
    }).done(function(result){
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
/*------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------ON LOAD: SET OPACITY ANIMATION, BODY COLOR, INNERTEXT GEOLOCATION -------------------------------------*/
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
/*------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------DEFINE GLOBAL FUNCTIONS THAT CREATE "COUNTING UP" EFFECT-----------------------------------------------*/
let writeWeight;
let writeHeight;
let writeHP;
let writeAtk;
let writeDef;
let writingHeight = (pokeHeight) => {
    var x = 0;
    writeHeight = setInterval(()=>{
        $("#dimensions-display1").text(`HEIGHT: ${x}`);
        x++;
        if (x == pokeHeight + 1) {
            clearInterval(writeHeight);     
        }
    }, 35);
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
let writingHP = (pokeHP) => {
    var a = 0;
    writeHP = setInterval(()=>{
        $("#hpbarText").text(`${a}`);
        a++;
        if (a == pokeHP + 1) {
            clearInterval(writeHP);
        }
    }, 25);
}
let writingAtk = (pokeAttack) => {
    var b = 0;
    writeAtk = setInterval(()=>{
        $("#abarText").text(`${b}`);
        b++;
        if (b == pokeAttack + 1) {
            clearInterval(writeAtk);
        }
    }, 25);
}
let writingDef = (pokeDefense) => {
    var c = 0;
    writeDef = setInterval(()=>{
        $("#dbarText").text(`${c}`);
        c++;
        if (c == pokeDefense + 1) {
            clearInterval(writeDef); 
        }
    }, 25);
}
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------DEFINE FUNCTION THAT TERMINATES ALL "COUNTING UP" FUNCTIONS---------------------------------------------*/
let stopWriting = () => {
    clearInterval(writeHeight);
    clearInterval(writeWeight);
    clearInterval(writeHP);
    clearInterval(writeAtk);
    clearInterval(writeDef);
}
/*------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---#################################-----DEFINE GLOBAL POKEMON CLASS THAT TAKES NAME AS PARAMETER AND PERFORMS AJAX REQUEST-----#################################----*/
class PokemonClass {
    constructor(pokemonName) {
        this.pokemonName = pokemonName;
        this.data = {};      //<-----POKEMON OBJECT [POKEMON PROPERTIES FROM API WILL GO IN HERE] (A)
    }
    /*------------------WHEN METHOD CALLED + BEFORE AJAX REQUEST IS DONE, DISPLAY "LOADING" TEXT/GIF-----*/
    retrievePokemon() {  
        stopWriting();  
        katherine.shutUp();
        $("#abarText").text("Loading...");
        $("#hpbarText").text("Loading...");
        $("#dbarText").text("Loading...");
        $("#abilities-header").text("Loading...");
        $("#other-stats-header").text("Loading...");
        $("#dimensions-display1").text("Loading...");
        $("#dimensions-display2").text("Loading...");
        $("#other-stats-holder").html("<p>Loading...</p>");
        $("#abilities-holder").html("<p>Loading...</p>");
        $("#aMaxer").css("width", "50%");
        $("#dMaxer").css("width", "50%");
        $("#hpMaxer").css("width", "50%");
        $("#abar").css("background-color", "white");
        $("#dbar").css("background-color", "white");
        $("#hpbar").css("background-color", "white");
        $("#screen").css("background", "url(http://frankievision.com/loader.gif) center no-repeat");
    /*---------------------------------------------------------------------------------------------------*/
        var self = this; //<-----ALLOWS ME TO REFERENCE SCOPE OF THE CLASS EVEN THOUGH I AM INSIDE OF THE ".done()" OF AN AJAX CALL
        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/" + this.pokemonName
        }).done(
            function(result) {
                console.log(`${self.pokemonName.charAt(0).toUpperCase() + self.pokemonName.slice(1)} API Object:`);
                console.log(result);
                katherine.shutUp(); //<-----END SPEAKING OF LAST POKEMON'S STATISTICS IF THERE WAS ONE
                $("#dimensions-display1").text(""); //<-----CLEAR ELEMENT THAT DISPLAYED LAST POKEMON'S HEIGHT IF THERE WAS ONE
                $("#dimensions-display2").text(""); //<-----CLEAR ELEMENT THAT DISPLAYED LAST POKEMON'S WEIGHT IF THERE WAS ONE

                /*---------GRAB + PROPERTIES FROM JSON OBJECT--*/
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
                var pokeID = result.id;
                /*-------------------------------------------*/

                getPokeBio(pokemon); //<-----PERFORM AJAX CALL USING NAME PROPERTY TO START SPEAKING POKEMON FACTS
                
                self.data["name"] = pokemon;        //<-----SET VALUE AS PROPERTY CALLED "NAME" IN POKEMON OBJECT (A)
                self.data["height"] = pokeHeight;   //<-----SET VALUE AS PROPERTY CALLED "HEIGHT" IN POKEMON OBJECT (A)
                self.data["weight"] = pokeWeight;   //<-----SET VALUE AS PROPERTY CALLED "WEIGHT" IN POKEMON OBJECT (A)
                self.data["hp"] = pokeHP;           //<-----SET VALUE AS PROPERTY CALLED "HP" IN POKEMON OBJECT (A)
                self.data["attack"] = pokeAttack;   //<-----SET VALUE AS PROPERTY CALLED "ATTACK" IN POKEMON OBJECT (A)
                self.data["defense"] = pokeDefense; //<-----SET VALUE AS PROPERTY CALLED "DEFENSE" IN POKEMON OBJECT (A)
                self.data["id"] = pokeID;           //<-----SET VALUE AS PROPERTY CALLED "ID" IN POKEMON OBJECT (A)

                /*-------LOOP THROUGH API OBJECT PROPERTY "ABILITIES" AND CREATE ARRAY OF STRINGS, SET ARRAY AS A PROPERTY POKEMON OBJECT-*/
                result.abilities.forEach(element => {
                    pokeAbilities.push(element.ability.name);
                });
                self.data["abilities"] = pokeAbilities;
                /*-----------------------------------------------------------------------------------------------------------------------*/

                /*-------LOOP THROUGH API OBJECT PROPERTY "STATS" [0] TO [3] AND CREATE ARRAY OF STRINGS, SET ARRAY AS A PROPERTY OF POKEMON OBJECT-*/
                for (var i = 0; i < 3; i++) {
                    pokeOtherStats.push(`${result.stats[i].stat.name}: ${result.stats[i].base_stat}`);
                }
                self.data["otherStats"] = pokeOtherStats;
                /*----------------------------------------------------------------------------------------------------------------------------------*/
                
                /*-------IF POKEMON NUMBER <= 721 THEN SET #SCREEN BACKGROUND IMAGE (POKEMON PROFILE PIC) AS GIF FROM THIS WEBSITE------------------*/
                if (pokeID <= 721) {
                    $("#screen").css("background", `rgba(0,0,0,.2 ) url(http://www.pokestadium.com/sprites/xy/${pokemon}.gif) no-repeat center`);
                    $("#screen").css("background-size", "50%");
                }
                else { //<-----ELSE SET POKEMON PROFILE PIC AS IMG FROM URL FOUND IN API OBJECT
                    $("#screen").css("background", `rgba(0,0,0,.2 ) url(${pokeImage}) no-repeat center`);
                    $("#screen").css("background-size", "250px 250px");
                }
                /*----------------------------------------------------------------------------------------------------------------------------------*/
    
                /*-------CALCULATE % OF POKEMON STAT RELATIVE TO MAXIUM POSSIBLE VALUE----------------*/
                /*-------AND SET WIDTH OF A DIV THAT REPRESENTS THAT STAT AS A CORRESPONDING % BAR----*/
                /*-------APPLY ANIMATION CSS CLASS TO GIVE EFFECT OF THAT DIV BEING FILLED GRADUALLY--*/
                /*-------SET COLOR ACCORDING TO IF 0-32.99% (RED) 33%-65.99% (ORANGE) 66%+ (GREEN)----*/
                $("#hpMaxer").css("width", (pokeHP/260)*100 + "%");
                writingHP(pokeHP); //<--START "COUNTING UP" EFFECT OF A TEXT ELEMENT INSIDE DIV WITH POKEHP VALUE
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
                writingAtk(pokeAttack); //<--START "COUNTING UP" EFFECT OF A TEXT ELEMENT INSIDE DIV WITH POKEATTACK VALUE
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
                writingDef(pokeDefense); //<--START "COUNTING UP" EFFECT OF A TEXT ELEMENT INSIDE DIV WITH POKEDEFENSE VALUE
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
                /*------------------------------------------------------------------------------------*/
                /*------------------------------------------------------------------------------------*/
                /*------------------------------------------------------------------------------------*/
                
                /*-----REMOVE ANIMATION CSS CLASS AFTER ANIMATION DURATION OVER SO THAT WE CAN REAPPLY WITH NEXT POKEMON-----------*/
                setTimeout(()=>{
                    $("#abar").removeClass("loading-stats");
                    $("#hpbar").removeClass("loading-stats");
                    $("#dbar").removeClass("loading-stats");
                },2500);
                /*----------------------------------------------------------------------------------------------------------------*/
                
                /*-----LOOP THROUGH "ABILITIES" AND "OTHERSTATS" STRING ARRAYS AND CREATE P ELEMENTS------------------------------*/
                /*-----FOR EACH ARRAY ITEM WITH THE ARRAY ITEMS AS TEXT (AND ITEMS COUNT)-----------------------------------------*/
                /*-----APPEND THESE ELEMENTS TO DIVS -----------------------------------------------------------------------------*/
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
                /*----------------------------------------------------------------------------------------------------------------*/
                /*----------------------------------------------------------------------------------------------------------------*/
                /*----------------------------------------------------------------------------------------------------------------*/
      
                /*----"COUNTING UP" EFFECT FOR HEIGHT AND WEIGHT PROPERTIES--------*/
                writingHeight(pokeHeight);
                writingWeight(pokeWeight);
                /*-----------------------------------------------------------------*/
                
                /*----MAKE ARTYOM.JS OBJECT "SPEAK" SOME OF THE POKEMON API PROPERTIES-------------------------------*/
                katherine.say(
                    pokemon + " is a " + pokeType + " type pokemon. With a height of " + 
                    pokeHeight + " and a weight of " + pokeWeight + 
                    ", " + pokemon + " has a speed of " + pokeOtherStats[0].match(/\d+/g)   
                , {
                    onStart:function(){  //<---WHEN START SPEAKING APPLY SOUNDWAVE ANIMATION CLASS TO SOUNDWAVE DIVS (SYNCS UP SPEECH WITH A "SOUNDWAVE")
                        $(".soundwave").addClass("soundwaveWaving");
                    },  
                    onEnd:function() { //<---WHEN STOP SPEAKING REMOVE SOUNDWAVE ANIMATION CLASS FRM SOUNDWAVE DIVS (SYNCS UP SPEECH WITH A "SOUNDWAVE")
                        $(".soundwave").removeClass("soundwaveWaving");
                    }
                });
                /*---------------------------------------------------------------------------------------------------*/
                console.log(`${self.pokemonName.charAt(0).toUpperCase() + self.pokemonName.slice(1)} Pokemon Object:`);
                console.log(self.data);
                console.log("Pokemon Objects Array (displayed with 'Trainer Object'.all() method):");
                console.log(trainerObj.all());
            }
        ).fail(function(result){
            alert("Search failed. Not a known Pokemon, or servers are experiencing difficulties.");
        }); //<----END OF AJAX CALL BLOCK (WHICH IS INSIDE OF POKEMON CLASS'S METHOD DEFINITION)
    } //<----END OF POKEMON CLASS'S METHOD DEFINITION
} //<----END OF POKEMON CLASS DEFINITION
/*---##############################################################################################################################################################----*/

/*---------WHEN ENTER IS HIT, TAKE INPUT FIELD VALUE, TRIM WHITESPACE, REMOVE ILLOGICAL CHARACTERS----------------------------*/
/*---------PASS INPUT FIELD VALUE TO POKEMON CLASS CONSTRUCTOR FUNCTION, CREATING POKEMON OBJECT------------------------------*/
/*---------INSTANCE, THEN CALL METHOD THAT INITIATES AJAX CALL AND ESSENTIALLY POPULATES HTML---------------------------------*/
let pokemonSearch; //<---(gives soon to be object global scope)
$("#searchform").submit(function(event){
    event.preventDefault();
    var inputValue = $.trim($("#inputsearch").val().toLowerCase()).replace(" ", "-").replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g,"");
    pokemonSearch = new PokemonClass(inputValue);
    pokemonSearch.retrievePokemon();
});
/*----------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------*/

/*----------ON CLICK #EXPORT BUTTON: CREATE CSV FROM ARRAY OF POKEMON OBJECTS AND ALLOW FOR DOWNLOAD--------------------------*/
$("#export").click(function(event){
   event.preventDefault();
    if (pokeArray.length === 0) {
        return;
    }
   var exportArray = [["Name", "Height", "Weight", "HP", "Attack", "Defense", "ID", "Abilities", "Other Stats"]]; //<---FIRST ROW OF VALUES
   var dataExport = exportArray[0].join(",") + "\n"; //<---FIRST ROW OF VALUES FORMATTED TO BE READ AS A CSV ROW
   pokeArray.forEach(element=>{ //<---LOOP THROUGH ARRAY OF POKEMON OBJECTS
       element.name = element.name.charAt(0).toUpperCase() + element.name.slice(1); //<---TAKE NAME PROPERTY OF OBJECT AND CAPITALIZE
        if (Array.isArray(element.abilities) || Array.isArray(element.otherStats)) { //<---TAKE PROPERTIES OF OBJECT THAT ARE ARRAYS AND MAKE THEM STRINGS
            element.abilities = element.abilities.join(" ");
            element.otherStats = element.otherStats.join(" ");
        }
        var elementProperties  = [];
        for (x in element) { //<---LOOP THROUGH PROPERTIES OF OBJECT THAT ARE NOW EITHER CAPITALIZED OR HAVE BEEN MADE INTO STRINGS
            elementProperties.push(element[x]); //<---PUSH ALL OF THE SINGLE OBJECTS PROPERTY VALUES INTO A LIST CALLED elementProperties
        }
       dataExport += elementProperties.join(",") + "\n"; //<---FORMAT elementProperties TO BE READ AS A CSV ROW AND ADD TO THE STRING dataExport
   });
   var hiddenLink = document.createElement('a'); //<---CREATE A HIDDEN LINK ELEMENT
   hiddenLink.href = 'data:text/csv;charset=utf-8,' + encodeURI(dataExport); //<---ENCODE dataExport SO THAT THE HREF FOR THE LINK WILL LEAD TO A CSV FILE
   hiddenLink.target = '_blank'; 
   hiddenLink.download = `${pokeArray.length}pokemon.csv`;  //<---SET NAME OF FILE THAT WILL BE DOWNLOADED
   hiddenLink.click(); //<---SIMULATE A CLICKING
});
/*----------------------------------------------------------------------------------------------------------------------------*/

/*---------------ON CLICK: ADD POKEMON OBJECT TO POKEARRAY, VISUALIZE THIS BY CREATING ELEMENTS------------------------------------------------------------------*/
/*---------------WITH TEXT ELEMENTS THAT SHOW NAME PROPERTY OF POKEMON OBJECT AND APPEND TO A BOX DIV------------------------------------------------------------*/
/*---------------BUT DO NOT DO IF POKEMON OBJ IS ALREADY IN LIST OR IF NO POKEMON OBJECT EXISTS------------------------------------------------------------------*/
$("#index").click(event=> {
    if (!pokeArray.includes(pokemonSearch.data) && typeof pokemonSearch.data !== "undefined" && ($("#hpbarText").text() !== "Loading..." && $("#hpbarText").text() !== "")) {
        trainerObj.add(pokemonSearch.data);
        var box = $("<div></div>").addClass("pokemonSelected");
        var pokemon = pokemonSearch.pokemonName;
        box.click(()=>{  //<--ON CLICK: "GET" POKEMON OBJ AND CONSOLE LOG IT
            trainerObj.get(pokemon); 
        });
        var name = $("<p></p>").addClass("pokemonSelectedText");
        name.text(`${pokemonSearch.pokemonName}`);
        var removeButton = $("<span></span>").addClass("deindex"); //<--ALSO ADD A SPAN ELEMENT THAT SERVES AS A REMOVE BUTTON
        removeButton.text(" [x]"); 
        box.append(name);
        name.append(removeButton); //<--APPEND REMOVE ELEMENT TO SAME DIV HOLDING TEXT ELEMENT
        removeButton.click(()=>{ //<--ADD EVENT LISTENER TO REMOVE BUTTON THAT WILL REMOVE THE WHOLE DIV FROM PARENT, AND REMOVE CORESPONDING POKEMON OBJECT FROM ARRAY
            box.remove();
            trainerObj.removePokemonObj(name);
            /*
            var indexedname = name.text().replace(" [x]", "");
            pokeArray.forEach(element=>{
                if(indexedname === element.name) {
                    pokeArray.splice(pokeArray.indexOf(element), 1);
                    $("#count").text(`Count: ${pokeArray.length}`);
                }
            });*/
            console.log(`Pokemon Object Array After Removing ${name.text().replace(" [x]", "").charAt(0).toUpperCase() + name.text().replace(" [x]", "").slice(1)} (using 'Trainer Obj'.removePokemonObj('${name.text().replace(" [x]", "").charAt(0).toUpperCase() + name.text().replace(" [x]", "").slice(1)} Pokemon Obj'):`);
            console.log(trainerObj.all());
        });
        $("#indexedPokemon").append(box);
        $("#count").text(`Count: ${pokeArray.length}`); //<---DISPLAY COUNT OF POKEMON OBJECTS IN POKEMON POKEARRAY
    }
    console.log(`Pokemon Object Array After Adding ${pokemonSearch.pokemonName.replace(" [x]", "").charAt(0).toUpperCase() + pokemonSearch.pokemonName.replace(" [x]", "").slice(1)} Pokemon Object (using 'Trainer Object'.addPokemonObj('${pokemonSearch.pokemonName.replace(" [x]", "").charAt(0).toUpperCase() + pokemonSearch.pokemonName.replace(" [x]", "").slice(1)} Pokemon Object') method, displayed with 'Trainer Object'.all():`);
    console.log(trainerObj.all());
});
/*----------------------------------------------------------------------------------------------------------------------------*/
/*---------ON CLICK: EMPTY POKEARRAY OF ALL POKEMON OBJECTS, AND EMPTY CONTAINER DIV THAT VISUALIZES POKEARRAY OF ALL CHILDREN----*/
$("#clear").click(event=>{
    $("#indexedPokemon").empty();
    console.log("Pokemon Objects Array After Emptying of All Pokemon Objects (using 'Trainer Obj'.reset() method, also displayed with this method):");
    console.log(trainerObj.reset());
});
/*--------------------------------------------------------------------------------------------------------------------------------*/











