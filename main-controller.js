;(function(ng){
	ng
	.module('rup', [
		'ui.bootstrap'
	])
	.controller('mainController', [
		'$scope',
		'$http',
		function($scope, $http){
			console.log('Main Controller');

			var self = this;

			self.showRecords = [];
			self.showGender = 'All';
			
			self.getUrl = '/data-table-list/data.php?gender='+self.showGender;
			
			self.lst = [];

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
					data : [],
					class : 'sel',
					func : function(o, val){
						self.changeGender(o, val);
					},
					isRemove : true
				}
			};

			$http
			.get('/data-table-list/datadrop.php')
			.then(function(res){
				self.colformat.gender.data = res.data;
				self.showRecords = res.data;
				self.showRecords.unshift({'id' : 'All', 'title' : 'All'});
			}, function(error){
				console.log(error);
			});

			self.changeCheck = function(val){
				self.getUrl = '/data-table-list/data.php?gender='+val;
			};

			self.bindData = function(){
				console.log('sdsd');
			};

			self.changeGender = function(index, o, val){
				console.log('Hello', index, o, val, self.lst);
				self.lst.splice(index, 1);
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