;(function(ng){
	ng
	.module('hrisTemplating')
	.controller('clientSidebarController', [
		'$q',
		'$scope',
		'ClientDAO',
		function($q, $scope, ClientDAO){
			// console.log('Client Sidebar Controller');

			var self = this;

			self.clientInfo = [];

			function _init_bind_client_info(){
				// ClientDAO
				// .getClientInfo($scope.main.values.searchEmp)
				// .then(function(res){
				// 	self.clientInfo = res.data;
				// })
				// .catch(function(error){
				// 	$q.reject(error);
				// });
			}

			$scope.$on('clientSidebarFetched', function(event, args){
				// console.log('Client Sidebar Controller Event', args);
				_init_bind_client_info();
			});

			self.profileSlideToggle = function(){
                $scope.main.profileSlide = !$scope.main.profileSlide;
                setCookie('pSlide', ($scope.main.profileSlide ? 1 : 0), 10);
                $window.scrollTo(0, 0);
            };
		}
	]);
})(window.angular);