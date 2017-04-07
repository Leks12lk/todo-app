

var config = {};
config.token = localStorage.getItem('token');
config.userName = localStorage.getItem('userName');
config.headers = {
	'Authorization': 'Bearer ' + config.token
}
config.baseUrl = 'http://learn-todo.gear.host/api/tasks';
config.tokenUrl = 'http://learn-todo.gear.host/token';
config.logoutUrl = 'http://learn-todo.gear.host/api/account/logout';
config.isAuthorize = false;

var routeProvider = (function() {
	return {
		getLoginPage: function() {
			$.ajax({
				url: '/login.html',
				type: 'GET',
				success: function(data) {
					$('#main').html(data);
				},
				error: function(data) {
					console.log('getLoginPage error', data);
				}
			});
		},

		getRegisterPage: function() {
			$.ajax({
				url: '/register.html',
				type: 'GET',
				success: function (data) {
					$('#main').html(data);
				},
				error: function (data) {
					console.log('getRegisterPage error', data);
				}
			});
		},

		getTasksPage: function () {
			$.ajax({
				url: '/tasks.html',
				type: 'GET',
				success: function (data) {
					$('#main').html(data);
				},
				error: function (data) {
					console.log('getTasksPage error', data);
				}
			});
		}
	}
})();




var mainCtrl = (function() {
	return {
		changeNavbar: function() {
			var isAuthorize = config.isAuthorize;

			var anonElement =
				'<li><a href="javascript: routeProvider.getRegisterPage();"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>';
			anonElement +=
				'<li><a href="javascript: routeProvider.getLoginPage();"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>';

			var authElement =
				'<li><a href="#"> ' + config.userName + '</a></li>';
			authElement +=
				'<li><a href="javascript: logout();"><span class="glyphicon glyphicon-log-in"></span> Logout</a></li>';

			var element = isAuthorize ? authElement : anonElement;

			$(".change-nav").html(element);
		},

		clearConfig: function() {
			localStorage.removeItem('token');
			localStorage.removeItem('userName');
			config.token = '';
			config.userName = '';
		},

		initialize: function() {
			if (!config.token) {
				config.isAuthorize = false;
				routeProvider.getLoginPage();
				mainCtrl.changeNavbar();
			} else {
				config.isAuthorize = true;
				routeProvider.getTasksPage();
				mainCtrl.changeNavbar();
			}
		}
	}
})();

mainCtrl.initialize();
