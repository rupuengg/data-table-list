;(function(ng){
	ng
	.module('hrisTemplating')
	.directive('moveListBoxItem', [
		function(){
			return {
				restrict : 'E',
				template : '<div class="move-list-item" style="width:{{wd}};">'+
						   		'<div class="lft">'+
						   			'<div class="inner box">'+
						   				'<p ng-if="mlist.length > 0">'+
						   					'<a ng-click="self.moveAllRight()" href="javascript:;">Select All</a>'+
						   				'</p>'+
						   				'<ul>'+
						   					'<li ng-repeat="obj in mlist">'+
						   						'<a ng-click="self.moveRight($index)" href="javascript:;">{{obj[valueFormat]}}</a>'+
						   					'</li>'+
						   				'</ul>'+
						   				'<p ng-if="mlist.length == 0" class="no-item">'+
						   					'No items'+
						   				'</p>'+
						   			'</div>'+
						   		'</div>'+
						   		'<div class="cntr">'+
						   			'<div class="inner">'+
						   				'<span class="fa fa-arrow-right fa-3x"></span>'+
						   			'</div>'+
						   		'</div>'+
						   		'<div class="rht">'+
						   			'<div class="inner box">'+
						   				'<p ng-if="rlist.length > 0">'+
						   					'<a ng-click="self.removeAllRight()" href="javascript:;">Remove All</a>'+
						   				'</p>'+
						   				'<ul>'+
						   					'<li ng-repeat="obj in rlist">'+
						   						'<a ng-click="self.removeRight($index)" href="javascript:;">'+
						   							'{{obj[valueFormat]}}'+
						   							'<span class="fa fa-close"></span>'+
						   						'</a>'+
						   					'</li>'+
						   				'</ul>'+
						   				'<p ng-if="rlist.length == 0" class="no-item">'+
						   					'No items'+
						   				'</p>'+
						   			'</div>'+
						   		'</div>'+
						   		'<div class="clear"></div>'+
						   '</div>',
				scope : {
					width : '=width',
					mlist : '=mlist',
					rlist : '=rlist'
				},
				link : function(scope, element, attrs){
					scope.wd = angular.isNumber(scope.width) ? scope.width + 'px' : scope.width;
					scope.keyFormat = attrs.kFormat;
					scope.valueFormat = attrs.vFormat;
					scope.isReverse = attrs.isReverse ? (attrs.isReverse == 'true' ? true : false) : false;
				},
				controller : function($scope){
					var self = this;

					self.mlst = angular.copy($scope.mlist);

					self.moveAllRight = function(){
						angular.forEach($scope.mlist, function(value, key){
							if(checkItem($scope.rlist, value[$scope.keyFormat]) < 0){
								var tmp = angular.copy(value);
								tmp.rPos = $scope.rlist.length + 1;
								$scope.rlist.push(value);
							}

						});
						if($scope.isReverse)
							$scope.mlist = [];
					};

					self.moveRight = function(index){
						if(checkItem($scope.rlist, $scope.mlist[index][$scope.keyFormat]) < 0){
							var tmp = $scope.mlist[index];
							tmp.rPos = $scope.rlist.length + 1;
							$scope.rlist.push(tmp);
						}

						if($scope.isReverse)
							$scope.mlist.splice(index, 1);
					};

					self.removeAllRight = function(){
						$scope.rlist = [];

						if($scope.isReverse)
							$scope.mlist = returnOrderArray($scope.rlist);
					};

					self.removeRight = function(index){
						for(var i=index;i<$scope.rlist.length;i++){
							$scope.rlist[i].rPos = $scope.rlist[i].rPos - 1;
						}

						$scope.rlist.splice(index, 1);

						if($scope.isReverse)
							$scope.mlist = returnOrderArray($scope.rlist);
					};

					function checkItem(list, id){
						var chkBln = -1;

						angular.forEach(list, function(value, key){
							if(value[$scope.keyFormat] == id){
								chkBln = key;
							}
						});

						return chkBln;
					}

					function returnOrderArray(child){
						var parent = angular.copy(self.mlst);
						angular.forEach(child, function(val, k){
							var p = checkItem(parent, val[$scope.keyFormat]);
							if(p >= 0){
								console.log(parent, val[$scope.keyFormat], checkItem(parent, val[$scope.keyFormat]));
								parent.splice(p, 1);
							}
						});

						return parent;
					}
				},
				controllerAs : 'self'
			};
		}
	]);
})(window.angular);