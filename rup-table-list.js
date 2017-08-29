;(function(ng){
	ng
	.module('rup-table-list', [])
	.directive('tableList', [
		'$window',
		'$document',
		function($window, $document){
			return {
				restrict : 'E',
				template : '<div class="table-listing" style="width:{{wd}};">'+
						   		'<div class="list" style="position:relative;">'+
						   			'<table class="rup-list table table-condensed table-listing">'+
							   			'<thead>'+
								   			'<tr>'+
								   				'<th ng-if="self.showRowNumber" width="50">S No.</th>'+
								   				'<th ng-repeat="(key, value) in config.columns" class="first sort {{self.dt.col == key ? (self.dt.dir == \'ASC\' ? \'asc\' : \'desc\') : \'\'}}" ng-click="self.sortChanged(key)">{{value}}</th>'+
								   				'<th ng-if="self.isEditButton || self.isCopyButton || self.isDeleteButton" width="80">&nbsp;</th>'+
								   			'</tr>'+
							   			'</thead>'+
							   			'<tbody>'+
								   			'<tr ng-if="self.dt.List.length > 0" ng-repeat="obj in self.dt.List" ng-init="startIndex=$index">'+
								   				'<td ng-if="self.showRowNumber">{{$index+1}}</td>'+
								   				'<td ng-repeat="(key, value) in config.columns">'+
								   					'<span ng-if="!config.colformat[key]">{{obj[key].length > 30 ? (obj[key]|limitTo : 27) + \'...\' : obj[key]}}</span>'+
								   					'<span ng-if="config.colformat[key].type == \'select\'">'+
														'<span ng-if="">Loading...</span>'+
								   						'<select ng-class="config.colformat[key].class" ng-options="item.id as item.title for item in config.colformat[key].data" ng-model="obj[key]" ng-change="self.change(key, startIndex, obj)">'+
								   						'</select>'+
								   					'</span>'+
								   					'<span ng-if="config.colformat[key].type == \'radio\'">'+
								   						'<label ng-repeat="(k, item) in config.colformat[key].data">'+
								   							'<input name="{{key+startIndex}}" value="{{item.id}}" type="radio" ng-model="obj[key]" ng-change="config.colformat[key].func(key, startIndex, obj)">{{item.title}}'+
								   						'</label>'+
								   					'</span>'+
								   					'<div ng-if="config.colformat[key].type == \'onoff\'" ng-class="config.colformat[key].class">'+
							                            '<span title="On" class="{{obj[key] == 1 ? \'active\' : \'\'}}" ng-click="self.change(key, startIndex, obj)">ON</span>'+
							                            '<span title="Off" class="{{obj[key] == 0 ? \'active\' : \'\'}}" ng-click="self.change(key, startIndex, obj)">OFF</span>'+
							                        '</div>'+
							   					'</td>'+
								   				'<td ng-if="self.isEditButton || self.isCopyButton || self.isDeleteButton">'+
								   					'<a ng-if="self.isEditButton" class="act" ng-click="self.actionButton(\'e\', $index, obj)" href="javascript:;"><span class="fa fa-pencil"></span></a>'+
								   					'<a ng-if="self.isCopyButton" class="act" ng-click="self.actionButton(\'c\', $index, obj)" href="javascript:;"><span class="fa fa-copy"></span></a>'+
								   					'<a ng-if="self.isDeleteButton" class="act" ng-click="self.actionButton(\'d\', $index, obj)" href="javascript:;"><span class="fa fa-trash"></span></a>'+
								   				'</td>'+
								   			'</tr>'+
											// '<tr ng-if="self.tmp != \'\' && self.dt.List.length == 0">'+
											// 	'<td colspan="{{self.colsLen}}">{{self.tmp}}</td>'+
								   // 			'</tr>'+
											'<tr ng-if="self.tmp == \'\' && self.dt.List.length == 0">'+
												'<td colspan="{{self.colsLen}}">No data found.</td>'+
								   			'</tr>'+
							   			'</tbody>'+
						   			'</table>'+
						   			'<div ng-if="self.showPagging">'+
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
						   			'<div ng-if="!self.showPagging && self.dt.total_pages != self.dt.page && self.dt.total_items > 0">'+
							   			'<ul class="load-more">'+
								            '<li class="pagination-last ng-scope">'+
								                '<center>'+
								                	'<a href="javascript:;" ng-click="self.pageChanged(\'load-more\')">Load More</a>'+
								                '</center>'+
								            '</li>'+
								        '</ul>'+
						   			'</div>'+
						   			'<div ng-if="self.tmp != \'\' || isProgress" style="position:absolute;top:0px;left:0px;z-index:1;opacity:0.2;display:block;width:100%;height:100%;background-color:#000;"></div>'+
						   			'<div ng-if="self.tmp != \'\' || isProgress" style="position:absolute;top:0px;left:0px;z-index:2;display:block;width:100%;height:100%;color:#fff;"><span style="display:block;font-size:24px;text-align:center;padding-top:100px;opacity:1;">Loading...</span></div>'+
						   		'</div>'+
						   '</div>',
				scope : {
					config : '=config',
					ngModel : '=ngModel',
					isReset : '=isReset',
					isProgress : '=isProgress',
					editButton : '&',
					copyButton : '&',
					deleteButton : '&'
				},
				link : function(scope, element, attrs){
					scope.wd = angular.isNumber(scope.width) ? scope.width + 'px' : scope.width;

					// var raw = angular.element($document)[0].body;
		            // console.log('loading directive');
		                
		            // angular.element($document).bind('scroll', function () {
		            //     console.log('in scroll');
		            //     console.log(raw.scrollTop + raw.offsetHeight);
		            //     console.log(raw.scrollHeight);
		            //     if (raw.scrollTop + raw.offsetHeight > raw.scrollHeight) {
		            //         console.log("I am at the bottom");
		            //         // scope.$apply(attrs.scrolly);
		            //     }
		            // });
				},
				controller : function($scope, $http, $q, $attrs, $window){
					var self = this;

					self.showRowNumber = $attrs.showRowNumber ? ($attrs.showRowNumber == 'true' ? true : false) : false;
					self.showPagging = $attrs.showPagging ? ($attrs.showPagging == 'true' ? true : false) : false;
					self.minLimit = $attrs.minLimit ? $attrs.minLimit : 10;

					self.isEditButton = $attrs.editButton ? true : false;
					self.isCopyButton = $attrs.copyButton ? true : false;
					self.isDeleteButton = $attrs.deleteButton ? true : false;

					self.colsLen = Object.keys($scope.config.columns).length + (self.showRowNumber ? 1 : 0) + ((self.isEditButton || self.isCopyButton || self.isDeleteButton) ? 1 : 0);

					self.tmp = '';

					self.dt = [];

					self.dt = {
						List : [],
						total_items : 0,
						page : 1,
						total_pages : 0,
						col : '',
						dir : ''
					};

					self.dt.limit = self.minLimit;

					// Bind Data From Server
					self.bindData = function(isreset){
						var req = {
							method : $scope.config.reqType,
							url : $scope.config.reqUrl,
							params : {
								page : self.dt.page,
								limit : self.dt.limit,
								col : self.dt.col,
								dir : self.dt.dir
							}
						};

						if(isreset)
							req.params.page = 1;

						self.tmp = 'Loading...';

						$http(req)
						.then(function(res){
							self.tmp = '';
							if(self.showPagging){
								self.dt = res.data;
							}else{
								if(req.params.page == 1){
									self.dt = res.data;
								}else{
									self.dt.total_items = res.data.total_items;
									self.dt.page = res.data.page;
									self.dt.total_pages = res.data.total_pages;
									self.dt.limit = res.data.limit;
									self.dt.col = res.data.col;
									self.dt.dir = res.data.dir;

									self.dt.List.push.apply(self.dt.List, res.data.List);
								}
							}
							$scope.ngModel = self.dt.List;
						}, function(error){
							self.tmp = '';
							$q.reject(error);
						});
					};

					// Check Request Url Is Changed
					$scope.$watch("config.reqUrl", function(newValue, oldValue){
						// Rebind Data
						self.bindData(true);
					});

					// Action Button
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
								self.dt.List.splice(index, 1);
								$scope.deleteButton({
									index : index,
									row : obj
								});
							break;
						}
					};

					// Pagging
					self.pageChanged = function(str){
						if(str)
							self.dt.page = parseInt(self.dt.page) + 1;

						self.bindData(false);
					};

					// Sorting
					self.sortChanged = function(column){
						self.dt.page = 1;

						if(self.dt.col == column){
							self.dt.dir = (self.dt.dir == 'ASC') ? 'DESC' : 'ASC';	
						}else{
							self.dt.col = column;
							self.dt.dir = 'ASC';
						}

						$window.scrollTo(0,0);

		                self.bindData(false);
		            };
					
					self.change = function(key, startIndex, obj){
						console.log('ok', key, startIndex, obj);
						// $scope.config.colformat[key].func(startIndex, obj, obj[key]);
					};
				},
				controllerAs : 'self'
			};
		}
	]);
})(window.angular);