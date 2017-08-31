;(function(ng){
	ng
	.module('rup', [
		'ui.bootstrap',
		'rup-table-list',
		'rup-select-search',
		'rup-validation'
	])
	.controller('mainController', [
		'$scope',
		'$http',
		function($scope, $http){
			$scope.data_list = [];

			var self = this;
			// console.log('Main', $scope);

			self.mlist = [{
				id : 1,
				name : 'AAAA'
			},{
				id : 2,
				name : 'BBBB'
			},{
				id : 3,
				name : 'CCCC'
			},{
				id : 4,
				name : 'DDDD'
			},{
				id : 5,
				name : 'EEEE'
			},{
				id : 6,
				name : 'FFFF'
			},{
				id : 7,
				name : 'GGGG'
			},{
				id : 8,
				name : 'HHHH'
			},{
				id : 9,
				name : 'IIII'
			},{
				id : 10,
				name : 'JJJJ'
			}];
			$scope.user = [];
			$scope.user.rlist = [];

			self.showRecords = [];
			self.showGender = 'All';

			self.config = {
				reqType : 'get',
				reqUrl : '/data-table-list/data.php?gender='+self.showGender,
				columns : {
					'id' : 'Id', 
					'first_name' : 'Firstname', 
					'last_name' : 'Lastname', 
					'email' : 'Email', 
					'gender': 'Gender',
					'ip_address': 'IP Address',
					'is_archive': 'Is Archive'
				},
				colformat : {
					gender : {
						type : 'select',
						data : [],
						class : 'sel',
						func : function(o, val){
							self.changeGender(o, val);
						}
					},
					is_archive : {
						type : 'select',
						data : [{
							id : '0',
							title : '0'
						},{
							id : '1',
							title : '1'
						}],
						func : function(o, val){
							self.archived(o, val);
						}
					}
				}
			};

			self.isProgress = false;

			$http
			.get('/data-table-list/datadrop.php')
			.then(function(res){
				self.config.colformat.gender.data = res.data;
				self.showRecords = res.data;
				self.showRecords.unshift({'id' : 'All', 'title' : 'All'});
			}, function(error){
				console.log(error);
			});

			self.isAddNew = false;
			self.AddNew = function(){
				self.isAddNew = true;
				console.log('Add New');
			};

			self.changeCheck = function(val){
				self.config.reqUrl = '/data-table-list/data.php?gender='+val;
			};

			self.bindData = function(){
				console.log('sdsd');
			};

			self.changeGender = function(index, o, val){
				// console.log('Hello', index, o, val, $scope.data_list);
				$scope.data_list.splice(index, 1);
			};

			self.isProgress = false;
			self.archived = function(index, o, val){
				self.isProgress = true;
				$http
				.get('/data-table-list/data-action.php?id='+o.id+'&status='+o.is_archive)
				.then(function(res){
					if(res.data.Status == '1')
						$scope.data_list.splice(index, 1);
					self.isProgress = false;
				}, function(error){
					console.log(error);
				});
				// console.log('Hello', index, o, val, $scope.data_list);
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