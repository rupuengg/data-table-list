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
								   				'<th ng-if="self.showRowNumber" width="50">S No.</th>'+
								   				'<th ng-repeat="(key, value) in cols" class="first sort {{self.dt.col == key ? (self.dt.dir == \'ASC\' ? \'asc\' : \'desc\') : \'\'}}" ng-click="self.sortChanged(key)">{{value}}</th>'+
								   				'<th ng-if="self.isEditButton || self.isCopyButton || self.isDeleteButton" width="80">&nbsp;</th>'+
								   			'</tr>'+
							   			'</thead>'+
							   			'<tbody>'+
								   			// '<tr ng-if="self.tmp != \'\'">'+
								   			// 	'<td colspan="{{self.colsLen}}">{{self.tmp}}</td>'+
								   			// '</tr>'+
								   			'<tr ng-if="self.dt.List.length > 0" ng-repeat="obj in self.dt.List">'+
								   				'<td ng-if="self.showRowNumber">{{$index+1}}</td>'+
								   				'<td ng-repeat="(key, value) in cols">{{obj[key]}}</td>'+
								   				'<td ng-if="self.isEditButton || self.isCopyButton || self.isDeleteButton">'+
								   					'<a ng-if="self.isEditButton" class="act" ng-click="self.actionButton(\'e\', $index, obj)" href="javascript:;"><span class="fa fa-pencil"></span></a>'+
								   					'<a ng-if="self.isCopyButton" class="act" ng-click="self.actionButton(\'c\', $index, obj)" href="javascript:;"><span class="fa fa-copy"></span></a>'+
								   					'<a ng-if="self.isDeleteButton" class="act" ng-click="self.actionButton(\'d\', $index, obj)" href="javascript:;"><span class="fa fa-trash"></span></a>'+
								   				'</td>'+
							   			'</tbody>'+
						   			'</table>'+
						   			'<ul class="pagination pagination-sm pull-left">'+
							            '<li class="pagination-last ng-scope">'+
							                '<select style="padding:4px 12px;height:29px;" class="form-control" ng-model="self.dt.limit" ng-change="self.pageChanged()">'+
							                    '<option ng-repeat="value in [\'All\', \'10\', \'20\', \'50\', \'100\']" value="{{value}}">{{value}}</option>'+
							                '</select>'+
							            '</li>'+
							        '</ul>'+
							        '<ul uib-pagination '+
							            'total-items="self.dt.total_items" '+
							            'ng-model="self.dt.page" '+
							            'max-size="5" '+
							            'num-pages="self.dt.total_pages" '+
							            'items-per-page="self.dt.limit" '+
							            'class="pagination-sm pull-right" '+
							            'boundary-links="true" '+
							            'ng-change="self.pageChanged()"></ul>'+
						   		'</div>'+
						   '</div>',
				scope : {
					cols : '=cols',
					editButton : '&',
					copyButton : '&',
					deleteButton : '&'
				},
				link : function(scope, element, attrs){
					scope.wd = angular.isNumber(scope.width) ? scope.width + 'px' : scope.width;
				},
				controller : function($scope, $http, $q, $attrs, $window){
					var self = this;

					self.showRowNumber = $attrs.showRowNumber ? ($attrs.showRowNumber == 'true' ? true : false) : false;

					self.isEditButton = $scope.editButton ? true : false;
					self.isCopyButton = $scope.copyButton ? true : false;
					self.isDeleteButton = $scope.deleteButton ? true : false;

					self.colsLen = Object.keys($scope.cols).length + (self.showRowNumber ? 1 : 0) + ((self.isEditButton || self.isCopyButton || self.isDeleteButton) ? 1 : 0);

					self.tmp = '';

					self.dt = [];

					self.dt = {
						List : [],
						total_items : 0,
						page : 1,
						total_pages : 0,
						limit : '10',
						col : '',
						dir : ''
					};

					self.bindData = function(){
						var req = {
							method : $attrs.reqType,
							url : $attrs.reqUrl,
							params : {
								page : self.dt.page,
								limit : self.dt.limit,
								col : self.dt.col,
								dir : self.dt.dir
							}
						};

						self.tmp = 'Loading...';

						$http(req)
						.then(function(res){
							self.tmp = '';
							self.dt = res.data;
						}, function(error){
							self.tmp = '';
							$q.reject(error);
						});
					};

					self.actionButton = function(action, index, obj){
						switch(action){
							case 'e':
								$scope.editButton({
									index : index,
									row : obj
								});
							break;
							case 'c':
								$scope.copyButton({
									index : index,
									row : obj
								});
							break;
							case 'd':
								$scope.deleteButton({
									index : index,
									row : obj
								});
							break;
						}
					};

					self.pageChanged = function(){
						// self.dt.List = [];
						self.bindData();
					};

					self.sortChanged = function(column){
						if(self.dt.col == column){
							self.dt.dir = (self.dt.dir == 'ASC') ? 'DESC' : 'ASC';	
						}else{
							self.dt.col = column;
							self.dt.dir = 'ASC';
						}

						$window.scrollTo(0,0);

		                self.bindData();
		            };

					self.bindData();
				},
				controllerAs : 'self'
			};
		}
	]);
})(window.angular);