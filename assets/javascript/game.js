$(document).ready(function() {
  $("#restartButton").hide();
  $("#gameOverText").hide();

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
      $("#enemyBattleText").text("You were attacked for " + Math.abs(battleCalled) + " damage.");
    }
    else {
       $("#characterBattleText").text("Net damage was 0.");
      $("#enemyBattleText").text("Net damage was 0.");
    }
    if(characterHP <= 0) {
      $("#characterBattleText").text("You've been defeated...GAME OVER");
      $("#restartButton").show();
      $("#enemyBattleText").empty();
    }
    else if (enemyHP <= 0) {
      $("#characterBattleText").text("You've won this battle.");
      $("#enemyBattleText").empty();
      enemyChosen = false;
      characterHP = 100;
      enemyHP = 100;
    }
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
       var chosenEnemy = $(e.target).closest("div").detach();
       $("#chosenEnemy").empty();
       $("#chosenEnemy").append(chosenEnemy);
       enemyChosen = true;
      }             
    });
  
  $("#attack").click(
    function() {
      var battleCalled = battle();    
    });
  $("#restartButton").click(function() {
    location.reload();
  });
});