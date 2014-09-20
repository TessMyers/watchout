// start slingin' some d3 here.

// making enemies:
// make one circle with a random radius between two sizes. place randomly
// make them move. find an animate method.

//TODO: keep track of level, pass into makeEnemies to increase num of enemies as level goes up

// HELPER FUNCTIONS

var getRandom = function(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

var dragmove = function(d) {
  console.log('calling dragmove')
      var x = d3.event.x - 350;
      var y = d3.event.y - 300;
      d3.select(this)
      .attr("transform", "translate(" + x + "," + y + ")");
}

var drag = d3.behavior.drag()
    .on("drag", dragmove);

// CONSTRUCTOR PROTOTYPES

var Player = function(){
  this.size = 8;
  this.color = "orange";
  this.startingPointY = 300;
  this.startingPointX = 350;
}

var Enemy = function(){
  this.size = getRandom(8, 10);
  this.color = 'black';
  this.startingPointY = getRandom(10, 590);  // TODO: x is longer than 600px
  this.startingPointX = getRandom(10, 690);
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
    .call(drag)

    //TODO: refactor?
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
  level = level || 1

  var player = [new Player];
  var attackers = makeEnemies();

  placePlayers(attackers, player);


  setInterval(moveEnemies,2000);
}

initialize();






