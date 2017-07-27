;(function(ng){
	ng
	.module('hrisTemplating')
	.factory('ClientDAO', [
		'$q',
		'ClientRESTService',
		'Client',
		function($q, ClientRESTService, Client){
			var ClientDAO = function(){};

			ClientDAO.prototype.getClientInfo = function(client_id){
				return ClientRESTService
					.get({
						id : client_id
					})
					.$promise
					.then(function(res){
						return res;
					})
					.catch(function(error){
						$q.reject(error);
					});
			};

			ClientDAO.prototype.getClientProjects = function(params){
				return ClientRESTService
					.getClientProjects(params)
					.$promise
					.then(function(res){
						return res;
					})
					.catch(function(error){
						$q.reject(error);
					})
			};

			return new ClientDAO();
		}
	]);
})(window.angular);