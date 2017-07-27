;(function(ng){
	ng
	.module('rup')
	.directive('tableListing', [
		function(){
			return {
				restrict : 'E',
				template : '<div class="table-listing" style="width:{{wd}};">'+
						   		'<div class="list">'+
						   			'<table class="table table-condensed table-listing">'+
							   			'<thead>'+
								   			'<tr>'+
								   				'<th ng-if="showRowNumber">S No.</th>'+
								   				'<th ng-repeat="(key, value) in cols" class="first sort {{\'\' == key ? (key == \'asc\' ? \'asc\' : \'desc\') : \'\'}}" ng-click="self.sortChanged(key)">{{value}}</th>'+
								   			'</tr>'+
							   			'</thead>'+
							   			'<tbody>'+
								   			'<tr ng-if="self.tmp != \'\'">'+
								   				'<td colspan="{{self.colsLen}}">{{self.tmp}}</td>'+
								   			'</tr>'+
								   			'<tr ng-if="self.dt.length > 0" ng-repeat="obj in self.dt">'+
								   				'<td ng-if="showRowNumber">{{$index+1}}</td>'+
								   				'<td ng-repeat="(key, value) in cols">{{obj[key]}}</td>'+
								   			'</tr>'+
							   			'</tbody>'+
						   			'</table>'+
						   		'</div>'+
						   '</div>',
				scope : {
					cols : '=cols',
				},
				link : function(scope, element, attrs){
					scope.wd = angular.isNumber(scope.width) ? scope.width + 'px' : scope.width;
				},
				controller : function($scope, $http, $q, $attrs){
					var self = this;

					$scope.showRowNumber = $attrs.showRowNumber ? ($attrs.showRowNumber == 'true' ? true : false) : false;

					self.colsLen = Object.keys($scope.cols).length + ($scope.showRowNumber ? 1 : 0);
					console.log(self.colsLen);

					self.req = {
						method : $attrs.reqType,
						url : $attrs.reqUrl
					};

					self.dt = [];
					self.tmp = '';

					self.bindData = function(){
						self.tmp = 'Loading...';
						$http(self.req)
						.then(function(res){
							self.tmp = '';
							self.dt = res.data;
							console.log(self.dt);
						}, function(error){
							self.tmp = '';
							$q.reject(error);
						});
					};

					self.bindData();
				},
				controllerAs : 'self'
			};
		}
	]);
})(window.angular);