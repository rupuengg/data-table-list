;(function(ng){
	ng
	.module('hrisTemplating')
	.controller('clientRightController', [
		'$scope',
		'$q',
		'ClientDAO',
		'$window',
		function($scope, $q, ClientDAO, $window){
			// console.log('Client Right Controller');

			var self = this;

			function _init_bind_client_projects(){
				ClientDAO
				.getClientProjects({
					id : $scope.main.values.searchEmp,
                    page : $scope.main.client.projects.Current_Page,
                    limit : $scope.main.client.projects.Page_Limit,
                    col : $scope.main.client.projects.Column,
                    dir : $scope.main.client.projects.Direction
                })
				.then(function(res){
					$scope.main.client.projects = res.data;
				})
				.catch(function(error){
					$q.reject(error);
				});
			}

			self.pageChanged = function(){
				$window.scrollTo(0,0);
                _init_bind_client_projects();
            };

			self.sortChanged = function(column){
				if($scope.main.client.projects.Column == column){
					$scope.main.client.projects.Direction = ($scope.main.client.projects.Direction == 'asc') ? 'desc' : 'asc';	
				}else{
					$scope.main.client.projects.Column = column;
					$scope.main.client.projects.Direction = 'asc';
				}
				$window.scrollTo(0,0);
                _init_bind_client_projects();
            };

            self.showProfile = function(searchType, profile_id){
				$scope.main.getGenericValue({
                    searchEmp : profile_id,
                    searchType : searchType
                });
			};

			$scope.$on('clntRightFected', function(event, args){
				_init_bind_client_projects();
			});
		}
	]);
})(window.angular);