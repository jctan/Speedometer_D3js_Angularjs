'use strict';

/**
 * @ngdoc function
 * @name speedometerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the speedometerApp
 */
angular.module('speedometerApp')
.controller('SpeedController', function($scope){
	$scope.speed = 5;
	$scope.miles = 10000;
	$scope.change = function(){
		$scope.speed = ( Math.random() * 100) + 30;
		$scope.miles += Math.random() * 100;
	}
})
.directive('speedometer', function(){
	return{
		restrict: 'E', 
		scope: {
			speed: '=?',
			miles: '=?',
		},
		template: "<div></div>",
		link: function(scope, element){
			scope.update = function(){
				$(element[0]).empty();

				scope.speed = scope.speed || 92;
				scope.miles = scope.miles  || 56749;

				 var svg = d3.select(element[0])
                .append("svg:svg")
                .attr("width", 400)
                .attr("height", 400);


		        scope.gauge = iopctrl.arcslider()
		                .radius(120)
		                .events(false)
		                .indicator(iopctrl.defaultGaugeIndicator);
		        scope.gauge.axis().orient("in")
		                .normalize(true)
		                .ticks(12)
		                .tickSubdivide(3)
		                .tickSize(10, 8, 10)
		                .tickPadding(5)
		                .scale(d3.scale.linear()
		                        .domain([0, 160])
		                        .range([-3*Math.PI/4, 3*Math.PI/4]));

		        scope.segDisplay = iopctrl.segdisplay()
		                .width(80)
		                .digitCount(6)
		                .negative(false)
		                .decimals(0);

		        svg.append("g")
		                .attr("class", "segdisplay")
		                .attr("transform", "translate(130, 200)")
		                .call(scope.segDisplay);

		        svg.append("g")
		                .attr("class", "gauge")
		                .call(scope.gauge);

		        scope.segDisplay.value(scope.miles);
		        scope.gauge.value(scope.speed);

			}
			scope.update();
			scope.$watch('speed', function(nv, ov){
				if(nv != ov){
					scope.gauge.value(scope.speed);
				}
			});
			scope.$watch('miles', function(nv, ov){
				if(nv != ov){
					scope.segDisplay.value(scope.miles);
				}
			});
		}
	}
})
  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
