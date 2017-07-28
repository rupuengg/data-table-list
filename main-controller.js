;(function(ng){
	ng
	.module('rup', [
		'ui.bootstrap'
	])
	.controller('mainController', [
		'$scope',
		function($scope){
			console.log('Main Controller');

			var self = this;

			self.columns = {
				'id' : 'Id', 
				'first_name' : 'Firstname', 
				'last_name' : 'Lastname', 
				'email' : 'Email', 
				'gender': 'Gender',
				'ip_address': 'IP Address'
			};

			$scope.edit = function(index, row){
				console.log('Edit', index, row);
			};

			$scope.copy = function(index, row){
				console.log('Copy', index, row);
			};

			$scope.delete = function(index, row){
				console.log('Delete', index, row);
			};
		}
	]);
})(window.angular);