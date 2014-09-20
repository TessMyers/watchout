// start slingin' some d3 here.

// making enemies:
// make one circle with a random radius between two sizes. place randomly
// make them move. find an animate method.

//TODO: keep track of level, pass into makeEnemies to increase num of enemies as level goes up

// HELPER FUNCTIONS

var getRandom = function(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

// CONSTRUCTOR PROTOTYPES

var Enemy = function(){
  this.size = getRandom(8, 10);
  this.color = 'black',
  this.startingPointY = getRandom(10, 570) // TODO: x is longer than 600px
  this.startingPointX = getRandom(10, 690)
  // TODO: add a move around method
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

//PlACE ENEMIES

var placeEnemies = function(enemyHorde){

  var SVG = d3.select('.arena')
    .append('svg')
    .attr('height', 600)
    .attr('width',715)

  SVG.selectAll('.stuff')
    .data( enemyHorde )
    .enter()
    .append('circle')
    .attr('class', 'enemy')
    .attr('r', function(d){ return d.size; })
    .attr('cy', function(d){ return d.startingPointY; })
    .attr('cx', function(d){ return d.startingPointX; })
    //.style('height', function(d){ return d.radius + 'px'; })
    .style('fill', function(d){ return d.color; })
}


// Move enemies

var nextMovement = function(armySize){
  armySize = armySize || 30;

  var orders = [];

  for (var i = 0; i < armySize; i++) {
     orders.push({ "x": getRandom(10, 690), "y": getRandom(10, 570) });
  }
  return orders;
}

var moveEnemies = function(){

  orders = nextMovement();

  d3.select('.arena').selectAll('.enemy')
    .data( orders )
    .attr('cx', function(d){ return d.x; })
    .attr('cy', function(d){ return d.y; })

}



var initialize = function(level){
  level = level || 1

  var attackers = makeEnemies();
  placeEnemies(attackers);

  setInterval(moveEnemies,2000);
}

initialize();






