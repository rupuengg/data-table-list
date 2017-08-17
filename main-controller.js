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
			
			self.getUrl = '/data-table-list/data.php';

			self.columns = {
				'id' : 'Id', 
				'first_name' : 'Firstname', 
				'last_name' : 'Lastname', 
				'email' : 'Email', 
				'gender': 'Gender',
				'ip_address': 'IP Address'
			};

			self.colformat = {
				gender : {
					type : 'select',
					data : [{
						id : 'Male',
						title : 'Male'
					},{
						id : 'Female',
						title : 'Female'
					}],
					class : 'sel',
					func : function(o, val){
						self.changeGender(o, val);
					}
				}
			};

			self.changeGender = function(o, val){
				console.log('Hello', o, val);
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