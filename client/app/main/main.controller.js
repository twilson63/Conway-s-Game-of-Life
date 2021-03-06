'use strict';

angular.module('conwaysgameoflifeApp')
  .controller('MainCtrl', function ($scope, logic, $timeout) {

    //Set up the game
    var game={};
    game.height = 10;
    game.width = 10;

    //Set up the grid when the page loads
    game.grid = logic.startGame(game.height, game.width);
    $scope.grid = game.grid;

    //Repaint the blank grid
    $scope.clear = function() {
      game.grid = logic.startGame(game.height, game.width);
      $scope.grid = game.grid;
    }

    //Turn a cell from alive to dead & vice versa
    $scope.toggle = function(row, col){
      game.grid[row][col] = !game.grid[row][col];
      $scope.grid = game.grid;
    };

    //Start the game
    $scope.play = function() {
      //Continuously loop through the steps until there are no more alive cells
      game.stillAlive = true;
      while(game.stillAlive){
        $timeout(function(){
          return logic.iterate(game);
        }, 1000).then(function(result){
          game = result;
          $scope.grid = game.grid;
        });

        //game = logic.iterate(game);
      }
    };

  });
