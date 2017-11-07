$(document).ready(function() {
  $("#restartButton").hide();
  $("#gameOverText").hide();
  var battleStatsContainer1 = $("#battleStatsContainer1").detach();
  var battleStatsContainer2 = $("#battleStatsContainer2").detach();

  var characterChosen = false;
  var enemyChosen = false;
  var characterHP = 100;
  var enemyHP = 100;

  
  function battle(){   
    var battleCalled = Math.floor(Math.random()*(20-(-20)+1)-20); 
    if (battleCalled > 0){
      enemyHP -= battleCalled;      
      $("#characterBattleText").text("You attacked for " + battleCalled + " damage.");
    }
    else if (battleCalled < 0) {
      characterHP += battleCalled;
      $("#healthTextNumber1").text(characterHP);
      $("#enemyBattleText").text("You were attacked for " + Math.abs(battleCalled) + " damage.");
    }
    else {
       $("#characterBattleText").text("Net damage was 0.");
      $("#enemyBattleText").text("Net damage was 0.");
    }
    if(characterHP <= 0) {
      $("#characterBattleText").text("You've been defeated...GAME OVER");
      $("#characterRow").empty();
      $("#restartButton").show();
      $("#enemyBattleText").empty();
      $("#attack").attr("disabled", "disabled");
    }
    else if (enemyHP <= 0) {
      $("#characterBattleText").text("You've won this battle.");
      $("#chosenEnemy").empty();
      $("#enemyBattleText").empty();
      enemyChosen = false;
      characterHP = 100;      
      enemyHP = 100;
    }
    updateBattleStats(battleCalled);
    console.log(`battleCalled: ${battleCalled}`);
    console.log(`characterHP: ${characterHP}`);
    console.log(`enemyHP: ${enemyHP}`);
  }
  
  $("#characterRow").click(
    function(e) {
      if(characterChosen === false) {
       var chosenCharacter = $(e.target).detach();
       var unchosenCharacters = $("#characterRow").empty();
       chosenCharacter.css("border", "solid 1px green");
       $("#characterRow").append(chosenCharacter);       
       characterChosen = true;  
      }       
    });
  
  $("#enemyRow").click(
    function(e) {
      if(characterChosen === true && enemyChosen === false) {
       $("#characterBattleText").text(""); 
       $("#attackTextNumber1").text("");
       var chosenEnemy = $(e.target).closest("div").detach();
       $("#chosenEnemy").empty();
       $("#chosenEnemy").append(chosenEnemy);
       enemyChosen = true;
      }             
    });

  function updateBattleStats(battleCalled) {
    $("#healthTextNumber1").text(characterHP);  
    $("#healthTextNumber2").text(enemyHP);
    if (battleCalled === 0) {
      $("#attackTextNumber1").text("+0");
      $("#attackTextNumber2").text("+0");
    } 
    else if ( battleCalled > 0) {
       $("#attackTextNumber1").text(`+${battleCalled}`);
      $("#attackTextNumber2").text("0");
    }
    else {
      $("#attackTextNumber1").text("0");
      $("#attackTextNumber2").text(`+${Math.abs(battleCalled)}`);
    }    
  }
  
  $("#attack").click(
    function() {
      if (enemyChosen === true) {
        $("#characterRow").append(battleStatsContainer1);
        $("#chosenEnemy").append(battleStatsContainer2);
        var battleCalled = battle();        
      }         
    });
  
  $("#restartButton").click(function() {
    location.reload();
  });
});