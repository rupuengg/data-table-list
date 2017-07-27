;(function(ng){
	ng
	.module('hrisTemplating')
	.factory('ClientRESTService', [
		'$resource',
		function($resource){
			var _url = '/client/info/:id',
				_params = '',
				_actions = {
					query : {
						method : 'GET',
						isObject : true
					},
					getClientProjects : {
						url : '/client/projects/:id',
						method : 'GET',
						isObject : true
					}
				};

			return $resource(_url, _params, _actions);
		}
	]);
})(window.angular);