;(function(ng){
	ng
	.module('hrisTemplating')
	.directive('clientProjectViewList', [
		'getUrl',
		'$http',
		function(getUrl, $http){
			return {
				restrict : 'E',
				templateUrl : function(element, attrs){
					return getUrl.getBaseUrl(attrs.templateUrl);
				},
				controller : function($scope){
					var self = this;

					$scope.$on('clientrightFetched', function(event, args){
						// console.log('Client Sidebar Controller Event', args);
						// _init_bind_client_projects();
					});

					self.showProfile = function(searchType, profile_id){
						$scope.main.getGenericValue({
                            searchEmp : profile_id,
                            searchType : searchType
                        });
					};
				},
				controllerAs : 'clntLstCtrl'
			};
		}
	]);
})(window.angular);