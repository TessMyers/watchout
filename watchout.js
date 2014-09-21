// TODO: Add features
  // user control of color, etc
  // add levels. as levels go up enemies increase
  //make prettier. change images?
  // more comments
  // ???
  // profit

//By Tess Myers and Richard Guan, Hack Reactor HR19  2014.
//Blantantly copied from that collider game.

// GLOBAL VARIABLES

var dragmove = function() {
  var x = d3.event.x; //- 350;
  var y = d3.event.y; //- 300;
  d3.select(this)
  .attr('cx', x)
  .attr('cy', y)
}

var _drag = d3.behavior.drag()
    .on("drag", dragmove);

var _highScore = 0;

var _currentScore = 0;

var _collisions = 0;

var _check = setInterval(checkCollisions,10);

var _vulnerability = 100;

// HELPER FUNCTIONS

var getRandom = function(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

var maintain = function(){

  _currentScore++;

  _vulnerability += 10;

  d3.selectAll('.current').text('Current Score: ' + _currentScore);
  d3.selectAll('.high').text('High Score: ' + _highScore);
  d3.selectAll('.collisions').text('Collisions: ' + _collisions);

}

var dragmove = function(d) {
  var x = d3.event.x; //- 350;
  var y = d3.event.y; //- 300;
  d3.select(this)
  .attr('cx', x)
  .attr('cy', y)
}


var checkCollisions = function(){

  var PTop = parseInt(d3.selectAll('.player').attr('cy'));
  var PLeft = parseInt(d3.selectAll('.player').attr('cx'));
  var PBottom = parseInt(PTop) + parseInt(d3.selectAll('.player').attr('r'));
  var PRight = parseInt(PLeft) + parseInt(d3.selectAll('.player').attr('r'));

  var enemyPositions = getEnemyPositions();

  for (var i = 0; i < enemyPositions.length; i++) {

    var ETop = parseInt(enemyPositions[i].y);
    var ELeft = parseInt(enemyPositions[i].x);
    var EBottom = parseInt(ETop) + parseInt(enemyPositions[i].r);
    var ERight = parseInt(ELeft) + parseInt(enemyPositions[i].r);

    var topOverlap = (EBottom >= PTop && EBottom <= PBottom);
    var bottomOverlap = (ETop <= PBottom && ETop >= PTop);
    var leftOverlap = (ERight >= PLeft && ERight <= PRight);
    var rightOverlap = (ELeft <= PRight && ELeft >= PLeft);

    if (_vulnerability >= 100 && (topOverlap || bottomOverlap) && (leftOverlap || rightOverlap)){
      // BOOM COLLISION *esplosions*
      _collisions++
      _vulnerability = 0;

      if( _currentScore > _highScore ){
        _highScore = _currentScore;
      }

      _currentScore = 0;
    }
  }
}


// CONSTRUCTOR PROTOTYPES

var Player = function(){
  this.size = 8;
  this.color = "orange";
  this.startingPointY = 300;
  this.startingPointX = 350;
}

var Enemy = function(){
  this.size = getRandom(8, 8);
  this.color = 'black';
  this.startingPointY = getRandom(10, 590);  // TODO: x is longer than 600px
  this.startingPointX = getRandom(10, 690);

}

//MAKE ENEMIES

var makeEnemies = function(armySize){
  armySize = armySize || 30;

  var enemies = [];

  for (var i = 0; i < armySize; i++) {
    enemies.push(new Enemy);
  }
  return enemies;
}


var getEnemyPositions = function(){

  var positions = [];

  var horde = d3.selectAll('.enemy')
  horde.each(function(d, i){
    var enemy = {};

    enemy.x = d3.select(this).attr('cx')
    enemy.y = d3.select(this).attr('cy')
    enemy.r = d3.select(this).attr('r')

    positions.push(enemy);
  });
  return positions;
}

//PlACE ITEMS

var placePlayers = function(enemyHorde, player){

  var SVG = d3.select('.arena')
    .append('svg')
    .attr('height', 600)
    .attr('width',700)

  SVG.selectAll('.enemyPlane')
    .data( enemyHorde )
    .enter()
    .append('circle')
    .attr('class', 'enemy')
    .attr('r', function(d){ return d.size; })
    .attr('cy', function(d){ return d.startingPointY; })
    .attr('cx', function(d){ return d.startingPointX; })
    .style('fill', function(d){ return d.color; })

  SVG.selectAll('.enemyPlane')
    .data( player )
    .enter()
    .append('circle')
    .attr('class', 'player')
    .attr('r', function(d){ return d.size; })
    .attr('cy', function(d){ return d.startingPointY; })
    .attr('cx', function(d){ return d.startingPointX; })
    .style('fill', function(d){ return d.color; })
    .call(_drag)

    //TODO: refactor for less copyPasta
}

// MOVE ENEMIES

var nextMovement = function(armySize){
  armySize = armySize || 30;

  var orders = [];

  for (var i = 0; i < armySize; i++) {
     orders.push({ "x": getRandom(10, 690), "y": getRandom(10, 590) });
  }
  return orders;
}

var moveEnemies = function(){

  orders = nextMovement();

  d3.select('.arena').selectAll('.enemy')
    .data( orders )
    .transition()
    .duration(2000)
    .attr('cx', function(d){ return d.x; })
    .attr('cy', function(d){ return d.y; })

}

// INITIALIZE

var initialize = function(level){
  level = level || 1;

  var player = [new Player];
  var attackers = makeEnemies();

  placePlayers(attackers, player);

  setInterval(moveEnemies,2000);
  setInterval(checkCollisions,10);

  setInterval(maintain, 50)
}

initialize();


